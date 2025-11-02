export interface Project {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  problem: string;
  solution: string;
  techStack: string[];
  github: string;
  demo: string;
  screenshots: string[];
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  techStack: string[];
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  location: string;
  period: string;
  achievements: string[];
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
}
