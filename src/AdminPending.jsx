import React, { useState } from 'react';
import {
  CheckCircle, Clock, AlertCircle, Search, Star, X, Award,
  Package, ClipboardCheck, Users, Settings, LogOut, User,
  TrendingUp, TrendingDown, FileText, ChevronRight, ChevronDown,
  Plus, Edit, Edit3, History, Trash2, Upload, AlertTriangle, Download,
  CalendarDays, XCircle, RefreshCw
} from 'lucide-react';
import AdminGiftsContent from './AdminGiftsContent';

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
      { id: 'pending', label: '积分审核', icon: ClipboardCheck },
      { id: 'redblack', label: '红黑榜管理', icon: TrendingUp },
    ]
  },
  {
    id: 'mall',
    title: '商城与订单',
    icon: Package,
    defaultExpanded: false,
    items: [
      { id: 'gifts', label: '激励库', icon: Package },
      { id: 'orders', label: '即时奖履约台账', icon: FileText },
    ]
  },
  {
    id: 'system',
    title: '系统管理',
    icon: Settings,
    defaultExpanded: false,
    items: [
      { id: 'users', label: '人员与洪小星台账', icon: Users },
    ]
  }
];

/* ──── 各子页面的纯内容区组件 ──── */

// 积分申请待办内容区
const PendingContent = ({ submissionRecords = [], setSubmissionRecords = () => {} }) => {
  const [filterIpdStage, setFilterIpdStage] = useState('全部');
  const [filterCategory, setFilterCategory] = useState('全部');
  const [filterSubmitter, setFilterSubmitter] = useState('全部');
  const [filterDepartment, setFilterDepartment] = useState('全部');
  const [filterDate, setFilterDate] = useState('');
  const [showReviewDrawer, setShowReviewDrawer] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [reviewDecision, setReviewDecision] = useState('approve');
  const [reviewScore, setReviewScore] = useState(1);
  const [reviewComment, setReviewComment] = useState('');

  const reviewQueue = submissionRecords.filter((item) => item.status === '待采纳');
  const ipdStageOptions = ['全部', ...new Set(reviewQueue.map((item) => item.ipdStage))];
  const categoryOptions = ['全部', ...new Set(reviewQueue.map((item) => item.category))];
  const submitterOptions = ['全部', ...new Set(reviewQueue.map((item) => item.submitter))];
  const departmentOptions = ['全部', ...new Set(reviewQueue.map((item) => item.department))];

  const filteredItems = reviewQueue.filter(item => {
    const matchesIpdStage = filterIpdStage === '全部' || item.ipdStage === filterIpdStage;
    const matchesCategory = filterCategory === '全部' || item.category === filterCategory;
    const matchesSubmitter = filterSubmitter === '全部' || item.submitter === filterSubmitter;
    const matchesDepartment = filterDepartment === '全部' || item.department === filterDepartment;
    const matchesDate = !filterDate || item.submitTime === filterDate;
    return matchesIpdStage && matchesCategory && matchesSubmitter && matchesDepartment && matchesDate;
  });

  const handleReview = (item) => {
    setSelectedItem(item);
    setShowReviewDrawer(true);
    setReviewDecision('approve');
    setReviewScore(1);
    setReviewComment('');
  };

  const handleSubmitReview = () => {
    if (reviewDecision === 'approve') {
      if (!reviewScore || reviewScore < 1 || reviewScore > 5) {
        alert('请选择1-5星的评分');
        return;
      }
      setSubmissionRecords(prev =>
        prev.map(item =>
          item.id === selectedItem.id
            ? { ...item, status: '已采纳', score: reviewScore, reviewComment: reviewComment }
            : item
        )
      );
    } else {
      if (!reviewComment.trim()) {
        alert('请填写未采纳原因');
        return;
      }
      setSubmissionRecords(prev =>
        prev.map(item =>
          item.id === selectedItem.id
            ? { ...item, status: '未采纳', rejectReason: reviewComment }
            : item
        )
      );
    }
    setShowReviewDrawer(false);
    setSelectedItem(null);
    setReviewDecision('approve');
    setReviewScore(1);
    setReviewComment('');
  };

  return (
    <>
      <div className="hx-admin-content pt-6">
        {/* 搜索筛选 */}
        <div className="hx-admin-filter-bar">
          <div className="hx-admin-filters hx-admin-filters-discrete">
            <div className="hx-admin-filter-group is-stacked">
              <label>所属IPD阶段</label>
              <select
                value={filterIpdStage}
                onChange={(e) => setFilterIpdStage(e.target.value)}
                className="hx-admin-filter-select"
              >
                {ipdStageOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="hx-admin-filter-group is-stacked">
              <label>改进方向类别</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="hx-admin-filter-select"
              >
                {categoryOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="hx-admin-filter-group is-stacked">
              <label>提交人</label>
              <select
                value={filterSubmitter}
                onChange={(e) => setFilterSubmitter(e.target.value)}
                className="hx-admin-filter-select"
              >
                {submitterOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="hx-admin-filter-group is-stacked">
              <label>所属部门</label>
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="hx-admin-filter-select"
              >
                {departmentOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="hx-admin-filter-group is-stacked">
              <label>提交日期</label>
              <div className="hx-admin-filter-date">
              <CalendarDays size={16} className="hx-admin-filter-date-icon" />
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="hx-admin-filter-date-input"
                placeholder="请选择申请日期"
              />
              {filterDate && (
                <button
                  type="button"
                  onClick={() => setFilterDate('')}
                  className="hx-admin-filter-date-clear"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            </div>
          </div>
        </div>

        <div style={{background:'#fff', borderRadius:'16px', boxShadow:'0 1px 8px rgba(148,163,184,0.12)', border:'1px solid #f1f5f9', overflow:'hidden'}}>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%', borderCollapse:'collapse', minWidth:'900px'}}>
              <thead>
                <tr style={{background:'#f8fafc', borderBottom:'1px solid #e2e8f0'}}>
                  <th style={{padding:'13px 16px', textAlign:'center', fontSize:'12px', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap', textTransform:'uppercase', letterSpacing:'0.05em', width:'56px'}}>序号</th>
                  <th style={{padding:'13px 20px', textAlign:'left', fontSize:'12px', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap', textTransform:'uppercase', letterSpacing:'0.05em', minWidth:'100px'}}>所属IPD阶段</th>
                  <th style={{padding:'13px 20px', textAlign:'left', fontSize:'12px', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap', textTransform:'uppercase', letterSpacing:'0.05em', minWidth:'90px'}}>改进方向类别</th>
                  <th style={{padding:'13px 20px', textAlign:'left', fontSize:'12px', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap', textTransform:'uppercase', letterSpacing:'0.05em', minWidth:'280px'}}>事由</th>
                  <th style={{padding:'13px 20px', textAlign:'left', fontSize:'12px', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap', textTransform:'uppercase', letterSpacing:'0.05em', minWidth:'80px'}}>提交人</th>
                  <th style={{padding:'13px 20px', textAlign:'left', fontSize:'12px', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap', textTransform:'uppercase', letterSpacing:'0.05em', minWidth:'120px'}}>所属部门</th>
                  <th style={{padding:'13px 20px', textAlign:'left', fontSize:'12px', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap', textTransform:'uppercase', letterSpacing:'0.05em', minWidth:'140px'}}>提交时间</th>
                  <th style={{padding:'13px 20px', textAlign:'left', fontSize:'12px', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap', textTransform:'uppercase', letterSpacing:'0.05em', minWidth:'110px'}}>当前状态</th>
                  <th style={{padding:'13px 20px', textAlign:'left', fontSize:'12px', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap', textTransform:'uppercase', letterSpacing:'0.05em', minWidth:'160px'}}>操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={9} style={{padding:'60px', textAlign:'center', color:'#94a3b8'}}>
                      <div style={{fontSize:'32px', marginBottom:'10px'}}>📋</div>
                      <div style={{fontSize:'15px', fontWeight:600, color:'#64748b'}}>暂无待办事项</div>
                      <div style={{fontSize:'13px', marginTop:'4px'}}>当前没有需要处理的审批项目</div>
                    </td>
                  </tr>
                ) : filteredItems.map((item, idx) => {
                  const statusMap = {
                    '待采纳': { label:'待采纳', bg:'#fefce8', color:'#ca8a04', dot:'#eab308' },
                    '已采纳': { label:'已采纳', bg:'#f0fdf4', color:'#16a34a', dot:'#22c55e' },
                    '未采纳': { label:'未采纳', bg:'#f1f5f9', color:'#64748b', dot:'#94a3b8' },
                  };
                  const st = statusMap[item.status] || statusMap['待采纳'];
                  return (
                    <tr key={item.id}
                      style={{borderBottom: idx < filteredItems.length - 1 ? '1px solid #f1f5f9' : 'none', transition:'background 0.15s'}}
                      onMouseEnter={e => e.currentTarget.style.background='#f8fafc'}
                      onMouseLeave={e => e.currentTarget.style.background='#fff'}
                    >
                      {/* 序号 */}
                      <td style={{padding:'16px 16px', verticalAlign:'middle', textAlign:'center'}}>
                        <span style={{fontSize:'13px', color:'#94a3b8', fontWeight:400}}>{idx + 1}</span>
                      </td>
                      {/* IPD阶段 */}
                      <td style={{padding:'16px 20px', verticalAlign:'middle', whiteSpace:'nowrap'}}>
                        <span style={{fontSize:'13px', color:'#475569', fontWeight:500}}>{item.ipdStage}</span>
                      </td>
                      {/* 建议类别 */}
                      <td style={{padding:'16px 20px', verticalAlign:'middle', whiteSpace:'nowrap'}}>
                        <span style={{padding:'3px 10px', background:'#f0fdf4', color:'#16a34a', fontSize:'12px', fontWeight:600, borderRadius:'6px'}}>{item.category}</span>
                      </td>
                      {/* 建议摘要 */}
                      <td style={{padding:'16px 20px', verticalAlign:'middle'}}>
                        <div className="hx-review-reason-cell">
                          <span className="hx-review-reason-text" style={{fontWeight:700, fontSize:'14px', color:'#1e293b'}}>{item.title}</span>
                          <div className="hx-review-reason-tooltip">
                            <strong>{item.title}</strong>
                            <p>{item.summary || item.reason}</p>
                          </div>
                        </div>
                      </td>
                      {/* 提交人 */}
                      <td style={{padding:'16px 20px', verticalAlign:'middle', whiteSpace:'nowrap'}}>
                        <span style={{fontWeight:700, fontSize:'14px', color:'#1e293b'}}>{item.submitter}</span>
                      </td>
                      {/* 所属部门 */}
                      <td style={{padding:'16px 20px', verticalAlign:'middle', whiteSpace:'nowrap'}}>
                        <span style={{fontSize:'13px', color:'#64748b'}}>{item.department}</span>
                      </td>
                      {/* 提交时间 */}
                      <td style={{padding:'16px 20px', verticalAlign:'middle', whiteSpace:'nowrap'}}>
                        <span style={{fontSize:'13px', color:'#64748b', fontFamily:'monospace'}}>{item.submitTime}</span>
                      </td>
                      <td style={{padding:'16px 20px', verticalAlign:'middle', whiteSpace:'nowrap'}}>
                        <span style={{display:'inline-flex', alignItems:'center', gap:'5px', padding:'4px 10px', borderRadius:'20px', background:st.bg, color:st.color, fontSize:'12px', fontWeight:700}}>
                          <span style={{width:'6px', height:'6px', borderRadius:'50%', background:st.dot, flexShrink:0}} />
                          {st.label}
                        </span>
                      </td>
                      {/* 操作 */}
                      <td style={{padding:'16px 20px', verticalAlign:'middle', whiteSpace:'nowrap'}}>
                        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                          {item.status === '待采纳' && (
                            <button onClick={() => handleReview(item)}
                              style={{display:'flex', alignItems:'center', gap:'5px', padding:'6px 14px', background:'#007B7A', color:'#fff', border:'none', borderRadius:'8px', fontSize:'12px', fontWeight:700, cursor:'pointer'}}>
                              <Award size={13} />
                              审批
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 评审与授星弹窗 */}
      {showReviewDrawer && selectedItem && (
        <div className="hx-modal-overlay" onClick={() => setShowReviewDrawer(false)}>
          <div className="hx-review-modal" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="hx-review-modal-header">
              <h3>评审与授星</h3>
              <button onClick={() => setShowReviewDrawer(false)} className="hx-review-modal-close">
                <X size={18} />
              </button>
            </div>

            {/* Body — scrollable */}
            <div className="hx-review-modal-body">

              {/* 信息汇总条 — 浅蓝色背景 */}
              <div className="hx-review-info-bar">
                <span className="hx-review-info-item">
                  <span className="hx-review-info-label">提交人</span>
                  <span className="hx-review-info-value">{selectedItem.submitter}</span>
                </span>
                <span className="hx-review-info-sep" />
                <span className="hx-review-info-item">
                  <span className="hx-review-info-label">部门</span>
                  <span className="hx-review-info-value">{selectedItem.department}</span>
                </span>
                <span className="hx-review-info-sep" />
                <span className="hx-review-info-item">
                  <span className="hx-review-info-label">IPD阶段</span>
                  <span className="hx-review-info-value">{selectedItem.ipdStage}</span>
                </span>
              </div>

              {/* 改进事由 */}
              <div className="hx-review-block">
                <div className="hx-review-block-title">事由</div>
                <div className="hx-review-block-content">
                  <p className="hx-review-block-text">{selectedItem.reason || selectedItem.summary || selectedItem.title}</p>
                </div>
              </div>

              <div className="hx-review-block">
                <div className="hx-review-block-title">附件</div>
                <div className="hx-review-block-content">
                  {selectedItem.files && selectedItem.files.length > 0 ? (
                    <div className="hx-sd-files" style={{ marginTop: 0 }}>
                      {selectedItem.files.map((file, index) => (
                        <div key={`${selectedItem.id}-${index}`} className="hx-sd-file">
                          <span>📄</span>
                          <span className="hx-sd-file-name">{file.name}</span>
                          <span className="hx-sd-file-size">
                            {typeof file.size === 'number' ? `${(file.size / 1024).toFixed(1)} KB` : ''}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="hx-review-block-empty">未上传附件</div>
                  )}
                </div>
              </div>

              {selectedItem.reviewComment || selectedItem.rejectReason ? (
                <div className="hx-review-block">
                  <div className="hx-review-block-title">
                    {selectedItem.rejectReason ? '未采纳原因' : '评审说明'}
                  </div>
                  <div className="hx-review-block-content">
                    <p className="hx-review-block-text">{selectedItem.rejectReason || selectedItem.reviewComment}</p>
                  </div>
                </div>
              ) : null}

              {/* 评审输入区 */}
              <div className="hx-review-input-section">
                {/* 审批决策 */}
                <div className="hx-review-form-row mb-6">
                  <label className="hx-review-form-label">
                    审批操作 <span className="hx-review-required">*</span>
                  </label>
                  <div className="hx-review-decision-group">
                    <label className={`hx-review-decision-option ${reviewDecision === 'approve' ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="reviewDecision"
                        value="approve"
                        checked={reviewDecision === 'approve'}
                        onChange={() => setReviewDecision('approve')}
                      />
                      <span className="hx-review-decision-dot" />
                      采纳
                    </label>
                    <label className={`hx-review-decision-option ${reviewDecision === 'reject' ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="reviewDecision"
                        value="reject"
                        checked={reviewDecision === 'reject'}
                        onChange={() => setReviewDecision('reject')}
                      />
                      <span className="hx-review-decision-dot" />
                      未采纳
                    </label>
                  </div>
                </div>

                {/* 授星数量 — 仅采纳时显示 */}
                {reviewDecision === 'approve' && (
                  <div className="hx-review-form-row">
                    <label className="hx-review-form-label">
                      授星数量 <span className="hx-review-required">*</span>
                    </label>
                    <div className="hx-review-star-input-wrap">
                      <span className="hx-review-star-icon"><Star size={16} fill="#f59e0b" color="#f59e0b" /></span>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={reviewScore}
                        onChange={(e) => setReviewScore(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                        className="hx-review-star-input"
                        placeholder="请输入数量"
                      />
                      <span className="hx-review-star-unit">颗</span>
                    </div>
                  </div>
                )}

                {/* 评审说明 / 未采纳原因 */}
                <div className="hx-review-form-row">
                  <label className="hx-review-form-label">
                    {reviewDecision === 'reject' ? '未采纳原因' : '评审说明'}
                    {reviewDecision === 'reject' && <span className="hx-review-required">*</span>}
                  </label>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder={reviewDecision === 'reject' ? '请填写未采纳原因（必填）...' : '请输入评审意见（选填）...'}
                    className="hx-review-comment-input"
                    rows={5}
                  />
                </div>
              </div>
            </div>

            {/* Footer — 顶部分割线，右对齐按钮 */}
            <div className="hx-review-modal-footer">
              <button onClick={() => setShowReviewDrawer(false)} className="hx-review-btn-cancel">取消</button>
              {reviewDecision === 'approve' ? (
                <button onClick={handleSubmitReview} className="hx-review-btn-confirm">
                  <CheckCircle size={16} />
                  确认并授星
                </button>
              ) : (
                <button onClick={handleSubmitReview} className="hx-review-btn-reject">
                  <X size={16} />
                  确认驳回
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// 红黑榜数据发布内容区
// 状态机：draft（草稿）↔ published（已发布），撤回即回到草稿
const RedBlackContent = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [blackType, setBlackType] = useState('personal');
  const [formData, setFormData] = useState({
    target: '', person: '', position: '', department: '', team: '', description: '', date: '', score: ''
  });

  // 筛选栏状态
  const [filterType, setFilterType] = useState('全部');
  const [filterKeyword, setFilterKeyword] = useState('');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');
  const [filterStatus, setFilterStatus] = useState('全部');

  const [records, setRecords] = useState([
    {
      id: 1, type: 'black', target: '张三', department: '研发部', position: '前端工程师',
      description: '连续三次未按时完成测试任务，影响项目进度',
      score: 5, publishTime: '2024-04-10', status: 'published', blackType: 'personal'
    },
    {
      id: 2, type: 'black', target: '李四', department: '测试部', position: '测试工程师',
      description: '服务器监控响应延迟，导致故障处理不及时',
      score: 3, publishTime: '2024-04-08', status: 'draft', blackType: 'personal'
    },
    {
      id: 3, type: 'black', target: '数智军团', department: '', position: '',
      description: '团队协作不力，项目延期两周，影响整体交付',
      score: 10, publishTime: '2024-04-05', status: 'draft', blackType: 'team'
    }
  ]);

  const employees = [
    { name: '张三', position: '前端工程师', department: '研发部' },
    { name: '李四', position: '测试工程师', department: '测试部' },
    { name: '王五', position: 'UI设计师', department: '设计部' },
    { name: '赵六', position: '产品经理', department: '产品部' }
  ];
  const teams = ['数智军团', '设备军团', '供用电军团', '安监及综合军团'];

  const isEditing = editingId !== null;

  // 筛选后的记录
  const filteredRecords = records.filter(r => {
    if (filterType !== '全部') {
      const map = { '个人通报': 'personal', '团队通报': 'team' };
      if (r.blackType !== map[filterType]) return false;
    }
    if (filterStatus !== '全部') {
      const map = { '已发布': 'published', '草稿': 'draft' };
      if (r.status !== map[filterStatus]) return false;
    }
    if (filterKeyword) {
      const kw = filterKeyword.toLowerCase();
      if (!r.target.toLowerCase().includes(kw) && !r.description.toLowerCase().includes(kw)) return false;
    }
    if (filterDateFrom && r.publishTime && r.publishTime < filterDateFrom) return false;
    if (filterDateTo && r.publishTime && r.publishTime > filterDateTo) return false;
    return true;
  });

  const totalPenaltyScore = filteredRecords.reduce((sum, r) => sum + (r.score || 0), 0);

  const openAddModal = () => {
    setEditingId(null);
    setBlackType('personal');
    setFormData({ target: '', person: '', position: '', department: '', team: '', description: '', score: '' });
    setShowModal(true);
  };

  const openEditModal = (record) => {
    setEditingId(record.id);
    setBlackType(record.blackType);
    setFormData({
      target: record.target,
      person: record.blackType === 'personal' ? record.target : '',
      position: record.position || '',
      department: record.department || '',
      team: record.blackType === 'team' ? record.target : '',
      description: record.description,
      score: record.score ? String(record.score) : ''
    });
    setShowModal(true);
  };

  const handlePersonChange = (e) => {
    const selectedName = e.target.value;
    const emp = employees.find(em => em.name === selectedName);
    if (emp) setFormData({ ...formData, person: selectedName, target: selectedName, position: emp.position, department: emp.department });
  };

  const handleSubmit = (status) => {
    const scoreNum = parseInt(formData.score, 10) || 0;
    const publishTime = status === 'published' ? new Date().toISOString().split('T')[0] : (isEditing ? undefined : '');
    if (isEditing) {
      setRecords(records.map(r => r.id === editingId ? {
        ...r,
        target: blackType === 'personal' ? formData.person : formData.team,
        department: blackType === 'personal' ? formData.department : '',
        position: blackType === 'personal' ? formData.position : '',
        description: formData.description,
        score: scoreNum,
        publishTime: status === 'published' ? publishTime : r.publishTime,
        status, blackType
      } : r));
    } else {
      const newRecord = {
        id: Date.now(), type: 'black',
        target: blackType === 'personal' ? formData.person : formData.team,
        department: blackType === 'personal' ? formData.department : '',
        position: blackType === 'personal' ? formData.position : '',
        description: formData.description,
        score: scoreNum,
        publishTime: publishTime || '',
        status, blackType
      };
      setRecords([newRecord, ...records]);
    }
    setShowModal(false);
    setEditingId(null);
    setFormData({ target: '', person: '', position: '', department: '', team: '', description: '', score: '' });
  };

  const handleDelete = (id) => {
    if (confirm('确定要删除这条记录吗？')) {
      setRecords(records.filter(r => r.id !== id));
    }
  };

  const handleWithdraw = (id) => {
    setRecords(records.map(r =>
      r.id === id ? { ...r, status: 'draft' } : r
    ));
  };

  const statusConfig = {
    draft:     { label: '草稿',   bg: '#fef3c7', color: '#d97706', dot: '#f59e0b' },
    published: { label: '已发布', bg: '#eff6ff', color: '#1d4ed8', dot: '#3b82f6' },
  };

  const getStatusBadge = (status) => {
    const cfg = statusConfig[status] || statusConfig.draft;
    return (
      <span style={{display:'inline-flex', alignItems:'center', gap:'5px', padding:'4px 10px', borderRadius:'20px', background: cfg.bg, color: cfg.color, fontSize:'12px', fontWeight:700}}>
        <span style={{width:'6px', height:'6px', borderRadius:'50%', background: cfg.dot, flexShrink:0}} />
        {cfg.label}
      </span>
    );
  };

  return (
    <div className="hx-admin-content pt-6">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{margin:0, fontSize:'20px', fontWeight:800, color:'#1e293b'}}>质量罚分工作台</h2>
        <button onClick={openAddModal} className="hx-admin-primary-btn">
          <Plus size={16} />
          录入黑榜通报
        </button>
      </div>

      {/* 统计卡片 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
        <div style={{
          background: '#fff', borderRadius: 12, padding: '16px 20px',
          display: 'flex', alignItems: 'center', gap: 12,
          boxShadow: '0 2px 8px rgba(148,163,184,0.06)',
          border: '1px solid #f1f5f9',
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12, flexShrink: 0,
            background: 'linear-gradient(135deg,#dbeafe,#bfdbfe)',
            color: '#2563eb',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(59,130,246,0.2)',
          }}><AlertCircle size={22} /></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>已发布</span>
            <strong style={{ fontSize: 24, fontWeight: 700, color: '#2f3540', lineHeight: 1 }}>{records.filter(r => r.status === 'published').length}</strong>
          </div>
        </div>
        <div style={{
          background: '#fff', borderRadius: 12, padding: '16px 20px',
          display: 'flex', alignItems: 'center', gap: 12,
          boxShadow: '0 2px 8px rgba(148,163,184,0.06)',
          border: '1px solid #f1f5f9',
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12, flexShrink: 0,
            background: 'linear-gradient(135deg,#fef3c7,#fde68a)',
            color: '#d97706',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(245,158,11,0.2)',
          }}><Clock size={22} /></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>草稿</span>
            <strong style={{ fontSize: 24, fontWeight: 700, color: '#2f3540', lineHeight: 1 }}>{records.filter(r => r.status === 'draft').length}</strong>
          </div>
        </div>
        <div style={{
          background: '#fff', borderRadius: 12, padding: '16px 20px',
          display: 'flex', alignItems: 'center', gap: 12,
          boxShadow: '0 2px 8px rgba(148,163,184,0.06)',
          border: '1px solid #f1f5f9',
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12, flexShrink: 0,
            background: 'linear-gradient(135deg,#fee2e2,#fecaca)',
            color: '#dc2626',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(220,38,38,0.2)',
          }}><AlertTriangle size={22} /></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>累计罚分</span>
            <strong style={{ fontSize: 24, fontWeight: 700, color: '#dc2626', lineHeight: 1 }}>{totalPenaltyScore} 分</strong>
          </div>
        </div>
      </div>

      {/* 筛选栏 — 12栏栅格 */}
      <div style={{
        background: '#f8fafc', borderRadius: 12, padding: '14px 20px',
        display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 12,
        alignItems: 'center', marginBottom: 20,
        border: '1px solid #e2e8f0',
      }}>
        {/* 类型筛选 col-span-2 */}
        <div style={{gridColumn: 'span 2'}}>
          <select value={filterType} onChange={e => setFilterType(e.target.value)}
            style={{height:40, width:'100%', padding:'0 10px', border:'1px solid #cbd5e1', borderRadius:6, fontSize:13, color:'#334155', background:'#fff', outline:'none', boxSizing:'border-box'}}>
            <option value="全部">全部类型</option>
            <option value="个人通报">个人通报</option>
            <option value="团队通报">团队通报</option>
          </select>
        </div>

        {/* 搜索框 col-span-3 */}
        <div style={{gridColumn: 'span 3'}}>
          <input type="text" value={filterKeyword} onChange={e => setFilterKeyword(e.target.value)}
            placeholder="搜索人员或军团名称..."
            style={{height:40, width:'100%', padding:'0 12px', border:'1px solid #cbd5e1', borderRadius:6, fontSize:13, color:'#334155', background:'#fff', outline:'none', boxSizing:'border-box'}} />
        </div>

        {/* 日期区间 col-span-4 — 带外边框的flex容器 */}
        <div style={{gridColumn: 'span 4'}}>
          <div style={{display:'flex', alignItems:'center', gap:8, border:'1px solid #cbd5e1', borderRadius:6, padding:'0 8px', background:'#fff', height:40, boxSizing:'border-box'}}>
            <input type="date" value={filterDateFrom} onChange={e => setFilterDateFrom(e.target.value)}
              style={{flex:1, height:'100%', border:'none', background:'transparent', fontSize:12, color:'#334155', outline:'none', minWidth:0}} />
            <span style={{color:'#94a3b8', fontSize:12, flexShrink:0, whiteSpace:'nowrap'}}>至</span>
            <input type="date" value={filterDateTo} onChange={e => setFilterDateTo(e.target.value)}
              style={{flex:1, height:'100%', border:'none', background:'transparent', fontSize:12, color:'#334155', outline:'none', minWidth:0}} />
          </div>
        </div>

        {/* 状态筛选 col-span-2 */}
        <div style={{gridColumn: 'span 2'}}>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            style={{height:40, width:'100%', padding:'0 10px', border:'1px solid #cbd5e1', borderRadius:6, fontSize:13, color:'#334155', background:'#fff', outline:'none', boxSizing:'border-box'}}>
            <option value="全部">全部状态</option>
            <option value="已发布">已发布</option>
            <option value="草稿">草稿</option>
          </select>
        </div>

        {/* 重置按钮 col-span-1 */}
        <div style={{gridColumn: 'span 1', display:'flex', justifyContent:'flex-end'}}>
          <button onClick={() => { setFilterType('全部'); setFilterKeyword(''); setFilterDateFrom(''); setFilterDateTo(''); setFilterStatus('全部'); }}
            style={{height:40, padding:'0 12px', border:'1px solid #cbd5e1', borderRadius:6, fontSize:12, color:'#64748b', background:'#fff', cursor:'pointer', display:'flex', alignItems:'center', gap:4, whiteSpace:'nowrap'}}>
            <RefreshCw size={12} />
          </button>
        </div>
      </div>

      {/* 数据表格 */}
      <div style={{background:'#fff', borderRadius:'16px', boxShadow:'0 1px 8px rgba(148,163,184,0.12)', border:'1px solid #f1f5f9', overflow:'hidden'}}>
        <div style={{padding:'16px 20px', borderBottom:'1px solid #f1f5f9', background:'#f8fafc'}}>
          <h3 style={{margin:0, fontSize:'15px', fontWeight:700, color:'#1e293b'}}>罚分通报列表</h3>
        </div>
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%', borderCollapse:'collapse', minWidth:'900px'}}>
            <thead>
              <tr style={{background:'#f8fafc', borderBottom:'1px solid #e2e8f0'}}>
                {['类型','通报对象','问题描述','分值','发布时间','状态','操作'].map(h => (
                  <th key={h} style={{padding:'13px 20px', textAlign:'left', fontSize:'12px', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap', textTransform:'uppercase', letterSpacing:'0.05em'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record, idx) => {
                const isPublished = record.status === 'published';
                return (
                <tr key={record.id}
                  style={{borderBottom: idx < filteredRecords.length - 1 ? '1px solid #f1f5f9' : 'none', transition:'background 0.15s'}}
                  onMouseEnter={e => e.currentTarget.style.background='#fef2f2'}
                  onMouseLeave={e => e.currentTarget.style.background='#fff'}
                >
                  <td style={{padding:'16px 20px', verticalAlign:'middle', whiteSpace:'nowrap'}}>
                    <span className={`hx-type hx-type-${record.blackType === 'personal' ? 'personal' : 'team'}`}>
                      {record.blackType === 'personal' ? '个人' : '团队'}
                    </span>
                  </td>
                  <td style={{padding:'16px 20px', verticalAlign:'middle'}}>
                    <div style={{fontWeight:700, fontSize:'14px', color:'#dc2626'}}>{record.target}</div>
                    {record.blackType === 'personal' && record.position && (
                      <div style={{fontSize:'12px', color:'#94a3b8', marginTop:'2px'}}>{record.position} · {record.department}</div>
                    )}
                  </td>
                  <td style={{padding:'16px 20px', verticalAlign:'middle', maxWidth:'260px'}}>
                    <div style={{fontSize:'13px', color:'#475569', lineHeight:'1.5'}}>{record.description}</div>
                  </td>
                  <td style={{padding:'16px 20px', verticalAlign:'middle', whiteSpace:'nowrap'}}>
                    <span style={{fontSize:'15px', fontWeight:800, color:'#dc2626'}}>{record.score} 分</span>
                  </td>
                  <td style={{padding:'16px 20px', verticalAlign:'middle', whiteSpace:'nowrap'}}>
                    {isPublished ? (
                      <span style={{fontSize:'13px', color:'#64748b', fontFamily:'monospace'}}>{record.publishTime}</span>
                    ) : (
                      <span style={{fontSize:'13px', color:'#cbd5e1'}}>—</span>
                    )}
                  </td>
                  <td style={{padding:'16px 20px', verticalAlign:'middle', whiteSpace:'nowrap'}}>
                    {getStatusBadge(record.status)}
                  </td>
                  <td style={{padding:'16px 20px', verticalAlign:'middle', whiteSpace:'nowrap'}}>
                    <div style={{display:'flex', gap:'8px', alignItems:'center', minHeight:'36px'}}>
                      {isPublished ? (
                        <button onClick={() => handleWithdraw(record.id)}
                          style={{padding:'6px 14px', background:'#fff', color:'#475569', border:'1.5px solid #e2e8f0', borderRadius:'8px', fontSize:'12px', fontWeight:600, cursor:'pointer', whiteSpace:'nowrap'}}>
                          撤回
                        </button>
                      ) : (
                        <>
                          <button onClick={() => openEditModal(record)}
                            style={{padding:'6px 14px', background:'#fff', color:'#475569', border:'1.5px solid #e2e8f0', borderRadius:'8px', fontSize:'12px', fontWeight:600, cursor:'pointer', whiteSpace:'nowrap'}}>
                            编辑
                          </button>
                          <button onClick={() => handleDelete(record.id)}
                            style={{padding:'6px 10px', background:'#fff', color:'#dc2626', border:'1.5px solid #fecaca', borderRadius:'8px', cursor:'pointer', display:'flex', alignItems:'center'}}>
                            <Trash2 size={13} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              )})}
              {filteredRecords.length === 0 && (
                <tr>
                  <td colSpan={7} style={{padding:'40px 20px', textAlign:'center', color:'#94a3b8', fontSize:'14px'}}>
                    暂无匹配的罚分通报记录
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 录入/编辑弹窗 */}
      {showModal && (
        <div style={{position:'fixed', inset:0, background:'rgba(15,23,42,0.5)', backdropFilter:'blur(4px)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:50, padding:'24px'}}
          onClick={() => { setShowModal(false); setEditingId(null); }}>
          <div style={{background:'#fff', borderRadius:'16px', width:'100%', maxWidth:'800px', boxShadow:'0 25px 60px rgba(0,0,0,0.2)', display:'flex', flexDirection:'column', maxHeight:'90vh'}}
            onClick={e => e.stopPropagation()}>

            {/* Header */}
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'20px 32px', borderBottom:'1px solid #f1f5f9', flexShrink:0}}>
              <div>
                <h3 style={{margin:0, fontSize:'18px', fontWeight:800, color:'#1e293b'}}>{isEditing ? '编辑罚分通报' : '录入罚分通报'}</h3>
                <p style={{margin:'4px 0 0', fontSize:'13px', color:'#94a3b8'}}>填写罚分详情，分值将累计至质量黑榜</p>
              </div>
              <button onClick={() => { setShowModal(false); setEditingId(null); }}
                style={{width:'32px', height:'32px', borderRadius:'8px', border:'none', background:'#f1f5f9', color:'#64748b', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div style={{padding:'24px 32px', display:'flex', flexDirection:'column', gap:'20px', overflowY:'auto', flex:1}}>

              {/* 通报维度切换 */}
              <div style={{display:'flex', gap:'8px'}}>
                {[
                  { key: 'personal', label: '个人通报', icon: <User size={16} /> },
                  { key: 'team', label: '团队通报', icon: <Users size={16} /> }
                ].map(opt => (
                  <button key={opt.key} type="button" onClick={() => setBlackType(opt.key)}
                    style={{
                      flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'8px',
                      padding:'10px', borderRadius:'10px', fontWeight:600, fontSize:'13px', cursor:'pointer',
                      background: blackType === opt.key ? '#fff' : 'transparent',
                      color: blackType === opt.key ? '#dc2626' : '#64748b',
                      boxShadow: blackType === opt.key ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                      border: blackType === opt.key ? '1.5px solid #fecaca' : '1.5px solid #e2e8f0'
                    }}>
                    {opt.icon} {opt.label}
                  </button>
                ))}
              </div>

              {/* 基础信息区 — 被通报人独占一行 */}
              <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>
                {blackType === 'personal' && (
                  <div style={{display:'flex', flexDirection:'column', gap:'6px'}}>
                    <label style={{fontSize:'13px', fontWeight:500, color:'#334155'}}>被通报人 <span style={{color:'#dc2626'}}>*</span></label>
                    <select value={formData.person} onChange={handlePersonChange}
                      style={{height:'40px', padding:'0 12px', border:'1px solid #d1d5db', borderRadius:'6px', fontSize:'14px', color:'#334155', background:'#fff', outline:'none', width:'100%', boxSizing:'border-box'}}>
                      <option value="">请选择被通报人</option>
                      {employees.map(emp => <option key={emp.name} value={emp.name}>{emp.name}</option>)}
                    </select>
                  </div>
                )}
                {blackType === 'team' && (
                  <div style={{display:'flex', flexDirection:'column', gap:'6px'}}>
                    <label style={{fontSize:'13px', fontWeight:500, color:'#334155'}}>被通报团队 <span style={{color:'#dc2626'}}>*</span></label>
                    <select value={formData.team} onChange={e => setFormData({...formData, team: e.target.value})}
                      style={{height:'40px', padding:'0 12px', border:'1px solid #d1d5db', borderRadius:'6px', fontSize:'14px', color:'#334155', background:'#fff', outline:'none', width:'100%', boxSizing:'border-box'}}>
                      <option value="">请选择团队</option>
                      {teams.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                )}
              </div>

              {/* 处罚分值 */}
              <div style={{display:'flex', flexDirection:'column', gap:'6px'}}>
                <label style={{fontSize:'13px', fontWeight:500, color:'#334155'}}>
                  处罚分值 <span style={{color:'#dc2626'}}>*</span>
                </label>
                <input type="number" min="1" max="100" value={formData.score} onChange={e => setFormData({...formData, score: e.target.value})}
                  placeholder="请输入此问题的罚分分值，将累计至质量黑榜"
                  style={{height:'40px', padding:'0 12px', border:'1px solid #d1d5db', borderRadius:'6px', fontSize:'14px', color:'#334155', background:'#fff', outline:'none', width:'100%', boxSizing:'border-box'}} />
                <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                  <span style={{fontSize:'11px', color:'#94a3b8'}}>请输入正整数，分值越大代表问题越严重</span>
                  {formData.score && (
                    <div style={{padding:'4px 10px', background:'#fef2f2', borderRadius:6, border:'1px solid #fecaca'}}>
                      <span style={{fontSize:'12px', color:'#94a3b8'}}>本次处罚：</span>
                      <strong style={{fontSize:'14px', color:'#dc2626', marginLeft:4}}>{formData.score} 分</strong>
                    </div>
                  )}
                </div>
              </div>

              {/* 问题描述 — 独占全宽 */}
              <div style={{display:'flex', flexDirection:'column', gap:'6px'}}>
                <label style={{fontSize:'13px', fontWeight:500, color:'#334155'}}>
                  问题描述 <span style={{color:'#dc2626'}}>*</span>
                </label>
                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="请详细描述质量问题..."
                  rows={5}
                  style={{padding:'10px 12px', border:'1px solid #d1d5db', borderRadius:'6px', fontSize:'14px', color:'#334155', background:'#fff', outline:'none', width:'100%', boxSizing:'border-box', resize:'vertical', lineHeight:'1.6'}} />
              </div>
            </div>

            {/* Footer — fixed at bottom */}
            <div style={{display:'flex', gap:'12px', padding:'16px 32px', borderTop:'1px solid #f1f5f9', flexShrink:0}}>
              <button type="button" onClick={() => handleSubmit('draft')}
                style={{flex:1, padding:'12px', border:'1.5px solid #e2e8f0', background:'#fff', color:'#475569', fontWeight:700, borderRadius:'10px', cursor:'pointer', fontSize:'14px'}}>
                保存为草稿
              </button>
              <button type="button" onClick={() => handleSubmit('published')}
                style={{flex:1, padding:'12px', border:'none', background:'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)', color:'#fff', fontWeight:700, borderRadius:'10px', cursor:'pointer', fontSize:'14px', boxShadow:'0 4px 14px rgba(220,38,38,0.3)'}}>
                确认发布
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 商品库管理内容区
const GiftsContent = () => <AdminGiftsContent />;

// 兑换订单内容区
const OrdersContent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [doneIds, setDoneIds] = useState(new Set());

  const [orders, setOrders] = useState([
    {
      id: 'ORD-20260417-001',
      date: '2026-04-17',
      item: { name: '咖啡', icon: '☕' },
      category: '冰美式',
      quantity: 2,
      user: { name: '张三', department: '研发部' },
      points: 300,
      status: '已接单',
    },
    {
      id: 'ORD-20260416-008',
      date: '2026-04-16',
      item: { name: '咖啡', icon: '☕' },
      category: '生椰拿铁',
      quantity: 1,
      user: { name: '李四', department: '研发部' },
      points: 800,
      status: '已完成',
    },
    {
      id: 'ORD-20260415-003',
      date: '2026-04-15',
      item: { name: '咖啡', icon: '☕' },
      category: '热拿铁',
      quantity: 1,
      user: { name: '王五', department: '设计部' },
      points: 500,
      status: '已完成',
    },
    {
      id: 'ORD-20260414-012',
      date: '2026-04-14',
      item: { name: '咖啡', icon: '☕' },
      category: '冰拿铁',
      quantity: 3,
      user: { name: '赵六', department: '产品部' },
      points: 1000,
      status: '已接单',
    },
  ]);

  const toggleDone = (id) => {
    setDoneIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const pendingCount   = orders.filter(o => o.status === '已接单' && !doneIds.has(o.id)).length;
  const completedCount = orders.filter(o => o.status === '已完成' || doneIds.has(o.id)).length;

  const filtered = orders.filter(o => {
    const q = searchTerm.toLowerCase();
    return !q || o.user.name.includes(q) || (o.category && o.category.includes(q));
  });

  const S = {
    card: { background:'#fff', borderRadius:'12px', boxShadow:'0 1px 6px rgba(148,163,184,0.10)', border:'1px solid #e2e8f0', overflow:'hidden' },
    th:   { padding:'12px 16px', textAlign:'left', fontSize:'12px', fontWeight:600, color:'#64748b', whiteSpace:'nowrap', borderBottom:'1px solid #e2e8f0' },
    td:   { padding:'14px 16px', verticalAlign:'middle', borderBottom:'1px solid #f1f5f9' },
  };

  return (
    <>
      <div className="hx-admin-content pt-6" style={{background:'#f8fafc'}}>
        {/* 统计卡片 — 两列紧凑 + 右侧留空 */}
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 2fr', gap:16, marginBottom:20}}>
          <div className="hx-admin-stat-card">
            <div className="hx-admin-stat-icon yellow"><Clock size={22} /></div>
            <div className="hx-admin-stat-content">
              <span className="hx-admin-stat-label">待交付</span>
              <strong className="hx-admin-stat-value" style={{color:'#d97706'}}>{pendingCount}</strong>
            </div>
          </div>
          <div className="hx-admin-stat-card">
            <div className="hx-admin-stat-icon green"><CheckCircle size={22} /></div>
            <div className="hx-admin-stat-content">
              <span className="hx-admin-stat-label">已完成</span>
              <strong className="hx-admin-stat-value" style={{color:'#16a34a'}}>{completedCount}</strong>
            </div>
          </div>
          {/* 右侧留空 */}
        </div>

        {/* 搜索栏 */}
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:'16px', marginBottom:'20px', flexWrap:'wrap'}}>
          <div style={{fontSize:'18px', fontWeight:700, color:'#1e293b'}}>
            ☕ 咖啡师接单工作台
          </div>
          <div style={{position:'relative'}}>
            <Search size={15} style={{position:'absolute', left:'10px', top:'50%', transform:'translateY(-50%)', color:'#94a3b8', pointerEvents:'none'}} />
            <input
              type="text"
              placeholder="搜索姓名或品类..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{paddingLeft:'32px', paddingRight:'12px', paddingTop:'8px', paddingBottom:'8px', background:'#fff', border:'1px solid #e2e8f0', borderRadius:'8px', fontSize:'13px', color:'#334155', outline:'none', boxSizing:'border-box', width:'200px'}}
            />
          </div>
        </div>

        {/* 工单列表 */}
        <div style={S.card}>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%', borderCollapse:'collapse', tableLayout:'fixed'}}>
              <thead>
                <tr style={{background:'#f8fafc'}}>
                  <th style={{...S.th, width:'16%'}}>兑换人</th>
                  <th style={{...S.th, width:'22%'}}>兑换内容</th>
                  <th style={{...S.th, width:'10%'}}>兑换数量</th>
                  <th style={{...S.th, width:'13%'}}>兑换日期</th>
                  <th style={{...S.th, width:'11%'}}>消耗星数</th>
                  <th style={{...S.th, width:'10%'}}>状态</th>
                  <th style={{...S.th, width:'10%'}}>操作</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{padding:'60px', textAlign:'center', color:'#94a3b8'}}>
                      <div style={{fontSize:'32px', marginBottom:'10px'}}>📭</div>
                      <div style={{fontSize:'14px', fontWeight:600}}>暂无订单</div>
                    </td>
                  </tr>
                ) : filtered.map((order) => {
                  const isDone = doneIds.has(order.id) || order.status === '已完成';
                  return (
                    <tr key={order.id}
                      style={{
                        background: isDone ? '#f8fafc' : '#fff',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={e => { if (!isDone) e.currentTarget.style.background = '#f8fafc'; }}
                      onMouseLeave={e => { if (!isDone) e.currentTarget.style.background = '#fff'; }}
                    >
                      {/* 兑换人 */}
                      <td style={S.td}>
                        <div>
                          <div style={{fontWeight:600, fontSize:'13px', color:'#1e293b'}}>{order.user.name}</div>
                          <div style={{fontSize:'11px', color:'#94a3b8'}}>{order.user.department}</div>
                        </div>
                      </td>
                      {/* 兑换内容 */}
                      <td style={S.td}>
                        <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                          <span style={{fontSize:'16px'}}>{order.item.icon}</span>
                          <div>
                            <span style={{
                              fontWeight:600, fontSize:'13px',
                              color: isDone ? '#94a3b8' : '#334155',
                              textDecoration: isDone ? 'line-through' : 'none',
                            }}>{order.item.name}</span>
                            <span style={{
                              fontWeight:600, fontSize:'13px', marginLeft:'4px',
                              color: isDone ? '#94a3b8' : '#007B7A',
                              textDecoration: isDone ? 'line-through' : 'none',
                            }}> - {order.category}</span>
                          </div>
                        </div>
                      </td>
                      {/* 兑换数量 */}
                      <td style={S.td}>
                        <span style={{
                          fontWeight:600, fontSize:'14px',
                          color: isDone ? '#94a3b8' : '#1e293b',
                          textDecoration: isDone ? 'line-through' : 'none',
                        }}>{order.quantity}</span>
                      </td>
                      {/* 兑换日期 */}
                      <td style={S.td}>
                        <span style={{fontSize:'13px', color:'#64748b'}}>{order.date}</span>
                      </td>
                      {/* 消耗星数 */}
                      <td style={S.td}>
                        <span style={{
                          fontWeight:700, fontSize:'14px',
                          color: isDone ? '#94a3b8' : '#007B7A',
                          textDecoration: isDone ? 'line-through' : 'none',
                        }}>{order.points.toLocaleString()}</span>
                        <span style={{fontSize:'11px', color:'#94a3b8', marginLeft:'3px'}}>星</span>
                      </td>
                      {/* 状态 */}
                      <td style={S.td}>
                        {isDone ? (
                          <span style={{display:'inline-flex', alignItems:'center', gap:'4px', padding:'3px 10px', borderRadius:'20px', background:'#f0fdfa', color:'#007B7A', fontSize:'12px', fontWeight:700}}>
                            <CheckCircle size={12} /> 已完成
                          </span>
                        ) : (
                          <span style={{display:'inline-flex', alignItems:'center', gap:'4px', padding:'3px 10px', borderRadius:'20px', background:'#fef3c7', color:'#d97706', fontSize:'12px', fontWeight:700}}>
                            <Clock size={12} /> 待交付
                          </span>
                        )}
                      </td>
                      {/* 操作 — 完成圆环 */}
                      <td style={S.td}>
                        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                          <button
                            type="button"
                            onClick={() => toggleDone(order.id)}
                            style={{
                              width: 28,
                              height: 28,
                              borderRadius: '50%',
                              border: isDone ? 'none' : '2.5px solid #d1d5db',
                              background: isDone ? '#007B7A' : '#fff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              flexShrink: 0,
                            }}
                            onMouseEnter={e => {
                              if (!isDone) {
                                e.currentTarget.style.borderColor = '#007B7A';
                                e.currentTarget.style.background = '#f0fdfa';
                              }
                            }}
                            onMouseLeave={e => {
                              if (!isDone) {
                                e.currentTarget.style.borderColor = '#d1d5db';
                                e.currentTarget.style.background = '#fff';
                              }
                            }}
                            title={isDone ? '标记为未完成' : '标记为已完成'}
                          >
                            {isDone && (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

// 人员与洪小星台账 - 完整的员工管理功能
const UsersContent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [batchUserIds, setBatchUserIds] = useState([]);
  const [isBatchMode, setIsBatchMode] = useState(false);
  const [adjustType, setAdjustType] = useState('increase');
  const [adjustValue, setAdjustValue] = useState('');
  const [adjustReason, setAdjustReason] = useState('');
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [logViewingUser, setLogViewingUser] = useState(null);
  const [logDateFilter, setLogDateFilter] = useState('');
  const [expandedRowId, setExpandedRowId] = useState(null);

  // 模拟员工数据
  const [employees, setEmployees] = useState([
    {
      id: 1,

      name: '张三',
      account: 'zhangsan',
      position: '前端工程师',
      currentPoints: 12840,
      totalPoints: 45680,
      lastUpdate: '2026-04-17',
      status: 'active'
    },
    {
      id: 2,
      avatar: 'https://i.pravatar.cc/100?img=2',
      name: '李四',
      account: 'lisi',
      position: '后端工程师',
      currentPoints: 11700,
      totalPoints: 39200,
      lastUpdate: '2026-04-17',
      status: 'active'
    },
    {
      id: 3,
      avatar: 'https://i.pravatar.cc/100?img=3',
      name: '王五',
      account: 'wangwu',
      position: 'UI设计师',
      currentPoints: 10980,
      totalPoints: 32100,
      lastUpdate: '2026-04-17',
      status: 'active'
    },
    {
      id: 4,
      avatar: 'https://i.pravatar.cc/100?img=4',
      name: '赵六',
      account: 'zhaoliu',
      position: '产品经理',
      currentPoints: 9880,
      totalPoints: 28900,
      lastUpdate: '2026-04-17',
      status: 'active'
    },
    {
      id: 5,
      avatar: 'https://i.pravatar.cc/100?img=5',
      name: '陈七',
      account: 'chenqi',
      position: '测试工程师',
      currentPoints: 8920,
      totalPoints: 25600,
      lastUpdate: '2026-04-17',
      status: 'active'
    },
    {
      id: 6,
      avatar: 'https://i.pravatar.cc/100?img=6',
      name: '杨八',
      account: 'yangba',
      position: '运维工程师',
      currentPoints: 8560,
      totalPoints: 23400,
      lastUpdate: '2026-04-17',
      status: 'active'
    }
  ]);

  // 统计数据计算
  const totalPoints = employees.reduce((sum, emp) => sum + emp.currentPoints, 0);
  const monthlyIncrease = 15680;
  const activeRatio = Math.round((employees.filter(emp => emp.status === 'active').length / employees.length) * 100);

  // 筛选员工
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = !positionFilter || employee.position === positionFilter;
    return matchesSearch && matchesPosition;
  });

  // 岗位选项
  const positions = [...new Set(employees.map(emp => emp.position))];

  // 调整星数 — 单人模式
  const handleAdjustPoints = (user) => {
    setSelectedUser(user);
    setBatchUserIds([]);
    setIsBatchMode(false);
    setAdjustType('increase');
    setAdjustValue('');
    setAdjustReason('');
    setShowAdjustModal(true);
  };

  // 批量调整 — 从勾选行触发
  const handleBatchAdjust = () => {
    if (selectedIds.size === 0) {
      alert('请先在下方表格中勾选需要调整积分的人员');
      return;
    }
    setSelectedUser(null);
    setBatchUserIds(Array.from(selectedIds));
    setIsBatchMode(true);
    setAdjustType('increase');
    setAdjustValue('');
    setAdjustReason('');
    setShowAdjustModal(true);
  };

  const submitAdjustment = () => {
    if (!adjustValue || !adjustReason) {
      alert('请填写完整的调整信息');
      return;
    }

    const adjustment = parseInt(adjustValue);
    if (isNaN(adjustment) || adjustment <= 0) { alert('请输入有效的正整数'); return; }

    if (isBatchMode) {
      // 批量模式：对选中的每个人应用相同调整
      setEmployees(prev =>
        prev.map(emp =>
          batchUserIds.includes(emp.id)
            ? {
                ...emp,
                currentPoints: Math.max(0, adjustType === 'increase' ? emp.currentPoints + adjustment : emp.currentPoints - adjustment),
                totalPoints: adjustType === 'increase' ? emp.totalPoints + adjustment : emp.totalPoints,
                lastUpdate: new Date().toISOString().split('T')[0]
              }
            : emp
        )
      );
      setShowAdjustModal(false);
      alert(`已为 ${batchUserIds.length} 位员工成功${adjustType === 'increase' ? '增加' : '减少'} ${adjustValue} 颗洪小星`);
    } else {
      // 单人模式
      const newCurrentPoints = adjustType === 'increase' ?
        selectedUser.currentPoints + adjustment :
        selectedUser.currentPoints - adjustment;
      const newTotalPoints = selectedUser.totalPoints + adjustment;
      setEmployees(prev =>
        prev.map(emp =>
          emp.id === selectedUser.id
            ? { ...emp, currentPoints: Math.max(0, newCurrentPoints), totalPoints: newTotalPoints, lastUpdate: new Date().toISOString().split('T')[0] }
            : emp
        )
      );
      setShowAdjustModal(false);
      alert(`成功${adjustType === 'increase' ? '增加' : '减少'} ${adjustValue} 颗洪小星`);
    }
  };

  // 按用户生成丰富的流水 mock 数据
  // category: 'exchange' | 'improvement' | 'manual'
  const historyDataMap = {
    1: [
      { date: '2026-04-17', amount: 500, reason: '月度绩效奖励', category: 'manual', detail: { operator: '超级管理员', description: '2026年4月绩效考核结果为A级，依据《洪小星激励制度》第3.2条发放月度绩效奖励。' } },
      { date: '2026-04-16', amount: -200, reason: '兑换咖啡', category: 'exchange', detail: { productName: '咖啡', spec: '冰美式', quantity: '2杯', shop: '星巴克（科技园店）' } },
      { date: '2026-04-15', amount: 300, reason: '项目完成奖励', category: 'manual', detail: { operator: '超级管理员', description: '「洪兴门户V2.0」前端开发任务提前3天完成，经项目管理办公室审核确认，发放项目完成奖励。' } },
      { date: '2026-04-14', amount: 150, reason: '团队协作贡献', category: 'improvement', detail: { ipdStage: '开发阶段', summary: '主动协助后端团队完成接口联调，缩短整体开发周期约2天，提升团队协作效率。', approver: '刘诗诗' } },
      { date: '2026-04-12', amount: -100, reason: '兑换咖啡', category: 'exchange', detail: { productName: '下午茶', spec: '提拉米苏+拿铁', quantity: '1份', shop: '园区咖啡厅' } },
      { date: '2026-04-10', amount: 200, reason: '创新提案奖励', category: 'improvement', detail: { ipdStage: '方案设计', summary: '提出「组件库标准化」方案，预计减少重复开发工作量约30%，已通过技术委员会评审。', approver: '刘诗诗' } },
      { date: '2026-04-08', amount: 450, reason: 'Q1季度优秀员工', category: 'manual', detail: { operator: '超级管理员', description: '荣获2026年Q1季度「优秀员工」称号，依据公司激励政策发放季度奖金。' } },
      { date: '2026-04-05', amount: -350, reason: '兑换蓝牙耳机', category: 'exchange', detail: { productName: '蓝牙耳机', spec: '降噪版', quantity: '1副', shop: '商城数码区' } },
      { date: '2026-04-03', amount: 100, reason: '帮助新同事融入', category: 'manual', detail: { operator: '超级管理员', description: '主动承担新入职同事的导师工作，帮助其在一周内完成环境搭建和项目熟悉，团队负责人推荐奖励。' } },
      { date: '2026-04-01', amount: 180, reason: '代码质量之星', category: 'improvement', detail: { ipdStage: '代码评审', summary: '本月代码评审零缺陷，单元测试覆盖率达95%以上，被评为部门代码质量标杆。', approver: '刘诗诗' } },
    ],
    2: [
      { date: '2026-04-17', amount: 400, reason: '月度绩效奖励', category: 'manual', detail: { operator: '超级管理员', description: '2026年4月绩效考核结果为A级，依据《洪小星激励制度》第3.2条发放月度绩效奖励。' } },
      { date: '2026-04-16', amount: -150, reason: '兑换电影票', category: 'exchange', detail: { productName: '电影票', spec: 'IMAX厅', quantity: '1张', shop: '商城文娱区' } },
      { date: '2026-04-14', amount: 250, reason: 'Bug修复奖励', category: 'improvement', detail: { ipdStage: '测试阶段', summary: '发现并修复支付模块高并发场景下的竞态条件Bug，避免了潜在资金损失。', approver: '刘诗诗' } },
      { date: '2026-04-11', amount: 300, reason: '架构优化贡献', category: 'improvement', detail: { ipdStage: '架构设计', summary: '主导完成用户服务微服务化改造，接口响应速度提升40%，系统可用性达99.9%。', approver: '刘诗诗' } },
      { date: '2026-04-09', amount: -200, reason: '兑换咖啡', category: 'exchange', detail: { productName: '咖啡', spec: '生椰拿铁', quantity: '2杯', shop: '瑞幸咖啡（科技园店）' } },
      { date: '2026-04-06', amount: 500, reason: '系统上线突出贡献', category: 'manual', detail: { operator: '超级管理员', description: '「订单中台系统」上线期间连续值守72小时，保障系统平稳过渡，特此表彰。' } },
      { date: '2026-04-02', amount: 120, reason: '技术分享奖励', category: 'manual', detail: { operator: '超级管理员', description: '完成《React性能优化实践》技术分享，参与人数50+，满意度评分4.8/5.0。' } },
    ],
    3: [
      { date: '2026-04-17', amount: 350, reason: '月度绩效奖励', category: 'manual', detail: { operator: '超级管理员', description: '2026年4月绩效考核结果为B+级，依据《洪小星激励制度》第3.2条发放月度绩效奖励。' } },
      { date: '2026-04-15', amount: -180, reason: '兑换书籍', category: 'exchange', detail: { productName: '《设计心理学》', spec: '精装版', quantity: '1本', shop: '商城图书区' } },
      { date: '2026-04-13', amount: 200, reason: 'UI改版好评奖励', category: 'improvement', detail: { ipdStage: '需求评审', summary: '主导完成首页UI改版设计，用户调研满意度从3.2提升至4.6，获得产品团队高度认可。', approver: '刘诗诗' } },
      { date: '2026-04-10', amount: 150, reason: '设计规范贡献', category: 'manual', detail: { operator: '超级管理员', description: '编写《洪兴门户UI设计规范V2.0》，统一全平台视觉标准，减少设计走查返工率约60%。' } },
      { date: '2026-04-07', amount: -120, reason: '兑换文创礼品', category: 'exchange', detail: { productName: '文创礼盒', spec: '春季款', quantity: '1盒', shop: '商城文创区' } },
      { date: '2026-04-04', amount: 280, reason: '品牌视觉升级', category: 'improvement', detail: { ipdStage: '方案设计', summary: '完成公司品牌视觉体系升级，包括Logo优化、色彩系统重构及全套VI手册输出。', approver: '刘诗诗' } },
    ],
    4: [
      { date: '2026-04-17', amount: 300, reason: '月度绩效奖励', category: 'manual', detail: { operator: '超级管理员', description: '2026年4月绩效考核结果为B+级，依据《洪小星激励制度》第3.2条发放月度绩效奖励。' } },
      { date: '2026-04-16', amount: -250, reason: '兑换智能手环', category: 'exchange', detail: { productName: '智能手环', spec: 'Pro版', quantity: '1只', shop: '商城数码区' } },
      { date: '2026-04-13', amount: 400, reason: '产品方案创新奖', category: 'improvement', detail: { ipdStage: '需求分析', summary: '提出「智能推荐引擎」产品方案，预计提升用户转化率15%，已通过产品委员会立项评审。', approver: '刘诗诗' } },
      { date: '2026-04-09', amount: 180, reason: '用户调研贡献', category: 'manual', detail: { operator: '超级管理员', description: '主导完成200+用户深度访谈，输出《用户体验痛点分析报告》，为产品迭代提供关键决策依据。' } },
      { date: '2026-04-05', amount: -100, reason: '兑换咖啡', category: 'exchange', detail: { productName: '咖啡', spec: '澳白', quantity: '2杯', shop: 'Manner咖啡（科兴店）' } },
      { date: '2026-04-02', amount: 220, reason: '跨部门协作奖', category: 'improvement', detail: { ipdStage: '开发阶段', summary: '协调研发、设计、测试三个部门完成紧急项目交付，获得项目管理办公室通报表扬。', approver: '刘诗诗' } },
    ],
    5: [
      { date: '2026-04-17', amount: 280, reason: '月度绩效奖励', category: 'manual', detail: { operator: '超级管理员', description: '2026年4月绩效考核结果为B级，依据《洪小星激励制度》第3.2条发放月度绩效奖励。' } },
      { date: '2026-04-15', amount: -150, reason: '兑换电影票', category: 'exchange', detail: { productName: '电影票', spec: '杜比厅', quantity: '2张', shop: '商城文娱区' } },
      { date: '2026-04-12', amount: 350, reason: '重大Bug发现奖励', category: 'improvement', detail: { ipdStage: '测试阶段', summary: '在压力测试中发现数据库连接池泄漏问题，避免了生产环境大规模宕机风险。', approver: '刘诗诗' } },
      { date: '2026-04-08', amount: 200, reason: '自动化测试贡献', category: 'manual', detail: { operator: '超级管理员', description: '搭建自动化测试框架，核心模块测试覆盖率从45%提升至88%，大幅减少回归测试人力成本。' } },
      { date: '2026-04-03', amount: -180, reason: '兑换书籍', category: 'exchange', detail: { productName: '《软件测试的艺术》', spec: '第三版', quantity: '1本', shop: '商城图书区' } },
    ],
    6: [
      { date: '2026-04-17', amount: 260, reason: '月度绩效奖励', category: 'manual', detail: { operator: '超级管理员', description: '2026年4月绩效考核结果为B级，依据《洪小星激励制度》第3.2条发放月度绩效奖励。' } },
      { date: '2026-04-16', amount: -120, reason: '兑换咖啡', category: 'exchange', detail: { productName: '咖啡', spec: '热拿铁', quantity: '1杯', shop: '星巴克（科技园店）' } },
      { date: '2026-04-13', amount: 180, reason: '运维保障贡献', category: 'manual', detail: { operator: '超级管理员', description: '完成全链路监控系统部署，实现故障秒级告警，平均故障恢复时间从30分钟缩短至5分钟。' } },
      { date: '2026-04-10', amount: 450, reason: '零故障运行奖', category: 'improvement', detail: { ipdStage: '运维阶段', summary: '负责的核心服务连续90天零故障运行，系统可用性达99.99%，创部门历史最佳记录。', approver: '刘诗诗' } },
      { date: '2026-04-06', amount: -200, reason: '兑换充电宝', category: 'exchange', detail: { productName: '移动电源', spec: '10000mAh', quantity: '1个', shop: '商城数码区' } },
    ],
  };

  const openLogModal = (user) => {
    setLogViewingUser(user);
    setLogDateFilter('');
    setIsLogModalOpen(true);
  };

  const filteredLogRecords = (historyDataMap[logViewingUser?.id] || []).filter(
    r => !logDateFilter || r.date === logDateFilter
  );

  return (
    <>
      <div className="hx-admin-content" style={{background:'#f8fafc'}}>
        {/* 顶部数据概览 */}
        <div className="hx-admin-stats-row">
          <div className="hx-admin-stat-card">
            <div className="hx-admin-stat-icon blue">
              <Award size={24} />
            </div>
            <div className="hx-admin-stat-content">
              <span className="hx-admin-stat-label">当前流通总额</span>
              <strong className="hx-admin-stat-value" style={{color:'#007B7A'}}>{totalPoints.toLocaleString()} 颗</strong>
            </div>
          </div>
          <div className="hx-admin-stat-card">
            <div className="hx-admin-stat-icon green">
              <TrendingUp size={24} />
            </div>
            <div className="hx-admin-stat-content">
              <span className="hx-admin-stat-label">本月新增星数</span>
              <strong className="hx-admin-stat-value" style={{color:'#16a34a'}}>+{monthlyIncrease.toLocaleString()} 颗</strong>
            </div>
          </div>
          <div className="hx-admin-stat-card">
            <div className="hx-admin-stat-icon purple">
              <Users size={24} />
            </div>
            <div className="hx-admin-stat-content">
              <span className="hx-admin-stat-label">活跃人员比例</span>
              <strong className="hx-admin-stat-value" style={{color:'#7c3aed'}}>{activeRatio}%</strong>
            </div>
          </div>
        </div>

        {/* 核心操作与搜索栏 */}
        <div style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'24px', flexWrap:'wrap'}}>
          {/* 左侧：搜索框 + 下拉 */}
          <div style={{display:'flex', alignItems:'center', gap:'10px', flex:1, flexWrap:'wrap'}}>
            <div style={{position:'relative', minWidth:'200px'}}>
              <Search size={15} style={{position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', color:'#94a3b8', pointerEvents:'none'}} />
              <input
                type="text"
                placeholder="按姓名搜索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{width:'100%', paddingLeft:'36px', paddingRight:'14px', paddingTop:'10px', paddingBottom:'10px', background:'#f1f5f9', border:'none', borderRadius:'10px', fontSize:'14px', color:'#334155', outline:'none', boxSizing:'border-box'}}
              />
            </div>
            <select
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
              style={{padding:'10px 14px', background:'#f1f5f9', border:'none', borderRadius:'10px', fontSize:'14px', color:'#334155', outline:'none', cursor:'pointer'}}
            >
              <option value="">全部岗位</option>
              {positions.map(pos => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
          </div>
          {/* 右侧：操作按钮 */}
          <div style={{display:'flex', gap:'10px', flexShrink:0}}>
            <button onClick={handleBatchAdjust} style={{display:'flex', alignItems:'center', gap:'6px', padding:'10px 20px', background:'#007B7A', color:'#fff', border:'none', borderRadius:'10px', fontSize:'14px', fontWeight:700, cursor:'pointer', whiteSpace:'nowrap'}}>
              <Plus size={16} />
              批量调整
            </button>
            <button
              onClick={() => {
                if (selectedIds.size === 0) { alert('请先勾选要导出的记录'); return; }
                const selected = filteredEmployees.filter(e => selectedIds.has(e.id));
                console.log('导出选中数据:', selected);
                alert('已导出 ' + selected.size + ' 条记录');
              }}
              style={{display:'flex', alignItems:'center', gap:'6px', padding:'10px 20px', background: selectedIds.size > 0 ? '#007B7A' : '#fff', color: selectedIds.size > 0 ? '#fff' : '#475569', border:'2px solid ' + (selectedIds.size > 0 ? '#007B7A' : '#e2e8f0'), borderRadius:'10px', fontSize:'14px', fontWeight:600, cursor:'pointer', whiteSpace:'nowrap'}}>
              <Download size={16} />
              导出{selectedIds.size > 0 ? '(' + selectedIds.size + ')' : ''}报表
            </button>
          </div>
        </div>

        {/* 人员台账表格 */}
        <div style={{background:'#fff', borderRadius:'16px', boxShadow:'0 1px 8px rgba(148,163,184,0.12)', border:'1px solid #f1f5f9', overflow:'hidden'}}>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%', borderCollapse:'collapse'}}>
              <thead>
                <tr style={{background:'#f8fafc', borderBottom:'1px solid #e2e8f0'}}>
                  <th style={{padding:'14px 16px', textAlign:'center', width:'48px'}}>
                    <input
                      type="checkbox"
                      checked={filteredEmployees.length > 0 && filteredEmployees.every(e => selectedIds.has(e.id))}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedIds(new Set(filteredEmployees.map(emp => emp.id)));
                        } else {
                          setSelectedIds(new Set());
                        }
                      }}
                      style={{width:'16px', height:'16px', cursor:'pointer', accentColor:'#007B7A'}}
                    />
                  </th>
                  <th style={{padding:'14px 16px', textAlign:'center', fontSize:'13px', fontWeight:700, color:'#475569', whiteSpace:'nowrap', width:'52px'}}>序号</th>
                  <th style={{padding:'14px 24px', textAlign:'left', fontSize:'13px', fontWeight:700, color:'#475569', whiteSpace:'nowrap'}}>姓名</th>
                  <th style={{padding:'14px 24px', textAlign:'left', fontSize:'13px', fontWeight:700, color:'#475569', whiteSpace:'nowrap'}}>岗位</th>
                  <th style={{padding:'14px 24px', textAlign:'left', fontSize:'13px', fontWeight:700, color:'#475569', whiteSpace:'nowrap'}}>账号</th>
                  <th style={{padding:'14px 24px', textAlign:'left', fontSize:'13px', fontWeight:700, color:'#475569', whiteSpace:'nowrap'}}>当前星数</th>
                  <th style={{padding:'14px 24px', textAlign:'left', fontSize:'13px', fontWeight:700, color:'#475569', whiteSpace:'nowrap'}}>累计总星数</th>
                  <th style={{padding:'14px 24px', textAlign:'left', fontSize:'13px', fontWeight:700, color:'#475569', whiteSpace:'nowrap'}}>最后更新时间</th>
                  <th style={{padding:'14px 24px', textAlign:'left', fontSize:'13px', fontWeight:700, color:'#475569', whiteSpace:'nowrap'}}>操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee, idx) => (
                  <tr key={employee.id} style={{borderBottom: idx < filteredEmployees.length - 1 ? '1px solid #f1f5f9' : 'none', transition:'background 0.15s', background: selectedIds.has(employee.id) ? '#f0fdfa' : '#fff'}}
                    onMouseEnter={e => e.currentTarget.style.background='#f8fafc'}
                    onMouseLeave={e => e.currentTarget.style.background=selectedIds.has(employee.id) ? '#f0fdfa' : '#fff'}
                  >
                    {/* 复选框 */}
                    <td style={{padding:'16px 16px', textAlign:'center'}}>
                      <input
                        type="checkbox"
                        checked={selectedIds.has(employee.id)}
                        onChange={(e) => {
                          setSelectedIds(prev => {
                            const next = new Set(prev);
                            if (e.target.checked) { next.add(employee.id); } else { next.delete(employee.id); }
                            return next;
                          });
                        }}
                        style={{width:'16px', height:'16px', cursor:'pointer', accentColor:'#007B7A'}}
                      />
                    </td>
                    {/* 序号 */}
                    <td style={{padding:'16px 16px', textAlign:'center', whiteSpace:'nowrap'}}>
                      <span style={{color:'#94a3b8', fontSize:'13px', fontWeight:600}}>{idx + 1}</span>
                    </td>
                    {/* 姓名 */}
                    <td style={{padding:'16px 24px', whiteSpace:'nowrap'}}>
                      <span style={{fontWeight:700, color:'#1e293b', fontSize:'15px'}}>{employee.name}</span>
                    </td>
                    {/* 岗位 */}
                    <td style={{padding:'16px 24px', whiteSpace:'nowrap'}}>
                      <span style={{color:'#64748b', fontSize:'13px'}}>{employee.position}</span>
                    </td>
                    {/* 账号 */}
                    <td style={{padding:'16px 24px', whiteSpace:'nowrap'}}>
                      <span style={{fontFamily:'monospace', fontSize:'13px', color:'#475569', background:'#f1f5f9', padding:'3px 10px', borderRadius:'6px'}}>
                        {employee.account}
                      </span>
                    </td>
                    {/* 当前星数 */}
                    <td style={{padding:'16px 24px', whiteSpace:'nowrap'}}>
                      <span style={{fontWeight:900, fontSize:'18px', color: employee.currentPoints > 0 ? '#007B7A' : '#94a3b8'}}>
                        {employee.currentPoints.toLocaleString()}
                      </span>
                      <span style={{color:'#94a3b8', fontSize:'13px', marginLeft:'4px'}}>颗</span>
                    </td>
                    {/* 累计总星数 */}
                    <td style={{padding:'16px 24px', whiteSpace:'nowrap'}}>
                      <span style={{fontWeight:700, fontSize:'16px', color:'#334155'}}>
                        {employee.totalPoints.toLocaleString()}
                      </span>
                      <span style={{color:'#94a3b8', fontSize:'13px', marginLeft:'4px'}}>颗</span>
                    </td>
                    {/* 最后更新 */}
                    <td style={{padding:'16px 24px', whiteSpace:'nowrap', color:'#64748b', fontSize:'14px'}}>
                      {employee.lastUpdate}
                    </td>
                    {/* 操作 */}
                    <td style={{padding:'16px 24px', whiteSpace:'nowrap'}}>
                      <div style={{display:'flex', gap:'8px', alignItems:'center'}}>
                        <button
                          onClick={() => handleAdjustPoints(employee)}
                          title="调整星数"
                          style={{display:'flex', alignItems:'center', justifyContent:'center', width:'34px', height:'34px', borderRadius:'8px', border:'none', background:'transparent', color:'#007B7A', cursor:'pointer', transition:'background 0.15s'}}
                          onMouseEnter={e => e.currentTarget.style.background='rgba(0,123,122,0.08)'}
                          onMouseLeave={e => e.currentTarget.style.background='transparent'}
                        >
                          <Edit3 size={17} />
                        </button>
                        <button
                          onClick={() => openLogModal(employee)}
                          title="查看积分收支明细"
                          style={{display:'flex', alignItems:'center', justifyContent:'center', width:'34px', height:'34px', borderRadius:'8px', border:'none', background:'transparent', color:'#64748b', cursor:'pointer', transition:'background 0.15s'}}
                          onMouseEnter={e => e.currentTarget.style.background='rgba(100,116,139,0.08)'}
                          onMouseLeave={e => e.currentTarget.style.background='transparent'}
                        >
                          <History size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 调整星数弹窗 */}
        {showAdjustModal && (
          <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.55)', backdropFilter:'blur(4px)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:50, padding:'16px'}}>
            <div style={{background:'#fff', borderRadius:'24px', maxWidth:'440px', width:'100%', boxShadow:'0 25px 60px rgba(0,0,0,0.2)'}}>
              <div style={{padding:'32px'}}>
                <h3 style={{color:'#1e293b', fontWeight:900, fontSize:'20px', marginBottom:'24px', margin:'0 0 24px 0'}}>
                  {isBatchMode ? `为选中的 ${batchUserIds.length} 位员工调整洪小星` : `调整 ${selectedUser?.name} 的洪小星数`}
                </h3>

                <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>
                  <div>
                    <label style={{display:'block', fontSize:'13px', fontWeight:700, color:'#475569', marginBottom:'10px'}}>变动类型</label>
                    <div style={{display:'flex', gap:'16px'}}>
                      <label style={{display:'flex', alignItems:'center', gap:'8px', cursor:'pointer'}}>
                        <input type="radio" name="adjustType" value="increase" checked={adjustType === 'increase'} onChange={(e) => setAdjustType(e.target.value)} />
                        <span style={{color:'#16a34a', fontWeight:700}}>增加</span>
                        <TrendingUp size={16} style={{color:'#16a34a'}} />
                      </label>
                      <label style={{display:'flex', alignItems:'center', gap:'8px', cursor:'pointer'}}>
                        <input type="radio" name="adjustType" value="decrease" checked={adjustType === 'decrease'} onChange={(e) => setAdjustType(e.target.value)} />
                        <span style={{color:'#dc2626', fontWeight:700}}>减少</span>
                        <TrendingDown size={16} style={{color:'#dc2626'}} />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label style={{display:'block', fontSize:'13px', fontWeight:700, color:'#475569', marginBottom:'8px'}}>
                      变动数值 <span style={{color:'#ef4444'}}>*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      placeholder="请输入变动数量"
                      value={adjustValue}
                      onChange={(e) => setAdjustValue(e.target.value)}
                      style={{width:'100%', padding:'12px 14px', border:'2px solid #e2e8f0', borderRadius:'12px', fontSize:'14px', fontWeight:500, outline:'none', boxSizing:'border-box'}}
                    />
                  </div>

                  <div>
                    <label style={{display:'block', fontSize:'13px', fontWeight:700, color:'#475569', marginBottom:'8px'}}>
                      变动原因 <span style={{color:'#ef4444'}}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="请输入变动原因"
                      value={adjustReason}
                      onChange={(e) => setAdjustReason(e.target.value)}
                      style={{width:'100%', padding:'12px 14px', border:'2px solid #e2e8f0', borderRadius:'12px', fontSize:'14px', fontWeight:500, outline:'none', boxSizing:'border-box', background:'#fff'}}
                    />
                  </div>
                </div>

                <div style={{display:'flex', gap:'12px', marginTop:'28px'}}>
                  <button
                    onClick={() => setShowAdjustModal(false)}
                    style={{flex:1, padding:'12px', border:'2px solid #e2e8f0', background:'#fff', color:'#475569', fontWeight:700, borderRadius:'12px', cursor:'pointer', fontSize:'14px'}}
                  >
                    取消
                  </button>
                  <button
                    onClick={submitAdjustment}
                    style={{flex:1, padding:'12px', border:'none', background:'linear-gradient(135deg, #007B7A 0%, #0f766e 100%)', color:'#fff', fontWeight:700, borderRadius:'12px', cursor:'pointer', fontSize:'14px', boxShadow:'0 4px 14px rgba(0,123,122,0.35)'}}
                  >
                    确认调整
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 积分流水弹窗 */}
        {isLogModalOpen && (
          <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', backdropFilter:'blur(4px)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:50, padding:'16px'}}
            onClick={() => setIsLogModalOpen(false)}>
            <div style={{background:'#fff', borderRadius:'16px', boxShadow:'0 25px 60px rgba(0,0,0,0.2)', width:'700px', maxHeight:'85vh', display:'flex', flexDirection:'column', overflow:'hidden'}}
              onClick={e => e.stopPropagation()}>
              {/* Header */}
              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'24px 28px', borderBottom:'1px solid #e2e8f0', flexShrink:0}}>
                <div>
                  <h3 style={{margin:0, fontSize:'18px', fontWeight:900, color:'#1e293b'}}>
                    【{logViewingUser?.name}】的洪小星收支流水
                  </h3>
                  <p style={{margin:'4px 0 0', fontSize:'13px', color:'#94a3b8'}}>当前余额：{logViewingUser?.currentPoints.toLocaleString()} 颗洪小星</p>
                </div>
                <button onClick={() => setIsLogModalOpen(false)}
                  style={{width:'32px', height:'32px', borderRadius:'8px', border:'none', background:'#f1f5f9', color:'#64748b', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <X size={16} />
                </button>
              </div>

              {/* Filter bar */}
              <div style={{padding:'12px 28px', borderBottom:'1px solid #f1f5f9', display:'flex', alignItems:'center', gap:'8px', flexShrink:0}}>
                <label style={{fontSize:'13px', fontWeight:600, color:'#64748b'}}>日期筛选：</label>
                <input type="date" value={logDateFilter}
                  onChange={e => setLogDateFilter(e.target.value)}
                  style={{padding:'6px 10px', border:'1px solid #e2e8f0', borderRadius:'8px', fontSize:'13px', color:'#334155', outline:'none'}}
                />
                {logDateFilter && (
                  <button onClick={() => setLogDateFilter('')}
                    style={{fontSize:'12px', color:'#94a3b8', background:'none', border:'none', cursor:'pointer', textDecoration:'underline'}}>
                    清除筛选
                  </button>
                )}
                <span style={{marginLeft:'auto', fontSize:'12px', color:'#94a3b8'}}>
                  共 {filteredLogRecords.length} 条记录
                </span>
              </div>

              {/* Table */}
              <div style={{flex:1, overflowY:'auto', padding:'0 28px'}}>
                <table style={{width:'100%', borderCollapse:'collapse'}}>
                  <thead style={{background:'#f8fafc', borderBottom:'1px solid #e2e8f0', position:'sticky', top:0}}>
                    <tr>
                      <th style={{padding:'12px 16px', textAlign:'left', fontSize:'12px', fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.05em'}}>发生时间</th>
                      <th style={{padding:'12px 16px', textAlign:'left', fontSize:'12px', fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.05em'}}>事件内容</th>
                      <th style={{padding:'12px 16px', textAlign:'right', fontSize:'12px', fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.05em'}}>变动数量</th>
                      <th style={{padding:'12px 16px', textAlign:'center', fontSize:'12px', fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.05em', width:60}}>详情</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLogRecords.map((item, idx) => {
                      const isExpanded = expandedRowId === `${logViewingUser?.id}-${idx}`;
                      return (
                        <React.Fragment key={idx}>
                          <tr
                            style={{borderBottom:'1px solid #f1f5f9', cursor:'pointer', background: isExpanded ? 'rgba(0,123,122,0.06)' : 'transparent', transition:'background 0.15s'}}
                            onClick={() => setExpandedRowId(isExpanded ? null : `${logViewingUser?.id}-${idx}`)}
                          >
                            <td style={{padding:'12px 16px', whiteSpace:'nowrap'}}>
                              <span style={{fontSize:'13px', color:'#475569', fontFamily:'monospace'}}>{item.date}</span>
                            </td>
                            <td style={{padding:'12px 16px'}}>
                              <span style={{fontSize:'13px', color:'#334155', fontWeight:500}}>{item.reason}</span>
                            </td>
                            <td style={{padding:'12px 16px', textAlign:'right', whiteSpace:'nowrap'}}>
                              <span style={{fontSize:'13px', fontWeight:700, color: item.amount > 0 ? '#007B7A' : '#dc2626'}}>
                                {item.amount > 0 ? '+' : ''}{item.amount.toLocaleString()}
                              </span>
                              <span style={{fontSize:'11px', color:'#94a3b8', marginLeft:'2px'}}>颗</span>
                            </td>
                            <td style={{padding:'12px 16px', textAlign:'center'}}>
                              <button
                                onClick={(e) => { e.stopPropagation(); setExpandedRowId(isExpanded ? null : `${logViewingUser?.id}-${idx}`); }}
                                style={{
                                  display:'inline-flex', alignItems:'center', justifyContent:'center',
                                  width:28, height:28, borderRadius:6, border:'1px solid',
                                  cursor:'pointer', transition:'all 0.2s', fontSize:12,
                                  background: isExpanded ? '#007B7A' : '#fff',
                                  borderColor: isExpanded ? '#007B7A' : '#e2e8f0',
                                  color: isExpanded ? '#fff' : '#94a3b8',
                                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                }}
                              >▾</button>
                            </td>
                          </tr>
                          {isExpanded && (
                            <tr>
                              <td colSpan={4} style={{padding:0}}>
                                <div style={{background:'rgba(248,250,252,0.8)', borderLeft:'4px solid #007B7A', padding:'16px 20px', boxShadow:'inset 0 2px 4px rgba(0,0,0,0.04)'}}>
                                  {item.category === 'exchange' && (
                                    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px 24px'}}>
                                      <div style={{display:'flex', alignItems:'baseline', gap:8}}>
                                        <span style={{fontSize:11, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', whiteSpace:'nowrap'}}>商品名称</span>
                                        <span style={{fontSize:13, fontWeight:600, color:'#334155'}}>{item.detail.productName}</span>
                                      </div>
                                      <div style={{display:'flex', alignItems:'baseline', gap:8}}>
                                        <span style={{fontSize:11, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', whiteSpace:'nowrap'}}>口味规格</span>
                                        <span style={{fontSize:13, fontWeight:600, color:'#334155'}}>{item.detail.spec}</span>
                                      </div>
                                      <div style={{display:'flex', alignItems:'baseline', gap:8}}>
                                        <span style={{fontSize:11, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', whiteSpace:'nowrap'}}>兑换数量</span>
                                        <span style={{fontSize:13, fontWeight:600, color:'#334155'}}>{item.detail.quantity}</span>
                                      </div>
                                    </div>
                                  )}
                                  {item.category === 'improvement' && (
                                    <div style={{borderLeft:'3px solid #3b82f6', paddingLeft:12}}>
                                      <div style={{display:'flex', flexDirection:'column', gap:8}}>
                                        <div style={{display:'flex', alignItems:'baseline', gap:8}}>
                                          <span style={{fontSize:11, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', whiteSpace:'nowrap'}}>IPD阶段</span>
                                          <span style={{fontSize:13, fontWeight:600, color:'#334155'}}>{item.detail.ipdStage}</span>
                                        </div>
                                        <div style={{display:'flex', alignItems:'baseline', gap:8}}>
                                          <span style={{fontSize:11, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', whiteSpace:'nowrap'}}>事由摘要</span>
                                          <span style={{fontSize:13, color:'#475569', lineHeight:1.6}}>{item.detail.summary}</span>
                                        </div>
                                        <div style={{display:'flex', alignItems:'baseline', gap:8}}>
                                          <span style={{fontSize:11, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', whiteSpace:'nowrap'}}>审批人</span>
                                          <span style={{fontSize:13, fontWeight:600, color:'#334155'}}>{item.detail.approver}</span>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {item.category === 'manual' && (
                                    <div style={{display:'flex', flexDirection:'column', gap:8}}>
                                      <div style={{display:'flex', alignItems:'baseline', gap:8}}>
                                        <span style={{fontSize:11, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', whiteSpace:'nowrap'}}>变动原因</span>
                                        <span style={{fontSize:13, color:'#475569', lineHeight:1.6}}>{item.detail.description}</span>
                                      </div>
                                      <div style={{display:'flex', alignItems:'baseline', gap:8}}>
                                        <span style={{fontSize:11, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', whiteSpace:'nowrap'}}>操作人</span>
                                        <span style={{fontSize:13, fontWeight:600, color:'#334155'}}>{item.detail.operator}</span>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                    {filteredLogRecords.length === 0 && (
                      <tr>
                        <td colSpan={4} style={{padding:'48px 16px', textAlign:'center', fontSize:'13px', color:'#94a3b8'}}>
                          没有找到匹配的记录
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div style={{padding:'16px 28px', borderTop:'1px solid #f1f5f9', display:'flex', justifyContent:'flex-end', flexShrink:0}}>
                <button onClick={() => setIsLogModalOpen(false)}
                  style={{padding:'10px 24px', background:'#f1f5f9', color:'#475569', fontWeight:600, borderRadius:'12px', border:'none', cursor:'pointer', fontSize:'13px'}}>
                  关闭
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

/* ──── 主页面组件（自包含布局壳） ──── */

const AdminPending = ({ user, onLogout }) => {
  const [currentPage, setCurrentPage] = useState('pending');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [navGroupsState, setNavGroupsState] = useState(() => {
    const state = {};
    adminNavGroups.forEach(group => {
      state[group.id] = group.defaultExpanded || false;
    });
    return state;
  });

  const toggleNavGroup = (groupId) => {
    setNavGroupsState(prev => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const handlePageChange = (pageId) => {
    setCurrentPage(pageId);
  };

  const handleLogout = () => {
    setShowUserMenu(false);
    if (onLogout) onLogout();
  };

  // 根据currentPage渲染对应子页面内容区
  const renderPageContent = () => {
    switch (currentPage) {
      case 'pending':   return <PendingContent />;
      case 'redblack':  return <RedBlackContent />;
      case 'gifts':     return <GiftsContent />;
      case 'orders':    return <OrdersContent />;
      case 'users':     return <UsersContent />;
      default:          return <PendingContent />;
    }
  };

  return (
    <div className="hx-admin-shell">
      {/* ──── 悬浮顶部栏 ──── */}
      <header className="hx-admin-topbar">
        <div className="hx-admin-brand" />

        <div className="hx-admin-top-actions">
          <div className="hx-admin-profile">
            <img src={avatarUrl} alt={user?.username || '管理员'} className="hx-admin-profile-avatar" />
            <span className="hx-admin-profile-name">{user?.username || '管理员'}</span>
            <span className="hx-admin-profile-divider">|</span>
            <button type="button" className="hx-admin-profile-logout" onClick={handleLogout}>
              退出
            </button>
          </div>
        </div>
      </header>

      {/* ──── 悬浮侧边栏 + 内容区 ──── */}
      <div className="hx-admin-body">
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
                  <div className="hx-admin-nav-item" onClick={() => toggleNavGroup(group.id)}>
                    <div className="hx-admin-nav-label">
                      <Icon size={18} />
                      <span>{group.title}</span>
                    </div>
                    {isGroupExpanded
                      ? <ChevronDown size={16} className="chevron-icon" />
                      : <ChevronRight size={16} className="chevron-icon" />
                    }
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
                          onClick={() => handlePageChange(item.id)}
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

        <main className="hx-admin-main">
          {renderPageContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminPending;
export { PendingContent, RedBlackContent, GiftsContent, OrdersContent, UsersContent };
