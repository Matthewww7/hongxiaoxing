import React, { useState } from 'react';
import { ChevronDown, LayoutGrid, Palette, Settings2 } from 'lucide-react';
import AdminPortalConfig from './AdminPortalConfig';

const avatarUrl = 'https://i.pravatar.cc/120?img=12';

function getDisplayName(user) {
  if (!user?.username) return '管理员';
  if (user.username === 'admin') return '门户管理员';
  return user.username;
}

const AdminPortalPage = ({ user, onLogout }) => {
  const displayName = getDisplayName(user);
  const [currentSection, setCurrentSection] = useState('shortcut');

  return (
    <div className="hx-employee-shell">
      <header className="hx-employee-topbar">
        <div className="hx-employee-brand" />

        <div className="hx-employee-top-actions">
          <div className="hx-employee-profile">
            <img src={avatarUrl} alt={displayName} className="hx-employee-profile-avatar" />
            <span className="hx-employee-profile-name">{displayName}</span>
            <span className="hx-employee-profile-divider">|</span>
            <button type="button" className="hx-employee-profile-logout" onClick={onLogout}>
              退出
            </button>
          </div>
        </div>
      </header>

      <div className="hx-employee-body">
        <aside className="hx-employee-sidebar">
          <nav className="hx-employee-nav">
            <div className="hx-employee-nav-group active expanded">
              <div className="hx-employee-nav-item">
                <div className="hx-employee-nav-label">
                  <Settings2 size={18} />
                  <span>门户配置</span>
                </div>
                <ChevronDown size={16} className="chevron-icon" />
              </div>
              <div className="hx-employee-subnav">
                <button type="button" className={`hx-employee-subnav-item ${currentSection === 'shortcut' ? 'active' : ''}`} onClick={() => setCurrentSection('shortcut')}>
                  <LayoutGrid size={14} />
                  快捷入口
                </button>
                <button type="button" className={`hx-employee-subnav-item ${currentSection === 'style' ? 'active' : ''}`} onClick={() => setCurrentSection('style')}>
                  <Palette size={14} />
                  体验卡配置
                </button>
              </div>
            </div>
          </nav>
        </aside>

        <main className="hx-employee-main">
          <AdminPortalConfig currentSection={currentSection} />
        </main>
      </div>
    </div>
  );
};

export default AdminPortalPage;
