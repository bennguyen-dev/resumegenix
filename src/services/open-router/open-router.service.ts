import { ANALYZE_TEXT_PROMPT } from "@/services/open-router";

class OpenRouterService {
  async analyze({ text }: { text: string }) {
    try {
      const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
      const url = "https://openrouter.ai/api/v1/chat/completions";

      const prompt = `${ANALYZE_TEXT_PROMPT} ${text}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "X-Title": "ResumeGenix",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.0-flash-thinking-exp:free",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.5,
        }),
      });

      const rawText = await response.json();

      const result = rawText.choices[0].message.content.trim();
      return this.extractValidJsonFromResponse(result);
    } catch (error) {
      console.error("Error analyzing text:", error);
      throw new Error("Failed to analyze CV");
    }
  }

  extractValidJsonFromResponse(responseText) {
    // Step 1: Try to find and extract JSON block from markdown code blocks
    const jsonBlockMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonBlockMatch && jsonBlockMatch[1]) {
      try {
        return JSON.parse(jsonBlockMatch[1]);
      } catch (e) {
        console.log(
          "Found JSON code block but couldn't parse it, trying other methods...",
        );
      }
    }

    // Step 2: Try to parse the response directly
    try {
      return JSON.parse(responseText);
    } catch (e) {
      console.log("Direct parsing failed, trying repair methods...");
    }

    // Step 3: Try to fix truncated JSON
    try {
      // Find the starting point of the JSON object
      const startPos = responseText.indexOf("{");
      if (startPos === -1) {
        throw new Error("No JSON object found in the response");
      }

      // Extract the potentially truncated JSON
      const potentialJson = responseText.substring(startPos);

      // Count opening and closing braces to check if JSON is complete
      let openBraces = 0;
      let closeBraces = 0;
      for (let i = 0; i < potentialJson.length; i++) {
        if (potentialJson[i] === "{") openBraces++;
        if (potentialJson[i] === "}") closeBraces++;
      }

      if (openBraces > closeBraces) {
        // JSON is truncated, attempt to fix by adding missing closing braces
        console.log(
          `JSON appears truncated: ${openBraces} opening braces, ${closeBraces} closing braces`,
        );

        // Try to repair truncated object by finding the last complete nested object
        // This is a simplified approach - finding the last position where we have balanced braces
        let jsonCandidate = null;
        let currentPos = potentialJson.lastIndexOf("}");

        while (currentPos > 0 && !jsonCandidate) {
          try {
            // Try parsing just up to this position plus one char (the closing brace)
            const testJson = potentialJson.substring(0, currentPos + 1);
            JSON.parse(testJson);
            jsonCandidate = testJson;
            break;
          } catch (parseError) {
            // Move to previous closing brace
            currentPos = potentialJson.lastIndexOf("}", currentPos - 1);
          }
        }

        if (jsonCandidate) {
          return JSON.parse(jsonCandidate);
        }

        // If we couldn't find a valid subset, try a more aggressive approach
        // by completing the JSON with missing braces
        const missingBraces = openBraces - closeBraces;
        const repairedJson = potentialJson + "}".repeat(missingBraces);

        try {
          return JSON.parse(repairedJson);
        } catch (repairError) {
          console.log(
            "Couldn't repair truncated JSON by adding closing braces",
          );
        }
      }
    } catch (truncationError) {
      console.error("Error handling truncated JSON:", truncationError);
    }

    // Step 4: Last resort - try to find ANY valid JSON object in the response
    const jsonRegex =
      /\{(?:[^{}]|(\{(?:[^{}]|(\{(?:[^{}]|(\{[^{}]*\}))*\}))*\}))*\}/g;
    const matches = responseText.match(jsonRegex);

    if (matches && matches.length > 0) {
      // Try each match in order of length (longest first)
      const sortedMatches = [...matches].sort((a, b) => b.length - a.length);

      for (const match of sortedMatches) {
        try {
          return JSON.parse(match);
        } catch (e) {
          // Continue to next match
        }
      }
    }

    throw new Error("Could not extract or repair valid JSON from the response");
  }
}

export const openRouterService = new OpenRouterService();
