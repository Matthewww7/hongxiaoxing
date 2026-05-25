import React, { useState, useRef } from 'react';
import { Package, RefreshCw, Plus, X, Edit3, Trash2, Upload, Image as ImageIcon } from 'lucide-react';

const AdminGiftsContent = () => {
  const [gifts, setGifts] = useState([
    {
      id: 1,
      name: '咖啡',
      image: '',
      skus: [
        { id: 101, name: '冰美式',   stock: 500, price: 1 },
        { id: 102, name: '热美式',   stock: 500, price: 1 },
        { id: 103, name: '冰拿铁',   stock: 10,  price: 1 },
        { id: 104, name: '热拿铁',   stock: 10,  price: 1 },
        { id: 105, name: '生椰拿铁', stock: 0,   price: 1 },
      ],
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingGift, setEditingGift] = useState(null);
  const [formName, setFormName] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formSkus, setFormSkus] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const fileInputRef = useRef(null);

  const totalStock = gifts.reduce((sum, g) => sum + g.skus.reduce((s, sku) => s + sku.stock, 0), 0);

  const getSkuStatus = (stock) => {
    if (stock === 0)    return { label: '已售罄', color: '#ef4444', bg: '#fef2f2' };
    if (stock <= 50)    return { label: '紧张',   color: '#f59e0b', bg: '#fffbeb' };
    return { label: '充足', color: '#16a34a', bg: '#f0fdf4' };
  };

  const openAddModal = () => {
    setEditingGift(null);
    setFormName('');
    setFormImage('');
    setFormSkus([{ id: Date.now(), name: '', stock: '', price: '1' }]);
    setFormErrors({});
    setShowModal(true);
  };

  const openEditModal = (gift) => {
    setEditingGift(gift);
    setFormName(gift.name);
    setFormImage(gift.image || '');
    setFormSkus(gift.skus.map(s => ({ ...s, stock: String(s.stock), price: String(s.price) })));
    setFormErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingGift(null);
    setFormName('');
    setFormImage('');
    setFormSkus([]);
    setFormErrors({});
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setFormErrors(prev => ({ ...prev, image: '请选择图片文件' })); return; }
    if (file.size > 5 * 1024 * 1024) { setFormErrors(prev => ({ ...prev, image: '图片大小不能超过 5MB' })); return; }
    const reader = new FileReader();
    reader.onload = (ev) => { setFormImage(ev.target.result); setFormErrors(prev => { const n = { ...prev }; delete n.image; return n; }); };
    reader.readAsDataURL(file);
  };

  const removeImage = () => { setFormImage(''); if (fileInputRef.current) fileInputRef.current.value = ''; };

  const updateSkuField = (skuId, field, value) => {
    setFormSkus(prev => prev.map(s => s.id === skuId ? { ...s, [field]: value } : s));
  };

  const addSkuRow = () => {
    setFormSkus(prev => [...prev, { id: Date.now(), name: '', stock: '', price: '1' }]);
  };

  const removeSkuRow = (skuId) => {
    setFormSkus(prev => prev.filter(s => s.id !== skuId));
  };

  const validate = () => {
    const errors = {};
    if (!formName.trim()) errors.name = '请输入商品名称';
    if (formSkus.length === 0) errors.skus = '至少需要添加一个口味规格';
    formSkus.forEach((s, i) => {
      if (!s.name.trim()) errors[`sku_name_${i}`] = '请输入口味名称';
      if (s.stock === '' || parseInt(s.stock) < 0) errors[`sku_stock_${i}`] = '库存不能为负';
    });
    return errors;
  };

  const handleSubmit = () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    const cleanedSkus = formSkus.map((s, idx) => ({
      id: s.id || (Date.now() + idx),
      name: s.name.trim(),
      stock: parseInt(s.stock) || 0,
      price: parseInt(s.price) || 1,
    }));
    if (editingGift) {
      setGifts(prev => prev.map(g => g.id === editingGift.id ? { ...g, name: formName.trim(), image: formImage, skus: cleanedSkus } : g));
    } else {
      setGifts(prev => [...prev, { id: Date.now(), name: formName.trim(), image: formImage, skus: cleanedSkus }]);
    }
    closeModal();
  };

  return (
    <div className="hx-admin-content pt-6" style={{ background: '#f8fafc' }}>
      {/* Header */}
      <div className="hx-admin-header">
        <div className="hx-admin-header-title">
          <h1>即时奖管理</h1>
          <p>管理员工可兑换的激励商品与库存</p>
        </div>
        <div className="hx-admin-header-actions">
          <div className="hx-stock-pill">
            <Package size={18} className="hx-stock-pill-icon" />
            <div className="hx-stock-pill-info">
              <span className="hx-stock-pill-label">库存余量</span>
              <strong className="hx-stock-pill-value">{totalStock}</strong>
            </div>
            <div className="hx-stock-pill-sync">
              <RefreshCw size={10} />
              <span>刚刚同步</span>
            </div>
          </div>
          <button type="button" className="hx-admin-add-btn" onClick={openAddModal}>
            <Plus size={16} />
            添加新商品
          </button>
        </div>
      </div>

      {/* SPU 横向通栏卡片列表 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {gifts.map((gift) => {
          const giftTotalStock = gift.skus.reduce((s, sku) => s + sku.stock, 0);
          return (
            <div
              key={gift.id}
              style={{
                background: '#fff', borderRadius: 16,
                boxShadow: '0 1px 8px rgba(148,163,184,0.12)',
                border: '1px solid #e2e8f0', overflow: 'hidden',
                display: 'flex', minHeight: 200,
              }}
            >
              {/* 左侧：商品图片区域 */}
              <div style={{
                width: 220, minWidth: 220,
                background: gift.image ? '#fff' : 'linear-gradient(135deg, #007B7A 0%, #065f5e 100%)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '24px 20px', color: gift.image ? '#1e293b' : '#fff',
                position: 'relative', overflow: 'hidden',
              }}>
                {gift.image ? (
                  <img src={gift.image} alt={gift.name} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                ) : (
                  <>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>☕</div>
                    <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>{gift.name}</div>
                    <div style={{ fontSize: 12, opacity: 0.7 }}>总库存 {giftTotalStock}</div>
                  </>
                )}
              </div>

              {/* 右侧：SKU 口味列表 + 操作 */}
              <div style={{ flex: 1, padding: '20px 24px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#374151' }}>口味与库存管理</span>
                  <button type="button" onClick={() => openEditModal(gift)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 5,
                      padding: '6px 14px', borderRadius: 8, border: '1px solid #e2e8f0',
                      background: '#fff', color: '#475569', fontSize: 13, fontWeight: 600,
                      cursor: 'pointer', transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                    onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                  >
                    <Edit3 size={14} /> 编辑
                  </button>
                </div>

                {/* SKU 表头 */}
                <div style={{
                  display: 'grid', gridTemplateColumns: '1fr 120px 100px 80px',
                  gap: 12, padding: '8px 12px', background: '#f8fafc', borderRadius: 8, marginBottom: 6,
                }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5 }}>口味</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, textAlign: 'center' }}>价格</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, textAlign: 'center' }}>库存</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, textAlign: 'center' }}>状态</span>
                </div>

                {/* SKU 行 */}
                {gift.skus.map((sku) => {
                  const skuStatus = getSkuStatus(sku.stock);
                  const isSoldOut = sku.stock === 0;
                  return (
                    <div
                      key={sku.id}
                      style={{
                        display: 'grid', gridTemplateColumns: '1fr 120px 100px 80px',
                        gap: 12, padding: '10px 12px', borderBottom: '1px solid #f1f5f9',
                        alignItems: 'center', opacity: isSoldOut ? 0.45 : 1,
                      }}
                    >
                      <span style={{
                        fontSize: 14, fontWeight: 600,
                        color: isSoldOut ? '#94a3b8' : '#1e293b',
                        textDecoration: isSoldOut ? 'line-through' : 'none',
                      }}>
                        {sku.name}
                      </span>
                      <span style={{ fontSize: 13, color: '#64748b', textAlign: 'center' }}>
                        {sku.price} 洪小星
                      </span>
                      <span style={{
                        fontSize: 14, fontWeight: 700,
                        color: isSoldOut ? '#94a3b8' : '#1e293b',
                        textAlign: 'center',
                      }}>
                        {sku.stock}
                      </span>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <span style={{
                          fontSize: 11, fontWeight: 700,
                          color: skuStatus.color, background: skuStatus.bg,
                          padding: '2px 10px', borderRadius: 999,
                        }}>
                          {skuStatus.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* 添加/编辑 Modal */}
      {showModal && (
        <div className="hx-modal" onClick={closeModal}>
          <div
            className="hx-modal-content"
            style={{
              maxWidth: '640px',
              width: '100%',
              padding: 0,
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header — 固定不压缩 */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '20px 28px 16px', borderBottom: '1px solid #f1f5f9',
              flexShrink: 0,
            }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#1e293b' }}>
                {editingGift ? '编辑商品' : '添加新商品'}
              </h3>
              <button type="button" onClick={closeModal}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, borderRadius: 6, display: 'flex', alignItems: 'center', color: '#94a3b8' }}>
                <X size={20} />
              </button>
            </div>

            {/* Modal Body — 独立滚动区 */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px' }}>
              {/* 商品名称 */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                  商品名称 <span style={{ color: '#E53E3E' }}>*</span>
                </label>
                <input type="text" value={formName}
                  onChange={e => setFormName(e.target.value)}
                  placeholder="如：咖啡"
                  style={{ width: '100%', padding: '10px 14px', border: `1px solid ${formErrors.name ? '#E53E3E' : '#e2e8f0'}`, borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                />
                {formErrors.name && <span style={{ fontSize: 12, color: '#E53E3E', marginTop: 4, display: 'block' }}>{formErrors.name}</span>}
              </div>

              {/* 商品图片 */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                  商品图片
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                {formImage ? (
                  <div style={{ position: 'relative', width: '100%', borderRadius: 8, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                    <img src={formImage} alt="商品图片" style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} />
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                      background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      gap: 8, opacity: 0, transition: 'opacity 0.2s',
                    }}
                      className="image-overlay"
                      onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '0'}
                    >
                      <button type="button" onClick={() => fileInputRef.current?.click()}
                        style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 14px', borderRadius: 6, border: '1px solid #fff', background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                        <Upload size={14} /> 更换
                      </button>
                      <button type="button" onClick={removeImage}
                        style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 14px', borderRadius: 6, border: '1px solid #fff', background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                        <Trash2 size={14} /> 删除
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      width: '100%', height: 160, borderRadius: 8,
                      border: `2px dashed ${formErrors.image ? '#E53E3E' : '#d1d5db'}`,
                      background: '#f9fafb', cursor: 'pointer',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      gap: 8, transition: 'border-color 0.15s, background 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#007B7A'; e.currentTarget.style.background = '#f0fdfa'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.background = '#f9fafb'; }}
                  >
                    <ImageIcon size={32} color="#9ca3af" />
                    <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 500 }}>点击上传商品图片</span>
                    <span style={{ fontSize: 11, color: '#9ca3af' }}>支持 JPG、PNG，最大 5MB</span>
                  </button>
                )}
                {formErrors.image && <span style={{ fontSize: 12, color: '#E53E3E', marginTop: 4, display: 'block' }}>{formErrors.image}</span>}
              </div>

              {/* 口味规格 (SKU) 列表 */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <label style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>
                    口味规格 (SKU) <span style={{ color: '#E53E3E' }}>*</span>
                  </label>
                  <button type="button" onClick={addSkuRow}
                    style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 12px', borderRadius: 6, border: '1px dashed #007B7A', background: '#f0fdfa', color: '#007B7A', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                    <Plus size={14} />
                    添加口味
                  </button>
                </div>
                {formErrors.skus && <span style={{ fontSize: 12, color: '#E53E3E', marginBottom: 8, display: 'block' }}>{formErrors.skus}</span>}

                {/* SKU 表头 */}
                <div style={{
                  display: 'grid', gridTemplateColumns: '1fr 100px 100px 44px',
                  gap: 8, padding: '6px 10px', background: '#f8fafc', borderRadius: 6, marginBottom: 6,
                }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5 }}>口味名称</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, textAlign: 'center' }}>价格</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, textAlign: 'center' }}>库存</span>
                  <span />
                </div>

                {/* SKU 行 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {formSkus.map((sku, idx) => (
                    <div key={sku.id} style={{
                      display: 'grid', gridTemplateColumns: '1fr 100px 100px 44px',
                      gap: 8, alignItems: 'start',
                    }}>
                      <div>
                        <input type="text" value={sku.name}
                          onChange={e => updateSkuField(sku.id, 'name', e.target.value)}
                          placeholder="如：冰美式"
                          style={{ width: '100%', padding: '8px 10px', border: `1px solid ${formErrors[`sku_name_${idx}`] ? '#E53E3E' : '#e2e8f0'}`, borderRadius: 6, fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
                        />
                        {formErrors[`sku_name_${idx}`] && <span style={{ fontSize: 11, color: '#E53E3E', marginTop: 2, display: 'block' }}>{formErrors[`sku_name_${idx}`]}</span>}
                      </div>
                      <input type="number" min="1" value={sku.price}
                        onChange={e => updateSkuField(sku.id, 'price', e.target.value)}
                        placeholder="1"
                        style={{ width: '100%', padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 13, outline: 'none', boxSizing: 'border-box', textAlign: 'center' }}
                      />
                      <div>
                        <input type="number" min="0" value={sku.stock}
                          onChange={e => updateSkuField(sku.id, 'stock', e.target.value)}
                          placeholder="0"
                          style={{ width: '100%', padding: '8px 10px', border: `1px solid ${formErrors[`sku_stock_${idx}`] ? '#E53E3E' : '#e2e8f0'}`, borderRadius: 6, fontSize: 13, outline: 'none', boxSizing: 'border-box', textAlign: 'center' }}
                        />
                        {formErrors[`sku_stock_${idx}`] && <span style={{ fontSize: 11, color: '#E53E3E', marginTop: 2, display: 'block' }}>{formErrors[`sku_stock_${idx}`]}</span>}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 4 }}>
                        <button type="button" onClick={() => removeSkuRow(sku.id)}
                          disabled={formSkus.length <= 1}
                          style={{
                            background: 'none', border: 'none',
                            cursor: formSkus.length <= 1 ? 'not-allowed' : 'pointer',
                            color: formSkus.length <= 1 ? '#cbd5e1' : '#ef4444',
                            padding: 4, borderRadius: 4, display: 'flex', alignItems: 'center',
                            opacity: formSkus.length <= 1 ? 0.4 : 1,
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer — 固定不压缩，纯白背景防穿透 */}
            <div style={{
              display: 'flex', justifyContent: 'flex-end', gap: 10,
              padding: '16px 28px 20px', borderTop: '1px solid #f1f5f9',
              flexShrink: 0, background: '#fff',
            }}>
              <button type="button" onClick={closeModal}
                style={{ padding: '9px 20px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}
              >取消</button>
              <button type="button" onClick={handleSubmit}
                style={{ padding: '9px 20px', borderRadius: 8, border: 'none', background: '#007B7A', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
              >{editingGift ? '保存修改' : '创建商品'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGiftsContent;