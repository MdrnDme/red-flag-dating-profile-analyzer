# RedFlag AI Style Guide

## Brand Identity

### Colors
- Primary: Red (`#EF4444`, `rgb(239, 68, 68)`)
- Secondary: Pink (`#EC4899`)
- Accent: Emerald (`#10B981`)
- Background: Slate gradient
- Text: White with varying opacity levels

### Typography
- Font Family: Inter
- Headings: Bold, sizes from 2xl to 5xl
- Body: Regular/Medium, sizes from base to xl
- Gradient text effect for emphasis

### Visual Elements
- Glass morphism effect
- Neon glow animations
- Grid patterns
- Gradient borders
- Arcade-style animations

## Component Guidelines

### Buttons
- Primary: Red to pink gradient
- Secondary: Glass effect
- Hover: Scale transform
- Disabled: White/10 background

### Cards
- Glass background
- Border: White/10
- Rounded corners (xl)
- Subtle hover effects

### Dropdowns
- Glass background
- Smooth animations
- Clear hover states
- Consistent padding

### Progress Indicators
- Gradient bars
- Arcade-style animations
- Clear visual feedback

### Text Input
- Glass effect
- Clear focus states
- Error states in red
- Character count indicator

## Animation Guidelines

### Transitions
```css
.transition-base {
  @apply transition-all duration-300 ease-out;
}

.hover-scale {
  @apply hover:scale-105;
}
```

### Keyframe Animations
- `textGradient`: Moving gradient
- `neonPulse`: Glowing effect
- `arcadeGlow`: Game-style effects
- `gridScroll`: Background pattern movement

## Layout

### Spacing
- Container max-width: 4xl
- Consistent padding: 6-8 units
- Vertical spacing: 4-8 units
- Component gaps: 2-4 units

### Responsive Design
- Mobile-first approach
- Breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px

## State Management

### Loading States
- Animated spinners
- Progress indicators
- Skeleton loaders

### Error States
- Red accents
- Clear error messages
- Icon indicators

### Success States
- Green accents
- Smooth transitions
- Clear confirmations

## Accessibility

### Color Contrast
- Maintain WCAG 2.1 AA standards
- Use opacity for subtle variations
- Ensure readable text on gradients

### Interactive Elements
- Clear focus indicators
- Keyboard navigation
- ARIA labels

### Motion
- Respect reduced-motion preferences
- Subtle animations by default
- Clear purpose for motion