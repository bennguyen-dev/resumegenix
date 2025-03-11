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

### 5. Skills
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

### 6. Certifications
- Name of certification
- Issuing organization
- Date obtained (preferably YYYY-MM format)
- Expiration date (if mentioned)
- Credential ID or verification link (if mentioned)

### 7. Projects (Detailed)
- Project name
- Description (brief overview of what the project does)
- Start date (preferably YYYY-MM format)
- End date (preferably YYYY-MM format, or "Present" for ongoing projects)
- Duration in months (calculated automatically)
- Role (user's contribution or position in the project)
- Technologies used, categorized as:
  - Frameworks used
  - Libraries used
  - Databases used
  - Tools used
  - Techniques/methodologies used
- Functionalities delivered (key features or deliverables, e.g., "User authentication, payment system")
- Team size (number of team members, e.g., "5 people")
- Roles involved (positions within the team, e.g., "Developers, QA, PM")
- Project purpose (what the project aimed to achieve, e.g., "E-commerce platform for retail")
- Customer location (where the client or customer is based, e.g., "New York, USA")
- Project status (Completed, In Progress, On Hold, etc.)
- Key challenges overcome
- Outcomes and results
- Metadata (other relevant information)

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
  "projects": [{
    "name": "string",
    "description": "string",
    "start_date": "string",
    "end_date": "string",
    "duration_months": number,
    "role": "string",
    "frameworks_used": ["string"],
    "libraries_used": ["string"],
    "databases_used": ["string"],
    "tools_used": ["string"],
    "techniques_used": ["string"],
    "functionalities": "string",
    "team_size": "string",
    "roles_involved": "string",
    "purpose": "string",
    "customer_location": "string",
    "status": "string",
    "challenges": "string",
    "outcomes": "string",
    "metadata": ["string"]
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

export const MOCK_DATA = {
  personal_details: {
    name: "LE DUY LINH",
    contact: {
      email: "leduylinh1998.nc@gmail.com",
      phone: "0342 90 96 96",
      linkedin: "Not specified",
      other: "Not specified",
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
      field: "Not specified",
      grades: "Not specified",
    },
  ],
  experience: [
    {
      company: "Your.rentals",
      position: "FRONT END DEVELOPER",
      start_date: "2023-05",
      end_date: "Present",
      duration_months: 10,
      responsibilities:
        "Investigating the feasibility of migrating old AngularJS pages to ReactJS. Building pages and components to address performance issues in the app, catering to a large user base using ReactJS with Nx Monorepo. Work with Jira, Mantine, Nx Workspace, ReactJS",
      achievements: "Not specified",
      technologies_used: [
        "ReactJS",
        "Nx Workspace",
        "Mantine",
        "React Query",
        "TanStack Virtual",
        "Zustand",
        "Vite",
        "Playwright",
        "Jest",
        "Jira",
        "AngularJS",
        "SignalR",
      ],
    },
    {
      company: "VMO Holding",
      position: "FRONT END DEVELOPER",
      start_date: "2021-12",
      end_date: "2023-04",
      duration_months: 16,
      responsibilities:
        "Build web applications (ReactJS). Work with SignalR, Azure DevOps, Antd",
      achievements: "Not specified",
      technologies_used: ["ReactJS", "SignalR", "Azure DevOps", "Ant Design"],
    },
    {
      company: "BRIGHT SOFTWARE SOLUTION",
      position: "FULL STACK DEVELOPER",
      start_date: "2020-05",
      end_date: "2021-12",
      duration_months: 19,
      responsibilities:
        "Build mobile, and web applications (ReactJS). Build API Services (PHP, .NET Core). Work with Firebase, AWS, Agolia search, Mongo Atlas.",
      achievements: "Not specified",
      technologies_used: [
        "ReactJS",
        "PHP",
        ".NET Core",
        "Firebase",
        "AWS",
        "Algolia",
        "MongoDB Atlas",
      ],
    },
  ],
  skills: {
    technical: {
      programming_languages: ["PHP", ".NET Core", "NodeJS"],
      frameworks: [
        "ReactJS",
        "Remix",
        "ExpressJS",
        "Laravel",
        "WordPress",
        "AngularJS",
      ],
      libraries: [
        "Mantine",
        "React Query",
        "TanStack Virtual",
        "Zustand",
        "PlotlyJS",
        "mobx-react",
        "SignalR client",
        "Ant Design",
        ".NET Core Entity",
        "Block Lab",
        "Tailwind CSS",
      ],
      databases: ["MongoDB", "MongoDB Atlas", "MySQL", "MSSQL", "DynamoDB"],
      tools: [
        "Nx Workspace",
        "Vite",
        "Playwright",
        "Jest",
        "Jira",
        "Azure DevOps",
        "Firebase",
        "AWS",
        "Algolia",
        "Agolia search",
        "Elasticsearch",
        "Service Worker",
      ],
      methodologies: [],
    },
    soft: [
      "Code Review",
      "Training",
      "Team leadership",
      "Communication",
      "Work prioritization",
      "Reporting",
      "Intern training",
    ],
  },
  certifications: [
    {
      name: "Professional Developer on Open Source PHP",
      organization: "BachKhoa aptech",
      date: "2020-00",
      expiration: "Not specified",
      credential_id: "Not specified",
    },
  ],
  projects: [
    {
      name: "Your.rentals - Simplest SaaS for short-term rental accommodation owners",
      description:
        "SaaS for short-term rental accommodation owners and managers to save time and grow their business",
      start_date: "2023-05",
      end_date: "Present",
      duration_months: 10,
      role: "FRONT END DEVELOPER",
      frameworks_used: ["ReactJS", "Remix"],
      libraries_used: [
        "Mantine",
        "React Query",
        "TanStack Virtual",
        "Zustand",
        "Tailwind CSS",
      ],
      databases_used: ["DynamoDB"],
      tools_used: ["Nx Workspace", "Vite", "Playwright", "Jest", "Jira"],
      techniques_used: [],
      functionalities:
        "House listing page, multi-calendar and single-calendar page, shared component library, automation test, unit test",
      team_size: "20 people",
      roles_involved: "Developers, QA, Managers",
      purpose:
        "To provide a simple SaaS platform for short-term rental accommodation owners",
      customer_location: "Not specified",
      status: "In Progress",
      challenges:
        "Performance issues in the app, catering to a large user base",
      outcomes: "Improved app performance, scalable components",
      metadata: [],
    },
    {
      name: "Your.rentals - Website building platform for guests",
      description:
        "Website building platform for guests to set up their booking page with customizations",
      start_date: "2023-05",
      end_date: "2023-08",
      duration_months: 3,
      role: "FRONT END DEVELOPER",
      frameworks_used: ["Remix"],
      libraries_used: ["Tailwind CSS"],
      databases_used: ["DynamoDB"],
      tools_used: ["Vite"],
      techniques_used: [],
      functionalities:
        "Customizable booking page with logo, colors, page layout",
      team_size: "3 people",
      roles_involved: "Developers",
      purpose: "To allow users to easily create customized booking pages",
      customer_location: "Not specified",
      status: "Completed",
      challenges:
        "Retrieving and managing website configuration data from DynamoDB",
      outcomes: "Functional website building platform",
      metadata: [],
    },
    {
      name: "VMO Holding - ASSET MANAGEMENT (Devices metric management)",
      description:
        "Modules and features to receive, display, and process data from IoT or machine learning systems",
      start_date: "2021-12",
      end_date: "2022-03",
      duration_months: 3,
      role: "FRONT END DEVELOPER",
      frameworks_used: ["ReactJS"],
      libraries_used: ["SignalR client", "mobx-react", "Ant Design"],
      databases_used: [],
      tools_used: [],
      techniques_used: [],
      functionalities:
        "Real-time parameter update and message handling with SignalR, sensor management using a tree model",
      team_size: "5 people",
      roles_involved: "Developers",
      purpose: "To manage and visualize data from IoT devices",
      customer_location: "Not specified",
      status: "Completed",
      challenges: "Real-time data handling and visualization",
      outcomes: "Functional asset management dashboard",
      metadata: [],
    },
    {
      name: "VMO Holding - ASSET ANALYTIC (Machine Learning System)",
      description:
        "Modules and features for machine learning systems about IoT parameters of industrial equipment",
      start_date: "2022-03",
      end_date: "2023-04",
      duration_months: 13,
      role: "Team leader",
      frameworks_used: ["ReactJS"],
      libraries_used: [
        "SignalR client",
        "PlotlyJS",
        "mobx-react",
        "Ant Design",
        "TanStack Virtual",
      ],
      databases_used: [],
      tools_used: [],
      techniques_used: [],
      functionalities:
        "Real-time parameter update and message handling with SignalR, data grids for visualizing sensor data, visual workflow builder for word-follow training",
      team_size: "6 people",
      roles_involved: "Developers, PM, PO, Interns",
      purpose:
        "To provide a machine learning system for analyzing IoT data from industrial equipment",
      customer_location: "Not specified",
      status: "Completed",
      challenges:
        "Visualizing massive sensor data sets, building a visual workflow builder",
      outcomes: "Functional machine learning system dashboard",
      metadata: [],
    },
    {
      name: "BRIGHT SOFTWARE SOLUTION - MARIO (School management)",
      description:
        "School management system modules for Admin dashboard, Teacher, Parents & Student pages",
      start_date: "2020-05",
      end_date: "2021-05",
      duration_months: 12,
      role: "FULL STACK DEVELOPER",
      frameworks_used: ["ReactJS"],
      libraries_used: [".NET Core Entity"],
      databases_used: ["MSSQL", "Elasticsearch"],
      tools_used: [],
      techniques_used: [],
      functionalities:
        "User management, teacher/student/class management, data collection, API services",
      team_size: "8 people",
      roles_involved: "Developers",
      purpose: "To develop a school management system",
      customer_location: "Not specified",
      status: "Completed",
      challenges: "Managing various user roles and modules",
      outcomes: "Functional school management system",
      metadata: [],
    },
    {
      name: "BRIGHT SOFTWARE SOLUTION - nJoyShow (Web-App Search movie information)",
      description: "Web-App for searching movie information",
      start_date: "2021-05",
      end_date: "2021-09",
      duration_months: 4,
      role: "FULL STACK DEVELOPER",
      frameworks_used: ["ReactJS", "ExpressJS", "NodeJS"],
      libraries_used: [],
      databases_used: ["MongoDB", "Agolia search"],
      tools_used: ["Algolia", "Service Worker"],
      techniques_used: [],
      functionalities:
        "Admin dashboard modules, API services, data crawling, user login (Google, Facebook, Kakao Talk), multilingual support, search functionality",
      team_size: "2 people",
      roles_involved: "Developers",
      purpose: "To create a web application for movie information search",
      customer_location: "Not specified",
      status: "Completed",
      challenges: "Crawling film data and integrating with search services",
      outcomes: "Functional movie search web application",
      metadata: [],
    },
    {
      name: "BRIGHT SOFTWARE SOLUTION - PUBLIC INSIGHT (Business News website)",
      description: "Business News website development",
      start_date: "2020-05",
      end_date: "2020-10",
      duration_months: 5,
      role: "FULL STACK DEVELOPER",
      frameworks_used: ["Laravel", "WordPress"],
      libraries_used: ["Block Lab"],
      databases_used: ["MySQL", "Elasticsearch"],
      tools_used: [],
      techniques_used: [],
      functionalities:
        "API sync between Laravel and WordPress, admin dashboard and user page modules, post and content management",
      team_size: "5 people",
      roles_involved: "Developers",
      purpose: "To develop a business news website",
      customer_location: "Not specified",
      status: "Completed",
      challenges: "Syncing data between Laravel and WordPress",
      outcomes: "Functional business news website",
      metadata: [],
    },
  ],
  technology_timeline: {
    frameworks: [
      {
        name: "ReactJS",
        first_used: "2020-05",
        last_used: "Present",
        total_months: 55,
        projects: [
          "Your.rentals - Simplest SaaS for short-term rental accommodation owners",
          "Your.rentals - Website building platform for guests",
          "VMO Holding - ASSET MANAGEMENT (Devices metric management)",
          "VMO Holding - ASSET ANALYTIC (Machine Learning System)",
          "BRIGHT SOFTWARE SOLUTION - MARIO (School management)",
          "BRIGHT SOFTWARE SOLUTION - nJoyShow (Web-App Search movie information)",
        ],
      },
      {
        name: "Remix",
        first_used: "2023-05",
        last_used: "2023-08",
        total_months: 6,
        projects: [
          "Your.rentals - Website building platform for guests",
          "Your.rentals - Simplest SaaS for short-term rental accommodation owners",
        ],
      },
      {
        name: "ExpressJS",
        first_used: "2021-05",
        last_used: "2021-09",
        total_months: 4,
        projects: [
          "BRIGHT SOFTWARE SOLUTION - nJoyShow (Web-App Search movie information)",
        ],
      },
      {
        name: "Laravel",
        first_used: "2020-05",
        last_used: "2020-10",
        total_months: 5,
        projects: [
          "BRIGHT SOFTWARE SOLUTION - PUBLIC INSIGHT (Business News website)",
        ],
      },
      {
        name: "WordPress",
        first_used: "2020-05",
        last_used: "2020-10",
        total_months: 5,
        projects: [
          "BRIGHT SOFTWARE SOLUTION - PUBLIC INSIGHT (Business News website)",
        ],
      },
      {
        name: "AngularJS",
        first_used: "2023-05",
        last_used: "Present",
        total_months: 10,
        projects: [
          "Your.rentals - Simplest SaaS for short-term rental accommodation owners",
        ],
      },
    ],
    libraries: [
      {
        name: "Mantine",
        first_used: "2023-05",
        last_used: "Present",
        total_months: 10,
        projects: [
          "Your.rentals - Simplest SaaS for short-term rental accommodation owners",
        ],
      },
      {
        name: "React Query",
        first_used: "2023-05",
        last_used: "Present",
        total_months: 10,
        projects: [
          "Your.rentals - Simplest SaaS for short-term rental accommodation owners",
        ],
      },
      {
        name: "TanStack Virtual",
        first_used: "2022-03",
        last_used: "Present",
        total_months: 23,
        projects: [
          "Your.rentals - Simplest SaaS for short-term rental accommodation owners",
          "VMO Holding - ASSET ANALYTIC (Machine Learning System)",
        ],
      },
      {
        name: "Zustand",
        first_used: "2023-05",
        last_used: "Present",
        total_months: 10,
        projects: [
          "Your.rentals - Simplest SaaS for short-term rental accommodation owners",
        ],
      },
      {
        name: "PlotlyJS",
        first_used: "2022-03",
        last_used: "2023-04",
        total_months: 13,
        projects: ["VMO Holding - ASSET ANALYTIC (Machine Learning System)"],
      },
      {
        name: "mobx-react",
        first_used: "2021-12",
        last_used: "2023-04",
        total_months: 16,
        projects: [
          "VMO Holding - ASSET MANAGEMENT (Devices metric management)",
          "VMO Holding - ASSET ANALYTIC (Machine Learning System)",
        ],
      },
      {
        name: "SignalR client",
        first_used: "2021-12",
        last_used: "2023-04",
        total_months: 16,
        projects: [
          "VMO Holding - ASSET MANAGEMENT (Devices metric management)",
          "VMO Holding - ASSET ANALYTIC (Machine Learning System)",
        ],
      },
      {
        name: "Ant Design",
        first_used: "2021-12",
        last_used: "2023-04",
        total_months: 16,
        projects: [
          "VMO Holding - ASSET MANAGEMENT (Devices metric management)",
          "VMO Holding - ASSET ANALYTIC (Machine Learning System)",
        ],
      },
      {
        name: ".NET Core Entity",
        first_used: "2020-05",
        last_used: "2021-05",
        total_months: 12,
        projects: ["BRIGHT SOFTWARE SOLUTION - MARIO (School management)"],
      },
      {
        name: "Block Lab",
        first_used: "2020-05",
        last_used: "2020-10",
        total_months: 5,
        projects: [
          "BRIGHT SOFTWARE SOLUTION - PUBLIC INSIGHT (Business News website)",
        ],
      },
      {
        name: "Tailwind CSS",
        first_used: "2023-05",
        last_used: "2023-08",
        total_months: 3,
        projects: [
          "Your.rentals - Website building platform for guests",
          "Your.rentals - Simplest SaaS for short-term rental accommodation owners",
        ],
      },
    ],
    databases: [
      {
        name: "DynamoDB",
        first_used: "2023-05",
        last_used: "2023-08",
        total_months: 6,
        projects: [
          "Your.rentals - Website building platform for guests",
          "Your.rentals - Simplest SaaS for short-term rental accommodation owners",
        ],
      },
      {
        name: "MongoDB",
        first_used: "2021-05",
        last_used: "2021-09",
        total_months: 4,
        projects: [
          "BRIGHT SOFTWARE SOLUTION - nJoyShow (Web-App Search movie information)",
        ],
      },
      {
        name: "MySQL",
        first_used: "2020-05",
        last_used: "2020-10",
        total_months: 5,
        projects: [
          "BRIGHT SOFTWARE SOLUTION - PUBLIC INSIGHT (Business News website)",
        ],
      },
      {
        name: "MSSQL",
        first_used: "2020-05",
        last_used: "2021-05",
        total_months: 12,
        projects: ["BRIGHT SOFTWARE SOLUTION - MARIO (School management)"],
      },
      {
        name: "Elasticsearch",
        first_used: "2020-05",
        last_used: "2021-05",
        total_months: 17,
        projects: [
          "BRIGHT SOFTWARE SOLUTION - MARIO (School management)",
          "BRIGHT SOFTWARE SOLUTION - PUBLIC INSIGHT (Business News website)",
        ],
      },
      {
        name: "Agolia search",
        first_used: "2021-05",
        last_used: "2021-09",
        total_months: 4,
        projects: [
          "BRIGHT SOFTWARE SOLUTION - nJoyShow (Web-App Search movie information)",
        ],
      },
      {
        name: "MongoDB Atlas",
        first_used: "2020-05",
        last_used: "2021-12",
        total_months: 19,
        projects: ["BRIGHT SOFTWARE SOLUTION"],
      },
    ],
    programming_languages: [
      {
        name: "PHP",
        first_used: "2020-05",
        last_used: "2021-12",
        total_months: 19,
        projects: ["BRIGHT SOFTWARE SOLUTION"],
      },
      {
        name: ".NET Core",
        first_used: "2020-05",
        last_used: "2021-12",
        total_months: 19,
        projects: ["BRIGHT SOFTWARE SOLUTION"],
      },
      {
        name: "NodeJS",
        first_used: "2021-05",
        last_used: "2021-09",
        total_months: 4,
        projects: [
          "BRIGHT SOFTWARE SOLUTION - nJoyShow (Web-App Search movie information)",
        ],
      },
    ],
    tools: [
      {
        name: "Nx Workspace",
        first_used: "2023-05",
        last_used: "Present",
        total_months: 10,
        projects: [
          "Your.rentals - Simplest SaaS for short-term rental accommodation owners",
        ],
      },
      {
        name: "Vite",
        first_used: "2023-05",
        last_used: "Present",
        total_months: 10,
        projects: [
          "Your.rentals - Simplest SaaS for short-term rental accommodation owners",
          "Your.rentals - Website building platform for guests",
        ],
      },
      {
        name: "Playwright",
        first_used: "2023-05",
        last_used: "Present",
        total_months: 10,
        projects: [
          "Your.rentals - Simplest SaaS for short-term rental accommodation owners",
        ],
      },
      {
        name: "Jest",
        first_used: "2023-05",
        last_used: "Present",
        total_months: 10,
        projects: [
          "Your.rentals - Simplest SaaS for short-term rental accommodation owners",
        ],
      },
      {
        name: "Jira",
        first_used: "2023-05",
        last_used: "Present",
        total_months: 10,
        projects: [
          "Your.rentals - Simplest SaaS for short-term rental accommodation owners",
        ],
      },
      {
        name: "Azure DevOps",
        first_used: "2021-12",
        last_used: "2023-04",
        total_months: 16,
        projects: ["VMO Holding"],
      },
      {
        name: "Firebase",
        first_used: "2020-05",
        last_used: "2021-12",
        total_months: 19,
        projects: ["BRIGHT SOFTWARE SOLUTION"],
      },
      {
        name: "AWS",
        first_used: "2020-05",
        last_used: "2021-12",
        total_months: 19,
        projects: ["BRIGHT SOFTWARE SOLUTION"],
      },
      {
        name: "Algolia",
        first_used: "2020-05",
        last_used: "2021-12",
        total_months: 19,
        projects: [
          "BRIGHT SOFTWARE SOLUTION",
          "BRIGHT SOFTWARE SOLUTION - nJoyShow (Web-App Search movie information)",
        ],
      },
      {
        name: "Elasticsearch",
        first_used: "2020-05",
        last_used: "2021-05",
        total_months: 17,
        projects: [
          "BRIGHT SOFTWARE SOLUTION - MARIO (School management)",
          "BRIGHT SOFTWARE SOLUTION - PUBLIC INSIGHT (Business News website)",
        ],
      },
      {
        name: "Service Worker",
        first_used: "2021-05",
        last_used: "2021-09",
        total_months: 4,
        projects: [
          "BRIGHT SOFTWARE SOLUTION - nJoyShow (Web-App Search movie information)",
        ],
      },
    ],
  },
  experience_timeline: {
    frameworks: [
      {
        name: "ReactJS",
        start_date: "2020-05",
        end_date: "Present",
        duration_months: 55,
        project:
          "Multiple projects across BRIGHT SOFTWARE SOLUTION, VMO Holding and Your.rentals",
      },
      {
        name: "Remix",
        start_date: "2023-05",
        end_date: "2023-08",
        duration_months: 3,
        project: "Your.rentals - Website building platform for guests",
      },
      {
        name: "ExpressJS",
        start_date: "2021-05",
        end_date: "2021-09",
        duration_months: 4,
        project:
          "BRIGHT SOFTWARE SOLUTION - nJoyShow (Web-App Search movie information)",
      },
      {
        name: "Laravel",
        start_date: "2020-05",
        end_date: "2020-10",
        duration_months: 5,
        project:
          "BRIGHT SOFTWARE SOLUTION - PUBLIC INSIGHT (Business News website)",
      },
      {
        name: "WordPress",
        start_date: "2020-05",
        end_date: "2020-10",
        duration_months: 5,
        project:
          "BRIGHT SOFTWARE SOLUTION - PUBLIC INSIGHT (Business News website)",
      },
      {
        name: "AngularJS",
        start_date: "2023-05",
        end_date: "Present",
        duration_months: 10,
        project:
          "Your.rentals - Simplest SaaS for short-term rental accommodation owners",
      },
    ],
    libraries: [
      {
        name: "Mantine",
        start_date: "2023-05",
        end_date: "Present",
        duration_months: 10,
        project:
          "Your.rentals - Simplest SaaS for short-term rental accommodation owners",
      },
      {
        name: "React Query",
        start_date: "2023-05",
        end_date: "Present",
        duration_months: 10,
        project:
          "Your.rentals - Simplest SaaS for short-term rental accommodation owners",
      },
      {
        name: "TanStack Virtual",
        start_date: "2022-03",
        end_date: "Present",
        duration_months: 23,
        project:
          "VMO Holding - ASSET ANALYTIC (Machine Learning System), Your.rentals - Simplest SaaS for short-term rental accommodation owners",
      },
      {
        name: "Zustand",
        start_date: "2023-05",
        end_date: "Present",
        duration_months: 10,
        project:
          "Your.rentals - Simplest SaaS for short-term rental accommodation owners",
      },
      {
        name: "PlotlyJS",
        start_date: "2022-03",
        end_date: "2023-04",
        duration_months: 13,
        project: "VMO Holding - ASSET ANALYTIC (Machine Learning System)",
      },
      {
        name: "mobx-react",
        start_date: "2021-12",
        end_date: "2023-04",
        duration_months: 16,
        project:
          "VMO Holding - ASSET MANAGEMENT (Devices metric management), VMO Holding - ASSET ANALYTIC (Machine Learning System)",
      },
      {
        name: "SignalR client",
        start_date: "2021-12",
        end_date: "2023-04",
        duration_months: 16,
        project:
          "VMO Holding - ASSET MANAGEMENT (Devices metric management), VMO Holding - ASSET ANALYTIC (Machine Learning System)",
      },
      {
        name: "Ant Design",
        start_date: "2021-12",
        end_date: "2023-04",
        duration_months: 16,
        project:
          "VMO Holding - ASSET MANAGEMENT (Devices metric management), VMO Holding - ASSET ANALYTIC (Machine Learning System)",
      },
      {
        name: ".NET Core Entity",
        start_date: "2020-05",
        end_date: "2021-05",
        duration_months: 12,
        project: "BRIGHT SOFTWARE SOLUTION - MARIO (School management)",
      },
      {
        name: "Block Lab",
        start_date: "2020-05",
        end_date: "2020-10",
        duration_months: 5,
        project:
          "BRIGHT SOFTWARE SOLUTION - PUBLIC INSIGHT (Business News website)",
      },
      {
        name: "Tailwind CSS",
        start_date: "2023-05",
        end_date: "2023-08",
        duration_months: 3,
        project:
          "Your.rentals - Website building platform for guests, Your.rentals - Simplest SaaS for short-term rental accommodation owners",
      },
    ],
    projects: [
      {
        name: "Your.rentals - Simplest SaaS for short-term rental accommodation owners",
        start_date: "2023-05",
        end_date: "Present",
        duration_months: 10,
      },
      {
        name: "Your.rentals - Website building platform for guests",
        start_date: "2023-05",
        end_date: "2023-08",
        duration_months: 3,
      },
      {
        name: "VMO Holding - ASSET MANAGEMENT (Devices metric management)",
        start_date: "2021-12",
        end_date: "2022-03",
        duration_months: 3,
      },
      {
        name: "VMO Holding - ASSET ANALYTIC (Machine Learning System)",
        start_date: "2022-03",
        end_date: "2023-04",
        duration_months: 13,
      },
      {
        name: "BRIGHT SOFTWARE SOLUTION - MARIO (School management)",
        start_date: "2020-05",
        end_date: "2021-05",
        duration_months: 12,
      },
      {
        name: "BRIGHT SOFTWARE SOLUTION - nJoyShow (Web-App Search movie information)",
        start_date: "2021-05",
        end_date: "2021-09",
        duration_months: 4,
      },
      {
        name: "BRIGHT SOFTWARE SOLUTION - PUBLIC INSIGHT (Business News website)",
        start_date: "2020-05",
        end_date: "2020-10",
        duration_months: 5,
      },
    ],
    soft_skills: [
      {
        name: "Code Review",
        start_date: "2023-05",
        end_date: "Present",
        duration_months: 10,
        context: "Your.rentals",
      },
      {
        name: "Training",
        start_date: "2023-05",
        end_date: "Present",
        duration_months: 10,
        context: "Your.rentals",
      },
      {
        name: "Team leadership",
        start_date: "2022-03",
        end_date: "2023-04",
        duration_months: 13,
        context: "VMO Holding - ASSET ANALYTIC (Machine Learning System)",
      },
      {
        name: "Intern training",
        start_date: "2022-03",
        end_date: "2023-04",
        duration_months: 13,
        context: "VMO Holding - ASSET ANALYTIC (Machine Learning System)",
      },
      {
        name: "Intern training",
        start_date: "2020-05",
        end_date: "2021-05",
        duration_months: 12,
        context: "BRIGHT SOFTWARE SOLUTION - MARIO (School management)",
      },
    ],
  },
  volunteer_work: [],
  publications: [],
  professional_affiliations: [],
  awards: [
    {
      name: "BKAP Code War",
      description: "The second prize",
      year: "2020-00",
      organization: "Not specified",
    },
    {
      name: "Violympic math competition for grade 9",
      description: "National bronze medal",
      year: "2012-00",
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
    "ReactJS",
    "AngularJS",
    "SaaS",
    "Web Applications",
    "API Services",
    "Agile",
    "Performance Optimization",
    "Large-scale systems",
  ],
  analysis: {
    strengths: [
      "Strong front-end experience with ReactJS.",
      "Experience with various frameworks, libraries, and tools.",
      "Project descriptions with technologies and functionalities.",
      "Experience in both front-end and full-stack roles.",
      "Demonstrated leadership as a team leader.",
    ],
    weaknesses: [
      "Limited detail on achievements and quantifiable results.",
      "Soft skills are listed but could be better integrated into experience descriptions.",
      "English proficiency in speaking and listening is basic.",
      "Some project descriptions are brief and lack depth in challenges and outcomes.",
    ],
    advice:
      "Quantify achievements whenever possible (e.g., performance improvements, efficiency gains). Provide more detail on challenges overcome and results achieved in project descriptions.  Improve English speaking and listening skills, or consider omitting the proficiency level if it's basic. Highlight soft skills within the work experience descriptions, showing how they were applied in specific situations. Consider adding a LinkedIn profile for professional networking.",
    technical_expertise_level: {
      beginner: [
        "Tailwind CSS",
        "Block Lab",
        "ExpressJS",
        "Laravel",
        "WordPress",
        "NodeJS",
        "MongoDB",
        "MySQL",
        "Agolia search",
        "Service Worker",
      ],
      intermediate: [
        "Remix",
        "PlotlyJS",
        ".NET Core Entity",
        "DynamoDB",
        "Algolia",
        "Elasticsearch",
      ],
      advanced: [
        "Mantine",
        "React Query",
        "Zustand",
        "Vite",
        "Playwright",
        "Jest",
        "Jira",
        "AngularJS",
        "MSSQL",
      ],
      expert: [
        "ReactJS",
        "TanStack Virtual",
        "mobx-react",
        "SignalR client",
        "Ant Design",
        "Nx Workspace",
        "Azure DevOps",
        "Firebase",
        "AWS",
        "PHP",
        ".NET Core",
        "MongoDB Atlas",
      ],
    },
    career_progression:
      "Started as Full Stack Developer, transitioned to Front End Developer, showing specialization in front-end technologies over time. Demonstrated progression from individual contributor to team leader.",
    industry_experience: [
      "SaaS",
      "Web Development",
      "Software Development",
      "Education Management Systems",
      "Business News",
      "Asset Management",
      "Machine Learning Systems",
    ],
    technical_specialization:
      "Front-end development with a strong focus on ReactJS and related technologies. Experience in building scalable web applications and optimizing performance.",
  },
};
