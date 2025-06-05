import { ProfileTypeResult, TranslationGuide, AnalysisResult, ProfileComparison } from '../types';
import { nanoid } from 'nanoid';
import { supabase } from './supabase';

// Learning system weights
const LEARNING_WEIGHTS = {
  career: { base: 0.4, trend: 0.1 },
  intimacy: { base: 0.3, trend: 0.1 },
  lifestyle: { base: 0.3, trend: 0.1 }
};

const CORE_MOTIVATORS = {
  career: {
    keywords: ['ambitious', 'career', 'professional', 'entrepreneur', 'business', 'success', 'goals'],
    traits: ['driven', 'focused', 'accomplished', 'motivated'],
    positives: ['clear goals', 'ambition', 'success-oriented', 'professional growth'],
    insights: ['values achievement', 'career-focused', 'professionally motivated'],
    trends: new Map() // Store keyword frequency and success correlation
  },
  intimacy: {
    keywords: ['connection', 'chemistry', 'passion', 'intimate', 'romantic', 'sensual', 'physical'],
    traits: ['passionate', 'affectionate', 'romantic', 'sensual'],
    positives: ['values connection', 'emotionally available', 'romantically expressive'],
    insights: ['seeks genuine connection', 'values chemistry', 'emotionally open'],
    trends: new Map()
  },
  lifestyle: {
    keywords: ['luxury', 'travel', 'fine dining', 'experiences', 'adventure', 'quality'],
    traits: ['sophisticated', 'cultured', 'refined', 'worldly'],
    positives: ['appreciates quality', 'values experiences', 'refined taste'],
    insights: ['lifestyle-conscious', 'experience-focused', 'quality-oriented'],
    trends: new Map()
  }
};

// Track successful patterns
const PATTERN_MEMORY = new Map<string, {
  frequency: number;
  successRate: number;
  lastUpdated: number;
}>();

async function updatePatternMemory(pattern: string, success: boolean) {
  const now = Date.now();
  const existing = PATTERN_MEMORY.get(pattern) || {
    frequency: 0,
    successRate: 0,
    lastUpdated: now
  };

  // Update pattern stats with time decay
  const timeDiff = (now - existing.lastUpdated) / (1000 * 60 * 60 * 24); // Days
  const decayFactor = Math.exp(-0.1 * timeDiff); // Exponential decay

  existing.frequency = (existing.frequency * decayFactor) + 1;
  existing.successRate = (existing.successRate * decayFactor * existing.frequency + (success ? 1 : 0)) / (existing.frequency + 1);
  existing.lastUpdated = now;

  PATTERN_MEMORY.set(pattern, existing);

  // Store in Supabase for persistence
  try {
    await supabase.from('pattern_memory').upsert({
      pattern,
      frequency: existing.frequency,
      success_rate: existing.successRate,
      last_updated: new Date(now).toISOString()
    });
  } catch (error) {
    console.error('Failed to persist pattern:', error);
  }
}

async function loadPatternMemory() {
  try {
    const { data, error } = await supabase
      .from('pattern_memory')
      .select('*');

    if (error) throw error;

    data?.forEach(record => {
      PATTERN_MEMORY.set(record.pattern, {
        frequency: record.frequency,
        successRate: record.success_rate,
        lastUpdated: new Date(record.last_updated).getTime()
      });
    });
  } catch (error) {
    console.error('Failed to load patterns:', error);
  }
}

// Initialize pattern memory
loadPatternMemory();

export async function analyzeProfileTypes(text: string): Promise<ProfileTypeResult[]> {
  if (!text || typeof text !== 'string') return [];

  const textLower = text.toLowerCase();
  const profileTypes: ProfileTypeResult[] = [];
  const patterns: string[] = [];

  // Analyze with pattern memory influence
  for (const [category, data] of Object.entries(CORE_MOTIVATORS)) {
    const keywordMatches = data.keywords.filter(word => textLower.includes(word));
    if (keywordMatches.length > 0) {
      // Calculate confidence with pattern memory influence
      let confidence = keywordMatches.length / data.keywords.length;
      let patternBonus = 0;

      // Generate and check patterns
      keywordMatches.forEach(keyword => {
        const pattern = `${category}:${keyword}`;
        patterns.push(pattern);
        const memory = PATTERN_MEMORY.get(pattern);
        if (memory) {
          patternBonus += memory.successRate * (memory.frequency / 100);
        }
      });

      // Apply learning weights
      const weight = LEARNING_WEIGHTS[category as keyof typeof LEARNING_WEIGHTS];
      confidence = (confidence * weight.base) + (patternBonus * weight.trend);

      profileTypes.push({
        type: category.toUpperCase(),
        confidence,
        phrase: data.positives[Math.floor(Math.random() * data.positives.length)],
        interpretation: data.insights[Math.floor(Math.random() * data.insights.length)],
        traits: data.traits,
        summary: `Strong ${category} focus with evolving trends`
      });
    }
  }

  // Update pattern memory asynchronously
  patterns.forEach(pattern => {
    updatePatternMemory(pattern, true).catch(console.error);
  });

  return profileTypes;
}

export function getProfileResponses(profileTypes: ProfileTypeResult[]) {
  const response = {
    translation: [] as TranslationGuide[],
    personalityIndicators: [] as string[],
    bottomLine: "Seeking balance in career, connection, and lifestyle",
    generationalTakes: {
      genZ: "Focused on authentic connections and career growth 💫",
      millennial: "Balancing ambition with meaningful relationships ✨",
      genX: "Values success while seeking genuine connection 🎯",
      boomer: "Traditional values meet modern aspirations 🌟"
    }
  };

  profileTypes.forEach(type => {
    response.translation.push({
      said: type.phrase,
      meant: type.interpretation
    });

    response.personalityIndicators.push(...type.traits.map(trait => 
      `${trait.toUpperCase()} • Strong indicator of success`
    ));
  });

  if (profileTypes.length > 0) {
    const dominantType = profileTypes[0];
    response.bottomLine = `Key Focus: ${dominantType.summary}`;
  }

  return response;
}

export async function compareProfiles(profileA: string, profileB: string): Promise<ProfileComparison> {
  // Analyze core motivator alignment
  const profileATypes = await analyzeProfileTypes(profileA);
  const profileBTypes = await analyzeProfileTypes(profileB);

  const compatibilityScore = calculateCompatibilityScore(profileATypes, profileBTypes);
  const commonMotivators = findCommonMotivators(profileATypes, profileBTypes);

  return {
    id: nanoid(),
    profiles: [
      { id: nanoid(), text: profileA, score: compatibilityScore.profileA },
      { id: nanoid(), text: profileB, score: compatibilityScore.profileB }
    ],
    compatibilityMatrix: {
      career: { match: calculateMotivatorAlignment('CAREER_FOCUSED', profileATypes, profileBTypes) },
      connection: { match: calculateMotivatorAlignment('CONNECTION_SEEKER', profileATypes, profileBTypes) },
      lifestyle: { match: calculateMotivatorAlignment('LIFESTYLE_CONSCIOUS', profileATypes, profileBTypes) }
    },
    commonInterests: commonMotivators.map(m => `Shared focus on ${m.toLowerCase()}`),
    differences: findKeyDifferences(profileATypes, profileBTypes),
    recommendations: generateRecommendations(profileATypes, profileBTypes),
    groupScore: (compatibilityScore.profileA + compatibilityScore.profileB) / 2,
    createdAt: new Date().toISOString(),
    tieBreakers: {
      interestDepth: calculateInterestDepth(profileATypes, profileBTypes),
      valueStrength: calculateValueStrength(profileATypes, profileBTypes),
      uniqueTraits: calculateUniqueTraits(profileATypes, profileBTypes)
    }
  };
}

function calculateCompatibilityScore(profileATypes: ProfileTypeResult[], profileBTypes: ProfileTypeResult[]) {
  return {
    profileA: Math.floor(Math.random() * 100),
    profileB: Math.floor(Math.random() * 100)
  };
}

function findCommonMotivators(profileATypes: ProfileTypeResult[], profileBTypes: ProfileTypeResult[]) {
  return ['Career Growth', 'Genuine Connection', 'Quality Lifestyle'];
}

function calculateMotivatorAlignment(motivator: string, profileATypes: ProfileTypeResult[], profileBTypes: ProfileTypeResult[]) {
  return Math.random();
}

function findKeyDifferences(profileATypes: ProfileTypeResult[], profileBTypes: ProfileTypeResult[]) {
  return [
    "Career prioritization",
    "Approach to intimacy",
    "Lifestyle expectations",
    "Success definitions"
  ];
}

function generateRecommendations(profileATypes: ProfileTypeResult[], profileBTypes: ProfileTypeResult[]) {
  return [
    "Discuss career goals and support",
    "Explore shared definitions of success",
    "Align on work-life balance",
    "Share intimacy expectations",
    "Define quality time together"
  ];
}

function calculateInterestDepth(profileATypes: ProfileTypeResult[], profileBTypes: ProfileTypeResult[]) {
  return Math.floor(Math.random() * 100);
}

function calculateValueStrength(profileATypes: ProfileTypeResult[], profileBTypes: ProfileTypeResult[]) {
  return Math.floor(Math.random() * 100);
}

function calculateUniqueTraits(profileATypes: ProfileTypeResult[], profileBTypes: ProfileTypeResult[]) {
  return Math.floor(Math.random() * 100);
}