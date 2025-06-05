# Supabase Integration Guide

## Overview
RedFlag AI uses Supabase as our primary backend platform, providing:
- Serverless PostgreSQL database
- Real-time subscriptions
- Edge Functions
- Row Level Security (RLS)
- Built-in authentication
- Auto-generated TypeScript types

## Database Architecture

### Core Tables
1. `profile_analyses`
   - Stores profile analysis results
   - Includes red/green flags, AI analysis, metadata
   - Protected by RLS policies

2. `profile_comparisons`
   - Handles profile compatibility comparisons
   - Links to profile_analyses via foreign keys
   - Stores compatibility scores and insights

## Security Implementation

### Row Level Security (RLS)
All tables have RLS enabled by default:
```sql
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;
```

### Authentication
- Email/password authentication
- Secure session management
- JWT token handling
- Role-based access control

## Performance Optimization

### Database Indexing
- Index frequently queried columns
- Use composite indexes for complex queries
- Monitor query performance

### Query Optimization
```typescript
// GOOD: Specific column selection
const { data } = await supabase
  .from('profile_analyses')
  .select('id, red_flags, green_flags')
  .eq('user_id', userId);

// BAD: Selecting all columns
const { data } = await supabase
  .from('profile_analyses')
  .select('*')
  .eq('user_id', userId);
```

### Caching Strategy
- Use Supabase's built-in caching
- Implement client-side caching for frequent reads
- Cache invalidation on updates

## Real-time Features
```typescript
// Subscribe to profile updates
const subscription = supabase
  .from('profile_analyses')
  .on('*', payload => {
    console.log('Change received!', payload);
  })
  .subscribe();
```

## Edge Functions
Located in `/supabase/functions`:
- Handle API integrations
- Process sensitive data
- Run computationally intensive tasks

## Best Practices

### Database Design
1. Use appropriate data types
2. Implement proper constraints
3. Follow naming conventions
4. Version control migrations

### Security
1. Never skip RLS policies
2. Use parameterized queries
3. Validate input data
4. Implement proper error handling

### Performance
1. Batch operations when possible
2. Use appropriate indexes
3. Monitor query performance
4. Implement proper caching

## Common Pitfalls

### Security Issues
- Forgetting to enable RLS
- Overly permissive policies
- Exposing sensitive data
- Weak authentication rules

### Performance Issues
- N+1 query problems
- Missing indexes
- Over-fetching data
- Poor caching implementation

## Migration Strategy

### Creating Migrations
1. One logical change per migration
2. Include rollback plans
3. Test migrations thoroughly
4. Document changes clearly

### Example Migration
```sql
-- Create new table
CREATE TABLE IF NOT EXISTS features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE features ENABLE ROW LEVEL SECURITY;

-- Add policies
CREATE POLICY "Read access for all authenticated users"
  ON features FOR SELECT
  TO authenticated
  USING (true);
```

## Type Safety

### Generated Types
```typescript
// Use generated types
import { Database } from './types/supabase';
type Profile = Database['public']['Tables']['profiles']['Row'];

// Type-safe queries
const { data, error } = await supabase
  .from('profiles')
  .select()
  .returns<Profile[]>();
```

## Error Handling

### Query Error Handling
```typescript
const { data, error } = await supabase
  .from('profiles')
  .select();

if (error) {
  if (error.code === 'PGRST116') {
    // Handle RLS policy violation
  } else if (error.code === '23505') {
    // Handle unique constraint violation
  }
  throw new Error(`Database error: ${error.message}`);
}
```

## Monitoring

### Key Metrics
1. Query performance
2. Error rates
3. Cache hit rates
4. API response times

### Tools
- Supabase Dashboard
- PostgreSQL logs
- Custom monitoring
- Error tracking

## Development Workflow

### Local Development
1. Use Supabase CLI for local development
2. Test migrations locally
3. Use seeded test data
4. Mock edge functions

### Deployment
1. Review migrations
2. Test in staging
3. Deploy with rollback plan
4. Monitor post-deployment

## Optimization Checklist

### Database
- [ ] Proper indexes implemented
- [ ] Query performance optimized
- [ ] Appropriate data types used
- [ ] Constraints defined

### Security
- [ ] RLS enabled on all tables
- [ ] Policies tested thoroughly
- [ ] Input validation implemented
- [ ] Error handling in place

### Performance
- [ ] Caching strategy implemented
- [ ] Query optimization done
- [ ] Batch operations used
- [ ] Real-time subscriptions optimized

## Resources

### Official Documentation
- [Supabase Docs](https://supabase.com/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Edge Functions](https://supabase.com/docs/guides/functions)

### Community
- [Supabase Discord](https://discord.supabase.com)
- [GitHub Discussions](https://github.com/supabase/supabase/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/supabase)