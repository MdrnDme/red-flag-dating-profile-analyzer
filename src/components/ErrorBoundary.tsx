import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="card max-w-lg text-center">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-slate-600 mb-6">
              Even our AI needs a break sometimes. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}