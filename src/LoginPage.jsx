import React, { useState } from 'react';
import { User, Lock, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';

const LoginPage = ({ onLogin, onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      onLogin({
        username,
        type: 'admin',
        loginTime: new Date().toISOString()
      });
    }
  };

  return (
    <div className="hx-login-page">
      <div className="hx-login-container">
        {/* 返回门户 — 轻量文本链接 */}
        {onBack && (
          <button
            type="button"
            className="hx-login-back"
            onClick={onBack}
          >
            <ArrowLeft size={14} />
            <span>返回门户</span>
          </button>
        )}

        {/* Header — Logo + 标题 */}
        <div className="hx-login-header">
          <div className="hx-brand-badge">
            <ShieldCheck size={32} className="hx-brand-icon" />
          </div>
          <h1>洪兴门户</h1>
          <p>系统管理后台登录</p>
        </div>

        {/* 表单 */}
        <form onSubmit={handleSubmit} className="hx-login-form">
          <div className="hx-form-group">
            <label htmlFor="username">用户名</label>
            <div className="hx-input-wrap">
              <User size={16} className="hx-input-icon" />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="请输入管理员账号"
                required
              />
            </div>
          </div>

          <div className="hx-form-group">
            <label htmlFor="password">密码</label>
            <div className="hx-input-wrap">
              <Lock size={16} className="hx-input-icon" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
                required
              />
            </div>
          </div>

          <button type="submit" className="hx-btn hx-btn-primary hx-login-btn">
            登录
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="hx-login-footer">
          <p>默认账号：admin / admin123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
