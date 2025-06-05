import { z } from 'zod';

export const MAX_PROFILE_CHARS = 2000;

export interface TechProfile {
  text: string;
  metadata?: {
    githubUrl?: string;
    stackOverflowUrl?: string;
    techStack?: string[];
    yearsOfExperience?: number;
    preferredDomains?: string[];
    innovationInterests?: string[];
  };
}

export interface TechAnalysis {
  technicalDepth: number;
  innovationPotential: number;
  learningVelocity: number;
  domainExpertise: string[];
  collaborationStyle: string;
  growthMindset: number;
  recommendations: string[];
}

export interface AnalysisResult {
  overallScore: number;
  technicalAnalysis: TechAnalysis;
  redFlags: string[];
  greenFlags: string[];
  compatibilityInsights: {
    technicalAlignment: number;
    innovationSynergy: number;
    growthCompatibility: number;
    recommendedProjects: string[];
  };
}

export const ANALYSIS_STEPS = [
  { message: "Analyzing Technical Depth", icon: "🧠", color: "rgb(244,63,94)" },
  { message: "Evaluating Innovation Potential", icon: "💡", color: "rgb(236,72,153)" },
  { message: "Measuring Learning Velocity", icon: "📈", color: "rgb(219,39,119)" },
  { message: "Mapping Domain Expertise", icon: "🗺️", color: "rgb(244,63,94)" },
  { message: "Assessing Growth Mindset", icon: "🌱", color: "rgb(236,72,153)" },
  { message: "Calculating Technical Alignment", icon: "⚡", color: "rgb(219,39,119)" },
  { message: "Generating Insights", icon: "✨", color: "rgb(244,63,94)" }
];

export const EXAMPLE_PROFILES = [
  {
    text: "Full-stack developer with 5+ years experience in React, Node.js, and AWS. Passionate about building scalable web applications and exploring new technologies. Currently learning Rust and WebAssembly. GitHub: 500+ contributions this year. Active in open source communities.",
    metadata: {
      techStack: ["React", "Node.js", "AWS"],
      yearsOfExperience: 5,
      innovationInterests: ["Rust", "WebAssembly"]
    }
  },
  {
    text: "Senior software engineer specializing in distributed systems and cloud architecture. 8 years of experience with Go, Python, and Kubernetes. Led multiple teams in implementing microservices architectures. Regular speaker at tech conferences.",
    metadata: {
      techStack: ["Go", "Python", "Kubernetes"],
      yearsOfExperience: 8,
      preferredDomains: ["Distributed Systems", "Cloud Architecture"]
    }
  },
  {
    text: "Machine learning engineer focused on NLP and computer vision. Published researcher with experience in PyTorch and TensorFlow. Contributing to major open-source ML libraries. PhD in Computer Science with specialization in AI.",
    metadata: {
      techStack: ["PyTorch", "TensorFlow", "Python"],
      preferredDomains: ["NLP", "Computer Vision"],
      innovationInterests: ["AI Research"]
    }
  }
];