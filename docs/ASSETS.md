# Asset Management Guide

## 🎨 Supported Integration Methods

### 1. External CDNs (Recommended)
- **Images**: Use Pexels, Unsplash, or similar CDNs
- **Icons**: Lucide React (built-in)
- **Fonts**: Google Fonts via CDN
- **Videos**: YouTube, Vimeo embeds
- **Music**: Spotify, SoundCloud embeds

### 2. Supabase Storage (For User Content)
- **Profile Pictures**
- **User Uploads**
- **Generated Content**
- **Temporary Assets**

### 3. Project Assets
- **Location**: `/public` directory
- **Formats**: 
  - ✅ SVG (icons, logos)
  - ✅ WebP (images)
  - ✅ MP3 (sound effects)
  - ✅ WebM (animations)
  - ❌ No large binary files
  - ❌ No unoptimized images

## 🎬 Video Integration

```typescript
// Using YouTube Embed
const VideoPlayer = ({ videoId }: { videoId: string }) => (
  <iframe
    src={`https://www.youtube.com/embed/${videoId}`}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    className="w-full aspect-video rounded-lg"
  />
);

// Using Vimeo Embed
const VimeoPlayer = ({ videoId }: { videoId: string }) => (
  <iframe
    src={`https://player.vimeo.com/video/${videoId}`}
    allow="autoplay; fullscreen; picture-in-picture"
    className="w-full aspect-video rounded-lg"
  />
);
```

## 🎵 Audio Integration

```typescript
// Using Spotify Embed
const SpotifyPlayer = ({ trackId }: { trackId: string }) => (
  <iframe
    src={`https://open.spotify.com/embed/track/${trackId}`}
    allow="encrypted-media"
    className="w-full h-20 rounded-lg"
  />
);

// Using SoundCloud Embed
const SoundCloudPlayer = ({ trackUrl }: { trackUrl: string }) => (
  <iframe
    src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(trackUrl)}`}
    className="w-full h-20 rounded-lg"
  />
);
```

## 🖼️ Image Best Practices

1. **Use WebP Format**
   ```typescript
   // Component with WebP and fallback
   const OptimizedImage = ({ src, fallback, alt }: {
     src: string;
     fallback: string;
     alt: string;
   }) => (
     <picture>
       <source srcSet={src} type="image/webp" />
       <img src={fallback} alt={alt} className="w-full h-auto" />
     </picture>
   );
   ```

2. **Lazy Loading**
   ```typescript
   <img 
     src={imageUrl} 
     alt={description}
     loading="lazy"
     className="w-full h-auto"
   />
   ```

3. **Responsive Images**
   ```typescript
   <img
     src={smallImage}
     srcSet={`${smallImage} 300w, ${mediumImage} 600w, ${largeImage} 900w`}
     sizes="(max-width: 300px) 300px, (max-width: 600px) 600px, 900px"
     alt={description}
     className="w-full h-auto"
   />
   ```

## 🎨 Animation Integration

1. **Lottie Animations**
   ```typescript
   import { Player } from '@lottiefiles/react-lottie-player';

   const Animation = () => (
     <Player
       src="https://assets.example.com/animation.json"
       className="w-64 h-64"
       loop
       autoplay
     />
   );
   ```

2. **CSS Animations**
   ```css
   .animate-fade {
     animation: fadeIn 0.3s ease-out;
   }

   @keyframes fadeIn {
     from { opacity: 0; }
     to { opacity: 1; }
   }
   ```

## 🔒 Security Considerations

1. **Content Security Policy**
   ```typescript
   // Add to meta tags in index.html
   <meta
     http-equiv="Content-Security-Policy"
     content="default-src 'self';
              img-src 'self' https://images.pexels.com https://images.unsplash.com;
              media-src 'self' https://www.youtube.com https://vimeo.com;
              style-src 'self' https://fonts.googleapis.com;
              font-src 'self' https://fonts.gstatic.com;"
   />
   ```

2. **Asset Validation**
   ```typescript
   const validateImageUrl = (url: string): boolean => {
     const allowedDomains = [
       'images.pexels.com',
       'images.unsplash.com',
       // Add other trusted domains
     ];
     try {
       const urlObj = new URL(url);
       return allowedDomains.includes(urlObj.hostname);
     } catch {
       return false;
     }
   };
   ```

## 📦 Asset Optimization

1. **Image Optimization**
   - Use WebP format
   - Implement responsive images
   - Lazy load off-screen images
   - Use appropriate image sizes

2. **Audio Optimization**
   - Use streaming services when possible
   - Compress audio files for sound effects
   - Implement lazy loading for audio

3. **Video Optimization**
   - Use video streaming services
   - Implement lazy loading
   - Use appropriate quality settings

## 🚫 Restrictions

1. **Forbidden Assets**
   - Large video files
   - High-resolution images
   - Uncompressed audio
   - Binary files
   - Base64 encoded assets

2. **Size Limits**
   - Images: Max 200KB
   - Audio: Max 500KB
   - Animations: Max 1MB
   - Total assets: Max 5MB

## 🔄 Asset Update Process

1. **Adding New Assets**
   - Use version control
   - Document asset sources
   - Update asset inventory
   - Test performance impact

2. **Removing Assets**
   - Check for dependencies
   - Update documentation
   - Remove unused assets
   - Clean up references