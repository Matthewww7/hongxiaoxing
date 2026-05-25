import './index.css';
import React, { useState, Component } from "react";
import { createRoot } from "react-dom/client";
import HongxingPortalPage from "./HongxingPortalPage";
import LoginPage from "./LoginPage";
import EmployeeGiftShop from "./EmployeeGiftShop";
import AdminPortalPage from "./AdminPortalPage";
import "./hongxing-portal.css";

// 错误边界 — 捕获白屏并显示错误信息
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("ErrorBoundary caught:", error, errorInfo);
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, color: '#fff', background: '#1a1a1a', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h2 style={{ color: '#ff6b6b' }}>⚠ 渲染错误</h2>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', background: '#2a2a2a', padding: 16, borderRadius: 8 }}>
            {this.state.error?.toString()}
          </pre>
          {this.state.errorInfo && (
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', background: '#2a2a2a', padding: 16, borderRadius: 8, marginTop: 12, fontSize: 12, color: '#aaa' }}>
              {this.state.errorInfo.componentStack}
            </pre>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('ranking-red');
  const [appView, setAppView] = useState('portal'); // 'portal' | 'login' | 'app' | 'admin-config'
  const [loginType, setLoginType] = useState('employee');

  const handleLogout = () => {
    setUser(null);
    setLoginType('employee');
    setAppView('portal');
  };

  const handlePortalClick = (action) => {
    if (action === 'my-hongxiaoxing') {
      setUser({ name: '陈予安', role: 'employee' });
      setCurrentView('ranking-red');
      setAppView('app');
    }
    if (action === 'admin-login') {
      setLoginType('admin');
      setAppView('login');
    }
  };

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    if (loggedInUser.type === 'admin') {
      setAppView('admin-config');
      return;
    }
    setCurrentView('ranking-red');
    setAppView('app');
  };

  const renderContent = () => {
    if (appView === 'login') {
      return <LoginPage onLogin={handleLogin} onBack={() => setAppView('portal')} initialUserType={loginType} />;
    }
    if (appView === 'admin-config' && user) {
      return <AdminPortalPage user={user} onLogout={handleLogout} />;
    }
    if (!user || appView === 'portal') {
      return <HongxingPortalPage onAction={handlePortalClick} />;
    }
    return (
      <EmployeeGiftShop
        user={user}
        currentPage={currentView}
        setCurrentView={setCurrentView}
        onLogout={handleLogout}
      />
    );
  };

  return (
    <div className="hx-app">
      {renderContent()}
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
