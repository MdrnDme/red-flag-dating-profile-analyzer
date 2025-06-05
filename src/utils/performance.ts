export const Performance = {
  mark: (name: string) => {
    try {
      performance.mark(name);
    } catch (e) {
      console.error('Performance mark failed:', e);
    }
  },

  measure: (name: string, startMark: string, endMark: string) => {
    try {
      performance.measure(name, startMark, endMark);
      const measure = performance.getEntriesByName(name).pop();
      if (measure) {
        analytics.trackTiming('Performance', name, measure.duration);
      }
    } catch (e) {
      console.error('Performance measure failed:', e);
    }
  },

  clearMarks: () => {
    try {
      performance.clearMarks();
    } catch (e) {
      console.error('Clear marks failed:', e);
    }
  }
};