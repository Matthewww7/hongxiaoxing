import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Package,
  ClipboardCheck,
  Users,
  Settings,
  LogOut,
  User,
  FileText,
  TrendingUp,
  Menu,
  X,
} from 'lucide-react';
import AdminPending from './AdminPending';
import AdminRedBlack from './AdminRedBlack';
import AdminGiftManagement from './AdminGiftManagement';
import AdminOrders from './AdminOrders';
import AdminUsers from './AdminUsers';

const brandColor = '#007B7A';
const avatarUrl = 'https://i.pravatar.cc/120?img=8';

// 管理后台导航菜单结构
const adminNavGroups = [
  {
    id: 'approval',
    title: '审批与发布',
    icon: CheckCircle,
    defaultExpanded: true,
    items: [
      { id: 'pending', label: '待办审批中心', icon: ClipboardCheck, isDefault: true },
      { id: 'redblack', label: '红黑榜数据发布', icon: TrendingUp },
    ]
  },
  {
    id: 'mall',
    title: '商城与订单',
    icon: Package,
    items: [
      { id: 'gifts', label: '礼品库管理', icon: Package },
      { id: 'orders', label: '兑换订单履约', icon: FileText },
    ]
  },
  {
    id: 'system',
    title: '系统管理',
    icon: Settings,
    items: [
      { id: 'users', label: '人员与积分台账', icon: Users },
    ]
  }
];

const AdminLayout = ({ user, onLogout, initialPage }) => {
  const [currentPage, setCurrentPage] = useState(initialPage || 'pending');
  const [navGroupsState, setNavGroupsState] = useState(() => {
    const state = {};
    adminNavGroups.forEach(group => {
      state[group.id] = group.defaultExpanded || false;
    });
    return state;
  });

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleNavGroup = (groupId) => {
    setNavGroupsState(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const handlePageChange = (page, groupId) => {
    setNavGroupsState(prev => ({
      ...prev,
      [groupId]: true
    }));
    setCurrentPage(page);
  };

  const handleLogout = () => {
    setShowUserMenu(false);
    if (onLogout) {
      onLogout();
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'pending':
        return <AdminPending user={user} onLogout={handleLogout} />;
      case 'redblack':
        return <AdminRedBlack user={user} onLogout={handleLogout} />;
      case 'gifts':
        return <AdminGiftManagement user={user} onLogout={handleLogout} />;
      case 'orders':
        return <AdminOrders user={user} onLogout={handleLogout} />;
      case 'users':
        return <AdminUsers user={user} onLogout={handleLogout} />;
      default:
        return <AdminPending user={user} onLogout={handleLogout} />;
    }
  };

  return (
    <div className="hx-admin-shell">
      {/* 顶部导航栏 */}
      <header className="hx-admin-topbar">
        <button
          className="hx-admin-menu-toggle"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          {sidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>

        <div className="hx-admin-brand" />

        <div className="hx-admin-top-actions">
          <div className="hx-admin-profile-dropdown">
            <button
              className="hx-admin-profile-btn"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <img src={avatarUrl} alt={user?.username || '管理员'} className="hx-admin-profile-avatar" />
              <span className="hx-admin-profile-name">{user?.username || '管理员'}</span>
              <ChevronDown size={14} className={`hx-dropdown-arrow ${showUserMenu ? 'open' : ''}`} />
            </button>

            {showUserMenu && (
              <div className="hx-admin-dropdown-menu">
                <div className="hx-admin-dropdown-header">
                  <img src={avatarUrl} alt={user?.username || '管理员'} className="hx-admin-dropdown-avatar" />
                  <div>
                    <p className="hx-admin-dropdown-name">{user?.username || '管理员'}</p>
                    <span className="hx-admin-dropdown-role">系统管理员</span>
                  </div>
                </div>
                <div className="hx-admin-dropdown-divider" />
                <div className="hx-admin-dropdown-items">
                  <button className="hx-admin-dropdown-item">
                    <User size={16} />
                    <span>个人设置</span>
                  </button>
                  <button className="hx-admin-dropdown-item" onClick={handleLogout}>
                    <LogOut size={16} />
                    <span>退出登录</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 主体内容 */}
      <div className={`hx-admin-body ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        {/* 左侧导航栏 */}
        <aside className="hx-admin-sidebar">
          <nav className="hx-admin-nav">
            {adminNavGroups.map((group) => {
              const Icon = group.icon;
              const isGroupActive = group.items.some(item => item.id === currentPage);
              const isGroupExpanded = navGroupsState[group.id];

              return (
                <div
                  key={group.id}
                  className={`hx-admin-nav-group ${isGroupActive ? 'active' : ''} ${isGroupExpanded ? 'expanded' : 'collapsed'}`}
                >
                  <div
                    className="hx-admin-nav-item"
                    onClick={() => toggleNavGroup(group.id)}
                  >
                    <div className="hx-admin-nav-label">
                      <Icon size={18} />
                      <span>{group.title}</span>
                    </div>
                    {isGroupExpanded ? (
                      <ChevronDown size={16} className="chevron-icon" />
                    ) : (
                      <ChevronRight size={16} className="chevron-icon" />
                    )}
                  </div>
                  <div className="hx-admin-subnav">
                    {group.items.map((item) => {
                      const ItemIcon = item.icon;
                      const isItemActive = currentPage === item.id;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          className={`hx-admin-subnav-item ${isItemActive ? 'active' : ''}`}
                          onClick={() => handlePageChange(item.id, group.id)}
                        >
                          <ItemIcon size={16} />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </nav>
        </aside>

        {/* 右侧内容区 */}
        <main className="hx-admin-main">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;