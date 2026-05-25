import React, { useState } from 'react';
import { Package, Plus, Edit, Trash2, Gift, Users, TrendingUp } from 'lucide-react';

const GiftManagement = ({ user, onLogout }) => {
  const [gifts, setGifts] = useState([
    {
      id: 1,
      name: '星巴克咖啡券',
      description: '价值30元的星巴克咖啡券',
      pointsCost: 300,
      stock: 50,
      category: '餐饮',
      image: 'https://via.placeholder.com/80',
      createdAt: '2024-01-15',
      status: 'active'
    },
    {
      id: 2,
      name: '京东购物卡',
      description: '价值100元的京东购物卡',
      pointsCost: 1000,
      stock: 20,
      category: '购物',
      image: 'https://via.placeholder.com/80',
      createdAt: '2024-01-20',
      status: 'active'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingGift, setEditingGift] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    pointsCost: '',
    stock: '',
    category: '',
    image: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingGift) {
      setGifts(gifts.map(gift =>
        gift.id === editingGift.id
          ? { ...gift, ...formData, pointsCost: parseInt(formData.pointsCost), stock: parseInt(formData.stock) }
          : gift
      ));
      setEditingGift(null);
    } else {
      const newGift = {
        id: Date.now(),
        ...formData,
        pointsCost: parseInt(formData.pointsCost),
        stock: parseInt(formData.stock),
        createdAt: new Date().toISOString().split('T')[0],
        status: 'active'
      };
      setGifts([...gifts, newGift]);
    }
    setFormData({ name: '', description: '', pointsCost: '', stock: '', category: '', image: '' });
    setShowForm(false);
  };

  const handleEdit = (gift) => {
    setFormData({
      name: gift.name,
      description: gift.description,
      pointsCost: gift.pointsCost.toString(),
      stock: gift.stock.toString(),
      category: gift.category,
      image: gift.image
    });
    setEditingGift(gift);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('确定要删除这个礼品吗？')) {
      setGifts(gifts.filter(gift => gift.id !== id));
    }
  };

  return (
    <div className="hx-page">
      <div className="hx-card">
        <div className="hx-section-title">
          <Package size={18} color="#007B7A" />
          <h2>礼品库管理</h2>
          <span className="hx-welcome-user">欢迎，{user.username}</span>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="hx-btn hx-btn-primary mb-4"
          style={{ backgroundColor: '#007B7A' }}
        >
          <Plus size={16} />
          添加新礼品
        </button>

        {/* 表单模态框 */}
        {showForm && (
          <div className="hx-modal">
            <div className="hx-modal-content">
              <h3>{editingGift ? '编辑礼品' : '添加新礼品'}</h3>
              <form onSubmit={handleSubmit}>
                <div className="hx-form-group">
                  <label>礼品名称</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="hx-form-group">
                  <label>描述</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="hx-form-row">
                  <div className="hx-form-group">
                    <label>所需洪小星</label>
                    <input
                      type="number"
                      value={formData.pointsCost}
                      onChange={(e) => setFormData({ ...formData, pointsCost: e.target.value })}
                      required
                    />
                  </div>

                  <div className="hx-form-group">
                    <label>库存数量</label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="hx-form-group">
                  <label>分类</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="">选择分类</option>
                    <option value="餐饮">餐饮</option>
                    <option value="购物">购物</option>
                    <option value="娱乐">娱乐</option>
                    <option value="生活">生活</option>
                    <option value="其他">其他</option>
                  </select>
                </div>

                <div className="hx-form-actions">
                  <button type="submit" className="hx-btn hx-btn-primary">
                    {editingGift ? '更新' : '保存'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingGift(null);
                      setFormData({ name: '', description: '', pointsCost: '', stock: '', category: '', image: '' });
                    }}
                    className="hx-btn hx-btn-ghost"
                  >
                    取消
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 礼品列表 */}
        <div className="hx-gift-grid">
          {gifts.map(gift => (
            <div key={gift.id} className="hx-gift-item">
              <img src={gift.image} alt={gift.name} className="hx-gift-image" />
              <div className="hx-gift-info">
                <h4>{gift.name}</h4>
                <p className="hx-gift-desc">{gift.description}</p>
                <div className="hx-gift-meta">
                  <span className="hx-points">💰 {gift.pointsCost} 洪小星</span>
                  <span className="hx-stock">📦 库存: {gift.stock}</span>
                  <span className="hx-category">🏷️ {gift.category}</span>
                </div>
              </div>
              <div className="hx-gift-actions">
                <button
                  onClick={() => handleEdit(gift)}
                  className="hx-btn hx-btn-small"
                >
                  <Edit size={14} />
                </button>
                <button
                  onClick={() => handleDelete(gift.id)}
                  className="hx-btn hx-btn-small hx-btn-danger"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={onLogout} className="hx-logout-btn" style={{ backgroundColor: '#dc2626' }}>
        退出登录
      </button>
    </div>
  );
};

export default GiftManagement;