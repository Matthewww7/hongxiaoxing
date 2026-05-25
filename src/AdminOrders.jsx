import React, { useState } from 'react';
import { FileText, Search, Download } from 'lucide-react';
import AdminLayout from './AdminLayout';

const AdminOrders = ({ user, onLogout }) => {
  const [currentPage, setCurrentPage] = useState('orders');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderContent = () => {
    return (
      <div className="hx-admin-content">
        <div className="hx-admin-breadcrumb">
          <span className="hx-admin-breadcrumb-mark" />
          <span>商城与订单 / 兑换订单履约</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
          <button className="hx-admin-secondary-btn">
            <Download size={16} />
            导出订单
          </button>
        </div>

        <div className="hx-admin-stats-row">
          <div className="hx-admin-stat-card">
            <div className="hx-admin-stat-icon">
              <FileText size={24} />
            </div>
            <div className="hx-admin-stat-content">
              <span className="hx-admin-stat-label">总订单数</span>
              <strong className="hx-admin-stat-value">156</strong>
            </div>
          </div>
          <div className="hx-admin-stat-card">
            <div className="hx-admin-stat-icon">
              <FileText size={24} />
            </div>
            <div className="hx-admin-stat-content">
              <span className="hx-admin-stat-label">待处理</span>
              <strong className="hx-admin-stat-value">12</strong>
            </div>
          </div>
          <div className="hx-admin-stat-card">
            <div className="hx-admin-stat-icon">
              <FileText size={24} />
            </div>
            <div className="hx-admin-stat-content">
              <span className="hx-admin-stat-label">已完成</span>
              <strong className="hx-admin-stat-value">144</strong>
            </div>
          </div>
        </div>

        <div className="hx-admin-table-empty">
          <div className="hx-admin-empty-icon">📦</div>
          <h3>订单管理</h3>
          <p>订单数据加载中...</p>
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

export default AdminOrders;