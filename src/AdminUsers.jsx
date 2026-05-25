import React, { useState } from 'react';
import { Users, Search, Download, Plus, Edit3, History, TrendingUp, TrendingDown, Award, X, ChevronDown } from 'lucide-react';
import AdminLayout from './AdminLayout';

const AdminUsers = ({ user, onLogout }) => {
  const [currentPage, setCurrentPage] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
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
      avatar: 'https://i.pravatar.cc/100?img=1',
      name: '张三',
      position: '前端工程师',
      department: '研发部',
      currentPoints: 12840,
      totalPoints: 45680,
      lastUpdate: '2026-04-17',
      status: 'active'
    },
    {
      id: 2,
      avatar: 'https://i.pravatar.cc/100?img=2',
      name: '李四',
      position: '后端工程师',
      department: '研发部',
      currentPoints: 11700,
      totalPoints: 39200,
      lastUpdate: '2026-04-17',
      status: 'active'
    },
    {
      id: 3,
      avatar: 'https://i.pravatar.cc/100?img=3',
      name: '王五',
      position: 'UI设计师',
      department: '设计部',
      currentPoints: 10980,
      totalPoints: 32100,
      lastUpdate: '2026-04-17',
      status: 'active'
    },
    {
      id: 4,
      avatar: 'https://i.pravatar.cc/100?img=4',
      name: '赵六',
      position: '产品经理',
      department: '产品部',
      currentPoints: 9880,
      totalPoints: 28900,
      lastUpdate: '2026-04-17',
      status: 'active'
    },
    {
      id: 5,
      avatar: 'https://i.pravatar.cc/100?img=5',
      name: '陈七',
      position: '测试工程师',
      department: '质量部',
      currentPoints: 8920,
      totalPoints: 25600,
      lastUpdate: '2026-04-17',
      status: 'active'
    },
    {
      id: 6,
      avatar: 'https://i.pravatar.cc/100?img=6',
      name: '杨八',
      position: '运维工程师',
      department: '运维部',
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
    const matchesDepartment = !departmentFilter || employee.department === departmentFilter;
    const matchesPosition = !positionFilter || employee.position === positionFilter;
    return matchesSearch && matchesDepartment && matchesPosition;
  });

  // 部门选项
  const departments = [...new Set(employees.map(emp => emp.department))];
  const positions = [...new Set(employees.map(emp => emp.position))];

  // 调整星数
  const handleAdjustPoints = (user) => {
    setSelectedUser(user);
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
    const newCurrentPoints = adjustType === 'increase' ?
      selectedUser.currentPoints + adjustment :
      selectedUser.currentPoints - adjustment;

    const newTotalPoints = selectedUser.totalPoints + adjustment;

    setEmployees(prev =>
      prev.map(emp =>
        emp.id === selectedUser.id
          ? {
              ...emp,
              currentPoints: Math.max(0, newCurrentPoints),
              totalPoints: newTotalPoints,
              lastUpdate: new Date().toISOString().split('T')[0]
            }
          : emp
      )
    );

    setShowAdjustModal(false);
    alert(`成功${adjustType === 'increase' ? '增加' : '减少'}${adjustment}颗洪小星`);
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

  const renderContent = () => (
    <div className="hx-admin-content">
      {/* 顶部数据概览 */}
      <div className="hx-admin-stats-row">
        <div className="hx-admin-stat-card">
          <div className="hx-admin-stat-icon blue">
            <Award size={24} />
          </div>
          <div className="hx-admin-stat-content">
            <span className="hx-admin-stat-label">当前流通总额</span>
            <strong className="hx-admin-stat-value text-[#007B7A]">{totalPoints.toLocaleString()} 颗</strong>
          </div>
        </div>
        <div className="hx-admin-stat-card">
          <div className="hx-admin-stat-icon green">
            <TrendingUp size={24} />
          </div>
          <div className="hx-admin-stat-content">
            <span className="hx-admin-stat-label">本月新增星数</span>
            <strong className="hx-admin-stat-value text-green-600">+{monthlyIncrease.toLocaleString()} 颗</strong>
          </div>
        </div>
        <div className="hx-admin-stat-card">
          <div className="hx-admin-stat-icon purple">
            <Users size={24} />
          </div>
          <div className="hx-admin-stat-content">
            <span className="hx-admin-stat-label">活跃人员比例</span>
            <strong className="hx-admin-stat-value text-purple-600">{activeRatio}%</strong>
          </div>
        </div>
      </div>

      {/* 核心操作与搜索栏 */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="按姓名搜索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007B7A] focus:border-transparent"
            />
          </div>
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007B7A] focus:border-transparent"
          >
            <option value="">全部部门</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <select
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
            className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007B7A] focus:border-transparent"
          >
            <option value="">全部岗位</option>
            {positions.map(pos => (
              <option key={pos} value={pos}>{pos}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#007B7A] to-teal-600 hover:from-[#006B6B] hover:to-teal-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
            <Plus size={18} />
            <span>批量添加</span>
          </button>
          <button className="flex items-center space-x-2 px-6 py-3 border-2 border-slate-200 hover:border-[#007B7A] text-slate-600 font-bold rounded-xl transition-all duration-300 hover:bg-[#007B7A] hover:text-white">
            <Download size={18} />
            <span>导出报表</span>
          </button>
        </div>
      </div>

      {/* 人员台账表格 */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">人员信息</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">所属部门</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">当前星数</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">累计总星数</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">最后更新时间</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                      <img
                        src={employee.avatar}
                        alt={employee.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-slate-200"
                      />
                      <div>
                        <div className="font-bold text-slate-800 text-lg">{employee.name}</div>
                        <div className="text-slate-500 font-medium">{employee.position}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full">
                      {employee.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`font-black text-xl ${employee.currentPoints > 0 ? 'text-[#007B7A]' : 'text-slate-400'}`}>
                      {employee.currentPoints.toLocaleString()}
                    </span>
                    <span className="text-slate-500 ml-1">颗</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-bold text-slate-700 text-lg">
                      {employee.totalPoints.toLocaleString()}
                    </span>
                    <span className="text-slate-500 ml-1">颗</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-600 font-medium">
                    {employee.lastUpdate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleAdjustPoints(employee)}
                        className="p-2 text-[#007B7A] hover:bg-[#007B7A]/10 rounded-xl transition-all"
                        title="调整星数"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() => openLogModal(employee)}
                        className="p-2 text-slate-600 hover:bg-slate-600/10 rounded-xl transition-all"
                        title="查看积分收支明细"
                      >
                        <History size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 积分流水弹窗 */}
      {isLogModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setIsLogModalOpen(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-[700px] max-h-[85vh] flex flex-col overflow-hidden"
            onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200 flex-shrink-0">
              <div>
                <h3 className="text-xl font-black text-slate-800">
                  【{logViewingUser?.name}】的洪小星收支流水
                </h3>
                <p className="text-sm text-slate-400 mt-1">当前余额：{logViewingUser?.currentPoints.toLocaleString()} 颗洪小星</p>
              </div>
              <button onClick={() => setIsLogModalOpen(false)}
                className="w-8 h-8 rounded-lg border-none bg-slate-100 text-slate-500 cursor-pointer flex items-center justify-center hover:bg-slate-200 transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Filter bar */}
            <div className="px-8 py-4 border-b border-slate-100 flex items-center gap-3 flex-shrink-0">
              <label className="text-sm font-semibold text-slate-500">日期筛选：</label>
              <input
                type="date"
                value={logDateFilter}
                onChange={e => setLogDateFilter(e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#007B7A] focus:border-transparent"
              />
              {logDateFilter && (
                <button onClick={() => setLogDateFilter('')}
                  className="text-xs text-slate-400 hover:text-[#007B7A] underline cursor-pointer">
                  清除筛选
                </button>
              )}
              <span className="ml-auto text-xs text-slate-400">
                共 {filteredLogRecords.length} 条记录
              </span>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-y-auto px-8 pb-2">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">发生时间</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">事件内容</th>
                    <th className="px-4 py-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">变动数量</th>
                    <th className="px-4 py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider w-20">详情</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLogRecords.map((item, idx) => {
                    const isExpanded = expandedRowId === `${logViewingUser?.id}-${idx}`;
                    return (
                      <React.Fragment key={idx}>
                        <tr
                          className={`transition-colors cursor-pointer ${isExpanded ? 'bg-teal-50/60' : 'hover:bg-slate-50'}`}
                          onClick={() => setExpandedRowId(isExpanded ? null : `${logViewingUser?.id}-${idx}`)}
                        >
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className="text-sm text-slate-600 font-mono">{item.date}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm text-slate-700 font-medium">{item.reason}</span>
                          </td>
                          <td className="px-4 py-3 text-right whitespace-nowrap">
                            <span className={`text-sm font-bold ${item.amount > 0 ? 'text-[#007B7A]' : 'text-red-500'}`}>
                              {item.amount > 0 ? '+' : ''}{item.amount.toLocaleString()}
                            </span>
                            <span className="text-xs text-slate-400 ml-1">颗</span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={(e) => { e.stopPropagation(); setExpandedRowId(isExpanded ? null : `${logViewingUser?.id}-${idx}`); }}
                              className={`inline-flex items-center justify-center w-7 h-7 rounded-lg border transition-all duration-200 ${isExpanded ? 'bg-[#007B7A] border-[#007B7A] text-white rotate-180' : 'bg-white border-slate-200 text-slate-400 hover:border-[#007B7A] hover:text-[#007B7A]'}`}
                            >
                              <ChevronDown size={14} />
                            </button>
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr>
                            <td colSpan={4} className="p-0">
                              <div className="bg-slate-50/80 border-l-4 border-[#007B7A] px-6 py-5 shadow-inner animate-[expandIn_0.3s_ease-out]">
                                {item.category === 'exchange' && (
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                                    <div className="flex items-start gap-2">
                                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">商品名称</span>
                                      <span className="text-sm font-semibold text-slate-700">{item.detail.productName}</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">口味规格</span>
                                      <span className="text-sm font-semibold text-slate-700">{item.detail.spec}</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">兑换数量</span>
                                      <span className="text-sm font-semibold text-slate-700">{item.detail.quantity}</span>
                                    </div>
                                  </div>
                                )}
                                {item.category === 'improvement' && (
                                  <div className="border-l-4 border-blue-400 pl-4 py-1">
                                    <div className="grid grid-cols-1 gap-y-2.5">
                                      <div className="flex items-start gap-2">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">IPD阶段</span>
                                        <span className="text-sm font-semibold text-slate-700">{item.detail.ipdStage}</span>
                                      </div>
                                      <div className="flex items-start gap-2">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">事由摘要</span>
                                        <span className="text-sm text-slate-600 leading-relaxed">{item.detail.summary}</span>
                                      </div>
                                      <div className="flex items-start gap-2">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">审批人</span>
                                        <span className="text-sm font-semibold text-slate-700">{item.detail.approver}</span>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                {item.category === 'manual' && (
                                  <div className="space-y-2.5">
                                    <div className="flex items-start gap-2">
                                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">变动原因</span>
                                      <span className="text-sm text-slate-600 leading-relaxed">{item.detail.description}</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">操作人</span>
                                      <span className="text-sm font-semibold text-slate-700">{item.detail.operator}</span>
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
                      <td colSpan={4} className="px-4 py-12 text-center text-sm text-slate-400">
                        没有找到匹配的记录
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="px-8 py-4 border-t border-slate-100 flex justify-end flex-shrink-0">
              <button onClick={() => setIsLogModalOpen(false)}
                className="px-6 py-2.5 bg-slate-100 text-slate-600 font-semibold rounded-xl hover:bg-slate-200 transition-colors text-sm">
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 调整星数弹窗 */}
      {showAdjustModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl">
            <div className="p-8">
              <h3 className="text-slate-800 font-black text-2xl mb-6">
                调整 {selectedUser?.name} 的洪小星数
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    变动类型
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="adjustType"
                        value="increase"
                        checked={adjustType === 'increase'}
                        onChange={(e) => setAdjustType(e.target.value)}
                        className="w-4 h-4 text-[#007B7A]"
                      />
                      <span className="text-green-600 font-bold">增加</span>
                      <TrendingUp size={18} className="text-green-600" />
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="adjustType"
                        value="decrease"
                        checked={adjustType === 'decrease'}
                        onChange={(e) => setAdjustType(e.target.value)}
                        className="w-4 h-4 text-[#007B7A]"
                      />
                      <span className="text-red-600 font-bold">减少</span>
                      <TrendingDown size={18} className="text-red-600" />
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="adjustValue" className="block text-sm font-bold text-slate-700 mb-3">
                    变动数值 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="adjustValue"
                    type="number"
                    min="1"
                    placeholder="请输入变动数量"
                    value={adjustValue}
                    onChange={(e) => setAdjustValue(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007B7A] focus:border-transparent font-medium"
                  />
                </div>

                <div>
                  <label htmlFor="adjustReason" className="block text-sm font-bold text-slate-700 mb-3">
                    变动原因 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="adjustReason"
                    value={adjustReason}
                    onChange={(e) => setAdjustReason(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007B7A] focus:border-transparent font-medium"
                  >
                    <option value="">请选择变动原因</option>
                    <option value="manual-entry">手动录入</option>
                    <option value="activity-reward">活动奖励</option>
                    <option value="punishment-deduction">惩戒扣除</option>
                    <option value="performance-bonus">绩效奖金</option>
                    <option value="project-completion">项目完成奖励</option>
                    <option value="team-collaboration">团队协作贡献</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => setShowAdjustModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all"
                >
                  取消
                </button>
                <button
                  onClick={submitAdjustment}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#007B7A] to-teal-600 hover:from-[#006B6B] hover:to-teal-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  确认调整
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

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

export default AdminUsers;