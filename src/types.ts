import { z } from 'zod';

export const MAX_PROFILE_CHARS = 2000;

export interface ProfileType {
  name: string;
  description: string;
  likelihood: number;
  redFlags: string[];
  greenFlags: string[];
}

export interface GenerationalTake {
  genZ: string;
  millennial: string;
  genX: string;
  boomer: string;
}

export interface PersonalityIndicator {
  trait: string;
  description: string;
  score: number;
}

export interface AnalysisResult {
  overallScore: number;
  profileTypes?: ProfileType[];
  redFlags: string[];
  greenFlags: string[];
  neutralObservations: string[];
  translation: string[];
  generationalTakes: GenerationalTake;
  personalityIndicators?: PersonalityIndicator[];
  bottomLine?: string;
  comparisons?: ComparisonResult[];
}

export interface ComparisonResult {
  profile1Summary: string;
  profile2Summary: string;
  compatibilityScore: number;
  strengths: string[];
  concerns: string[];
  bottomLine: string;
}

export const ANALYSIS_STEPS = [
  { message: "Scanning for bullshit patterns", icon: "🕵️", color: "rgb(244,63,94)" },
  { message: "Running psychological warfare protocols", icon: "🧠", color: "rgb(236,72,153)" },
  { message: "Decoding hidden red flags", icon: "🚩", color: "rgb(219,39,119)" },
  { message: "Extracting authentic signals", icon: "✨", color: "rgb(244,63,94)" },
  { message: "Cross-referencing generational cringe", icon: "📊", color: "rgb(236,72,153)" },
  { message: "Calculating compatibility chaos", icon: "💥", color: "rgb(219,39,119)" },
  { message: "Preparing digital necropsy report", icon: "📋", color: "rgb(244,63,94)" }
];

export const EASTER_EGG_RESPONSES = [
  "This person probably still uses Internet Explorer",
  "Likely to bring a guitar to a house party uninvited", 
  "Definitely thinks cryptocurrency is personality",
  "100% chance they mention their Myers-Briggs type on the first date",
  "Would ghost you for their ex's cousin's best friend"
];

export const EXAMPLE_PROFILES = [
  {
    text: "Love to laugh and travel! Looking for my best friend and partner in crime. I'm not here for drama or games. Must love dogs. Swipe left if you're under 6ft. I speak fluent sarcasm and pizza is my love language 🍕✈️😂"
  },
  {
    text: "Entrepreneur building the future. Crypto investor, fitness enthusiast, and weekend warrior. Alpha mindset. If you can't handle me at my worst, you don't deserve me at my best. No fatties."
  },
  {
    text: "Just moved here from [insert city]. Looking to meet new people and explore! I work hard and play harder. Wine lover, foodie, and amateur photographer. Let's grab drinks and see where it goes!"
  },
  {
    text: "Sapiosexual seeking intellectual stimulation. PhD in philosophy, published poet, and vinyl collector. I prefer deep conversations over small talk. Please be well-read and emotionally mature."
  },
  {
    text: "Single mom to the most amazing little human. My kid comes first, always. Looking for someone genuine who understands family comes first. No hookups. Must have your life together."
  },
  {
    text: "Adventure seeker and thrill junkie! Rock climbing, skydiving, motorcycle rides - if it gets my adrenaline pumping, I'm in. Looking for someone who can keep up with my lifestyle."
  }
];