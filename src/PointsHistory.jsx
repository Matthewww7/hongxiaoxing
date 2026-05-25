import React, { useState } from 'react';
import { History, Plus, Minus, User, Calendar, Filter } from 'lucide-react';

const PointsHistory = ({ user, onLogout }) => {
  const [history, setHistory] = useState([
    {
      id: 1,
      userId: 'user001',
      userName: '张三',
      type: 'earn',
      amount: 500,
      reason: '月度绩效奖励',
      date: '2024-01-15',
      giftId: null,
      giftName: null
    },
    {
      id: 2,
      userId: 'user002',
      userName: '李四',
      type: 'spend',
      amount: -200,
      reason: '兑换星巴克咖啡券',
      date: '2024-01-16',
      giftId: 1,
      giftName: '星巴克咖啡券'
    },
    {
      id: 3,
      userId: 'user003',
      userName: '王五',
      type: 'earn',
      amount: 300,
      reason: '项目完成奖励',
      date: '2024-01-17',
      giftId: null,
      giftName: null
    }
  ]);

  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = history.filter(item => {
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesSearch = searchTerm === '' ||
      item.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reason.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const totalEarned = history.filter(h => h.type === 'earn').reduce((sum, h) => sum + h.amount, 0);
  const totalSpent = Math.abs(history.filter(h => h.type === 'spend').reduce((sum, h) => sum + h.amount, 0));

  return (
    <div className="hx-page">
      <div className="hx-card">
        <div className="hx-section-title">
          <History size={18} color="#007B7A" />
          <h2>洪小星明细记录</h2>
          <span className="hx-welcome-user">欢迎，{user.username}</span>
        </div>

        {/* 统计卡片 */}
        <div className="hx-stats-row">
          <div className="hx-stat-card">
            <div className="hx-stat-icon earn">
              <Plus size={20} />
            </div>
            <div className="hx-stat-content">
              <p className="hx-stat-value">+{totalEarned}</p>
              <p className="hx-stat-label">累计获得洪小星</p>
            </div>
          </div>
          <div className="hx-stat-card">
            <div className="hx-stat-icon spend">
              <Minus size={20} />
            </div>
            <div className="hx-stat-content">
              <p className="hx-stat-value">-{totalSpent}</p>
              <p className="hx-stat-label">累计消耗洪小星</p>
            </div>
          </div>
          <div className="hx-stat-card">
            <div className="hx-stat-icon total">
              <User size={20} />
            </div>
            <div className="hx-stat-content">
              <p className="hx-stat-value">{history.length}</p>
              <p className="hx-stat-label">总交易次数</p>
            </div>
          </div>
        </div>

        {/* 筛选和搜索 */}
        <div className="hx-controls-row">
          <div className="hx-filter-group">
            <Filter size={16} />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="hx-select"
            >
              <option value="all">全部类型</option>
              <option value="earn">获得洪小星</option>
              <option value="spend">消费洪小星</option>
            </select>
          </div>

          <div className="hx-search-group">
            <input
              type="text"
              placeholder="搜索用户名或原因..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="hx-input"
            />
          </div>
        </div>

        {/* 明细列表 */}
        <div className="hx-history-list">
          {filteredHistory.map(item => (
            <div key={item.id} className={`hx-history-item ${item.type}`}>
              <div className="hx-history-icon">
                {item.type === 'earn' ? (
                  <div className="hx-earn-icon">
                    <Plus size={16} />
                  </div>
                ) : (
                  <div className="hx-spend-icon">
                    <Minus size={16} />
                  </div>
                )}
              </div>
              <div className="hx-history-content">
                <div className="hx-history-header">
                  <span className="hx-user-name">{item.userName}</span>
                  <span className="hx-history-date">{item.date}</span>
                </div>
                <p className="hx-history-reason">{item.reason}</p>
                {item.giftName && (
                  <p className="hx-gift-info">🎁 兑换礼品: {item.giftName}</p>
                )}
              </div>
              <div className="hx-history-amount">
                <span className={`hx-amount ${item.type}`}>
                  {item.type === 'earn' ? '+' : '-'}{Math.abs(item.amount)}
                </span>
                <span className="hx-points-label">洪小星</span>
              </div>
            </div>
          ))}
        </div>

        {filteredHistory.length === 0 && (
          <div className="hx-empty-state">
            <Calendar size={48} color="#ccc" />
            <p>暂无符合条件的洪小星记录</p>
          </div>
        )}
      </div>
      <button onClick={onLogout} className="hx-logout-btn" style={{ backgroundColor: '#dc2626' }}>
        退出登录
      </button>
    </div>
  );
};

export default PointsHistory;