# API PLAYER'S GUIDE

## ENDPOINTS

### Profile Analysis Quest
```typescript
POST /api/analyze
Content-Type: application/json

// PLAYER INPUT
{
  "profile": string,  // Your target profile
  "options": {
    "platform": "tinder" | "bumble" | "hinge" | "other",  // Choose your arena
    "aiModel": "gpt4" | "gpt35" | "claude"  // Select your weapon
  }
}

// BATTLE RESULTS
{
  "overallScore": number,  // Your final score
  "redFlags": string[],    // Danger zones spotted
  "greenFlags": string[],  // Power-ups found
  "translation": Array<{
    said: string,    // What they typed
    meant: string    // What it really means
  }>,
  "generationalTakes": {   // Multi-gen bonus round
    genZ: string,
    millennial: string,
    genX: string,
    boomer: string
  }
}
```

## DATABASE STATS

### Profile Analysis Storage
```sql
-- SAVE GAME DATA
CREATE TABLE profile_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),  -- Unique battle ID
  profile_text text NOT NULL,                     -- The profile text
  metadata jsonb,                                 -- Extra stats
  red_flags text[],                              -- Danger markers
  green_flags text[],                            -- Achievement markers
  ai_analysis text,                              -- AI wisdom
  created_at timestamptz DEFAULT now()           -- Timestamp
);
```

## AUTHENTICATION

To join the game, you'll need your player token:

```http
Authorization: Bearer <your_player_token>
```

May your requests be swift and your responses be 200!