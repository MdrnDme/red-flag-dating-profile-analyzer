import { ChatAnalysis } from '../types';
import { nanoid } from 'nanoid';

const AI_INTEREST_SIGNALS = {
  technical: ['ai', 'machine learning', 'neural networks', 'data science', 'programming', 'tech'],
  creative: ['generative ai', 'stable diffusion', 'midjourney', 'dall-e', 'creative coding'],
  philosophical: ['consciousness', 'singularity', 'ethics', 'future of ai', 'artificial intelligence'],
  practical: ['chatgpt', 'github copilot', 'automation', 'productivity tools', 'ai apps']
};

const TECH_AUTHENTICITY_SIGNALS = {
  genuine: ['specific tools', 'personal projects', 'technical details', 'real experience'],
  suspicious: ['buzzwords only', 'vague tech terms', 'name dropping', 'superficial knowledge']
};

const INTELLECTUAL_SIGNALS = {
  high: ['research', 'papers', 'theory', 'concepts', 'innovation', 'experiments'],
  medium: ['interested in learning', 'following developments', 'reading about'],
  low: ['heard about', 'saw on news', 'trending topic']
};

const INTIMACY_KEYWORDS = {
  casual: ['hang', 'meet', 'coffee', 'drinks', 'fun'],
  romantic: ['date', 'dinner', 'weekend', 'special', 'together'],
  physical: ['hot', 'sexy', 'attractive', 'chemistry', 'connection'],
  serious: ['relationship', 'future', 'commitment', 'exclusive', 'partner']
};

const ATTRACTION_SIGNALS = {
  high: ['😘', '😍', '🔥', 'hot', 'sexy', 'beautiful', 'gorgeous', 'stunning'],
  medium: ['cute', 'pretty', 'handsome', 'attractive', '😊', '😉'],
  low: ['nice', 'cool', 'good', 'okay', '👍']
};

const INTEREST_SIGNALS = {
  high: ['when', 'where', 'what', '?', 'tell me more', 'interesting'],
  medium: ['cool', 'nice', 'good', 'haha', 'lol'],
  low: ['ok', 'yeah', 'sure', 'maybe', 'idk']
};

const AUTHENTICITY_SIGNALS = {
  genuine: ['specific', 'personal', 'unique', 'detailed'],
  suspicious: ['generic', 'vague', 'copy', 'paste', 'everyone']
};

const PRACTICALITY_FACTORS = {
  lifestyle: ['work', 'live', 'schedule', 'time', 'location'],
  values: ['family', 'goals', 'future', 'beliefs', 'important'],
  dealbreakers: ['must', 'cannot', 'won\'t', 'never', 'always']
};

const SOCIAL_CLIMBING_SIGNALS = {
  status: ['rich', 'wealthy', 'successful', 'luxury', 'expensive', 'exclusive'],
  probing: ['what do you do', 'where do you work', 'what area', 'salary', 'income'],
  name_dropping: ['know anyone', 'connected', 'influential', 'elite', 'vip'],
  lifestyle: ['yacht', 'private jet', 'mansion', 'penthouse', 'hamptons']
};

const CONTEXT_CHECK_PATTERNS = {
  physical: ['what are you wearing', 'send pic', 'photo', 'selfie', 'look like'],
  quick_meet: ['tonight', 'right now', 'come over', 'address', 'location'],
  ghosting_signs: ['busy', 'maybe later', 'we\'ll see', 'not sure when']
};

export async function analyzeChatHistory(messages: ChatAnalysis['messages']): Promise<ChatAnalysis> {
  // Add new scores to existing calculations
  const aiInterestLevel = calculateAIInterestLevel(messages);
  const intellectualDepth = calculateIntellectualDepth(messages);
  const techAuthenticityScore = calculateTechAuthenticityScore(messages);
  
  // Include existing calculations
  const averageReplyTime = calculateAverageReplyTime(messages);
  const messageLength = calculateAverageMessageLength(messages);
  const questionFrequency = calculateQuestionFrequency(messages);
  const emojiUsage = calculateEmojiUsage(messages);
  const intimacyLevel = calculateIntimacyProgression(messages);
  const attractionLevel = calculateAttractionLevel(messages);
  const authenticityScore = calculateAuthenticityScore(messages);
  const practicalityScore = calculatePracticalityScore(messages);
  const socialClimbingScore = calculateSocialClimbingScore(messages);
  const contextCheckScore = calculateContextCheckScore(messages);

  const patterns = {
    replySpeed: normalizeMetric(averageReplyTime, 0, 86400),
    messageLength: normalizeMetric(messageLength, 1, 200),
    questionFrequency: normalizeMetric(questionFrequency, 0, 1),
    emojiUsage: normalizeMetric(emojiUsage, 0, 10),
    intimacyProgression: intimacyLevel,
    attractionLevel: attractionLevel,
    authenticity: authenticityScore,
    practicality: practicalityScore,
    socialClimbing: socialClimbingScore,
    contextChecking: contextCheckScore,
    // Add new patterns
    aiInterest: aiInterestLevel,
    intellectualDepth: intellectualDepth,
    techAuthenticity: techAuthenticityScore
  };

  const insights = {
    interest: calculateInterestLevel(messages, patterns),
    engagement: calculateEngagementScore(patterns),
    chemistry: calculateChemistryScore(messages, patterns),
    intentions: detectIntentions(messages),
    redFlags: detectRedFlags(messages, patterns),
    greenFlags: detectGreenFlags(messages, patterns),
    nextMoves: generateNextMoves(patterns),
    relationshipPotential: calculateRelationshipPotential(patterns)
  };

  return {
    id: nanoid(),
    messages,
    insights,
    patterns,
    recommendations: generateRecommendations(insights, patterns)
  };
}

function calculateAIInterestLevel(messages: ChatAnalysis['messages']): number {
  let score = 0;
  let depth = 0;

  messages.forEach(msg => {
    const textLower = msg.text.toLowerCase();
    
    Object.entries(AI_INTEREST_SIGNALS).forEach(([category, signals]) => {
      signals.forEach(signal => {
        if (textLower.includes(signal.toLowerCase())) {
          score += category === 'technical' || category === 'philosophical' ? 2 : 1;
          depth += textLower.length > 100 ? 0.5 : 0.2; // Reward detailed discussions
        }
      });
    });
  });

  return normalizeMetric(score * (1 + depth), 0, 20);
}

function calculateIntellectualDepth(messages: ChatAnalysis['messages']): number {
  let score = 0;
  
  messages.forEach(msg => {
    const textLower = msg.text.toLowerCase();
    
    Object.entries(INTELLECTUAL_SIGNALS).forEach(([level, signals]) => {
      signals.forEach(signal => {
        if (textLower.includes(signal.toLowerCase())) {
          score += level === 'high' ? 3 : level === 'medium' ? 2 : 1;
          
          // Bonus for combining multiple high-level topics
          if (level === 'high' && score > 5) {
            score *= 1.2;
          }
        }
      });
    });
  });

  return normalizeMetric(score, 0, 15);
}

function calculateTechAuthenticityScore(messages: ChatAnalysis['messages']): number {
  let score = 0.5; // Start neutral
  
  messages.forEach(msg => {
    const textLower = msg.text.toLowerCase();
    
    TECH_AUTHENTICITY_SIGNALS.genuine.forEach(signal => {
      if (textLower.includes(signal.toLowerCase())) {
        score += 0.15;
      }
    });
    
    TECH_AUTHENTICITY_SIGNALS.suspicious.forEach(signal => {
      if (textLower.includes(signal.toLowerCase())) {
        score -= 0.15;
      }
    });
  });

  return Math.max(0, Math.min(1, score));
}

function calculateRelationshipPotential(patterns: ChatAnalysis['patterns']): number {
  return (
    patterns.authenticity * 0.3 +
    patterns.practicality * 0.3 +
    patterns.intimacyProgression * 0.2 +
    patterns.attractionLevel * 0.2
  ) * 100;
}

function calculateAverageReplyTime(messages: ChatAnalysis['messages']): number {
  const replyTimes = messages.map(m => m.replyTime || 0);
  return replyTimes.reduce((a, b) => a + b, 0) / replyTimes.length;
}

function calculateAverageMessageLength(messages: ChatAnalysis['messages']): number {
  return messages.reduce((acc, msg) => acc + msg.text.length, 0) / messages.length;
}

function calculateQuestionFrequency(messages: ChatAnalysis['messages']): number {
  const questions = messages.filter(msg => msg.text.includes('?')).length;
  return questions / messages.length;
}

function calculateEmojiUsage(messages: ChatAnalysis['messages']): number {
  const emojiRegex = /[\u{1F300}-\u{1F9FF}]/gu;
  const emojiCount = messages.reduce((acc, msg) => {
    const matches = msg.text.match(emojiRegex);
    return acc + (matches ? matches.length : 0);
  }, 0);
  return emojiCount / messages.length;
}

function calculateIntimacyProgression(messages: ChatAnalysis['messages']): number {
  let intimacyScore = 0;
  
  messages.forEach((msg, index) => {
    const textLower = msg.text.toLowerCase();
    
    Object.entries(INTIMACY_KEYWORDS).forEach(([level, keywords], levelIndex) => {
      keywords.forEach(keyword => {
        if (textLower.includes(keyword)) {
          intimacyScore += (levelIndex + 1) * (index / messages.length);
        }
      });
    });
  });

  return normalizeMetric(intimacyScore, 0, 10);
}

function calculateInterestLevel(
  messages: ChatAnalysis['messages'], 
  patterns: ChatAnalysis['patterns']
): number {
  let interestScore = 0;
  
  messages.forEach(msg => {
    const textLower = msg.text.toLowerCase();
    
    Object.entries(INTEREST_SIGNALS).forEach(([level, signals]) => {
      signals.forEach(signal => {
        if (textLower.includes(signal)) {
          interestScore += level === 'high' ? 3 : level === 'medium' ? 2 : 1;
        }
      });
    });
  });

  // Factor in patterns and attraction
  interestScore *= (patterns.questionFrequency + patterns.messageLength + patterns.attractionLevel + patterns.authenticity) / 4;
  
  return normalizeMetric(interestScore, 0, 100);
}

function calculateEngagementScore(patterns: ChatAnalysis['patterns']): number {
  return (
    patterns.replySpeed * 0.2 +
    patterns.messageLength * 0.2 +
    patterns.questionFrequency * 0.2 +
    patterns.attractionLevel * 0.2 +
    patterns.authenticity * 0.2
  ) * 100;
}

function calculateChemistryScore(
  messages: ChatAnalysis['messages'],
  patterns: ChatAnalysis['patterns']
): number {
  return (
    patterns.intimacyProgression * 0.25 +
    patterns.questionFrequency * 0.15 +
    patterns.emojiUsage * 0.15 +
    patterns.attractionLevel * 0.25 +
    patterns.authenticity * 0.2
  ) * 100;
}

function detectIntentions(messages: ChatAnalysis['messages']): string[] {
  const intentions: string[] = [];
  const lastMessages = messages.slice(-5);
  const combinedText = lastMessages.map(m => m.text.toLowerCase()).join(' ');

  // Check for various intentions
  if (INTIMACY_KEYWORDS.casual.some(word => combinedText.includes(word))) {
    intentions.push('Seeking casual meetup');
  }
  if (INTIMACY_KEYWORDS.romantic.some(word => combinedText.includes(word))) {
    intentions.push('Interested in dating');
  }
  if (INTIMACY_KEYWORDS.physical.some(word => combinedText.includes(word))) {
    intentions.push('Physical attraction');
  }
  if (INTIMACY_KEYWORDS.serious.some(word => combinedText.includes(word))) {
    intentions.push('Looking for relationship');
  }

  // Check attraction signals
  if (ATTRACTION_SIGNALS.high.some(word => combinedText.includes(word.toLowerCase()))) {
    intentions.push('Strong physical interest');
  }

  return intentions;
}

function detectRedFlags(
  messages: ChatAnalysis['messages'],
  patterns: ChatAnalysis['patterns']
): string[] {
  const redFlags: string[] = [];

  // Response patterns
  if (patterns.replySpeed < 0.2) {
    redFlags.push('Very slow response times');
  }
  if (patterns.messageLength < 0.2) {
    redFlags.push('Consistently short replies');
  }
  if (patterns.attractionLevel > 0.8 && patterns.intimacyProgression < 0.2) {
    redFlags.push('Purely physical interest');
  }
  if (patterns.authenticity < 0.3) {
    redFlags.push('Likely using copy-pasted messages');
  }
  if (patterns.practicality < 0.2) {
    redFlags.push('No discussion of real-life compatibility');
  }

  // Message content analysis
  messages.forEach(msg => {
    const text = msg.text.toLowerCase();
    if (text.includes('ex') || text.includes('broke up')) {
      redFlags.push('Frequently mentions ex');
    }
    if (text.includes('busy') && text.includes('sorry')) {
      redFlags.push('Often too busy/apologetic');
    }
  });

  return redFlags;
}

function detectGreenFlags(
  messages: ChatAnalysis['messages'],
  patterns: ChatAnalysis['patterns']
): string[] {
  const greenFlags: string[] = [];

  // Response patterns
  if (patterns.replySpeed > 0.7) {
    greenFlags.push('Consistently quick responses');
  }
  if (patterns.questionFrequency > 0.6) {
    greenFlags.push('Shows genuine interest');
  }
  if (patterns.attractionLevel > 0.6 && patterns.intimacyProgression > 0.4) {
    greenFlags.push('Balanced physical and emotional interest');
  }
  if (patterns.authenticity > 0.8) {
    greenFlags.push('Highly authentic communication');
  }
  if (patterns.practicality > 0.7) {
    greenFlags.push('Discusses real-life compatibility');
  }

  // Message content analysis
  messages.forEach(msg => {
    const text = msg.text.toLowerCase();
    if (text.includes('plan') || text.includes('meet')) {
      greenFlags.push('Takes initiative in planning');
    }
    if (text.includes('feel') || text.includes('think')) {
      greenFlags.push('Opens up emotionally');
    }
  });

  return greenFlags;
}

function generateNextMoves(patterns: ChatAnalysis['patterns']): string[] {
  const moves: string[] = [];

  if (patterns.attractionLevel > 0.7 && patterns.intimacyProgression > 0.6 && patterns.authenticity > 0.7) {
    moves.push('Suggest meeting in person');
    moves.push('Plan a specific date');
  } else if (patterns.attractionLevel > 0.5 && patterns.intimacyProgression > 0.3) {
    moves.push('Build more emotional connection');
    moves.push('Share more personal stories');
  } else {
    moves.push('Keep conversation light and fun');
    moves.push('Ask more engaging questions');
  }

  if (patterns.practicality < 0.5) {
    moves.push('Discuss real-life compatibility');
    moves.push('Share lifestyle preferences');
  }

  return moves;
}

function generateRecommendations(
  insights: ChatAnalysis['insights'],
  patterns: ChatAnalysis['patterns']
): string[] {
  const recommendations: string[] = [];

  // Based on attraction and authenticity
  if (patterns.attractionLevel > 0.7 && patterns.authenticity > 0.7) {
    recommendations.push('Strong mutual attraction - consider escalating');
    recommendations.push('Balance physical and emotional connection');
  } else if (patterns.attractionLevel < 0.3 && patterns.authenticity > 0.7) {
    recommendations.push('Build more chemistry through flirting');
    recommendations.push('Show more playful interest');
  }

  // Based on practicality
  if (patterns.practicality < 0.4) {
    recommendations.push('Discuss real-life compatibility factors');
    recommendations.push('Share more about lifestyle and values');
  }

  // Based on authenticity
  if (patterns.authenticity < 0.5) {
    recommendations.push('Be more genuine in responses');
    recommendations.push('Share unique personal details');
  }

  return recommendations;
}

function normalizeMetric(value: number, min: number, max: number): number {
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
}