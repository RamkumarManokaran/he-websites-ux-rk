"use client";
import React, { Component, ReactNode } from "react";

interface CleverErrorBoundaryProps {
  children: ReactNode;
}

interface CleverErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  timestamp: string | null;
}

export default class CleverErrorBoundary extends Component<
  CleverErrorBoundaryProps,
  CleverErrorBoundaryState
> {
  constructor(props: CleverErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      timestamp: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error, timestamp: new Date().toISOString() };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error captured by CleverErrorBoundary:", {
      error,
      errorStack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: this.state.timestamp,
    });

    // Optionally send logs to an external logging service like Sentry
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      timestamp: null,
    });
  };

  render() {
    if (this.state.hasError) {
      const { error, errorInfo, timestamp } = this.state;

      return (
        <div className="p-6 bg-red-50 text-red-900 border border-red-300 rounded shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
          <p className="mb-2">
            <strong>Error:</strong> {error?.message || "Unknown error occurred"}
          </p>
          <p className="mb-2">
            <strong>Time:</strong> {timestamp}
          </p>
          {error?.stack && (
            <details className="mb-2">
              <summary className="cursor-pointer text-blue-600">
                View Error Stack
              </summary>
              <pre className="bg-gray-100 p-2 rounded overflow-auto text-sm">
                {error.stack}
              </pre>
            </details>
          )}
          {errorInfo?.componentStack && (
            <details>
              <summary className="cursor-pointer text-blue-600">
                View Component Stack
              </summary>
              <pre className="bg-gray-100 p-2 rounded overflow-auto text-sm">
                {errorInfo.componentStack}
              </pre>
            </details>
          )}
          <button
            onClick={this.resetError}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
