
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Error boundary for the entire app
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Application error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
            <h2 className="text-xl font-bold text-red-600 mb-4">Application Error</h2>
            <p className="mb-4">Sorry, something went wrong loading the application.</p>
            <p className="text-sm text-gray-600 mb-4">
              {this.state.error && this.state.error.message}
            </p>
            <p className="text-sm mb-4">
              Please make sure your environment variables are correctly set in the .env file.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

// Create the root and render the app with error boundary
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
