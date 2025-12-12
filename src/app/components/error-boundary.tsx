'use client';

import { ReactNode, Component, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ChatErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Chat error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-sm text-red-500 bg-red-50 rounded">
          <p>Something went wrong with the chat.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-xs underline"
          >
            Refresh page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
