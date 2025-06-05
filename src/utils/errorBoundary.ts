export const ErrorLogger = {
  captureError: (error: Error, context?: string) => {
    console.error(`[${context}] Error:`, error);
    
    // Track error in analytics
    analytics.trackEvent('error', error.name, `${context}: ${error.message}`);
    
    // You could also send to an error reporting service here
    try {
      const errorData = {
        name: error.name,
        message: error.message,
        stack: error.stack,
        context,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
      };
      
      console.log('Error Data:', errorData);
    } catch (e) {
      console.error('Error logging failed:', e);
    }
  }
};