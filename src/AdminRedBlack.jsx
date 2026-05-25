import React, { useState } from 'react';
import { TrendingUp, Upload, Search } from 'lucide-react';
import AdminLayout from './AdminLayout';

const AdminRedBlack = ({ user, onLogout }) => {
  const [currentPage, setCurrentPage] = useState('redblack');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderContent = () => {
    return (
      <div className="hx-admin-content">
        <div className="hx-admin-breadcrumb">
          <span className="hx-admin-breadcrumb-mark" />
          <span>审批与发布 / 红黑榜数据发布</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
          <button className="hx-admin-primary-btn">
            <Upload size={16} />
            导入数据
          </button>
        </div>

        <div className="hx-admin-stats-row">
          <div className="hx-admin-stat-card">
            <div className="hx-admin-stat-icon">
              <TrendingUp size={24} />
            </div>
            <div className="hx-admin-stat-content">
              <span className="hx-admin-stat-label">本季红榜</span>
              <strong className="hx-admin-stat-value">12</strong>
            </div>
          </div>
          <div className="hx-admin-stat-card">
            <div className="hx-admin-stat-icon">
              <TrendingUp size={24} />
            </div>
            <div className="hx-admin-stat-content">
              <span className="hx-admin-stat-label">本季黑榜</span>
              <strong className="hx-admin-stat-value">3</strong>
            </div>
          </div>
          <div className="hx-admin-stat-card">
            <div className="hx-admin-stat-icon">
              <TrendingUp size={24} />
            </div>
            <div className="hx-admin-stat-content">
              <span className="hx-admin-stat-label">待发布</span>
              <strong className="hx-admin-stat-value">5</strong>
            </div>
          </div>
        </div>

        <div className="hx-admin-table-empty">
          <div className="hx-admin-empty-icon">📊</div>
          <h3>红黑榜数据管理</h3>
          <p>请导入或手动添加红黑榜数据</p>
        </div>
      </div>
    );
  };

  return (
    <AdminLayout
      user={user}
      onLogout={onLogout}
      currentPage={currentPage}
      onPageChange={handlePageChange}
    >
      {renderContent()}
    </AdminLayout>
  );
};

export default AdminRedBlack;