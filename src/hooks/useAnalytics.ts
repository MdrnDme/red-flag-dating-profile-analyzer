import { useEffect, useCallback } from 'react';
import { analytics } from '../utils/analytics';

export function useAnalytics() {
  const trackEvent = useCallback((category: string, action: string, label?: string) => {
    analytics.trackEvent(category, action, label);
  }, []);

  const trackTiming = useCallback((variable: string, value: number) => {
    analytics.trackTiming('Performance', variable, value);
  }, []);

  useEffect(() => {
    const reportWebVitals = async () => {
      const { onCLS, onFID, onLCP } = await import('web-vitals');
      
      onCLS((metric) => trackTiming('CLS', metric.value));
      onFID((metric) => trackTiming('FID', metric.value));
      onLCP((metric) => trackTiming('LCP', metric.value));
    };

    reportWebVitals();
  }, [trackTiming]);

  return { trackEvent, trackTiming };
}