export interface PersonalDetails {
  name: string;
  contact: {
    email: string;
    phone: string;
    linkedin: string;
    other: string;
  };
}

export interface Education {
  degree: string;
  institution: string;
  start_date: string;
  end_date: string;
  field: string;
  grades: string;
}

export interface Experience {
  company: string;
  position: string;
  start_date: string;
  end_date: string;
  duration_months: number | null;
  responsibilities: string;
  achievements: string;
  technologies_used: string[];
}

export interface Skills {
  technical: {
    programming_languages: string[];
    frameworks: string[];
    libraries: string[];
    databases: string[];
    tools: string[];
    methodologies: string[];
  };
  soft: string[];
}

export interface Certifications {
  name: string;
  organization: string;
  date: string;
  expiration: string;
  credential_id: string;
}

export interface Projects {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  duration_months: number | null;
  role: string;
  frameworks_used: string[];
  libraries_used: string[];
  databases_used: string[];
  tools_used: string[];
  techniques_used: string[];
  functionalities: string;
  team_size: string;
  roles_involved: string;
  purpose: string;
  customer_location: string;
  status: string;
  challenges: string;
  outcomes: string;
  metadata: string[];
}

export interface TimelineItem {
  name: string;
  first_used: string;
  last_used: string;
  total_months: number | null;
  projects: string[];
}

export interface TechnologyTimeline {
  name: string;
  first_used: string;
  last_used: string;
  total_months: number | null;
  projects: string[];
}

export interface ExperienceTimeline {
  frameworks: {
    name: string;
    start_date: string;
    end_date: string;
    duration_months: number | null;
    project: string;
  }[];
  libraries: {
    name: string;
    start_date: string;
    end_date: string;
    duration_months: number | null;
    project: string;
  }[];
  projects: {
    name: string;
    start_date: string;
    end_date: string;
    duration_months: number | null;
  }[];
  soft_skills: any[];
}

export interface Analysis {
  strengths: string[];
  weaknesses: string[];
  advice: string;
  technical_expertise_level: {
    beginner: string[];
    intermediate: string[];
    advanced: string[];
    expert: string[];
  };
  career_progression: string;
  industry_experience: string[];
  technical_specialization: string;
}

export interface CVData {
  personal_details: PersonalDetails;
  summary_objective: string;
  education: Education[];
  experience: Experience[];
  skills: Skills;
  certifications: Certifications[];
  projects: Projects[];
  technology_timeline: {
    frameworks: TechnologyTimeline[];
    libraries: TechnologyTimeline[];
    databases: TechnologyTimeline[];
    programming_languages: TechnologyTimeline[];
    tools: TechnologyTimeline[];
  };
  experience_timeline: ExperienceTimeline;
  volunteer_work: any[];
  publications: any[];
  professional_affiliations: any[];
  awards: {
    name: string;
    description: string;
    year: string;
    organization: string;
  }[];
  languages: {
    language: string;
    proficiency: string;
  }[];
  interests: any[];
  job_keywords: string[];
  analysis: Analysis;
}
