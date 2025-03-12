import { CVData } from "@/types/resume";

export const ANALYZE_TEXT_PROMPT = `
You are an expert CV analyst. Your task is to analyze the provided CV text and extract the following information as comprehensively as possible, with a special focus on detailed project information and technology timelines:
    
CRITICAL: Reply with ONLY a valid JSON object. No text, no explanations, no backticks, no markdown, just the raw JSON. 
Your entire response must be parseable directly with JSON.parse().

## Data Extraction Requirements

### 1. Personal Details
- Name
- Contact information (email, phone number, LinkedIn profile, etc.)

### 2. Summary/Objective
- Extract any introductory statement or career objective.

### 3. Education
- Degrees obtained (e.g., Bachelor's, Master's)
- Institutions attended
- Graduation dates (preferably YYYY-MM-DD or year-month)
- Field of study
- GPA/Grades (if mentioned)

### 4. Work Experience
- Company name
- Position held
- Start date (preferably YYYY-MM format)
- End date (preferably YYYY-MM format, or "Present" for current positions)
- Duration in months (calculated automatically)
- Key responsibilities (brief description)
- Achievements (specific accomplishments, e.g., "Increased sales by 20%")
- Technologies used in each role (list all frameworks, libraries, tools mentioned)

### 5. Certifications
- Name of certification
- Issuing organization
- Date obtained (preferably YYYY-MM format)
- Expiration date (if mentioned)
- Credential ID or verification link (if mentioned)

### 6. Projects (Detailed)
- Project name
- Description (brief overview of what the project does)
- Start date (preferably YYYY-MM format)
- End date (preferably YYYY-MM format, or "Present" for ongoing projects)
- Duration in months (calculated automatically, if end date is Present calculate to {{now}})
- Role (user's contribution or position in the project)
- Technologies used, categorized as:
  - Programming languages (e.g., Python, Java, JavaScript, Swift, Go, Rust, R, C++, C#)
  - Frameworks (e.g., NextJs, Remix, Angular, Django, Spring Boot, Flask, Laravel, Rails)
  - Libraries (e.g., ReactJs, VueJs, jQuery, Bootstrap, React-Bootstrap, Material-UI, Ant-Design, Tailwind CSS, Mantine UI, Chakra UI)
  - Databases (e.g., MySQL, MongoDB, PostgreSQL, Oracle, SQL Server)
  - Tools (e.g., Git, Docker, Kubernetes, Jenkins, Maven, Gradle)
  - Methodologies/Techniques (e.g., Agile, Scrum, Kanban, Waterfall)
- Functionalities delivered (key features or deliverables, e.g., "User authentication, payment system")
- Team size (number of team members, e.g., "5 people")
- Roles involved (positions within the team, e.g., "Developers, QA, PM")
- Project purpose (what the project aimed to achieve, e.g., "E-commerce platform for retail")
- Customer location (where the client or customer is based, e.g., "New York, USA")
- Project status (Completed, In Progress, On Hold, etc.)
- Key challenges overcome
- Outcomes and results
- Metadata (other relevant information)

### 7. Skills
- Technical skills (e.g., programming languages, tools)
- Soft skills (e.g., communication, leadership)
- Categorize each skill as "technical" or "soft"
- For technical skills, further categorize as:
  - Programming languages (e.g., Python, Java, JavaScript, Swift, Go, Rust, R, C++, C#)
  - Frameworks (e.g., NextJs, Remix, Angular, Django, Spring Boot, Flask, Laravel, Rails)
  - Libraries (e.g., ReactJs, VueJs, jQuery, Bootstrap, React-Bootstrap, Material-UI, Ant-Design, Tailwind CSS, Mantine UI, Chakra UI)
  - Databases (e.g., MySQL, MongoDB, PostgreSQL, Oracle, SQL Server)
  - Tools (e.g., Git, Docker, Kubernetes, Jenkins, Maven, Gradle)
  - Methodologies/Techniques (e.g., Agile, Scrum, Kanban, Waterfall)

### 8. Volunteer Work
- Organization name
- Position held
- Start date (preferably YYYY-MM format)
- End date (preferably YYYY-MM format, or "Present" for current positions)
- Responsibilities (brief description)
- Skills applied or developed

### 9. Publications
- Title of publication
- Publication date (preferably YYYY-MM-DD or year)
- Publisher/Journal/Website
- Co-authors (if mentioned)
- URL or DOI (if mentioned)

### 10. Professional Affiliations
- Organization name
- Membership status (e.g., "Member since 2020")
- Role in organization (if any)

### 11. Awards
- Award name
- Description (brief details)
- Year received (preferably YYYY-MM format)
- Issuing organization

### 12. Languages
- Language spoken
- Proficiency level (e.g., Beginner, Intermediate, Advanced, Native)

### 13. Interests
- List of personal interests or hobbies mentioned

### 14. Job-Specific Keywords
- Identify keywords relevant to job applications (e.g., "Agile," "Machine Learning") for ATS systems.

## Processing Instructions

1. Standardize all technology names (use official capitalization and naming, e.g., "React" not "react")
2. Extract dates in YYYY-MM format whenever possible
3. Calculate accurate durations for all experiences
4. Identify overlapping time periods when calculating total technology experience
5. Distinguish clearly between different types of technologies
6. When dates are ambiguous, make reasonable estimates based on context
7. For current positions or projects, use the current date for end date calculations
8. When handling skills with no explicit dates, infer from related work experience

## JSON Output Format

\`\`\`json
{
  "personal_details": {"name": "string", "contact": { "email": "string", "phone": "string", "linkedin": "string", "other": "string" }},
  "summary_objective": "string",
  "education": [{"degree": "string", "institution": "string", "start_date": "string", "end_date": "string", "field": "string", "grades": "string"}],
  "experience": [{
    "company": "string",
    "position": "string",
    "start_date": "string",
    "end_date": "string",
    "duration_months": number,
    "responsibilities": "string",
    "achievements": "string",
    "technologies_used": ["string"]
  }],
  "projects": [{
    "name": "string",
    "description": "string",
    "start_date": "string",
    "end_date": "string",
    "duration_months": number,
    "role": "string",
    "skills": {
      "technical": {
        "programming_languages": ["string"],
        "frameworks": ["string"],
        "libraries": ["string"],
        "databases": ["string"],
        "tools": ["string"],
        "methodologies": ["string"]
      },
      "soft": ["string"]
    },
    "functionalities": "string",
    "team_size": "string",
    "roles_involved": ["string"],
    "purpose": "string",
    "customer_location": "string",
    "status": "string",
    "challenges": "string",
    "outcomes": "string",
    "metadata": ["string"]
  }],
  "skills": {
    "technical": {
      "programming_languages": ["string"],
      "frameworks": ["string"],
      "libraries": ["string"],
      "databases": ["string"],
      "tools": ["string"],
      "methodologies": ["string"]
    },
    "soft": ["string"]
  },
  "certifications": [{
    "name": "string",
    "organization": "string",
    "date": "string",
    "expiration": "string",
    "credential_id": "string"
  }],
  "volunteer_work": [{
    "organization": "string",
    "position": "string",
    "start_date": "string",
    "end_date": "string",
    "responsibilities": "string",
    "skills_applied": ["string"]
  }],
  "publications": [{
    "title": "string",
    "date": "string",
    "publisher": "string",
    "co_authors": ["string"],
    "url": "string"
  }],
  "professional_affiliations": [{
    "organization": "string",
    "status": "string",
    "role": "string"
  }],
  "awards": [{
    "name": "string",
    "description": "string",
    "year": "string",
    "organization": "string"
  }],
  "languages": [{
    "language": "string",
    "proficiency": "string"
  }],
  "interests": ["string"],
  "job_keywords": ["string"],
}
\`\`\`

Note: Handle variations in section headers (e.g., "Projects Worked On" for projects, "Experience" for work). If information is missing, use "Not specified" or empty arrays.

Here is the CV text to analyze:
`;

export const MOCK_DATA: CVData = {
  personal_details: {
    name: "LE DUY LINH",
    contact: {
      email: "leduylinh1998.nc@gmail.com",
      phone: "0342 90 96 96",
      linkedin: "Not specified",
      other: "VietNam",
    },
  },
  summary_objective:
    "I'm Le Duy Linh, a Front-end Developer with four years of experience. My goal is to become an expert and contribute to large-scale systems, serving diverse user bases. I'm passionate about creating engaging web experiences and continuously learning new technologies. I thrive on challenges and am dedicated to delivering high-quality solutions that exceed user expectations.",
  education: [
    {
      degree: "Professional Developer of Open Source PHP",
      institution: "BACHKHOA APTECH",
      start_date: "2019-12",
      end_date: "2020-04",
      field: "Application Programming",
      grades: "Not specified",
    },
    {
      degree: "Electrical Engineer",
      institution: "HANOI UNIVERSITY OF SCIENCE AND TECHNOLOGY",
      start_date: "2016-12",
      end_date: "2021-04",
      field: "Electrical Engineer",
      grades: "Not specified",
    },
  ],
  experience: [
    {
      company: "Your.rentals",
      position: "FRONT END DEVELOPER",
      start_date: "2023-05",
      end_date: "Present",
      duration_months: 12,
      responsibilities:
        "Investigating the feasibility of migrating old AngularJs pages to ReactJs. Building pages and components to address performance issues in the app, catering to a large user base using ReactJs with Nx  Monorepo). Work with Jira, Mantine, Nx Workspace, ReactJs",
      achievements: "Not specified",
      technologies_used: [
        "ReactJs",
        "AngularJs",
        "Nx",
        "Mantine",
        "Jira",
        "React Query",
        "TanStack Virtual",
        "Zustand",
        "Vite",
        "Playwright",
        "Jest",
        "Remix",
        "Tailwind CSS",
      ],
    },
    {
      company: "VMO Holding",
      position: "FRONT END DEVELOPER",
      start_date: "2021-12",
      end_date: "2023-04",
      duration_months: 16,
      responsibilities:
        "Build web applications  ReactJs). Work with SignalR, Azure DevOps, Antd",
      achievements: "Not specified",
      technologies_used: [
        "ReactJs",
        "SignalR",
        "Azure DevOps",
        "Ant Design",
        "MobX-React",
        "PlotlyJS",
        "TanStack Virtual",
      ],
    },
    {
      company: "BRIGHT SOFTWARE SOLUTION",
      position: "FULL STACK DEVELOPER",
      start_date: "2020-05",
      end_date: "2021-12",
      duration_months: 19,
      responsibilities:
        "Build mobile, and web applications  ReactJs). Build API Services  PHP, .NET Core). Work with Firebase, AWS, Agolia search, Mongo Atlas.",
      achievements: "Not specified",
      technologies_used: [
        "ReactJs",
        "PHP",
        ".NET Core",
        "Firebase",
        "AWS",
        "Algolia",
        "MongoDB",
        "NodeJs",
        "ExpressJs",
        "Laravel",
        "WordPress",
        "Block Lab",
        "Elasticsearch",
        "MySQL",
        "MSSQL",
      ],
    },
  ],
  projects: [
    {
      name: "The simplest SaaS for short-term rental accommodation owners and managers is to save time and grow their business",
      description:
        "Building pages and components to address performance issues in the app, catering to a large user base using ReactJs with Nx  Monorepo)",
      start_date: "2023-05",
      end_date: "Present",
      duration_months: 12,
      role: "Front End Developer",
      skills: {
        technical: {
          programming_languages: ["JavaScript"],
          frameworks: ["ReactJs", "AngularJs"],
          libraries: ["Mantine", "React Query", "TanStack Virtual", "Zustand"],
          databases: [],
          tools: ["Nx", "Vite", "Playwright", "Jest", "Jira"],
          methodologies: [],
        },
        soft: [],
      },
      functionalities:
        "Building a house listing page to display millions of records, Building a multi-calendar and single-calendar page to display houses and bookings for each house simultaneously at the correct time, Build and customize a shared component library for the app, Writing automation test with playwright, unit test with Jest",
      team_size: "20",
      roles_involved: ["Not specified"],
      purpose: "Not specified",
      customer_location: "Not specified",
      status: "In Progress",
      challenges: "Not specified",
      outcomes: "Not specified",
      metadata: ["Review code and training"],
    },
    {
      name: "Website building platform for guests",
      description:
        "Developing a website that allows users to set up their booking page with customizations such as logo, colors, page layout, etc.",
      start_date: "2023-05",
      end_date: "Present",
      duration_months: 12,
      role: "Front End Developer",
      skills: {
        technical: {
          programming_languages: ["JavaScript"],
          frameworks: ["Remix"],
          libraries: ["Tailwind CSS"],
          databases: ["DynamoDB"],
          tools: ["Vite"],
          methodologies: [],
        },
        soft: [],
      },
      functionalities:
        "Retrieve website configuration data from DynamoDB regarding colors, layout, content, etc., and store it in a global variable, Build and customize a shared component library for the app with the tailwind",
      team_size: "3",
      roles_involved: ["Not specified"],
      purpose: "Not specified",
      customer_location: "Not specified",
      status: "In Progress",
      challenges: "Not specified",
      outcomes: "Not specified",
      metadata: ["Review code and training"],
    },
    {
      name: "ASSET MANAGEMENT  Devices metric management)",
      description:
        "Building modules and features to receive data, display data, process data from IoT or machine learning systems, forward data to other systems",
      start_date: "2021-12",
      end_date: "2022-03",
      duration_months: 3,
      role: "Front End Developer",
      skills: {
        technical: {
          programming_languages: ["JavaScript"],
          frameworks: ["ReactJs"],
          libraries: ["MobX-React", "Ant Design"],
          databases: [],
          tools: ["SignalR"],
          methodologies: [],
        },
        soft: [],
      },
      functionalities:
        "Real-time parameter update and message handling with signalR, Hide and show functions depending on permissions, Display and manage sensors in a device using a tree model, allowing actions to be performed on the sensors.",
      team_size: "5",
      roles_involved: ["Not specified"],
      purpose: "Not specified",
      customer_location: "Not specified",
      status: "Completed",
      challenges: "Not specified",
      outcomes: "Not specified",
      metadata: [],
    },
    {
      name: "ASSET ANALYTIC  Machine Learning System)",
      description:
        "Building modules and features for machine learning systems about IoT parameters of industrial equipment",
      start_date: "2022-03",
      end_date: "2023-04",
      duration_months: 13,
      role: "Team leader",
      skills: {
        technical: {
          programming_languages: ["JavaScript"],
          frameworks: ["ReactJs"],
          libraries: [
            "PlotlyJS",
            "MobX-React",
            "Ant Design",
            "TanStack Virtual",
          ],
          databases: [],
          tools: ["SignalR"],
          methodologies: [],
        },
        soft: [],
      },
      functionalities:
        "Real-time parameter update and message handling with signalR, Hide and show functions depending on permissions, View chart with PlotlyJS, Building high-performance data grids for visualizing massive sensor data sets with millions of records, Developing a visual workflow builder for word-follow training, empowering users to effortlessly create and customize training workflows by dragging and connecting process steps., Providing real-time, interactive visualizations of the build, training, and prediction processes using SignalR.",
      team_size: "6",
      roles_involved: ["Not specified"],
      purpose: "Not specified",
      customer_location: "Not specified",
      status: "Completed",
      challenges: "Not specified",
      outcomes: "Not specified",
      metadata: [
        "Divide work among team members, report work progress to PM and PO",
        "Train interns in software development skills",
      ],
    },
    {
      name: "MARIO  School management)",
      description:
        "Create/Update module on Admin dashboard, Teacher, Parents & Student page, Build API Services",
      start_date: "2020-05",
      end_date: "2021-05",
      duration_months: 12,
      role: "Full Stack Developer",
      skills: {
        technical: {
          programming_languages: ["JavaScript", "C#"],
          frameworks: ["ReactJs", ".NET Core"],
          libraries: [],
          databases: ["Elasticsearch", "MSSQL"],
          tools: [],
          methodologies: [],
        },
        soft: [],
      },
      functionalities:
        "Manage users, user roles, and modules the user can access, Manage teacher, student, classes, and session, Teacher and Student data collection",
      team_size: "8",
      roles_involved: ["Not specified"],
      purpose: "Not specified",
      customer_location: "Not specified",
      status: "Completed",
      challenges: "Not specified",
      outcomes: "Not specified",
      metadata: ["Train interns in software development skills"],
    },
    {
      name: "nJoyShow  Web-App Search movie information)",
      description:
        "Create/Update modules on the Admin dashboard, Build API Services, upload data on Agolia and MongoDB, Crawl film data, the film's showtime on Cinema's website",
      start_date: "2021-05",
      end_date: "2021-09",
      duration_months: 4,
      role: "Full Stack Developer",
      skills: {
        technical: {
          programming_languages: ["JavaScript"],
          frameworks: ["ReactJs", "NodeJs", "ExpressJs"],
          libraries: [],
          databases: ["MongoDB"],
          tools: ["Algolia"],
          methodologies: [],
        },
        soft: [],
      },
      functionalities:
        "Manage users, Film information, showtime cinema, User login with Google, Facebook, Kakao Talk, Search film information with Agolia, Multilingual by geographical location, Setup service worker",
      team_size: "2",
      roles_involved: ["Not specified"],
      purpose: "Not specified",
      customer_location: "Not specified",
      status: "Completed",
      challenges: "Not specified",
      outcomes: "Not specified",
      metadata: [],
    },
    {
      name: "PUBLIC INSIGHT  Business News website)",
      description:
        "Create API sync data between Laravel and WordPress, Create/Update modules on the Admin dashboard and User page, Create/Update posts, dynamic content block in page in WordPress",
      start_date: "2021-07",
      end_date: "2021-12",
      duration_months: 5,
      role: "Full Stack Developer",
      skills: {
        technical: {
          programming_languages: [],
          frameworks: ["Laravel", "WordPress"],
          libraries: ["Block Lab"],
          databases: ["Elasticsearch", "MySQL"],
          tools: [],
          methodologies: [],
        },
        soft: [],
      },
      functionalities:
        "Manage users and user roles with Laravel, Manage posts, authors, pages, SEO, Manage company profile, company employees",
      team_size: "5",
      roles_involved: ["Not specified"],
      purpose: "Not specified",
      customer_location: "Not specified",
      status: "Completed",
      challenges: "Not specified",
      outcomes: "Not specified",
      metadata: [],
    },
  ],
  skills: {
    technical: {
      programming_languages: ["JavaScript", "C#", "PHP"],
      frameworks: [
        "ReactJs",
        "AngularJs",
        "Remix",
        ".NET Core",
        "NodeJs",
        "ExpressJs",
        "Laravel",
        "WordPress",
      ],
      libraries: [
        "Mantine",
        "React Query",
        "TanStack Virtual",
        "Zustand",
        "Tailwind CSS",
        "MobX-React",
        "Ant Design",
        "PlotlyJS",
        "Block Lab",
      ],
      databases: ["DynamoDB", "Elasticsearch", "MSSQL", "MongoDB", "MySQL"],
      tools: [
        "Nx",
        "Vite",
        "Playwright",
        "Jest",
        "Jira",
        "SignalR",
        "Algolia",
        "Azure DevOps",
        "Firebase",
        "AWS",
      ],
      methodologies: [],
    },
    soft: [],
  },
  certifications: [
    {
      name: "Professional Developer on Open Source PHP",
      organization: "BachKhoa aptech",
      date: "2020",
      expiration: "Not specified",
      credential_id: "Not specified",
    },
  ],
  volunteer_work: [],
  publications: [],
  professional_affiliations: [],
  awards: [
    {
      name: "BKAP Code War",
      description: "The second prize",
      year: "2020",
      organization: "Not specified",
    },
    {
      name: "Violympic math competition for grade 9",
      description: "National bronze medal",
      year: "2012",
      organization: "Not specified",
    },
  ],
  languages: [
    {
      language: "English",
      proficiency: "Reading and writing: Good, Speaking and listening: Basic",
    },
  ],
  interests: [],
  job_keywords: [
    "Front-end Developer",
    "ReactJs",
    "AngularJs",
    "Nx",
    "Mantine",
    "Jira",
    "React Query",
    "TanStack Virtual",
    "Zustand",
    "Vite",
    "Playwright",
    "Jest",
    "Remix",
    "Tailwind CSS",
    "SignalR",
    "Azure DevOps",
    "Ant Design",
    "MobX-React",
    "PlotlyJS",
    "Full Stack Developer",
    ".NET Core",
    "Firebase",
    "AWS",
    "Algolia",
    "MongoDB",
    "NodeJs",
    "ExpressJs",
    "Laravel",
    "WordPress",
    "Block Lab",
    "Elasticsearch",
    "MySQL",
    "MSSQL",
    "Machine Learning",
    "IoT",
  ],
};
