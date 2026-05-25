import React, { useMemo, useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Gift,
  Globe,
  LayoutGrid,
  Link2,
  Pencil,
  Plus,
  Search,
  Sparkles,
  Trash2,
  Trophy,
  Star,
  ShoppingBag,
  Settings,
  Users,
  X,
  ClipboardList,
  Megaphone,
  FileText,
  LayoutDashboard,
  Eye,
  Clock,
  Layers,
  Crown,
} from 'lucide-react';

const iconOptions = [
  { key: 'LayoutDashboard', Icon: LayoutDashboard },
  { key: 'Trophy',          Icon: Trophy },
  { key: 'Star',            Icon: Star },
  { key: 'Gift',            Icon: Gift },
  { key: 'ShoppingBag',     Icon: ShoppingBag },
  { key: 'Settings',        Icon: Settings },
  { key: 'Globe',           Icon: Globe },
  { key: 'Users',           Icon: Users },
  { key: 'ClipboardList',   Icon: ClipboardList },
  { key: 'Megaphone',       Icon: Megaphone },
  { key: 'FileText',        Icon: FileText },
];

const defaultEntries = [
  { id: 1,  name: '质量改进',    url: '/quality',      sortOrder: '1',  icon: 'LayoutDashboard', active: true, updatedAt: '2026-04-28 09:20' },
  { id: 2,  name: '洪小星排行',  url: '/ranking',      sortOrder: '2',  icon: 'Trophy',          active: true, updatedAt: '2026-04-28 09:22' },
  { id: 3,  name: '我的积分',    url: '/points',       sortOrder: '3',  icon: 'Star',            active: true, updatedAt: '2026-04-28 09:25' },
  { id: 4,  name: '积分兑换',    url: '/shop',         sortOrder: '4',  icon: 'Gift',            active: true, updatedAt: '2026-04-28 09:28' },
  { id: 5,  name: '我的订单',    url: '/orders',       sortOrder: '5',  icon: 'ShoppingBag',     active: true, updatedAt: '2026-04-28 09:30' },
  { id: 6,  name: '积分审核',    url: '/admin/review', sortOrder: '6',  icon: 'ClipboardList',  active: true, updatedAt: '2026-04-28 09:32' },
  { id: 7,  name: '红黑榜管理',  url: '/admin/rb',     sortOrder: '7',  icon: 'Megaphone',      active: true, updatedAt: '2026-04-28 09:35' },
  { id: 8,  name: '激励库',      url: '/admin/gifts',  sortOrder: '8',  icon: 'Gift',            active: true, updatedAt: '2026-04-28 09:38' },
  { id: 9,  name: '兑换记录',    url: '/admin/orders', sortOrder: '9',  icon: 'FileText',        active: true, updatedAt: '2026-04-28 09:40' },
  { id: 10, name: '积分分配',    url: '/admin/users',  sortOrder: '10', icon: 'Users',           active: true, updatedAt: '2026-04-28 09:42' },
  { id: 11, name: '基础设置',    url: '/settings',     sortOrder: '11', icon: 'Settings',       active: true, updatedAt: '2026-04-28 09:45' },
  { id: 12, name: '门户配置',    url: '/admin/portal', sortOrder: '12', icon: 'Globe',           active: true, updatedAt: '2026-04-28 09:48' },
];

const skinLibrarySeed = [
  {
    id: 'lv1',
    level: 1,
    name: '默认清新绿',
    tagline: '基础办公皮肤',
    description: '清新绿渐变搭配轻盈白卡，适合全员日常办公使用。',
    gradient: 'linear-gradient(135deg, #2dd4bf, #059669)',
    previewTheme: 'jade',
    accentColor: '#059669',
    accentLight: '#ccfbf1',
    rarityLabel: '基础款',
    grantHint: '默认长期生效',
  },
  {
    id: 'lv2',
    level: 2,
    name: '深空科技版',
    tagline: '深邃蓝灰渐变',
    description: '深邃蓝灰渐变，强化数字化科技氛围。',
    gradient: 'linear-gradient(135deg, #3b82f6, #0891b2)',
    previewTheme: 'darktech',
    accentColor: '#0891b2',
    accentLight: '#cffafe',
    rarityLabel: '进阶款',
    grantHint: '适合科技氛围',
  },
  {
    id: 'lv3',
    level: 3,
    name: '星幕紫曜版',
    tagline: '深紫星空质感',
    description: '深紫星空质感，象征卓越贡献与技术引领。',
    gradient: 'linear-gradient(135deg, #a855f7, #4f46e5)',
    previewTheme: 'violetstar',
    accentColor: '#7c3aed',
    accentLight: '#ede9fe',
    rarityLabel: '限定款',
    grantHint: '适合活动体验',
  },
  {
    id: 'lv4',
    level: 4,
    name: '赤焰流金版',
    tagline: '橙金激励质感',
    description: '橙金渐变搭配暖色光泽，彰显核心专家的热忱与权威。',
    gradient: 'linear-gradient(135deg, #f97316, #d97706)',
    previewTheme: 'ambergold',
    accentColor: '#d97706',
    accentLight: '#fef3c7',
    rarityLabel: '核心款',
    grantHint: '适合核心专家',
  },
  {
    id: 'lv5',
    level: 5,
    name: '醇砂咖金版',
    tagline: '咖褐奢金质感',
    description: '咖褐底色点缀流光金纹，彰显资深专家的沉稳与底蕴。',
    gradient: 'linear-gradient(135deg, #78716c, #ca8a04cc)',
    previewTheme: 'coffeegold',
    accentColor: '#a16207',
    accentLight: '#fef9c3',
    rarityLabel: '资深款',
    grantHint: '适合资深专家',
  },
  {
    id: 'lv6',
    level: 6,
    name: '尊享黑金版',
    tagline: '至尊品质皮肤',
    description: '黑金质感背景搭配金色发光特效，彰显至尊品质。',
    gradient: 'linear-gradient(135deg, #211d1c, #1b1716)',
    previewTheme: 'blackgold',
    accentColor: '#fbbf24',
    accentLight: '#fef3c7',
    borderColor: 'rgba(251,191,36,0.5)',
    rarityLabel: '最高级',
    grantHint: '适合优秀员工专项发放',
  },
];

const employeesSeed = [
  {
    id: 1,
    name: '张三',
    department: '研发中心',
    role: '专责架构师',
    avatar: 'https://i.pravatar.cc/100?img=12',
    level: 4,
    skinId: 'lv1',
    skinName: '默认清新绿',
    experienceStartAt: '2026-04-01',
    experienceEndsAt: '',
    lastUpdatedAt: '2026-04-28 10:00',
    updatedBy: '门户管理员',
    history: [
      { id: 11, skinName: '默认清新绿', startAt: '2026-04-28 10:00', endAt: '当前生效', operator: '门户管理员', note: '恢复默认办公风格' },
      { id: 12, skinName: '尊享黑金版', startAt: '2026-04-20 09:00', endAt: '2026-04-23 23:59', operator: '品牌运营', note: '节前黑金体验发放' },
    ],
  },
  {
    id: 2,
    name: '李敏',
    department: '测试中心',
    role: '测试经理',
    avatar: 'https://i.pravatar.cc/100?img=21',
    level: 3,
    skinId: 'lv3',
    skinName: '星幕紫曜版',
    experienceStartAt: '2026-04-27',
    experienceEndsAt: '2026-04-30',
    lastUpdatedAt: '2026-04-27 18:20',
    updatedBy: '品牌运营',
    history: [
      { id: 21, skinName: '星幕紫曜版', startAt: '2026-04-27 18:20', endAt: '2026-04-30 23:59', operator: '品牌运营', note: '骨干成员专项体验发放' },
      { id: 22, skinName: '默认清新绿', startAt: '2026-04-01 09:00', endAt: '2026-04-27 18:19', operator: '门户管理员', note: '默认办公主题' },
    ],
  },
  {
    id: 3,
    name: '王珊珊',
    department: '产品设计部',
    role: '交互设计师',
    avatar: 'https://i.pravatar.cc/100?img=32',
    level: 2,
    skinId: 'lv2',
    skinName: '深空科技版',
    experienceStartAt: '2026-04-26',
    experienceEndsAt: '2026-05-26',
    lastUpdatedAt: '2026-04-26 14:12',
    updatedBy: '体验设计组',
    history: [
      { id: 31, skinName: '深空科技版', startAt: '2026-04-26 14:12', endAt: '当前生效', operator: '体验设计组', note: '设计周主题切换' },
      { id: 32, skinName: '默认清新绿', startAt: '2026-04-01 09:00', endAt: '2026-04-26 14:11', operator: '门户管理员', note: '默认办公主题' },
    ],
  },
  {
    id: 4,
    name: '陈浩宇',
    department: '研发中心',
    role: '高级前端工程师',
    avatar: 'https://i.pravatar.cc/100?img=45',
    level: 5,
    skinId: 'lv6',
    skinName: '尊享黑金版',
    experienceStartAt: '2026-04-15',
    experienceEndsAt: '2026-05-15',
    lastUpdatedAt: '2026-04-25 09:30',
    updatedBy: '品牌运营',
    history: [
      { id: 41, skinName: '尊享黑金版', startAt: '2026-04-15 09:30', endAt: '2026-05-15 23:59', operator: '品牌运营', note: '季度优秀员工奖励' },
    ],
  },
  {
    id: 5,
    name: '林晓峰',
    department: '运营部',
    role: '运营专员',
    avatar: 'https://i.pravatar.cc/100?img=53',
    level: 1,
    skinId: 'lv1',
    skinName: '默认清新绿',
    experienceStartAt: '',
    experienceEndsAt: '',
    lastUpdatedAt: '2026-04-20 11:00',
    updatedBy: '门户管理员',
    history: [],
  },
  {
    id: 6,
    name: '赵雅琴',
    department: '产品设计部',
    role: '视觉设计师',
    avatar: 'https://i.pravatar.cc/100?img=9',
    level: 4,
    skinId: 'lv4',
    skinName: '赤焰流金版',
    experienceStartAt: '2026-04-10',
    experienceEndsAt: '2026-05-10',
    lastUpdatedAt: '2026-04-22 16:45',
    updatedBy: '体验设计组',
    history: [
      { id: 61, skinName: '赤焰流金版', startAt: '2026-04-10 16:45', endAt: '2026-05-10 23:59', operator: '体验设计组', note: '创意周活动专属' },
    ],
  },
];

const emptyForm = { name: '', url: '', sortOrder: '', icon: '' };

// =============================================
//  等级勋章组件
// =============================================
const LevelBadge = ({ level }) => {
  const tier =
    level === 1 ? 'jade' : level === 2 ? 'darktech' : level === 3 ? 'violet' : level === 4 ? 'amber' : level === 5 ? 'coffee' : 'supreme';

  if (tier === 'supreme') {
    return (
      <span className="hx-level-badge hx-level-supreme">
        <Crown size={12} className="hx-level-crown" />
        <span>Lv{level}</span>
      </span>
    );
  }

  if (tier === 'coffee' || tier === 'amber') {
    return (
      <span className={`hx-level-badge hx-level-${tier}`}>
        <Crown size={12} className="hx-level-crown" />
        <span>Lv{level}</span>
      </span>
    );
  }

  return (
    <span className={`hx-level-badge hx-level-${tier}`}>
      <span className="hx-level-dot" />
      <span>Lv{level}</span>
    </span>
  );
};

const renderSkinPreview = (skin, mode = 'card') => {
  const isBlackgold = skin.previewTheme === 'blackgold';
  return (
    <div
      className={`hx-skin-preview-surface ${mode === 'carousel' ? 'is-carousel' : ''}`}
      style={{
        background: skin.gradient,
        ...(isBlackgold ? {
          boxShadow: 'inset 0 1px rgba(254,236,179,0.24), inset 0 -24px 38px rgba(0,0,0,0.24), 0 0 24px rgba(234,179,8,0.12)',
          border: skin.borderColor ? `1px solid ${skin.borderColor}` : undefined,
        } : {}),
      }}
    >
      <div className="hx-skin-preview-topband" />
      <div className="hx-skin-preview-glow" />
      <div className="hx-skin-preview-content">
        <span className="hx-skin-preview-orb" />
        <span className="hx-skin-preview-stroke short" />
        <span className="hx-skin-preview-stroke" />
      </div>
      <div
        className="hx-skin-preview-badge"
        style={isBlackgold ? { background: 'rgba(202,138,4,0.88)', color: '#111827' } : skin.accentColor ? { background: `${skin.accentColor}33`, color: skin.accentColor } : undefined}
      >
        {isBlackgold ? <Crown size={11} /> : null}
        <span>LV{skin.level}</span>
      </div>
    </div>
  );
};

// =============================================
//  体验周期格式化
// =============================================
const formatCycle = (start, end) => {
  const fmt = (d) => {
    if (!d) return '';
    const [y, m, day] = d.split('-');
    return `${y}.${m}.${day}`;
  };
  if (!start && !end) return '—';
  if (start && !end) return `${fmt(start)} - 永久`;
  return `${fmt(start)} - ${fmt(end)}`;
};

const AdminPortalConfig = ({ currentSection }) => {
  const [entries, setEntries] = useState(defaultEntries);
  const [saveSuccess, setSaveSuccess] = useState('');
  const [employees, setEmployees] = useState(employeesSeed);
  const [employeeKeyword, setEmployeeKeyword] = useState('');

  // Modal state (shortcut entry)
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [modalForm, setModalForm] = useState({ ...emptyForm });
  const [modalEditId, setModalEditId] = useState(null);

  // Config modal state (skin experience)
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [configTargetEmployee, setConfigTargetEmployee] = useState(null);
  const [selectedSkinIndex, setSelectedSkinIndex] = useState(0);
  const [selectedSkinId, setSelectedSkinId] = useState('lv6');
  const [configForm, setConfigForm] = useState({
    skinId: 'lv6',
    startAt: '2026-04-29',
    endDate: '',
    note: '',
  });

  // Auto-calculate duration days from startAt + endDate
  const configDurationDays = useMemo(() => {
    if (!configForm.startAt || !configForm.endDate) return null;
    const start = new Date(configForm.startAt);
    const end = new Date(configForm.endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;
    const diff = Math.round((end.getTime() - start.getTime()) / 86400000);
    return diff >= 0 ? diff + 1 : null;
  }, [configForm.startAt, configForm.endDate]);

  // Detail modal state
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [detailTargetEmployee, setDetailTargetEmployee] = useState(null);
  const [detailActiveTab, setDetailActiveTab] = useState('assets');

  const activeEntriesCount = useMemo(() => entries.filter((item) => item.active).length, [entries]);
  const filteredEmployees = useMemo(
    () =>
      employees.filter(
        (item) =>
          item.name.includes(employeeKeyword.trim()) ||
          item.department.includes(employeeKeyword.trim()) ||
          item.role.includes(employeeKeyword.trim())
      ),
    [employeeKeyword, employees]
  );
  const updateModalForm = (field) => (event) => {
    setModalForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const validateForm = (form) => {
    return form.name.trim() && form.url.trim() && form.sortOrder.trim() && form.icon.trim();
  };

  const showSuccess = (msg) => {
    setSaveSuccess(msg);
    setTimeout(() => setSaveSuccess(''), 2500);
  };

  const openAddModal = () => {
    setModalMode('add');
    setModalForm({ ...emptyForm });
    setModalEditId(null);
    setModalOpen(true);
  };

  const openEditModal = (entry) => {
    setModalMode('edit');
    setModalForm({
      name: entry.name,
      url: entry.url,
      sortOrder: entry.sortOrder,
      icon: entry.icon,
    });
    setModalEditId(entry.id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalForm({ ...emptyForm });
    setModalEditId(null);
  };

  const handleModalConfirm = () => {
    if (!validateForm(modalForm)) return;

    if (modalMode === 'add') {
      setEntries((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: modalForm.name.trim(),
          url: modalForm.url.trim(),
          sortOrder: modalForm.sortOrder.trim(),
          icon: modalForm.icon,
          active: true,
          updatedAt: '2026-04-28 11:30',
        },
      ]);
      showSuccess('快捷入口已添加');
    } else {
      setEntries((prev) =>
        prev.map((item) =>
          item.id === modalEditId
            ? {
                ...item,
                name: modalForm.name.trim(),
                url: modalForm.url.trim(),
                sortOrder: modalForm.sortOrder.trim(),
                icon: modalForm.icon,
                updatedAt: '2026-04-28 11:35',
              }
            : item
        )
      );
      showSuccess('快捷入口已更新');
    }
    closeModal();
  };

  const toggleActive = (id) => {
    setEntries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, active: !item.active, updatedAt: '2026-04-28 11:40' } : item))
    );
  };

  const handleDelete = (id) => {
    setEntries((prev) => prev.filter((item) => item.id !== id));
    showSuccess('快捷入口已删除');
  };

  // Config modal handlers
  const updateConfigForm = (field) => (event) => {
    setConfigForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const syncConfigSkin = (skinId) => {
    const nextIndex = skinLibrarySeed.findIndex((skin) => skin.id === skinId);
    const safeIndex = nextIndex >= 0 ? nextIndex : 0;
    setSelectedSkinIndex(safeIndex);
    setSelectedSkinId(skinId);
    setConfigForm((prev) => ({ ...prev, skinId }));
  };

  const openConfigModal = (employee) => {
    const currentSkinIndex = skinLibrarySeed.findIndex((skin) => skin.id === employee.skinId);
    const safeIndex = currentSkinIndex >= 0 ? currentSkinIndex : 0;
    const initialSkinId = skinLibrarySeed[safeIndex].id;
    setConfigTargetEmployee(employee);
    setSelectedSkinIndex(safeIndex);
    setSelectedSkinId(initialSkinId);
    setConfigForm({
      skinId: initialSkinId,
      startAt: '2026-04-29',
      endDate: '',
      note: '',
    });
    setConfigModalOpen(true);
  };

  const closeConfigModal = () => {
    setConfigModalOpen(false);
    setConfigTargetEmployee(null);
  };

  const handleCarouselPrev = () => {
    setSelectedSkinIndex((prev) =>
      prev === 0 ? skinLibrarySeed.length - 1 : prev - 1
    );
  };

  const handleCarouselNext = () => {
    setSelectedSkinIndex((prev) =>
      prev === skinLibrarySeed.length - 1 ? 0 : prev + 1
    );
  };

  const handleConfigConfirm = () => {
    if (!configTargetEmployee) return;
    const skinName = skinLibrarySeed.find((s) => s.id === configForm.skinId)?.name ?? '尊享黑金版';
    setEmployees((prev) =>
      prev.map((item) =>
        item.id === configTargetEmployee.id
          ? {
              ...item,
              skinId: configForm.skinId,
              skinName,
              experienceStartAt: configForm.startAt || '',
              experienceEndsAt: configForm.endDate || '',
              lastUpdatedAt: configForm.startAt || '',
              updatedBy: '门户管理员',
              history: [
                {
                  id: Date.now(),
                  skinName,
                  startAt: configForm.startAt,
                  endAt: configForm.endDate || '永久有效',
                  operator: '门户管理员',
                  note: configForm.note || `${skinName} 体验发放`,
                },
                ...item.history,
              ],
            }
          : item
      )
    );
    const durationText = configDurationDays !== null ? `${configDurationDays} 天` : '永久';
    showSuccess(`已为「${configTargetEmployee.name}」发放「${skinName}」体验（${durationText}）`);
    closeConfigModal();
  };

  // Detail modal handlers
  const openDetailModal = (employee) => {
    setDetailTargetEmployee(employee);
    setDetailActiveTab('assets');
    setDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setDetailModalOpen(false);
    setDetailTargetEmployee(null);
  };

  const resolveIcon = (iconName, size = 14) => {
    const found = iconOptions.find((o) => o.key === iconName);
    if (found) return <found.Icon size={size} />;
    return <LayoutGrid size={size} />;
  };

  // =============================================
  //  Modal
  // =============================================
  const renderModal = () => {
    if (!modalOpen) return null;

    return (
      <div className="hx-suggestion-overlay" onClick={closeModal}>
        <div className="hx-suggestion-dialog" style={{ width: 800 }} onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="hx-sd-header">
            <div className="hx-sd-header-left">
              <div className="hx-sd-header-icon">
                <Settings size={18} color="#007B7A" />
              </div>
              <span className="hx-sd-header-title">配置快捷入口</span>
            </div>
            <button type="button" className="hx-sd-close" onClick={closeModal}>
              <X size={18} />
            </button>
          </div>

          <div className="hx-sd-divider" />

          {/* Body */}
          <div className="hx-sd-body">
            <div className="hx-admin-form-grid">
              <div className="hx-form-group">
                <label><span className="hx-form-required">*</span>快捷方式名称</label>
                <input value={modalForm.name} onChange={updateModalForm('name')} placeholder="请输入入口名称" className="hx-input" />
              </div>
              <div className="hx-form-group">
                <label><span className="hx-form-required">*</span>跳转地址 (URL)</label>
                <input value={modalForm.url} onChange={updateModalForm('url')} placeholder="/path/to/page" className="hx-input" />
              </div>
              <div className="hx-form-group">
                <label><span className="hx-form-required">*</span>排序序号</label>
                <input value={modalForm.sortOrder} onChange={updateModalForm('sortOrder')} placeholder="如：1" className="hx-input" />
              </div>
              <div className="hx-form-group hx-admin-form-wide">
                <label><span className="hx-form-required">*</span>图标</label>
                <div className="hx-admin-icon-uploader">
                  <div className="hx-admin-icon-upload-box">
                    <Plus size={22} className="hx-admin-icon-upload-plus" />
                  </div>
                  <p className="hx-admin-icon-upload-hint">建议图片比例为 1:1，支持 png、jpg，小于 50KB</p>
                </div>
              </div>
            </div>
          </div>

          <div className="hx-sd-divider" />

          {/* Footer */}
          <div className="hx-sd-footer">
            <button
              type="button"
              className="hx-sd-btn hx-sd-btn-submit"
              disabled={!validateForm(modalForm)}
              onClick={handleModalConfirm}
            >
              {modalMode === 'add' ? '确认添加' : '保存修改'}
            </button>
            <button type="button" className="hx-sd-btn hx-sd-btn-cancel" onClick={closeModal}>
              取消
            </button>
          </div>
        </div>
      </div>
    );
  };

  // =============================================
  //  Shortcut Page
  // =============================================
  const renderShortcutPage = () => (
    <div className="hx-admin-content" style={{ maxWidth: 1080, margin: '0 auto' }}>
      {/* Stats — 3 cols only, no 今日点击 */}
      <div className="hx-admin-stats-row" style={{ marginTop: 12 }}>
        <div className="hx-admin-stat-card">
          <span className="hx-admin-stat-value">{entries.length}</span>
          <span className="hx-admin-stat-label">总入口数</span>
        </div>
        <div className="hx-admin-stat-card">
          <span className="hx-admin-stat-value" style={{ color: '#16a34a' }}>{activeEntriesCount}</span>
          <span className="hx-admin-stat-label">已启用</span>
        </div>
        <div className="hx-admin-stat-card">
          <span className="hx-admin-stat-value" style={{ color: '#64748b' }}>{entries.length - activeEntriesCount}</span>
          <span className="hx-admin-stat-label">已停用</span>
        </div>
      </div>

      {/* Table */}
      <div className="hx-card">
        <div className="hx-section-title">
          <LayoutGrid size={18} color="#007B7A" />
          <h2>快捷入口列表</h2>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 12, color: '#9099aa' }}>
              共 {activeEntriesCount} 个启用 / {entries.length} 个入口
            </span>
            <button
              type="button"
              className="hx-btn hx-btn-primary hx-admin-btn-add"
              onClick={openAddModal}
            >
              <Plus size={14} />
              新增快捷入口
            </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="hx-admin-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>排序</th>
                <th style={{ width: 80 }}>图标</th>
                <th>快捷方式名称</th>
                <th>跳转地址</th>
                <th style={{ width: 80 }}>状态</th>
                <th style={{ width: 130 }}>更新时间</th>
                <th style={{ width: 160 }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id} style={{ opacity: entry.active ? 1 : 0.58 }}>
                  <td style={{ fontWeight: 700, color: '#2f3540' }}>{entry.sortOrder}</td>
                  <td>
                    <span className="hx-admin-icon-tag">
                      {resolveIcon(entry.icon, 13)}
                      <span>{entry.icon}</span>
                    </span>
                  </td>
                  <td style={{ fontWeight: 600, color: '#2f3540' }}>{entry.name}</td>
                  <td>
                    <span className="hx-admin-url">
                      <Link2 size={12} />
                      {entry.url}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => toggleActive(entry.id)}
                      className={`hx-badge hx-admin-toggle ${entry.active ? 'hx-badge-success' : 'hx-badge-default'}`}
                    >
                      {entry.active ? '启用' : '停用'}
                    </button>
                  </td>
                  <td style={{ fontSize: 12, color: '#9099aa' }}>{entry.updatedAt}</td>
                  <td>
                    <div className="hx-admin-actions">
                      <button
                        type="button"
                        className="hx-admin-action-btn edit"
                        onClick={() => openEditModal(entry)}
                      >
                        <Pencil size={12} />
                        <span>编辑</span>
                      </button>
                      <button
                        type="button"
                        className="hx-admin-action-btn delete"
                        onClick={() => handleDelete(entry.id)}
                      >
                        <Trash2 size={12} />
                        <span>删除</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {renderModal()}

      {saveSuccess ? (
        <div className="hx-admin-floating-success">
          <Check size={15} />
          {saveSuccess}
        </div>
      ) : null}
    </div>
  );

  // =============================================
  //  Config Modal — 单卡 3D 轮播
  // =============================================
  const renderConfigModal = () => {
    if (!configModalOpen) return null;
    const selectedSkin = skinLibrarySeed.find((s) => s.id === selectedSkinId) ?? skinLibrarySeed[0];
    const centeredSkin = skinLibrarySeed[selectedSkinIndex] ?? skinLibrarySeed[0];
    const prevSkin = skinLibrarySeed[(selectedSkinIndex - 1 + skinLibrarySeed.length) % skinLibrarySeed.length];
    const nextSkin = skinLibrarySeed[(selectedSkinIndex + 1) % skinLibrarySeed.length];
    const confirmLabel =
      configTargetEmployee?.skinId === configForm.skinId ? '确认体验' : '确认发放';

    return (
      <div className="hx-suggestion-overlay" onClick={closeConfigModal}>
        <div className="hx-suggestion-dialog hx-admin-config-modal" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="hx-sd-header">
            <div className="hx-sd-header-left">
              <div className="hx-sd-header-icon">
                <Sparkles size={18} color="#007B7A" />
              </div>
              <span className="hx-sd-header-title">为 {configTargetEmployee?.name} 配置门户皮肤体验</span>
            </div>
            <button type="button" className="hx-sd-close" onClick={closeConfigModal}>
              <X size={18} />
            </button>
          </div>

          <div className="hx-sd-divider" />

          {/* Body */}
          <div className="hx-sd-body hx-admin-config-body">
            <div className="hx-admin-config-form">
              <label>选择皮肤</label>
              <div className="hx-skin-carousel-stage">
                <button type="button" className="hx-skin-carousel-nav prev" onClick={handleCarouselPrev}>
                  <ChevronLeft size={18} />
                </button>
                <div className="hx-skin-carousel-track">
                  {[prevSkin, centeredSkin, nextSkin].map((skin, i) => {
                    const isSelected = skin.id === selectedSkinId;
                    const posClass = i === 0 ? 'hx-skin-carousel-card--left' : i === 2 ? 'hx-skin-carousel-card--right' : 'hx-skin-carousel-card--active';
                    const shellStyle = skin.accentColor
                      ? { borderColor: `${skin.accentColor}44`, boxShadow: `0 30px 52px rgba(15,23,42,0.22), 0 0 22px ${skin.accentColor}18` }
                      : {};
                    const selectedShellStyle = isSelected && skin.accentColor
                      ? { borderColor: `${skin.accentColor} !important`, boxShadow: `0 0 0 2px ${skin.accentColor}, 0 30px 52px rgba(15,23,42,0.22), 0 0 22px ${skin.accentColor}20 !important` }
                      : {};
                    const kickerStyle = skin.accentColor ? { color: skin.accentColor } : {};

                    return (
                      <button
                        key={skin.id}
                        type="button"
                        className={`hx-skin-carousel-card ${posClass} hx-skin-carousel-card--${skin.previewTheme} ${isSelected ? 'is-selected' : 'is-unselected'}`}
                        onClick={() => syncConfigSkin(skin.id)}
                      >
                        <div
                          className="hx-skin-carousel-card-shell"
                          style={{ ...shellStyle, ...selectedShellStyle }}
                        >
                          {renderSkinPreview(skin, 'carousel')}
                          {i === 1 && (
                            <div className="hx-skin-carousel-copy">
                              <span className="hx-skin-carousel-kicker" style={kickerStyle}>{skin.rarityLabel}</span>
                              <strong style={kickerStyle}>{skin.name}</strong>
                              <p>{skin.tagline}</p>
                            </div>
                          )}
                          <span
                            className={`hx-skin-carousel-check ${isSelected ? 'is-checked' : 'is-unchecked'}`}
                            style={isSelected && skin.accentColor
                              ? { background: `linear-gradient(135deg, ${skin.accentColor}, ${skin.accentColor}cc)`, color: '#fff' }
                              : {}
                            }
                          >
                            {isSelected ? <Check size={14} /> : <span className="hx-skin-carousel-check-ring" />}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <button type="button" className="hx-skin-carousel-nav next" onClick={handleCarouselNext}>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div className="hx-admin-config-selected-desc">
              <strong>{selectedSkin.name}</strong>
              <p>{selectedSkin.description}</p>
              <span>{selectedSkin.grantHint}</span>
            </div>

            <div className="hx-admin-config-form">
              {/* 生效时间 */}
              <div className="hx-form-group">
                <label>生效时间</label>
                <input
                  type="date"
                  value={configForm.startAt}
                  onChange={(e) => setConfigForm((prev) => ({ ...prev, startAt: e.target.value }))}
                  className="hx-input"
                />
              </div>
              {/* 结束日期 */}
              <div className="hx-form-group">
                <label>结束日期</label>
                <input
                  type="date"
                  value={configForm.endDate}
                  onChange={(e) => setConfigForm((prev) => ({ ...prev, endDate: e.target.value }))}
                  className="hx-input"
                />
              </div>
              {/* 体验时长 — 只读回显 */}
              <div className="hx-form-group">
                <label>体验天数</label>
                <div className="hx-admin-config-enddate" style={{
                  background: '#fffbeb',
                  color: '#b45309',
                  padding: '8px 12px',
                  borderRadius: 6,
                  border: '1px solid #fde68a',
                  fontSize: 13,
                }}>
                  {configDurationDays !== null
                    ? `本次发放体验时长共计：${configDurationDays} 天`
                    : '请选择生效时间和结束日期'}
                </div>
              </div>
              {/* 发放说明 */}
              <div className="hx-form-group">
                <label>发放说明</label>
                <textarea rows={2} value={configForm.note} onChange={updateConfigForm('note')} placeholder="请输入发放说明..." className="hx-input" />
              </div>
            </div>
          </div>

          <div className="hx-sd-divider" />

          {/* Footer */}
          <div className="hx-sd-footer">
            <button type="button" className="hx-sd-btn hx-sd-btn-submit" onClick={handleConfigConfirm}>
              {confirmLabel}
            </button>
            <button type="button" className="hx-sd-btn hx-sd-btn-cancel" onClick={closeConfigModal}>
              取消
            </button>
          </div>
        </div>
      </div>
    );
  };

  // =============================================
  //  Detail Modal — w-[850px], grid-cols-2 skin cards, 16:9 aspect-video
  // =============================================
  const renderDetailModal = () => {
    if (!detailModalOpen || !detailTargetEmployee) return null;
    const emp = detailTargetEmployee;
    const currentSkinId = emp.skinId;
    // Build display skins: current experience skin + original level-based skin
    const currentSkin = skinLibrarySeed.find((s) => s.id === emp.skinId);
    const levelSkin = skinLibrarySeed.find((s) => s.level === emp.level);
    const displaySkins = [currentSkin, levelSkin].filter(Boolean);
    // If both resolve to the same skin, deduplicate
    if (displaySkins.length === 2 && displaySkins[0].id === displaySkins[1].id) {
      displaySkins.pop();
    }

    return (
      <div className="hx-suggestion-overlay" onClick={closeDetailModal}>
        <div className="hx-suggestion-dialog hx-admin-detail-modal" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="hx-sd-header">
            <div className="hx-sd-header-left">
              <div className="hx-sd-header-icon">
                <Eye size={18} color="#007B7A" />
              </div>
              <span className="hx-sd-header-title">个人皮肤详情 — {emp.name}</span>
            </div>
            <button type="button" className="hx-sd-close" onClick={closeDetailModal}>
              <X size={18} />
            </button>
          </div>

          <div className="hx-sd-divider" />

          {/* Tabs */}
          <div className="hx-admin-detail-tabs">
            <button
              type="button"
              className={`hx-admin-detail-tab ${detailActiveTab === 'assets' ? 'active' : ''}`}
              onClick={() => setDetailActiveTab('assets')}
            >
              <Layers size={15} />
              <span>当前皮肤资产</span>
            </button>
            <button
              type="button"
              className={`hx-admin-detail-tab ${detailActiveTab === 'history' ? 'active' : ''}`}
              onClick={() => setDetailActiveTab('history')}
            >
              <Clock size={15} />
              <span>发放历史记录</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="hx-sd-body" style={{ maxHeight: 520, overflowY: 'auto' }}>
            {detailActiveTab === 'assets' ? (
              <div className="hx-admin-skin-assets-grid">
                {displaySkins.map((skin) => {
                  const isCurrentExperience = skin.id === currentSkinId;
                  const isLevelSkin = skin.level === emp.level;
                  return (
                    <div
                      key={skin.id}
                      className={`hx-skin-asset-card hx-skin-asset-card--${skin.previewTheme}`}
                    >
                      <div className="hx-skin-asset-card-head">
                        <span className="hx-skin-asset-rarity">{skin.rarityLabel}</span>
                        <span className="hx-skin-asset-level">LV{skin.level}</span>
                      </div>
                      <div className="hx-skin-asset-preview-wrap">
                        {renderSkinPreview(skin)}
                        {isCurrentExperience ? <span className="hx-skin-asset-state-floating">当前生效</span> : null}
                      </div>
                      <div className="hx-skin-asset-card-body">
                        <strong>{skin.name}</strong>
                        <span>{skin.tagline}</span>
                        <p>{skin.description}</p>
                      </div>
                      <div className="hx-skin-asset-card-foot">
                        <span>{skin.grantHint}</span>
                        <span className="hx-skin-asset-state">
                          {isCurrentExperience && isLevelSkin ? (
                            <><Check size={11} /><span>当前生效 · 等级原皮肤</span></>
                          ) : isCurrentExperience ? (
                            <><Check size={11} /><span>当前生效</span></>
                          ) : (
                            <><Crown size={11} /><span>等级原皮肤</span></>
                          )}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>
                <table className="hx-admin-table hx-admin-history-table">
                  <thead>
                    <tr>
                      <th>皮肤名称</th>
                      <th>体验周期</th>
                      <th>发放日期</th>
                      <th>操作人</th>
                      <th>备注</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emp.history.map((record) => {
                      const recordSkin = skinLibrarySeed.find((item) => item.name === record.skinName);
                      return (
                        <tr key={record.id}>
                          <td>
                            <span className={`hx-admin-skin-tag ${recordSkin?.previewTheme ? recordSkin.previewTheme : ''}`} style={{ fontSize: 11 }}>
                              {record.skinName}
                            </span>
                          </td>
                          <td style={{ fontSize: 13, color: '#64748b', whiteSpace: 'nowrap' }}>{record.startAt?.split(' ')[0]} — {record.endAt?.split(' ')[0]}</td>
                          <td style={{ fontSize: 12, color: '#64748b' }}>{record.startAt?.split(' ')[0]}</td>
                          <td style={{ fontSize: 13, color: '#64748b' }}>门户管理员</td>
                          <td style={{ fontSize: 12, color: '#94a3b8' }}>{record.note}</td>
                        </tr>
                      );
                    })}
                    {emp.history.length === 0 && (
                      <tr>
                        <td colSpan={5} style={{ textAlign: 'center', color: '#94a3b8', padding: 24, fontSize: 13 }}>
                          暂无历史记录
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="hx-sd-divider" />

          {/* Footer */}
          <div className="hx-sd-footer">
            <button type="button" className="hx-sd-btn hx-sd-btn-cancel" onClick={closeDetailModal}>
              关闭
            </button>
          </div>
        </div>
      </div>
    );
  };

  // =============================================
  //  体验等级推导：取当前皮肤等级
  // =============================================
  const deriveSkinLevel = (item) =>
    skinLibrarySeed.find((skin) => skin.id === item.skinId)?.level ?? item.level;

  // =============================================
  //  Style Page — 8-col: 姓名|岗位|部门|当前等级|体验等级|体验周期|体验天数|操作
  // =============================================
  const renderStylePage = () => (
    <div className="hx-admin-content" style={{ width: '100%', margin: '0 auto' }}>
      {/* Main card with search + table */}
      <div className="hx-card" style={{ padding: 0, overflow: 'visible', marginTop: 8 }}>
        {/* Search bar */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #f1f5f9' }}>
          <div className="hx-admin-search-box" style={{ margin: 0 }}>
            <Search size={16} color="#94a3b8" />
            <input
              value={employeeKeyword}
              onChange={(event) => setEmployeeKeyword(event.target.value)}
              placeholder="搜索姓名、部门或岗位..."
              className="hx-admin-search-input"
              style={{ fontSize: 13 }}
            />
          </div>
        </div>

        {/* Table — 8-col unified grid */}
        <div className="hx-employee-table-card" style={{ border: 'none', borderRadius: 0 }}>
          <div className="hx-employee-table-head hx-admin-skin-table-grid">
            <div>姓名</div>
            <div>岗位</div>
            <div>部门</div>
            <div className="hx-admin-th-center">当前等级</div>
            <div className="hx-admin-th-center">体验等级</div>
            <div>体验周期</div>
            <div>体验天数</div>
            <div className="hx-admin-th-center">操作</div>
          </div>
          {filteredEmployees.map((item) => (
            <div key={item.id} className="hx-employee-table-row hx-admin-skin-table-grid">
              {/* 1. 姓名 */}
              <div>
                <span style={{ fontWeight: 700, color: '#334155', fontSize: 13 }}>{item.name}</span>
              </div>
              {/* 2. 岗位 */}
              <div style={{ fontSize: 13, color: '#64748b' }}>{item.role}</div>
              {/* 3. 部门 */}
              <div style={{ fontSize: 13, color: '#64748b' }}>{item.department}</div>
              {/* 4. 当前等级 — 勋章 */}
              <div className="hx-admin-td-center">
                <LevelBadge level={item.level} />
              </div>
              {/* 5. 体验等级 — 根据皮肤推导的勋章 */}
              <div className="hx-admin-td-center">
                <LevelBadge level={deriveSkinLevel(item)} />
              </div>
              {/* 6. 体验周期 — 横向单行 */}
              <div className="hx-admin-cycle">
                {formatCycle(item.experienceStartAt, item.experienceEndsAt)}
              </div>
              {/* 7. 体验天数 */}
              <div style={{ fontSize: 13, color: '#64748b' }}>
                {item.experienceStartAt && item.experienceEndsAt
                  ? (() => {
                      const s = new Date(item.experienceStartAt);
                      const e = new Date(item.experienceEndsAt);
                      return isNaN(s.getTime()) || isNaN(e.getTime()) ? '—' : `${Math.round((e - s) / 86400000) + 1} 天`;
                    })()
                  : '—'}
              </div>
              {/* 8. 操作 — centered */}
              <div className="hx-admin-td-center">
                <button
                  type="button"
                  className="hx-admin-action-btn view"
                  onClick={() => openDetailModal(item)}
                >
                  <Eye size={12} />
                  <span>查看</span>
                </button>
                <button
                  type="button"
                  className="hx-admin-action-btn config"
                  onClick={() => openConfigModal(item)}
                >
                  <Sparkles size={12} />
                  <span>配置体验</span>
                </button>
              </div>
            </div>
          ))}
          {filteredEmployees.length === 0 && (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>
              未找到匹配的人员
            </div>
          )}
        </div>
      </div>

      {renderConfigModal()}
      {renderDetailModal()}

      {saveSuccess ? <div className="hx-admin-floating-success">{saveSuccess}</div> : null}
    </div>
  );

  return currentSection === 'style' ? renderStylePage() : renderShortcutPage();
};

export default AdminPortalConfig;
