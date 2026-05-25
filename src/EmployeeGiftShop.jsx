import React, { useMemo, useState, useEffect } from 'react';
import {
  AlertTriangle,
  Award,
  Bell,
  Calendar,
  CalendarDays,
  CheckCircle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Clock3,
  Gift,
  LockKeyhole,
  MessageCircle,
  Search,
  Settings2,
  ShoppingBag,
  Star,
  Trophy,
  UserRound,
  UserRound as UserRoundIcon,
  Users,
  Wrench,
  ClipboardList,
  Home,
  FileText,
  LayoutDashboard,
  X,
  TrendingUp,
  TrendingDown,
  Megaphone,
} from 'lucide-react';
import { PendingContent, RedBlackContent, GiftsContent, OrdersContent, UsersContent } from './AdminPending';

const brandColor = '#007B7A';
const avatarUrl = 'https://i.pravatar.cc/120?img=12';

const personalRankingData = [
  { id: 1, rank: 1, name: '陈予安', score: 12840, trend: 'up', avatar: 'https://i.pravatar.cc/100?img=12', highlight: '主导IPD流程优化，产品交付周期缩短30%' },
  { id: 2, rank: 2, name: '梁思齐', score: 11700, trend: 'up', avatar: 'https://i.pravatar.cc/100?img=32', highlight: '建立研发质量评估体系，缺陷检出率提升40%' },
  { id: 3, rank: 3, name: '顾清野', score: 10980, trend: 'down', avatar: 'https://i.pravatar.cc/100?img=22', highlight: '推动代码审查规范化，质量评分提升至92分' },
  { id: 4, rank: 4, name: '秦可心', score: 9880, trend: 'up', avatar: 'https://i.pravatar.cc/100?img=47', highlight: '建立技术债务管理机制，系统响应时间降低25%' },
  { id: 5, rank: 5, name: '姜闻川', score: 9360, trend: 'down', avatar: 'https://i.pravatar.cc/100?img=66', highlight: '引入微服务架构，支撑业务量增长200%' },
  { id: 6, rank: 6, name: '白知许', score: 8920, trend: 'up', avatar: 'https://i.pravatar.cc/100?img=57', highlight: '建立用户体验反馈机制，满意度提升35%' },
  { id: 7, rank: 7, name: '高瑾瑜', score: 8560, trend: 'up', avatar: 'https://i.pravatar.cc/100?img=51', highlight: '优化数据库性能，查询响应时间降低40%' },
  { id: 8, rank: 8, name: '温祁年', score: 8010, trend: 'down', avatar: 'https://i.pravatar.cc/100?img=14', highlight: '建立安全漏洞扫描机制，隐患发现率提升50%' },
  { id: 9, rank: 9, name: '周栖云', score: 7780, trend: 'up', avatar: 'https://i.pravatar.cc/100?img=29', highlight: '推动API标准化，开发协作效率提升45%' },
  { id: 10, rank: 10, name: '邵一墨', score: 7310, trend: 'down', avatar: 'https://i.pravatar.cc/100?img=39', highlight: '建立性能监控体系，故障响应时间缩短60%' },
  { id: 11, rank: 11, name: '沈既白', score: 7060, trend: 'up', avatar: 'https://i.pravatar.cc/100?img=58', highlight: '推动接口限流策略落地，峰值可用性提升22%' },
  { id: 12, rank: 12, name: '宋临川', score: 6880, trend: 'down', avatar: 'https://i.pravatar.cc/100?img=37', highlight: '主导发布流程演练，发布事故率下降18%' },
  { id: 13, rank: 13, name: '林照雪', score: 6640, trend: 'up', avatar: 'https://i.pravatar.cc/100?img=41', highlight: '补齐监控漏项，异常发现提前35分钟' },
  { id: 14, rank: 14, name: '顾晚澄', score: 6410, trend: 'down', avatar: 'https://i.pravatar.cc/100?img=23', highlight: '完善质量门禁流程，返工率降低15%' },
  { id: 15, rank: 15, name: '许惊鸿', score: 6230, trend: 'up', avatar: 'https://i.pravatar.cc/100?img=17', highlight: '完成自动化脚本改造，回归效率提升27%' },
  { id: 16, rank: 16, name: '苏见月', score: 6010, trend: 'up', avatar: 'https://i.pravatar.cc/100?img=5', highlight: '推进需求澄清模板，误解成本下降20%' },
  { id: 17, rank: 17, name: '江聿风', score: 5850, trend: 'down', avatar: 'https://i.pravatar.cc/100?img=11', highlight: '主导压测专项，性能瓶颈定位时长缩短50%' },
  { id: 18, rank: 18, name: '闻书言', score: 5710, trend: 'up', avatar: 'https://i.pravatar.cc/100?img=44', highlight: '建立回滚预案模板，线上恢复效率提升30%' },
  { id: 19, rank: 19, name: '贺清秋', score: 5620, trend: 'down', avatar: 'https://i.pravatar.cc/100?img=49', highlight: '推动测试基线统一，交付质量更稳定' },
  { id: 20, rank: 20, name: '陆昭宁', score: 5480, trend: 'up', avatar: 'https://i.pravatar.cc/100?img=19', highlight: '梳理日志规范，问题追踪效率提升24%' },
  { id: 21, rank: 21, name: '沈知序', score: 5350, trend: 'up', avatar: 'https://i.pravatar.cc/100?img=33', highlight: '修复遗留告警项，减少误报干扰' },
  { id: 22, rank: 22, name: '叶闻歌', score: 5190, trend: 'down', avatar: 'https://i.pravatar.cc/100?img=62', highlight: '完成服务治理梳理，链路依赖更透明' },
  { id: 23, rank: 23, name: '岑南舟', score: 5030, trend: 'down', avatar: 'https://i.pravatar.cc/100?img=16', highlight: '优化缓存策略，接口稳定性提升12%' },
  { id: 24, rank: 24, name: '言初晴', score: 4870, trend: 'up', avatar: 'https://i.pravatar.cc/100?img=7', highlight: '补齐知识库沉淀，问题复现时间缩短' },
];

const teamRankingData = [
  { id: 1, rank: 1, teamName: '数智军团', badgeText: 'IP', score: 52400, trend: 'up', highlight: '跨部门协同提速，季度交付准点率提升32%' },
  { id: 2, rank: 2, teamName: '人财物军团', badgeText: 'QE', score: 48720, trend: 'up', highlight: '构建统一质量看板，缺陷跟踪闭环效率提升28%' },
  { id: 3, rank: 3, teamName: '设备军团', badgeText: 'PA', score: 45610, trend: 'down', highlight: '平台治理标准化，基础能力复用率提升40%' },
  { id: 4, rank: 4, teamName: '供用电军团', badgeText: 'AT', score: 43880, trend: 'up', highlight: '回归自动化覆盖率提升至85%' },
  { id: 5, rank: 5, teamName: '安监及综合军团', badgeText: 'UX', score: 42630, trend: 'down', highlight: '优化交互反馈链路，满意度稳步提升' },
  { id: 6, rank: 6, teamName: '云原生平台组', badgeText: 'CP', score: 41250, trend: 'up', highlight: '发布效率提升，部署时间压缩45%' },
  { id: 7, rank: 7, teamName: '数据治理组', badgeText: 'DG', score: 40310, trend: 'up', highlight: '口径统一后，核心报表误差率下降' },
  { id: 8, rank: 8, teamName: '安全响应组', badgeText: 'SR', score: 39780, trend: 'down', highlight: '漏洞闭环加快，安全响应SLA提升' },
  { id: 9, rank: 9, teamName: '基础服务组', badgeText: 'BS', score: 38260, trend: 'up', highlight: '核心接口稳定性提升至99.95%' },
  { id: 10, rank: 10, teamName: '流程运营组', badgeText: 'PO', score: 37140, trend: 'down', highlight: '推动评审模板统一，返工次数降低' },
  { id: 11, rank: 11, teamName: '发布保障组', badgeText: 'RB', score: 36480, trend: 'up', highlight: '发布故障恢复时间进一步缩短' },
  { id: 12, rank: 12, teamName: '接口治理组', badgeText: 'AG', score: 35190, trend: 'down', highlight: '接口规范统一，对接周期更可控' },
  { id: 13, rank: 13, teamName: '研发支撑组', badgeText: 'RD', score: 34620, trend: 'up', highlight: '工具脚本沉淀，重复劳动明显下降' },
  { id: 14, rank: 14, teamName: '知识沉淀组', badgeText: 'KM', score: 33450, trend: 'down', highlight: '文档更新时效性提升，定位更快捷' },
  { id: 15, rank: 15, teamName: '运维协同组', badgeText: 'OP', score: 32180, trend: 'up', highlight: '例行巡检标准化，稳定性指标回升' },
  { id: 16, rank: 16, teamName: '专项攻坚组', badgeText: 'SP', score: 31540, trend: 'up', highlight: '专项问题攻坚效率提升27%' },
  { id: 17, rank: 17, teamName: '服务体验组', badgeText: 'SE', score: 30970, trend: 'down', highlight: '改善用户路径，咨询量有所下降' },
  { id: 18, rank: 18, teamName: '架构评审组', badgeText: 'AR', score: 29860, trend: 'up', highlight: '方案评审通过率与质量同步提升' },
  { id: 19, rank: 19, teamName: '观测诊断组', badgeText: 'OD', score: 28710, trend: 'down', highlight: '观测指标更全面，故障定位更快' },
  { id: 20, rank: 20, teamName: '协同交付组', badgeText: 'CD', score: 27680, trend: 'up', highlight: '协作链路拉通，跨组等待时间缩短' },
  { id: 21, rank: 21, teamName: '数据服务组', badgeText: 'DS', score: 26810, trend: 'up', highlight: '数据服务复用能力增强' },
  { id: 22, rank: 22, teamName: '流程制度组', badgeText: 'PS', score: 25940, trend: 'down', highlight: '流程更新频率提升，执行更规范' },
  { id: 23, rank: 23, teamName: '问题追踪组', badgeText: 'IT', score: 24720, trend: 'down', highlight: '遗留问题清理速度提升' },
  { id: 24, rank: 24, teamName: '质量运营组', badgeText: 'QO', score: 23890, trend: 'up', highlight: '质量活动参与度稳步增长' },
];

const activityFeed = [
  { id: 1, text: '恭喜 陈予安 刚刚兑换了 咖啡', time: '刚刚' },
  { id: 2, text: '梁思齐 消耗了 200 洪小星兑换了 咖啡', time: '1分钟前' },
  { id: 3, text: '顾清野 获得了 50 洪小星奖励 · IPD流程优化', time: '3分钟前' },
];

// 黑榜数据 - 个人黑榜
const blackListPersonal = [
  {
    id: 1,
    problem: '生产环境服务中断2小时，影响核心业务系统可用性',
    detail: '2024 年 3 月 15 日凌晨 2:15，由于该工程师在未经变更评审的情况下擅自执行数据库索引重建操作，导致生产环境主库锁表长达 127 分钟。核心业务系统在此期间完全不可用，影响在线用户约 3.2 万人，直接经济损失预估 8.5 万元。事后调查发现，该操作未按照公司变更管理流程进行审批和灰度验证，属于严重违规操作。',
    date: '2024-03-15',
    person: '王小明',
    group: '后端开发组',
    jobTitle: '后端架构师',
    source: 'manual',
    severity: '高危',
  },
  {
    id: 2,
    problem: '代码回滚导致功能缺失，影响线上业务正常使用',
    detail: '3 月 30 日，该工程师在处理线上 Hotfix 时执行了错误的 Git 回滚操作，将 HEAD 指针回退到了两周前的提交版本，导致期间开发完成的 3 个核心功能模块丢失。线上用户反馈"订单查询"和"数据统计"功能异常，持续 6 小时后才通过备份恢复。该事件暴露了团队在代码管理和回滚流程上的规范缺失。',
    date: '2024-03-30',
    person: '刘强',
    group: '开发组',
    jobTitle: '高级前端工程师',
    source: 'manual',
    severity: '高危',
  },
  {
    id: 3,
    problem: '连续三次未按时完成测试任务，影响项目进度',
    detail: '该测试专家在 Q2 项目冲刺阶段，连续三个迭代周期未能按计划完成分配的测试任务，累计延期 12 个工作日。由于测试环节的滞后，导致项目整体交付延期 1 周，影响了下游业务部门的上线排期。经直属主管约谈后确认，该问题源于个人时间管理不当，已纳入绩效改进计划（PIP）跟踪。',
    date: '2024-04-05',
    person: '王五',
    group: '测试部',
    jobTitle: '测试专家',
    source: 'manual',
    severity: '警告',
  },
  {
    id: 4,
    problem: '数据库连接池耗尽，导致服务不可用',
    detail: '4 月 12 日上午 10:30 开始，监控告警系统检测到数据库活跃连接数持续攀升至连接池上限（200 个），导致所有新请求被拒绝。根因分析发现，该 DBA 在凌晨的低峰期变更中调整了连接池回收策略参数，将 idle_timeout 从 300s 误设为 3600s，导致空闲连接无法及时释放。故障持续 43 分钟，影响核心交易链路。',
    date: '2024-04-12',
    person: '陈华',
    group: '数据库组',
    jobTitle: 'DBA 资深工程师',
    source: 'system',
    severity: '高危',
  },
  {
    id: 5,
    problem: '缓存策略失效，系统性能下降80%',
    detail: '该架构师于 4 月 20 日主导实施了 Redis 集群缓存策略优化方案，但在配置热更新过程中引入了错误的 TTL 计算逻辑，导致大量缓存键在写入后立即过期（实际 TTL ≈ 0）。系统缓存命中率从 92% 骤降至 11%，数据库查询量激增 8 倍，整体系统响应时间从 120ms 恶化至 680ms。问题在 3 小时后被监控发现并回滚。',
    date: '2024-04-25',
    person: '赵刚',
    group: '架构组',
    jobTitle: '系统架构师',
    source: 'system',
    severity: '警告',
  },
  {
    id: 6,
    problem: '内存泄漏导致服务频繁重启，影响系统稳定性',
    detail: '运维监控系统持续检测到该工程师负责的订单处理服务在近两周内出现内存使用量线性增长趋势，每次部署后约 48 小时即触发 OOM Kill 导致服务重启。经 Heap Dump 分析，问题定位为其编写的定时任务模块中存在未关闭的 HTTP 连接对象积压。该问题已累计导致 14 次非计划重启，影响订单处理成功率。',
    date: '2024-05-08',
    person: '周伟',
    group: '开发组',
    jobTitle: '运维工程师',
    source: 'system',
    severity: '高危',
  },
];

// 黑榜数据 - 团队黑榜
const blackListTeam = [
  {
    id: 1,
    legion: '数智军团',
    issue: 'Q2季度交付进度严重滞后，关键里程碑连续未达成',
    detail: 'Q2 季度交付进度滞后 15%，核心原因是由于前期架构评审不充分，导致开发中途发生重大重构。该延期直接影响了业务侧 6 月 18 日的上线大促活动，造成了显著的业务机会成本损失。经管理层评估，该事项已列入三季度重点观测名单，要求军团在 7 月底前完成赶工计划并每周汇报进度。',
    owner: '张建国',
    date: '2024-04-30',
    source: '人工录入',
    severity: '高危',
  },
  {
    id: 2,
    legion: '供用电军团',
    issue: '线上Bug率严重超标，客户投诉量激增触发质量预警',
    detail: '本季度线上 Bug 率超标 2.3 倍，主要集中在电费核算模块和用户账单生成链路。经根因分析，问题源于 4 月份一次未经充分回归测试的紧急上线，导致核心计费逻辑出现边界条件错误。累计收到客户投诉 47 起，其中 3 起已升级至监管部门。质量委员会已责令该军团暂停新功能开发两周，专项进行质量修复与测试补强。',
    owner: '李慧敏',
    date: '2024-05-15',
    source: '人工录入',
    severity: '高危',
  },
  {
    id: 3,
    legion: '人财物军团',
    issue: '安全审计未通过，存在高危数据泄露漏洞亟需整改',
    detail: '第三季度安全审计结果为"不通过"，共发现高危漏洞 5 个、中危漏洞 12 个。其中 3 个高危漏洞涉及员工敏感信息泄露风险，攻击者可通过构造特殊请求绕过鉴权获取任意员工薪资数据。审计方已出具正式整改通知书，要求在 30 天内完成全部高危漏洞修复并提交复检申请。逾期未修复将触发合规问责流程，并可能影响公司 ISO 27001 年审结果。',
    owner: '王志强',
    date: '2024-05-22',
    source: '人工录入',
    severity: '高危',
  },
  {
    id: 4,
    legion: '运维军团',
    issue: '资源利用率持续低位运行，IT成本严重超支引发财务预警',
    detail: '运维军团管辖的服务器集群近三个月平均资源利用率仅为 38%，远低于集团 65% 的基准线。经财务部门核算，仅 5 月份闲置资源对应的云服务费超支达 12.8 万元。初步排查发现，主要原因为历史遗留的"僵尸实例"未及时清理，以及部分业务下线后对应的容器编排资源未同步回收。财务已将该事项标记为橙色预警，要求运维军团在两周内提交资源优化方案并完成首批资源回收。',
    owner: '陈海涛',
    date: '2024-06-01',
    source: '人工录入',
    severity: '警告',
  },
];

const personalBlackRankingData = blackListPersonal.map((item, index) => ({
  id: item.id,
  rank: index + 1,
  name: item.person,
  score: 92 - index * 7,
  trend: index % 2 === 0 ? 'up' : 'down',
  owner: ['刘志远', '陈晓峰', '赵敏捷', '王启成', '李沐晨', '周若川'][index] || '待分配',
  reasonTitle: item.problem,
  detail: item.detail,
  date: item.date,
}));

const teamBlackRankingData = blackListTeam.map((item, index) => ({
  id: item.id,
  rank: index + 1,
  teamName: item.legion,
  score: 268 - index * 19,
  trend: index % 2 === 0 ? 'up' : 'down',
  reasonTitle: item.issue,
  detail: item.detail,
  date: item.date,
}));

const toolItems = [
  { id: 'points', label: '洪小星明细' },
  { id: 'orders', label: '我的订单' },
  { id: 'service', label: '联系客服' },
];

const coffeeCategories = ['冰美式', '热美式', '冰拿铁', '热拿铁', '生椰拿铁'];

const giftsSeed = [
  {
    id: 1,
    name: '咖啡',
    description: '适合午后补给与团队下午茶兑换。',
    pointsCost: 1,
    stock: 50,
    category: '餐饮',
    rating: 4.8,
    color: 'coffee',
    redeemed: 12,
    subCategories: coffeeCategories,
  },
];

const exchangeHistorySeed = [
  {
    id: 1,
    giftName: '兑换咖啡',
    pointsCost: 300,
    date: '2026-04-13',
    status: 'completed',
  },
  {
    id: 2,
    giftName: '兑换咖啡',
    pointsCost: 200,
    date: '2026-03-28',
    status: 'completed',
  },
  {
    id: 3,
    giftName: '兑换咖啡',
    pointsCost: 150,
    date: '2026-03-15',
    status: 'pending',
  },
  {
    id: 4,
    giftName: '兑换咖啡',
    pointsCost: 250,
    date: '2026-03-08',
    status: 'revoked',
  },
];

const orderSeed = [
  {
    id: 'HX20260416001',
    giftName: '咖啡',
    category: '冰美式',
    quantity: 2,
    pointsCost: 300,
    createdAt: '2026-04-16',
    status: '待交付',
    receiver: '张三',
    contact: '138****8888',
    address: '上海市浦东新区张江高科软件园 2 号楼',
  },
  {
    id: 'HX20260412008',
    giftName: '咖啡',
    category: '生椰拿铁',
    quantity: 1,
    pointsCost: 200,
    createdAt: '2026-04-12',
    status: '已完成',
    receiver: '张三',
    contact: '138****8888',
    address: '券码已发放至站内消息',
  },
  {
    id: 'HX20260405012',
    giftName: '咖啡',
    category: '热拿铁',
    quantity: 3,
    pointsCost: 500,
    createdAt: '2026-04-05',
    status: '已完成',
    receiver: '张三',
    contact: '138****8888',
    address: '上海市静安区南京西路 18 号',
  },
  {
    id: 'HX20260328003',
    giftName: '咖啡',
    category: '冰拿铁',
    quantity: 1,
    pointsCost: 800,
    createdAt: '2026-03-28',
    status: '已完成',
    receiver: '张三',
    contact: '138****8888',
    address: '上海市浦东新区张江高科软件园 2 号楼',
  },
];

const pointDetailSeed = [
  { id: 1, type: '团队奖励', time: '2026-04-16', value: '+5' },
  { id: 2, type: '后台添加', time: '2026-04-15', value: '+1' },
  { id: 3, type: '兑换咖啡', time: '2026-04-13', value: '-300' },
  { id: 4, type: '季度激励发放', time: '2026-04-01', value: '+200' },
];

const categories = ['all', '餐饮', '购物', '娱乐', '生活'];
// orderTabs removed — simplified to record-only mode
const orderTypeOptions = ['全部', '餐饮福利', '娱乐权益', '生活好物'];
const orderStatusOptions = ['全部', '待交付', '已完成'];

// IPD阶段选项
const ipdStageOptions = [
  '概念与计划',
  '开发与测试',
  '验证与发布',
  '全流程与生命周期',
  '重大攻关与创新'
];

// 改进方向类别选项
const improvementTypeOptions = [
  '需求与方案优化',
  '代码与测试改进',
  '质量与交付优化',
  '流程与工具改进',
  '技术突破与成果沉淀'
];

// IPD阶段与改进方向类别的映射关系
const ipdToImprovementMap = {
  '概念与计划': '需求与方案优化',
  '开发与测试': '代码与测试改进',
  '验证与发布': '质量与交付优化',
  '全流程与生命周期': '流程与工具改进',
  '重大攻关与创新': '技术突破与成果沉淀'
};

const improvementRecordSeed = [
  {
    id: 1,
    title: '优化需求文档模板，提升需求描述清晰度',
    submitter: '张三',
    department: '产品技术中心',
    submitTime: '2024-04-15',
    status: '已采纳',
    ipdStage: '概念与计划',
    level: '重要',
    category: '需求与方案优化',
    summary: '通过标准化需求文档模板，减少需求理解偏差，提升开发效率',
    reason: '通过标准化需求文档模板，减少需求理解偏差，提升开发效率',
    solution: '统一需求模板结构并补充案例说明，推动团队统一使用。',
    score: 5,
    reviewComment: '方案清晰，建议纳入部门模板标准。',
  },
  {
    id: 2,
    title: '改进数据库设计规范，增加字段说明',
    submitter: '李四',
    department: '产品技术中心',
    submitTime: '2024-04-12',
    status: '待采纳',
    ipdStage: '开发与测试',
    level: '一般',
    category: '代码与测试改进',
    summary: '建立完整数据库设计规范，补齐字段命名和注释要求',
    reason: '建立完整数据库设计规范，补齐字段命名和注释要求',
    solution: '制定统一命名规则，新增字段注释校验清单并纳入评审。',
    files: [
      { name: '数据库设计规范-v2.docx', size: 358400 },
      { name: '字段注释清单.xlsx', size: 128000 },
    ],
  },
  {
    id: 3,
    title: '优化代码结构，提升模块复用性',
    submitter: '王五',
    department: '产品技术中心',
    submitTime: '2024-04-10',
    status: '已采纳',
    ipdStage: '开发与测试',
    level: '轻微',
    category: '代码与测试改进',
    summary: '重构公共模块，降低重复代码，减少维护成本',
    reason: '重构公共模块，降低重复代码，减少维护成本',
    solution: '提炼公共 hooks 和工具模块，并沉淀编码规范。',
    score: 3,
    reviewComment: '收益明确，建议作为模块治理样板推广。',
  },
  {
    id: 4,
    title: '完善测试用例覆盖率，提高测试质量',
    submitter: '赵六',
    department: '质量保障部',
    submitTime: '2024-04-08',
    status: '待采纳',
    ipdStage: '验证与发布',
    level: '一般',
    category: '质量与交付优化',
    summary: '完善测试用例覆盖率，提高测试质量，减少线上缺陷',
    reason: '完善测试用例覆盖率，提高测试质量，减少线上缺陷',
    solution: '按核心链路补齐回归清单，并将覆盖率纳入版本门禁。',
    files: [
      { name: '测试覆盖率分析报告.pdf', size: 845312 },
    ],
  },
  {
    id: 5,
    title: '建立需求变更管理流程，减少沟通成本',
    submitter: '张三',
    department: '产品技术中心',
    submitTime: '2024-04-05',
    status: '已采纳',
    ipdStage: '概念与计划',
    level: '重大',
    category: '需求与方案优化',
    summary: '建立需求变更管理流程，减少沟通成本，提升协作效率',
    reason: '建立需求变更管理流程，减少沟通成本，提升协作效率',
    solution: '引入需求变更评审机制，并在版本迭代中强制执行。',
    score: 4,
    reviewComment: '对跨团队协作帮助明显，纳入常规流程。',
  },
  {
    id: 6,
    title: '引入代码审查工具，提升代码质量',
    submitter: '张三',
    department: '产品技术中心',
    submitTime: '2024-04-03',
    status: '已采纳',
    ipdStage: '全流程与生命周期',
    level: '重要',
    category: '流程与工具改进',
    summary: '引入代码审查工具，提升代码质量，统一编码规范',
    reason: '引入代码审查工具，提升代码质量，统一编码规范',
    solution: '接入 SonarQube 与 MR 门禁，形成标准扫描项。',
    score: 3,
    reviewComment: '具备落地条件，可直接进入推广阶段。',
  },
  {
    id: 7,
    title: '自动化回归测试方案优化，缩短测试周期',
    submitter: '张三',
    department: '产品技术中心',
    submitTime: '2024-03-28',
    status: '未采纳',
    ipdStage: '验证与发布',
    level: '一般',
    category: '质量与交付优化',
    summary: '自动化回归测试方案优化，缩短测试周期 50%',
    reason: '自动化回归测试方案优化，缩短测试周期 50%',
    solution: '重新整理自动化测试任务分层，明确冒烟与全量回归边界。',
    rejectReason: '方案目标明确，但缺少资源评估和排期说明。',
  },
  {
    id: 8,
    title: '建立项目复盘机制，沉淀最佳实践',
    submitter: '张三',
    department: '产品技术中心',
    submitTime: '2024-03-25',
    status: '已采纳',
    ipdStage: '全流程与生命周期',
    level: '重大',
    category: '流程与工具改进',
    summary: '建立项目复盘机制，沉淀最佳实践，形成知识库',
    reason: '建立项目复盘机制，沉淀最佳实践，形成知识库',
    solution: '按项目阶段输出复盘模板，并建设统一复盘知识库。',
    score: 5,
    reviewComment: '具备组织价值，建议各条线同步复制。',
  },
  {
    id: 9,
    title: '统一需求评审标准，建立评审检查清单',
    submitter: '张三',
    department: '产品技术中心',
    submitTime: '2024-03-15',
    status: '待采纳',
    ipdStage: '概念与计划',
    level: '一般',
    category: '需求与方案优化',
    summary: '统一需求评审标准，建立评审检查清单',
    reason: '统一需求评审标准，建立评审检查清单',
    solution: '围绕业务、技术、测试三个维度输出统一评审表。',
    files: [
      { name: '需求评审检查清单-v1.docx', size: 196608 },
    ],
  },
  {
    id: 10,
    title: '建立缺陷分类体系，优化缺陷管理流程',
    submitter: '张三',
    department: '产品技术中心',
    submitTime: '2024-03-12',
    status: '待采纳',
    ipdStage: '验证与发布',
    level: '轻微',
    category: '质量与交付优化',
    summary: '建立缺陷分类体系，优化缺陷管理流程',
    reason: '建立缺陷分类体系，优化缺陷管理流程',
    solution: '按严重级、来源和影响面分类，统一缺陷闭环机制。',
  },
  {
    id: 11,
    title: '优化缺陷优先级评估模板',
    submitter: '张三',
    department: '产品技术中心',
    submitTime: '2024-05-12',
    status: '草稿',
    ipdStage: '验证与发布',
    level: '一般',
    category: '质量与交付优化',
    summary: '草稿：优化缺陷优先级评估模板，减少协同分歧',
    reason: '优化缺陷优先级评估模板，减少协同分歧',
    solution: '增加影响范围和修复成本评估项，便于快速排序。',
  },
  {
    id: 12,
    title: '补齐接口异常码说明文档',
    submitter: '张三',
    department: '产品技术中心',
    submitTime: '2024-05-10',
    status: '草稿',
    ipdStage: '开发与测试',
    level: '轻微',
    category: '代码与测试改进',
    summary: '草稿：补齐接口异常码说明文档，降低联调沟通成本',
    reason: '补齐接口异常码说明文档，降低联调沟通成本',
    solution: '整理核心接口异常码并挂接到 API 文档平台。',
  },
];

function getDisplayName(user) {
  if (!user?.username) return '我是迷人的疯子';
  if (user.username === 'user') return '我是迷人的疯子';
  return user.username;
}

function getInitials(name) {
  return String(name).slice(0, 1).toUpperCase();
}

function getPageTitle(page) {
  if (page === 'settings') return '基础设置';
  if (page === 'orders') return '我的订单';
  if (page === 'points') return '我的洪小星';
  return '洪小星商城';
}

const PointsReviewPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('');
  const [showReviewDrawer, setShowReviewDrawer] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [reviewDecision, setReviewDecision] = useState('approve');
  const [reviewScore, setReviewScore] = useState(1);
  const [reviewComment, setReviewComment] = useState('');

  const [pendingItems, setPendingItems] = useState([
    {
      id: 1, type: '质量改进', title: '优化需求文档模板，提升需求描述清晰度',
      submitter: '张三', department: '产品技术中心', submitTime: '2024-04-15',
      status: '待采纳', ipdStage: '概念与计划', level: '重大', category: '需求与方案优化',
      summary: '通过标准化需求文档模板，减少沟通成本，提升开发效率',
      reason: '当前需求文档缺乏统一模板，导致需求描述不清晰，开发理解偏差大，返工率高。建议制定标准化模板，包含必要字段和示例。',
      solution: '设计并实施统一的需求文档模板，包含背景、目标、功能描述、验收标准等核心字段，并配备编写指南和示例文档。'
    },
    {
      id: 2, type: '质量改进', title: '改进数据库设计规范，增加字段说明',
      submitter: '李四', department: '产品技术中心', submitTime: '2024-04-12',
      status: '待采纳', ipdStage: '开发与测试', level: '一般', category: '代码与测试改进',
      summary: '建立完整的数据库设计规范，包含字段命名、注释等要求',
      reason: '数据库设计缺乏统一规范，字段命名随意，注释缺失，导致维护困难。',
      solution: '制定数据库设计规范文档，统一命名规则，强制要求字段注释，并建立Review机制。'
    },
    {
      id: 3, type: '质量改进', title: '优化代码结构，提升模块复用性',
      submitter: '王五', department: '产品技术中心', submitTime: '2024-04-10',
      status: '待采纳', ipdStage: '开发与测试', level: '重大', category: '代码与测试改进',
      summary: '重构核心业务模块，提取公共组件，提升代码复用率',
      reason: '核心业务模块代码冗余严重，重复逻辑多，维护成本高，Bug修复困难。',
      solution: '对核心模块进行重构分析，提取公共组件和工具函数，建立组件库，统一接口规范。'
    },
    {
      id: 4, type: '质量改进', title: '建立自动化测试流程',
      submitter: '赵六', department: '质量保障部', submitTime: '2024-04-08',
      status: '待采纳', ipdStage: '验证与发布', level: '一般', category: '质量与交付优化',
      summary: '引入CI/CD自动化测试，提升产品质量和发布效率',
      reason: '手动测试耗时长，覆盖率低，无法快速反馈质量问题，影响发布节奏。',
      solution: '搭建CI/CD流水线，集成单元测试、接口测试、UI自动化测试，实现提交即触发测试。'
    },
    {
      id: 5, type: '质量改进', title: '完善错误监控体系',
      submitter: '钱七', department: '运维部', submitTime: '2024-04-05',
      status: '未采纳', ipdStage: '全流程与生命周期', level: '轻微', category: '流程与工具改进',
      summary: '建立全方位错误监控和报警机制，及时发现线上问题',
      reason: '线上错误发现滞后，缺乏实时监控，影响用户体验。',
      solution: '部署前端错误监控SDK，配置实时报警规则，建立错误分级处理流程。',
      rejectReason: '建议更加具体，需要明确实施方案和时间节点'
    },
    {
      id: 6, type: '质量改进', title: '优化发布流程，建立灰度发布机制',
      submitter: '孙八', department: '产品技术中心', submitTime: '2024-04-03',
      status: '已采纳', ipdStage: '全流程与生命周期', level: '重要', category: '流程与工具改进',
      summary: '建立灰度发布流程，降低发布风险，提升系统稳定性',
      reason: '全量发布风险高，一旦出现问题影响全部用户。',
      solution: '设计灰度发布方案，支持按比例放量，配合监控指标自动回滚。',
      score: 4, reviewComment: '方案可行，预期效果良好'
    },
    {
      id: 7, type: '质量改进', title: '引入代码审查工具链',
      submitter: '周九', department: '产品技术中心', submitTime: '2024-04-01',
      status: '已采纳', ipdStage: '开发与测试', level: '重要', category: '代码与测试改进',
      summary: '引入自动化代码审查工具，提前发现潜在问题',
      reason: '人工代码审查效率低，容易遗漏潜在问题。',
      solution: '集成SonarQube静态分析工具，配置代码质量门禁，自动阻断不合规代码合入。',
      score: 3, reviewComment: '工具选型合理，建议尽快落地'
    },
    {
      id: 8, type: '质量改进', title: '建立技术债务管理机制',
      submitter: '吴十', department: '产品技术中心', submitTime: '2024-03-28',
      status: '待采纳', ipdStage: '重大攻关与创新', level: '重大', category: '技术突破与成果沉淀',
      summary: '建立技术债务识别、跟踪和偿还机制，持续提升代码健康度',
      reason: '技术债务持续累积，影响开发效率和系统稳定性。',
      solution: '建立技术债务登记制度，定期评估债务优先级，安排专项迭代进行偿还。'
    },
    {
      id: 9, type: '质量改进', title: '统一API接口规范',
      submitter: '郑一', department: '产品技术中心', submitTime: '2024-03-25',
      status: '已采纳', ipdStage: '全流程与生命周期', level: '一般', category: '流程与工具改进',
      summary: '制定统一的API设计规范，提升接口一致性和可维护性',
      reason: '不同团队API设计风格迥异，增加对接成本。',
      solution: '制定RESTful API设计规范，包含命名、版本管理、错误码、文档等标准。',
      score: 3, reviewComment: '规范文档已审核通过'
    },
    {
      id: 10, type: '质量改进', title: '建立性能监控体系',
      submitter: '王二', department: '运维部', submitTime: '2024-03-20',
      status: '未采纳', ipdStage: '验证与发布', level: '一般', category: '质量与交付优化',
      summary: '建立全链路性能监控，实现故障快速定位',
      reason: '性能问题定位困难，缺乏全链路追踪能力。',
      solution: '部署APM工具，实现请求链路追踪，配置性能阈值报警。',
      rejectReason: '方案过于笼统，需要补充具体技术选型和实施计划'
    },
  ]);

  const filteredItems = pendingItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.submitter.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesDate = !filterDate || item.submitTime === filterDate;
    return matchesSearch && matchesStatus && matchesDate;
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
      setPendingItems(prev =>
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
      setPendingItems(prev =>
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
    <div className="hx-admin-content pt-6">
      {/* 统计卡片 */}
      <div className="hx-admin-stats-row" style={{gridTemplateColumns:'repeat(3, 1fr)'}}>
        <div className="hx-admin-stat-card">
          <div className="hx-admin-stat-icon yellow"><Clock size={24} /></div>
          <div className="hx-admin-stat-content">
            <span className="hx-admin-stat-label">待采纳</span>
            <strong className="hx-admin-stat-value">{pendingItems.filter(i => i.status === '待采纳').length}</strong>
          </div>
        </div>
        <div className="hx-admin-stat-card">
          <div className="hx-admin-stat-icon green"><CheckCircle size={24} /></div>
          <div className="hx-admin-stat-content">
            <span className="hx-admin-stat-label">已采纳</span>
            <strong className="hx-admin-stat-value">{pendingItems.filter(i => i.status === '已采纳').length}</strong>
          </div>
        </div>
        <div className="hx-admin-stat-card">
          <div className="hx-admin-stat-icon red"><X size={24} /></div>
          <div className="hx-admin-stat-content">
            <span className="hx-admin-stat-label">未采纳</span>
            <strong className="hx-admin-stat-value">{pendingItems.filter(i => i.status === '未采纳').length}</strong>
          </div>
        </div>
      </div>

      {/* 搜索筛选 */}
      <div className="hx-admin-filter-bar">
        <div className="hx-admin-search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="搜索建议标题或提交人..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="hx-admin-search-input"
          />
        </div>
        <div className="hx-admin-filters">
          <div className="hx-admin-filter-group hx-admin-filter-date">
            <CalendarDays size={16} className="hx-admin-filter-date-icon" />
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="hx-admin-filter-date-input"
              placeholder="请选择申请日期"
            />
            {filterDate && (
              <button type="button" onClick={() => setFilterDate('')} className="hx-admin-filter-date-clear">
                <X size={14} />
              </button>
            )}
          </div>
          <div className="hx-admin-filter-group">
            <label>状态筛选：</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="hx-admin-filter-select">
              <option value="all">全部</option>
              <option value="待采纳">待采纳</option>
              <option value="已采纳">已采纳</option>
              <option value="未采纳">未采纳</option>
            </select>
          </div>
        </div>
      </div>

      {/* 表格 */}
      <div style={{background:'#fff', borderRadius:'16px', boxShadow:'0 1px 8px rgba(148,163,184,0.12)', border:'1px solid #f1f5f9', overflow:'hidden'}}>
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%', borderCollapse:'collapse', minWidth:'900px'}}>
            <thead>
              <tr style={{background:'#f8fafc', borderBottom:'1px solid #e2e8f0'}}>
                <th style={{padding:'13px 20px', textAlign:'left', fontSize:'12px', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap', textTransform:'uppercase', letterSpacing:'0.05em', minWidth:'280px'}}>事由</th>
                <th style={{padding:'13px 20px', textAlign:'left', fontSize:'12px', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap', textTransform:'uppercase', letterSpacing:'0.05em', minWidth:'100px'}}>IPD阶段</th>
                <th style={{padding:'13px 20px', textAlign:'left', fontSize:'12px', fontWeight:700, color:'#94a3b8', whiteSpace:'nowrap', textTransform:'uppercase', letterSpacing:'0.05em', minWidth:'90px'}}>建议类别</th>
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
                  <td colSpan={8} style={{padding:'60px', textAlign:'center', color:'#94a3b8'}}>
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
                    <td style={{padding:'16px 20px', verticalAlign:'middle'}}>
                      <div style={{fontWeight:700, fontSize:'14px', color:'#1e293b', lineHeight:'1.4', marginBottom:'4px'}}>{item.title}</div>
                      <div style={{fontSize:'12px', color:'#94a3b8', lineHeight:'1.5', marginBottom:'6px'}}>{item.summary}</div>
                      <span style={{display:'inline-block', padding:'2px 8px', background:'#f1f5f9', color:'#64748b', fontSize:'11px', fontWeight:600, borderRadius:'4px'}}>{item.type}</span>
                    </td>
                    <td style={{padding:'16px 20px', verticalAlign:'middle', whiteSpace:'nowrap'}}>
                      <span style={{fontSize:'13px', color:'#475569', fontWeight:500}}>{item.ipdStage}</span>
                    </td>
                    <td style={{padding:'16px 20px', verticalAlign:'middle', whiteSpace:'nowrap'}}>
                      <span style={{padding:'3px 10px', background:'#f0fdf4', color:'#16a34a', fontSize:'12px', fontWeight:600, borderRadius:'6px'}}>{item.category}</span>
                    </td>
                    <td style={{padding:'16px 20px', verticalAlign:'middle', whiteSpace:'nowrap'}}>
                      <span style={{fontWeight:700, fontSize:'14px', color:'#1e293b'}}>{item.submitter}</span>
                    </td>
                    <td style={{padding:'16px 20px', verticalAlign:'middle', whiteSpace:'nowrap'}}>
                      <span style={{fontSize:'13px', color:'#64748b'}}>{item.department}</span>
                    </td>
                    <td style={{padding:'16px 20px', verticalAlign:'middle', whiteSpace:'nowrap'}}>
                      <span style={{fontSize:'13px', color:'#64748b', fontFamily:'monospace'}}>{item.submitTime}</span>
                    </td>
                    <td style={{padding:'16px 20px', verticalAlign:'middle', whiteSpace:'nowrap'}}>
                      <span style={{display:'inline-flex', alignItems:'center', gap:'5px', padding:'4px 10px', borderRadius:'20px', background:st.bg, color:st.color, fontSize:'12px', fontWeight:700}}>
                        <span style={{width:'6px', height:'6px', borderRadius:'50%', background:st.dot, flexShrink:0}} />
                        {st.label}
                      </span>
                      {item.score && (
                        <div style={{display:'flex', alignItems:'center', gap:'3px', marginTop:'4px', fontSize:'12px', color:'#f59e0b', fontWeight:700}}>
                          <Star size={11} fill="#f59e0b" color="#f59e0b" />
                          {item.score}星
                        </div>
                      )}
                      {item.rejectReason && (
                        <div style={{fontSize:'11px', color:'#dc2626', marginTop:'4px', maxWidth:'100px'}} title={item.rejectReason}>
                          {item.rejectReason.length > 12 ? item.rejectReason.slice(0, 12) + '…' : item.rejectReason}
                        </div>
                      )}
                      {item.reviewComment && (
                        <div style={{fontSize:'11px', color:'#007B7A', marginTop:'4px', maxWidth:'120px'}} title={item.reviewComment}>
                          评语：{item.reviewComment.length > 10 ? item.reviewComment.slice(0, 10) + '…' : item.reviewComment}
                        </div>
                      )}
                    </td>
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

      {/* 评审与授星弹窗 */}
      {showReviewDrawer && selectedItem && (
        <div className="hx-modal-overlay" onClick={() => setShowReviewDrawer(false)}>
          <div className="hx-review-modal" onClick={(e) => e.stopPropagation()}>
            <div className="hx-review-modal-header">
              <h3>评审与授星</h3>
              <button onClick={() => setShowReviewDrawer(false)} className="hx-review-modal-close">
                <X size={18} />
              </button>
            </div>
            <div className="hx-review-modal-body">
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
                <span className="hx-review-info-sep" />
                <span className="hx-review-info-item">
                  <span className="hx-review-info-label">级别</span>
                  <span className={`hx-lv hx-lv-${selectedItem.level}`}>{selectedItem.level}</span>
                </span>
              </div>
              <div className="hx-review-block">
                <div className="hx-review-block-title">改进事由</div>
                <div className="hx-review-block-content">
                  <p className="hx-review-block-text">{selectedItem.reason}</p>
                </div>
              </div>
              <div className="hx-review-block">
                <div className="hx-review-block-title">方案描述</div>
                <div className="hx-review-block-content">
                  <p className="hx-review-block-text">{selectedItem.solution}</p>
                  <div className="hx-review-benefit">
                    <strong>预期收益：</strong>提升工作效率，减少错误率，优化用户体验
                  </div>
                </div>
              </div>
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
    </div>
  );
};

const PointsApplyPage = ({ user, submissionRecords, setSubmissionRecords }) => {
  const displayName = getDisplayName(user);
  const [filterIpdStage, setFilterIpdStage] = useState('全部');
  const [filterCategory, setFilterCategory] = useState('全部');
  const [filterStatus, setFilterStatus] = useState('全部');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');
  const [workbenchPage, setWorkbenchPage] = useState(1);
  const workbenchPageSize = 8;
  const [showSuggestionModal, setShowSuggestionModal] = useState(false);
  const [suggestionMode, setSuggestionMode] = useState('apply');
  const [suggestionForm, setSuggestionForm] = useState({
    relatedPerson: '',
    ipdStage: '',
    improvementType: '',
    reason: '',
    files: []
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingDraftId, setEditingDraftId] = useState(null);
  const [detailRecord, setDetailRecord] = useState(null);
  const [selectedActionRecord, setSelectedActionRecord] = useState(null);
  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState(false);
  const [showDeleteDraftConfirm, setShowDeleteDraftConfirm] = useState(false);

  const recommendUserOptions = [
    { id: 'u1', name: '陈予安', empId: 'HX-2024-086' },
    { id: 'u2', name: '梁思齐', empId: 'HX-2024-031' },
    { id: 'u3', name: '顾清野', empId: 'HX-2024-045' },
    { id: 'u4', name: '秦可心', empId: 'HX-2024-067' },
    { id: 'u5', name: '姜闻川', empId: 'HX-2024-012' },
    { id: 'u6', name: '白知许', empId: 'HX-2024-093' },
    { id: 'u7', name: '高瑾瑜', empId: 'HX-2024-058' },
    { id: 'u8', name: '温祁年', empId: 'HX-2024-024' },
  ];

  const ipdStageOptions = [
    '概念与计划',
    '开发与测试',
    '验证与发布',
    '全流程与生命周期',
    '重大攻关与创新'
  ];

  const improvementTypeOptions = [
    '需求与方案优化',
    '代码与测试改进',
    '质量与交付优化',
    '流程与工具改进',
    '技术突破与成果沉淀'
  ];

  const ipdToImprovementMap = {
    '概念与计划': '需求与方案优化',
    '开发与测试': '代码与测试改进',
    '验证与发布': '质量与交付优化',
    '全流程与生命周期': '流程与工具改进',
    '重大攻关与创新': '技术突破与成果沉淀'
  };

  const handleSuggestionFormChange = (field) => (event) => {
    const value = event.target.value;
    setSuggestionForm((prev) => {
      const newState = { ...prev, [field]: value };
      if (field === 'ipdStage' && value && ipdToImprovementMap[value]) {
        newState.improvementType = ipdToImprovementMap[value];
      }
      return newState;
    });
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateSuggestionForm = () => {
    const errors = {};
    if (suggestionMode === 'recommend' && !suggestionForm.relatedPerson.trim()) {
      errors.relatedPerson = '请选择被推荐人';
    }
    if (!suggestionForm.ipdStage.trim()) {
      errors.ipdStage = '请选择所属IPD阶段';
    }
    if (!suggestionForm.improvementType.trim()) {
      errors.improvementType = '请选择改进方向类别';
    }
    if (!suggestionForm.reason.trim()) {
      errors.reason = '请填写事由';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const resetSuggestionState = () => {
    setShowSuggestionModal(false);
    setSuggestionMode('apply');
    setEditingDraftId(null);
    setSuggestionForm({
      relatedPerson: '',
      ipdStage: '',
      improvementType: '',
      reason: '',
      files: []
    });
    setFormErrors({});
  };

  const handleSubmitSuggestion = () => {
    if (!validateSuggestionForm()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      const nextRecord = {
        id: editingDraftId || Date.now(),
        title: suggestionForm.reason.trim().slice(0, 24),
        submitter: displayName,
        department: '产品技术中心',
        submitTime: new Date().toISOString().split('T')[0],
        status: '待采纳',
        ipdStage: suggestionForm.ipdStage,
        level: '一般',
        category: suggestionForm.improvementType,
        summary: suggestionForm.reason.trim(),
        reason: suggestionForm.reason.trim(),
        solution: suggestionForm.reason.trim(),
        files: suggestionForm.files,
      };
      setSubmissionRecords((prev) => {
        if (editingDraftId) {
          return prev.map((item) => (item.id === editingDraftId ? { ...item, ...nextRecord } : item));
        }
        return [nextRecord, ...prev];
      });
      setIsSubmitting(false);
      resetSuggestionState();
      alert(editingDraftId ? '草稿已提交审核！' : '改进建议提交成功！');
    }, 600);
  };

  const handleCancelSuggestion = () => {
    resetSuggestionState();
  };

  const handleSaveDraft = () => {
    const nextRecord = {
      id: editingDraftId || Date.now(),
      title: suggestionForm.reason.trim().slice(0, 24) || '未命名草稿',
      submitter: displayName,
      department: '产品技术中心',
      submitTime: new Date().toISOString().split('T')[0],
      status: '草稿',
      ipdStage: suggestionForm.ipdStage || '概念与计划',
      level: '一般',
      category: suggestionForm.improvementType || '需求与方案优化',
      summary: suggestionForm.reason.trim() || '草稿待补充',
      reason: suggestionForm.reason.trim() || '草稿待补充',
      solution: suggestionForm.reason.trim() || '草稿待补充',
      files: suggestionForm.files,
    };
    setSubmissionRecords((prev) => {
      if (editingDraftId) {
        return prev.map((item) => (item.id === editingDraftId ? { ...item, ...nextRecord } : item));
      }
      return [nextRecord, ...prev];
    });
    resetSuggestionState();
    alert(editingDraftId ? '草稿已更新！' : '草稿已保存！');
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setSuggestionForm((prev) => ({ ...prev, files: [...prev.files, ...files] }));
  };

  const handleRemoveFile = (index) => {
    setSuggestionForm((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const wbIpdStageOptions = ['全部', '概念与计划', '开发与测试', '验证与发布', '全流程与生命周期', '重大攻关与创新'];
  const wbCategoryOptions = ['全部', '需求与方案优化', '代码与测试改进', '质量与交付优化', '流程与工具改进', '技术突破与成果沉淀'];
  const wbStatusOptions = ['全部', '草稿', '待采纳', '已采纳', '未采纳'];

  const filteredSubmissions = submissionRecords.filter((item) => {
    if (filterIpdStage !== '全部' && item.ipdStage !== filterIpdStage) return false;
    if (filterCategory !== '全部' && item.category !== filterCategory) return false;
    if (filterStatus !== '全部' && item.status !== filterStatus) return false;
    const itemDateStr = item.submitTime.slice(0, 10);
    if (filterDateFrom && itemDateStr < filterDateFrom) return false;
    if (filterDateTo && itemDateStr > filterDateTo) return false;
    return true;
  });

  const workbenchTotalPages = Math.max(1, Math.ceil(filteredSubmissions.length / workbenchPageSize));
  const workbenchPagedData = filteredSubmissions.slice(
    (workbenchPage - 1) * workbenchPageSize,
    workbenchPage * workbenchPageSize
  );

  return (
    <section className="hx-employee-content pt-6">
      {/* 操作栏：提交积分申请 */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <button
          type="button"
          className="hx-dashboard-submit-btn"
          onClick={() => setShowSuggestionModal(true)}
        >
          <Star size={16} />
          提交改进申请
        </button>
      </div>

      {/* 筛选区 — 独立透明带 */}
      <div className="hx-wb-filter-bar mb-6">
        <div className="hx-wb-filter-item">
          <label>所属IPD阶段</label>
          <select value={filterIpdStage} onChange={(e) => { setFilterIpdStage(e.target.value); setWorkbenchPage(1); }}>
            {wbIpdStageOptions.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div className="hx-wb-filter-item">
          <label>改进方向类别</label>
          <select value={filterCategory} onChange={(e) => { setFilterCategory(e.target.value); setWorkbenchPage(1); }}>
            {wbCategoryOptions.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div className="hx-wb-filter-item">
          <label>状态</label>
          <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setWorkbenchPage(1); }}>
            {wbStatusOptions.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div className="hx-wb-filter-item">
          <label>提交日期</label>
          <div className="hx-wb-date-range">
            <div className="hx-wb-date-input">
              <Calendar size={14} />
              <input
                type="date"
                value={filterDateFrom}
                onChange={(e) => { setFilterDateFrom(e.target.value); setWorkbenchPage(1); }}
                placeholder="开始时间"
              />
            </div>
            <span className="hx-wb-date-separator">至</span>
            <div className="hx-wb-date-input">
              <Calendar size={14} />
              <input
                type="date"
                value={filterDateTo}
                onChange={(e) => { setFilterDateTo(e.target.value); setWorkbenchPage(1); }}
                placeholder="结束时间"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 统计卡片：提交数据概览 */}
      <div className="hx-admin-stats-row" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="hx-admin-stat-card">
          <div className="hx-admin-stat-icon blue">
            <FileText size={24} />
          </div>
          <div className="hx-admin-stat-content">
            <span className="hx-admin-stat-label">累计提交</span>
            <strong className="hx-admin-stat-value">{submissionRecords.length}</strong>
          </div>
        </div>
        <div className="hx-admin-stat-card">
          <div className="hx-admin-stat-icon green">
            <CheckCircle2 size={24} />
          </div>
          <div className="hx-admin-stat-content">
            <span className="hx-admin-stat-label">已采纳</span>
            <strong className="hx-admin-stat-value">{submissionRecords.filter((item) => item.status === '已采纳').length}</strong>
          </div>
        </div>
        <div className="hx-admin-stat-card">
          <div className="hx-admin-stat-icon yellow">
            <Clock size={24} />
          </div>
          <div className="hx-admin-stat-content">
            <span className="hx-admin-stat-label">待采纳</span>
            <strong className="hx-admin-stat-value">{submissionRecords.filter((item) => item.status === '待采纳').length}</strong>
          </div>
        </div>
      </div>

      {/* 结果区 — 纯白表格卡片 */}
      <div className="hx-submission-workbench">
        <div className="hx-wb-table-wrapper">
          <table className="hx-wb-table">
            <thead>
              <tr>
                <th>序号</th>
                <th>所属IPD阶段</th>
                <th>改进方向类别</th>
                <th>事由</th>
                <th>提交日期</th>
                <th>状态</th>
                <th>获得星数</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {workbenchPagedData.length > 0 ? (
                workbenchPagedData.map((row, index) => (
                  <tr key={row.id}>
                    <td>{(workbenchPage - 1) * workbenchPageSize + index + 1}</td>
                    <td>{row.ipdStage}</td>
                    <td>{row.category}</td>
                    <td>
                      <div className="hx-review-reason-cell">
                        <span className="hx-review-reason-text">{row.title || row.reason}</span>
                        <div className="hx-review-reason-tooltip">
                          <strong>{row.title || row.reason}</strong>
                          <p>{row.reason}</p>
                        </div>
                      </div>
                    </td>
                    <td>{row.submitTime}</td>
                    <td>
                      <span className={`hx-status-badge ${
                        row.status === '草稿' ? 'draft' :
                        row.status === '已采纳' ? 'approved' :
                        row.status === '待采纳' ? 'pending' :
                        'rejected'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td>{row.score ? `+${row.score} ⭐` : '-'}</td>
                    <td>
                      <div className="hx-wb-action-group">
                        {row.status === '草稿' ? (
                          <>
                            <button
                              type="button"
                              className="hx-wb-action-btn"
                              onClick={() => {
                                setEditingDraftId(row.id);
                                setSuggestionMode('apply');
                                setSuggestionForm({
                                  relatedPerson: row.submitter,
                                  ipdStage: row.ipdStage,
                                  improvementType: row.category,
                                  reason: row.reason,
                                  files: row.files || []
                                });
                                setShowSuggestionModal(true);
                              }}
                            >
                              编辑
                            </button>
                            <button
                              type="button"
                              className="hx-wb-action-btn danger"
                              onClick={() => {
                                setSelectedActionRecord(row);
                                setShowDeleteDraftConfirm(true);
                              }}
                            >
                              删除
                            </button>
                          </>
                        ) : row.status === '待采纳' ? (
                          <button
                            type="button"
                            className="hx-wb-action-btn secondary"
                            onClick={() => {
                              setSelectedActionRecord(row);
                              setShowWithdrawConfirm(true);
                            }}
                          >
                            撤回
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="hx-wb-action-btn"
                            onClick={() => setDetailRecord(row)}
                          >
                            查看详情
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={8} className="hx-wb-empty">暂无匹配的申报记录</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredSubmissions.length > 0 && (
          <div className="hx-wb-pagination">
            <span className="hx-wb-pag-info">
              共 {filteredSubmissions.length} 条，第 {workbenchPage}/{workbenchTotalPages} 页
            </span>
            <div className="hx-wb-pag-buttons">
              <button type="button" disabled={workbenchPage <= 1} onClick={() => setWorkbenchPage(p => p - 1)}>上一页</button>
              {Array.from({ length: workbenchTotalPages }, (_, i) => i + 1).map(p => (
                <button key={p} type="button" className={p === workbenchPage ? 'active' : ''} onClick={() => setWorkbenchPage(p)}>{p}</button>
              ))}
              <button type="button" disabled={workbenchPage >= workbenchTotalPages} onClick={() => setWorkbenchPage(p => p + 1)}>下一页</button>
            </div>
          </div>
        )}
      </div>

      {showSuggestionModal && (
        <div className="hx-suggestion-overlay" onClick={handleCancelSuggestion}>
          <div className="hx-suggestion-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="hx-sd-header">
              <div className="hx-sd-header-left">
                <div className="hx-sd-header-icon">
                  <FileText size={18} color="#007B7A" />
                </div>
                <span className="hx-sd-header-title">提交质量改进建议</span>
              </div>
              <button type="button" className="hx-sd-close" onClick={handleCancelSuggestion}>
                <X size={18} />
              </button>
            </div>
            <div className="hx-sd-mode-switch">
              <button
                type="button"
                className={`hx-sd-mode-btn ${suggestionMode === 'apply' ? 'active' : ''}`}
                onClick={() => setSuggestionMode('apply')}
              >
                改进申请
              </button>
              <button
                type="button"
                className={`hx-sd-mode-btn ${suggestionMode === 'recommend' ? 'active' : ''}`}
                onClick={() => setSuggestionMode('recommend')}
              >
                改进推荐
              </button>
            </div>
            <div className="hx-sd-divider" />
            <div className="hx-sd-body">
              <div className="hx-sd-row hx-sd-row-full">
                <div className="hx-sd-field">
                  <label className="hx-sd-label">
                    相关人员 {suggestionMode === 'recommend' && <em>*</em>}
                  </label>
                  {suggestionMode === 'apply' ? (
                    <input
                      type="text"
                      value={displayName}
                      readOnly
                      disabled
                      className="hx-sd-input hx-sd-input-readonly"
                      placeholder="当前申报人"
                    />
                  ) : (
                    <>
                      <select
                        value={suggestionForm.relatedPerson}
                        onChange={handleSuggestionFormChange('relatedPerson')}
                        className={`hx-sd-input ${formErrors.relatedPerson ? 'hx-sd-err' : ''}`}
                      >
                        <option value="">请输入被推荐人的姓名</option>
                        {recommendUserOptions.map((u) => (
                          <option key={u.id} value={u.name}>
                            {u.name} ({u.empId})
                          </option>
                        ))}
                      </select>
                      {formErrors.relatedPerson && <span className="hx-sd-err-msg">{formErrors.relatedPerson}</span>}
                    </>
                  )}
                </div>
              </div>
              <div className="hx-sd-row">
                <div className="hx-sd-field">
                  <label className="hx-sd-label">
                    所属 IPD 阶段 <em>*</em>
                  </label>
                  <select
                    value={suggestionForm.ipdStage}
                    onChange={handleSuggestionFormChange('ipdStage')}
                    className={`hx-sd-input ${formErrors.ipdStage ? 'hx-sd-err' : ''}`}
                  >
                    <option value="">请选择</option>
                    {ipdStageOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                  {formErrors.ipdStage && <span className="hx-sd-err-msg">{formErrors.ipdStage}</span>}
                </div>
                <div className="hx-sd-field">
                  <label className="hx-sd-label">
                    改进方向类别 <em>*</em>
                    {suggestionForm.ipdStage && (
                      <span className="hx-sd-hint">已自动填充</span>
                    )}
                  </label>
                  <select
                    value={suggestionForm.improvementType}
                    onChange={handleSuggestionFormChange('improvementType')}
                    disabled={!!suggestionForm.ipdStage}
                    className={`hx-sd-input ${formErrors.improvementType ? 'hx-sd-err' : ''} ${suggestionForm.ipdStage ? 'hx-sd-ro' : ''}`}
                  >
                    <option value="">请选择</option>
                    {improvementTypeOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                  {formErrors.improvementType && <span className="hx-sd-err-msg">{formErrors.improvementType}</span>}
                </div>
              </div>
              <div className="hx-sd-row hx-sd-row-full">
                <div className="hx-sd-field">
                  <label className="hx-sd-label">
                    事由 <em>*</em>
                  </label>
                  <textarea
                    value={suggestionForm.reason}
                    onChange={handleSuggestionFormChange('reason')}
                    placeholder="请简述改进前/后对比、实施效果及价值预估..."
                    rows={5}
                    className={`hx-sd-textarea ${formErrors.reason ? 'hx-sd-err' : ''}`}
                  />
                  {formErrors.reason && <span className="hx-sd-err-msg">{formErrors.reason}</span>}
                </div>
              </div>
              <div className="hx-sd-row hx-sd-row-full">
                <div className="hx-sd-field">
                  <label className="hx-sd-label">
                    相关附件 <span className="hx-sd-optional">（选填）</span>
                  </label>
                  <div className="hx-sd-upload">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hx-sd-file-input"
                      accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                      id="sd-file-upload"
                    />
                    <label htmlFor="sd-file-upload" className="hx-sd-upload-btn">
                      <span className="hx-sd-upload-icon">📎</span>
                      <span>点击或拖拽文件到此处上传</span>
                      <span className="hx-sd-upload-hint">支持 JPG、PNG、PDF、DOC、DOCX</span>
                    </label>
                  </div>
                  {suggestionForm.files.length > 0 && (
                    <div className="hx-sd-files">
                      {suggestionForm.files.map((file, index) => (
                        <div key={index} className="hx-sd-file">
                          <span>📄</span>
                          <span className="hx-sd-file-name">{file.name}</span>
                          <span className="hx-sd-file-size">{(file.size / 1024).toFixed(1)} KB</span>
                          <button type="button" className="hx-sd-file-del" onClick={() => handleRemoveFile(index)}>✕</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="hx-sd-divider" />
            <div className="hx-sd-footer">
              <button type="button" className="hx-sd-btn hx-sd-btn-cancel" onClick={handleCancelSuggestion}>
                取消
              </button>
              <button
                type="button"
                className="hx-sd-btn hx-sd-btn-cancel"
                onClick={handleSaveDraft}
              >
                保存草稿
              </button>
              <button
                type="button"
                className="hx-sd-btn hx-sd-btn-submit"
                onClick={handleSubmitSuggestion}
                disabled={isSubmitting}
              >
                {isSubmitting ? '提交中...' : editingDraftId ? '提交审核' : suggestionMode === 'apply' ? '提交申请' : '提交推荐'}
              </button>
            </div>
          </div>
        </div>
      )}
      {detailRecord && (
        <div className="hx-suggestion-overlay" onClick={() => setDetailRecord(null)}>
          <div className="hx-review-modal hx-submission-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="hx-review-modal-header">
              <h3>建议详情</h3>
              <button onClick={() => setDetailRecord(null)} className="hx-review-modal-close">
                <X size={18} />
              </button>
            </div>
            <div className="hx-review-modal-body">
              <div className="hx-review-info-bar">
                <span className="hx-review-info-item"><span className="hx-review-info-label">IPD阶段</span><span className="hx-review-info-value">{detailRecord.ipdStage}</span></span>
                <span className="hx-review-info-sep" />
                <span className="hx-review-info-item"><span className="hx-review-info-label">类别</span><span className="hx-review-info-value">{detailRecord.category}</span></span>
                <span className="hx-review-info-sep" />
                <span className="hx-review-info-item"><span className="hx-review-info-label">状态</span><span className="hx-review-info-value">{detailRecord.status}</span></span>
              </div>
              <div className="hx-review-block">
                <div className="hx-review-block-title">事由详情</div>
                <div className="hx-review-block-content">
                  <p className="hx-review-block-text">{detailRecord.reason}</p>
                </div>
              </div>
              <div className="hx-review-block">
                <div className="hx-review-block-title">附件</div>
                <div className="hx-review-block-content">
                  {detailRecord.files && detailRecord.files.length > 0 ? (
                    <div className="hx-sd-files">
                      {detailRecord.files.map((file, index) => {
                        const fileName = typeof file === 'string' ? file : file.name;
                        return (
                          <div key={`${fileName}-${index}`} className="hx-sd-file is-readonly">
                            <span>{fileName}</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="hx-review-block-empty">未上传附件</p>
                  )}
                </div>
              </div>
              {detailRecord.reviewComment ? (
                <div className="hx-review-block">
                  <div className="hx-review-block-title">评审说明</div>
                  <div className="hx-review-block-content">
                    <p className="hx-review-block-text">{detailRecord.reviewComment}</p>
                  </div>
                </div>
              ) : null}
              {detailRecord.rejectReason ? (
                <div className="hx-review-block">
                  <div className="hx-review-block-title">未采纳原因</div>
                  <div className="hx-review-block-content">
                    <p className="hx-review-block-text">{detailRecord.rejectReason}</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
      {showWithdrawConfirm && selectedActionRecord && (
        <div className="hx-suggestion-overlay" onClick={() => setShowWithdrawConfirm(false)}>
          <div className="hx-confirm-dialog" onClick={(e) => e.stopPropagation()}>
            <h3>确认撤回</h3>
            <p>确认撤回该改进申请吗？撤回后将返回草稿状态，可继续编辑后再次提交。</p>
            <div className="hx-confirm-actions">
              <button type="button" className="hx-wb-action-btn secondary" onClick={() => setShowWithdrawConfirm(false)}>取消</button>
              <button
                type="button"
                className="hx-wb-action-btn"
                onClick={() => {
                  setSubmissionRecords((prev) => prev.map((item) => item.id === selectedActionRecord.id ? { ...item, status: '草稿' } : item));
                  setShowWithdrawConfirm(false);
                  setSelectedActionRecord(null);
                }}
              >
                确认撤回
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeleteDraftConfirm && selectedActionRecord && (
        <div className="hx-suggestion-overlay" onClick={() => setShowDeleteDraftConfirm(false)}>
          <div className="hx-confirm-dialog" onClick={(e) => e.stopPropagation()}>
            <h3>确认删除</h3>
            <p>确认删除该草稿吗？删除后不可恢复。</p>
            <div className="hx-confirm-actions">
              <button type="button" className="hx-wb-action-btn secondary" onClick={() => setShowDeleteDraftConfirm(false)}>取消</button>
              <button
                type="button"
                className="hx-wb-action-btn danger"
                onClick={() => {
                  setSubmissionRecords((prev) => prev.filter((item) => item.id !== selectedActionRecord.id));
                  setShowDeleteDraftConfirm(false);
                  setSelectedActionRecord(null);
                }}
              >
                删除草稿
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const EmployeeGiftShop = ({ user, onLogout, currentPage: propCurrentPage, setCurrentView: propSetCurrentView }) => {
  const [showBlackImage, setShowBlackImage] = useState(false);
  const [userPoints] = useState(1200);
  const [exchangeHistory] = useState(exchangeHistorySeed);
  const [orders, setOrders] = useState(orderSeed);
  const [submissionRecords, setSubmissionRecords] = useState(improvementRecordSeed);
  const [editingOrder, setEditingOrder] = useState(null);
  const [editForm, setEditForm] = useState({ quantity: '', expectedDate: '' });
  const [showRevokeConfirm, setShowRevokeConfirm] = useState(false);
  const [revokingOrder, setRevokingOrder] = useState(null);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [selectedGift, setSelectedGift] = useState(null);
  const [exchangeQty, setExchangeQty] = useState(1);
  const [exchangeDate, setExchangeDate] = useState('');
  const [exchangePeriod, setExchangePeriod] = useState('上午');
  const [exchangeCoffeeCategory, setExchangeCoffeeCategory] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(propCurrentPage || 'ranking-red');
  // orderTab removed — simplified to record-only mode
  const [orderTypeFilter, setOrderTypeFilter] = useState('全部');
  const [orderStatusFilter, setOrderStatusFilter] = useState('全部');
  const [orderDateFilter, setOrderDateFilter] = useState('');
  const [showSuggestionModal, setShowSuggestionModal] = useState(false);
  const [suggestionMode, setSuggestionMode] = useState('apply'); // 'apply' | 'recommend'
  const [suggestionForm, setSuggestionForm] = useState({
    relatedPerson: '',
    ipdStage: '',
    improvementType: '',
    reason: '',
    files: []
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [blackRankingTab, setBlackRankingTab] = useState('personal');
  const [selectedBlackReason, setSelectedBlackReason] = useState(null);
  const [accountLogSearch, setAccountLogSearch] = useState('');
  const [accountLogDate, setAccountLogDate] = useState('');
  const [accountLogStatus, setAccountLogStatus] = useState('全部状态');

  // 申报明细筛选 & 分页
  const [settingsForm, setSettingsForm] = useState({
    name: '张三',
    phone: '13800008888',
    department: '产品技术中心',
    employeeId: 'HX-2024-086',
    account: user?.username || 'user',
    address: '上海市浦东新区张江高科软件园 2 号楼',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const adminActive = currentPage === 'admin-redblack' ||
                     currentPage === 'admin-gifts' || currentPage === 'admin-orders' ||
                     currentPage === 'admin-users';
  const rankingActive = currentPage === 'ranking-red' || currentPage === 'ranking-black';
  const pointsMgmtActive = currentPage === 'points-apply' || currentPage === 'points-review' || currentPage === 'admin-pending';

  const [navGroups, setNavGroups] = useState(() => {
    const initialQuality = currentPage === 'points' || currentPage === 'shop' || currentPage === 'orders' || adminActive || rankingActive || pointsMgmtActive;
    const initialMall = currentPage === 'shop' || currentPage === 'points' || currentPage === 'orders';
    const initialPointsMgmt = currentPage === 'points-apply' || currentPage === 'points-review';
    const initialSettings = currentPage === 'settings';
    const initialAdmin = adminActive;

    return {
      quality: initialQuality,
      mall: initialMall,
      pointsMgmt: initialPointsMgmt,
      settings: initialSettings,
      admin: initialAdmin,
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % activityFeed.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const displayName = getDisplayName(user);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchStatus = orderStatusFilter === '全部' || order.status === orderStatusFilter;
      const matchDate = !orderDateFilter || order.createdAt === orderDateFilter;
      return matchStatus && matchDate;
    });
  }, [orderStatusFilter, orderDateFilter, orders]);

  const qualityActive = currentPage === 'points' || currentPage === 'shop' || currentPage === 'orders' || adminActive || rankingActive;
  const mallActive = currentPage === 'shop' || currentPage === 'points' || currentPage === 'orders';
  const settingsActive = currentPage === 'settings';

  // 切换导航组展开/收起
  const toggleNavGroup = (group) => {
    setNavGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  // 确保导航组在页面切换时正确展开（同时展开所有父级）
  const handlePageChange = (page, group) => {
    setNavGroups(prev => {
      const next = { ...prev, [group]: true };
      // 如果点击的是子分组内的菜单，同时展开父级 quality
      if (group === 'mall' || group === 'admin' || group === 'ranking') {
        next.quality = true;
      }
      // 如果点击的是 mymall 子项，同时展开 mall 和 quality
      if (page === 'points' || page === 'orders' || page === 'shop') {
        next.mall = true;
        next.quality = true;
      }
      // 如果点击的是 admin 子项，同时展开 quality
      if (page.startsWith('admin-') && page !== 'admin-pending') {
        next.admin = true;
        next.quality = true;
      }
      // 如果点击的是 ranking 子项，同时展开 quality
      if (page.startsWith('ranking-')) {
        next.ranking = true;
        next.quality = true;
      }
      // 如果点击的是积分管理子项，同时展开 quality
      if (page === 'points-apply' || page === 'points-review' || page === 'shop' || page === 'admin-orders' || page === 'admin-pending') {
        next.pointsMgmt = true;
        next.quality = true;
      }
      return next;
    });

    setCurrentPage(page);
    if (propSetCurrentView) {
      propSetCurrentView(page);
    }
  };

  const handleExchange = (gift) => {
    if (userPoints >= gift.pointsCost) {
      setSelectedGift(gift);
      setExchangeQty(1);
      setExchangeDate('');
      setExchangePeriod('上午');
      setExchangeCoffeeCategory('');
      setShowExchangeModal(true);
    } else {
      alert('洪小星不足，无法兑换此商品！');
    }
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const confirmExchange = () => {
    if (!selectedGift || userPoints < selectedGift.pointsCost * exchangeQty) return;
    if (!exchangeCoffeeCategory) {
      alert('请选择咖啡品类！');
      return;
    }
    const totalCost = selectedGift.pointsCost * exchangeQty;
    const newOrder = {
      id: `HX${Date.now()}`,
      giftName: selectedGift.name,
      category: exchangeCoffeeCategory,
      quantity: exchangeQty,
      pointsCost: totalCost,
      createdAt: new Date().toISOString().slice(0, 10),
      status: '待交付',
      receiver: '张三',
      contact: '138****8888',
      address: exchangeDate ? `${exchangeDate} ${exchangePeriod}` : '即时领取',
    };
    setOrders((prev) => [newOrder, ...prev]);
    setShowExchangeModal(false);
    setSelectedGift(null);
    setExchangeQty(1);
    setExchangeDate('');
    setExchangePeriod('上午');
    setExchangeCoffeeCategory('');
    triggerToast('兑换成功！已自动扣除积分，订单已推送给谢婉莹。');
  };

  const updateSettings = (field) => (event) => {
    setSettingsForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  // 模拟推荐人列表
  const recommendUserOptions = [
    { id: 'u1', name: '陈予安', empId: 'HX-2024-086' },
    { id: 'u2', name: '梁思齐', empId: 'HX-2024-031' },
    { id: 'u3', name: '顾清野', empId: 'HX-2024-045' },
    { id: 'u4', name: '秦可心', empId: 'HX-2024-067' },
    { id: 'u5', name: '姜闻川', empId: 'HX-2024-012' },
    { id: 'u6', name: '白知许', empId: 'HX-2024-093' },
    { id: 'u7', name: '高瑾瑜', empId: 'HX-2024-058' },
    { id: 'u8', name: '温祁年', empId: 'HX-2024-024' },
  ];

  // 处理提交改进建议表单
  const handleSuggestionFormChange = (field) => (event) => {
    const value = event.target.value;
    setSuggestionForm((prev) => {
      const newState = { ...prev, [field]: value };
      // 当IPD阶段改变时，自动根据映射关系填充改进方向类别
      if (field === 'ipdStage' && value && ipdToImprovementMap[value]) {
        newState.improvementType = ipdToImprovementMap[value];
      }
      return newState;
    });
    // 清除对应字段的错误
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  // 验证表单
  const validateSuggestionForm = () => {
    const errors = {};
    // 推荐模式下必须填写相关人员
    if (suggestionMode === 'recommend' && !suggestionForm.relatedPerson.trim()) {
      errors.relatedPerson = '请选择被推荐人';
    }
    if (!suggestionForm.ipdStage.trim()) {
      errors.ipdStage = '请选择所属IPD阶段';
    }
    if (!suggestionForm.improvementType.trim()) {
      errors.improvementType = '请选择改进方向类别';
    }
    if (!suggestionForm.reason.trim()) {
      errors.reason = '请填写事由';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // 提交改进建议
  const handleSubmitSuggestion = () => {
    if (!validateSuggestionForm()) {
      return;
    }

    setIsSubmitting(true);

    // 创建新的申报记录
    const newSubmission = {
      id: Date.now(),
      mode: suggestionMode,
      relatedPerson: suggestionMode === 'apply' ? displayName : suggestionForm.relatedPerson,
      ipdStage: suggestionForm.ipdStage,
      improvementType: suggestionForm.improvementType,
      reason: suggestionForm.reason,
      status: '待采纳',
      submitTime: new Date().toISOString().split('T')[0],
      files: suggestionForm.files
    };

    // 添加到申报记录列表
    setSubmissions(prev => [newSubmission, ...prev]);

    // 模拟提交过程
    setTimeout(() => {
      console.log('提交改进建议：', suggestionForm);
      setIsSubmitting(false);
      setShowSuggestionModal(false);
      // 重置表单
      setSuggestionForm({
        ipdStage: '',
        improvementType: '',
        reason: '',
        files: []
      });
      setFormErrors({});
      alert('改进建议提交成功！');
    }, 1000);
  };

  // 取消提交
  const handleCancelSuggestion = () => {
    setShowSuggestionModal(false);
    setSuggestionMode('apply');
    // 重置表单
    setSuggestionForm({
      relatedPerson: '',
      ipdStage: '',
      improvementType: '',
      reason: '',
      files: []
    });
    setFormErrors({});
  };

  // 处理文件上传
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setSuggestionForm((prev) => ({ ...prev, files: [...prev.files, ...files] }));
  };

  // 删除已上传文件
  const handleRemoveFile = (index) => {
    setSuggestionForm((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const renderShopPage = () => (
    <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
      <img
        src="/assets/stat.png"
        alt="即时奖申请"
        style={{ width: '100%', display: 'block', borderRadius: '16px' }}
      />
      {/* 热区：洪小星明细 */}
      <button
        type="button"
        onClick={() => setCurrentPage('points')}
        style={{
          position: 'absolute',
          left: '3%', top: '25%',
          width: '13%', height: '5.5%',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '6px',
        }}
        aria-label="洪小星明细"
      />
      {/* 热区：立即兑换 */}
      <button
        type="button"
        onClick={() => handleExchange(giftsSeed[0])}
        disabled={userPoints < giftsSeed[0].pointsCost || giftsSeed[0].stock === 0}
        style={{
          position: 'absolute',
          left: '20%', top: '30%',
          width: '40%', height: '8%',
          background: 'transparent',
          border: 'none',
          cursor: userPoints >= giftsSeed[0].pointsCost && giftsSeed[0].stock > 0 ? 'pointer' : 'not-allowed',
          borderRadius: '8px',
        }}
        aria-label="立即兑换"
      />
    </div>
  );

  const renderSettingsPage = () => (
    <section className="hx-employee-panel">
      <div className="hx-employee-two-col">
        <div className="hx-employee-subpanel">
          <div className="hx-employee-subpanel-head">
            <Settings2 size={18} />
            <h3>个人资料</h3>
          </div>
          <div className="hx-employee-profile-editor">
            <div className="hx-employee-avatar-stack">
              <img src={avatarUrl} alt={displayName} className="hx-employee-settings-avatar" />
              <button type="button" className="hx-employee-secondary-btn">
                更换头像
              </button>
            </div>

            <div className="hx-employee-form-grid">
              <div className="hx-form-group">
                <label htmlFor="employee-name">姓名</label>
                <input id="employee-name" value={settingsForm.name} onChange={updateSettings('name')} />
              </div>
              <div className="hx-form-group">
                <label htmlFor="employee-phone">手机号</label>
                <input id="employee-phone" value={settingsForm.phone} onChange={updateSettings('phone')} />
              </div>
              <div className="hx-form-group">
                <label htmlFor="employee-department">所属部门</label>
                <input id="employee-department" value={settingsForm.department} onChange={updateSettings('department')} />
              </div>
                            <div className="hx-form-group hx-form-group-wide">
                <label htmlFor="employee-address">收货地址</label>
                <textarea id="employee-address" value={settingsForm.address} onChange={updateSettings('address')} rows="4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const openEditModal = (order) => {
    setEditForm({ quantity: order.quantity.toString(), expectedDate: '' });
    setEditingOrder(order);
  };

  const closeEditModal = () => {
    setEditingOrder(null);
    setEditForm({ quantity: '', expectedDate: '' });
  };

  const handleEditSubmit = () => {
    console.log('编辑订单:', editingOrder?.id, editForm);
    closeEditModal();
  };

  const openRevokeConfirm = (order) => {
    setRevokingOrder(order);
    setShowRevokeConfirm(true);
  };

  const closeRevokeConfirm = () => {
    setShowRevokeConfirm(false);
    setRevokingOrder(null);
  };

  const handleRevoke = () => {
    if (revokingOrder) {
      setOrders((prev) => prev.filter((o) => o.id !== revokingOrder.id));
    }
    closeRevokeConfirm();
  };

  const renderOrdersPage = () => (
    <section className="hx-employee-panel">
      <div className="hx-employee-filter-bar">
        <div className="hx-employee-filter-field">
          <label htmlFor="order-date-filter">兑换时间</label>
          <input
            id="order-date-filter"
            type="date"
            value={orderDateFilter}
            onChange={(e) => setOrderDateFilter(e.target.value)}
            className="hx-employee-filter-date-input"
            placeholder="请选择兑换时间"
          />
        </div>
        <div className="hx-employee-filter-field">
          <label htmlFor="order-status-filter">订单状态</label>
          <select id="order-status-filter" value={orderStatusFilter} onChange={(event) => setOrderStatusFilter(event.target.value)}>
            {orderStatusOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </div>
      </div>

      <div className="hx-employee-table-card">
        {/* 表头 — 5 列 grid：兑换内容|兑换数量|消耗星数|兑换日期|操作 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1.5fr 1fr',
          gap: '16px',
          padding: '10px 24px',
          background: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
        }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#475569', textAlign: 'left' }}>兑换内容</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#475569', textAlign: 'center' }}>兑换数量</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#475569', textAlign: 'center' }}>消耗星数</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#475569', textAlign: 'center' }}>兑换日期</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#475569', textAlign: 'center' }}>操作</span>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="hx-employee-table-empty">暂无匹配订单</div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1.5fr 1fr',
                gap: '16px',
                padding: '14px 24px',
                borderBottom: '1px solid #f1f5f9',
                alignItems: 'center',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
              onMouseLeave={e => e.currentTarget.style.background = '#fff'}
            >
              {/* 兑换内容 — 合并品类 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '16px' }}>☕</span>
                <span style={{ fontSize: 14, color: '#1e293b', fontWeight: 500 }}>
                  {order.giftName} — <strong style={{ fontWeight: 700, color: '#007B7A' }}>{order.category}</strong>
                </span>
              </div>

              {/* 兑换数量 */}
              <span style={{ fontSize: 14, color: '#1e293b', fontWeight: 600, textAlign: 'center' }}>{order.quantity}</span>

              {/* 消耗星数 */}
              <span style={{ fontSize: 13, textAlign: 'center' }}>
                <strong style={{ color: '#007B7A', fontWeight: 700 }}>{order.pointsCost}</strong>
                <span style={{ color: '#94a3b8', marginLeft: 2 }}>星</span>
              </span>

              {/* 兑换日期 */}
              <span style={{ fontSize: 13, color: '#64748b', textAlign: 'center' }}>{order.createdAt}</span>

              {/* 操作 — 查看详情 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <button
                  type="button"
                  onClick={() => setViewingOrder(order)}
                  style={{
                    border: 'none', background: 'transparent',
                    color: '#64748b', fontSize: 12, fontWeight: 500,
                    padding: '3px 10px', borderRadius: 6,
                    cursor: 'pointer', whiteSpace: 'nowrap',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >查看详情</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 查看详情弹窗 — 纯内联样式 */}
      {viewingOrder && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setViewingOrder(null); }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div style={{
            background: '#fff', borderRadius: 12,
            width: 480, maxWidth: '90vw', overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          }}>
            {/* Header */}
            <div style={{
              height: 56, padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: '#f8fafc', borderBottom: '1px solid #e2e8f0',
            }}>
              <span style={{ fontSize: 16, fontWeight: 600, color: '#0f172a' }}>订单详情</span>
              <button
                onClick={() => setViewingOrder(null)}
                style={{
                  width: 32, height: 32, border: 'none', background: 'transparent', borderRadius: 6,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', fontSize: 20, color: '#94a3b8', lineHeight: 1,
                }}
              >×</button>
            </div>

            {/* Body — 紧凑键值对，每行底部分割线 */}
            <div style={{ padding: '16px 24px' }}>
              {/* 状态 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: 13, color: '#94a3b8' }}>状态</span>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 'fit-content', height: 24, padding: '0 12px', borderRadius: 999,
                  fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap',
                  background: viewingOrder.status === '已完成' ? '#ecfdf5' : '#fffbeb',
                  color: viewingOrder.status === '已完成' ? '#059669' : '#d97706',
                }}>{viewingOrder.status}</span>
              </div>
              {/* 兑换内容 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: 13, color: '#94a3b8' }}>兑换内容</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>{viewingOrder.giftName}</span>
              </div>
              {/* 品类 */}
              {viewingOrder.category && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: 13, color: '#94a3b8' }}>品类</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#007B7A', background: '#f0fdfa', padding: '2px 10px', borderRadius: 6 }}>{viewingOrder.category}</span>
                </div>
              )}
              {/* 兑换数量 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: 13, color: '#94a3b8' }}>兑换数量</span>
                <span style={{ fontSize: 14, color: '#1e293b', fontWeight: 500 }}>{viewingOrder.quantity}</span>
              </div>
              {/* 消耗星数 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: 13, color: '#94a3b8' }}>消耗星数</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#007B7A' }}>{viewingOrder.pointsCost} 星</span>
              </div>
              {/* 兑换日期 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: 13, color: '#94a3b8' }}>兑换日期</span>
                <span style={{ fontSize: 13, color: '#1e293b' }}>{viewingOrder.createdAt}</span>
              </div>
              {/* 兑换人 */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: 13, color: '#94a3b8' }}>兑换人</span>
                <span style={{ fontSize: 13, color: '#1e293b' }}>{viewingOrder.receiver}</span>
              </div>
            </div>

            {/* Footer */}
            <div style={{
              padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
              background: '#f8fafc', borderTop: '1px solid #e2e8f0',
            }}>
              <button
                type="button"
                onClick={() => setViewingOrder(null)}
                style={{
                  height: 36, padding: '0 20px', borderRadius: 8,
                  border: '1px solid #d1d5db', background: '#fff',
                  fontSize: 14, color: '#334155', cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >关闭</button>
            </div>
          </div>
        </div>
      )}

      {/* 编辑兑换订单弹窗 — 纯内联样式，彻底隔离外层 CSS 污染 */}
      {editingOrder && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) closeEditModal(); }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div style={{
            background: '#fff', borderRadius: 12,
            width: 500, maxWidth: '90vw', overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          }}>
            {/* Header */}
            <div style={{
              height: 56, padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: '#f8fafc', borderBottom: '1px solid #e2e8f0',
            }}>
              <span style={{ fontSize: 16, fontWeight: 600, color: '#0f172a' }}>编辑兑换订单</span>
              <button
                onClick={closeEditModal}
                style={{
                  width: 32, height: 32, border: 'none', background: 'transparent', borderRadius: 6,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', fontSize: 20, color: '#94a3b8', lineHeight: 1,
                }}
              >×</button>
            </div>

            {/* Body */}
            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* 兑换数量 */}
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#334155', marginBottom: 6 }}>
                  兑换数量
                </label>
                <input
                  type="number"
                  min="1"
                  value={editForm.quantity}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, quantity: e.target.value }))}
                  placeholder="请输入兑换数量"
                  style={{
                    width: '100%', height: 40, padding: '0 12px',
                    border: '1px solid #d1d5db', borderRadius: 8,
                    fontSize: 14, color: '#0f172a', outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* 期望兑换时间 */}
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#334155', marginBottom: 6 }}>
                  期望兑换时间
                </label>
                <input
                  type="date"
                  value={editForm.expectedDate}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, expectedDate: e.target.value }))}
                  style={{
                    width: '100%', height: 40, padding: '0 12px',
                    border: '1px solid #d1d5db', borderRadius: 8,
                    fontSize: 14, color: '#0f172a', outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* 只读提示 */}
              <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.5 }}>
                * 仅支持修改数量和期望时间
              </div>
            </div>

            {/* Footer */}
            <div style={{
              padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12,
              background: '#f8fafc', borderTop: '1px solid #e2e8f0',
            }}>
              <button
                type="button"
                onClick={closeEditModal}
                style={{
                  height: 36, padding: '0 20px', borderRadius: 8,
                  border: '1px solid #d1d5db', background: '#fff',
                  fontSize: 14, color: '#334155', cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >取消</button>
              <button
                type="button"
                onClick={handleEditSubmit}
                style={{
                  height: 36, padding: '0 20px', borderRadius: 8,
                  border: 'none', background: '#007B7A',
                  fontSize: 14, fontWeight: 600, color: '#fff', cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >确认修改</button>
            </div>
          </div>
        </div>
      )}

      {/* 撤销确认框 — 纯内联样式 */}
      {showRevokeConfirm && revokingOrder && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) closeRevokeConfirm(); }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div style={{
            background: '#fff', borderRadius: 12,
            width: 420, maxWidth: '90vw', overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          }}>
            {/* Header */}
            <div style={{
              height: 56, padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: '#f8fafc', borderBottom: '1px solid #e2e8f0',
            }}>
              <span style={{ fontSize: 16, fontWeight: 600, color: '#0f172a' }}>确认撤销</span>
              <button
                onClick={closeRevokeConfirm}
                style={{
                  width: 32, height: 32, border: 'none', background: 'transparent', borderRadius: 6,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', fontSize: 20, color: '#94a3b8', lineHeight: 1,
                }}
              >×</button>
            </div>

            {/* Body */}
            <div style={{ padding: 24 }}>
              <div style={{
                display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', background: '#fef2f2',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <span style={{ fontSize: 18 }}>⚠️</span>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', marginBottom: 4 }}>
                    确定要撤销此订单吗？
                  </div>
                  <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>
                    {revokingOrder.giftName} × {revokingOrder.quantity}
                  </div>
                </div>
              </div>
              <div style={{
                padding: '10px 14px', borderRadius: 8,
                background: '#fef2f2', border: '1px solid #fecaca',
                fontSize: 13, color: '#991b1b', lineHeight: 1.5,
              }}>
                撤销后订单将从列表中移除，且不可恢复。
              </div>
            </div>

            {/* Footer */}
            <div style={{
              padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12,
              background: '#f8fafc', borderTop: '1px solid #e2e8f0',
            }}>
              <button
                type="button"
                onClick={closeRevokeConfirm}
                style={{
                  height: 36, padding: '0 20px', borderRadius: 8,
                  border: '1px solid #d1d5db', background: '#fff',
                  fontSize: 14, color: '#334155', cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >取消</button>
              <button
                type="button"
                onClick={handleRevoke}
                style={{
                  height: 36, padding: '0 20px', borderRadius: 8,
                  border: 'none', background: '#ef4444',
                  fontSize: 14, fontWeight: 600, color: '#fff', cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >确认撤销</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );

  // 状态文字映射
  const statusText = { completed: '已完成', pending: '待交付', review: '待制作', revoked: '待交付' };

  // 合并收支明细和兑换记录为统一数据，按时间倒序排列
  const mergedLogs = [
    ...pointDetailSeed.map((item) => ({
      id: `earn-${item.id}`,
      event: item.type,
      time: item.time,
      amount: item.value,
      // 金额为正数 → 收入（奖励/发放），状态显示 "-"
      // 金额为负数 → 支出（兑换），需要显示业务状态
      isEarning: !item.value.startsWith('-'),
      status: item.value.startsWith('-') ? 'completed' : null,
    })),
    ...exchangeHistorySeed.map((item) => ({
      id: `ex-${item.id}`,
      event: item.giftName,
      time: item.date,
      amount: `-${item.pointsCost}`,
      isEarning: false,
      status: item.status,
    })),
  ].sort((a, b) => new Date(b.time) - new Date(a.time));

  // 收支明细弹窗筛选后的数据
  const filteredAccountLogs = useMemo(() => {
    return mergedLogs.filter((log) => {
      if (accountLogSearch.trim()) {
        const q = accountLogSearch.trim().toLowerCase();
        if (!log.event.toLowerCase().includes(q)) return false;
      }
      if (accountLogDate) {
        const logDate = log.time.slice(0, 10);
        if (logDate !== accountLogDate) return false;
      }
      if (accountLogStatus !== '全部状态') {
        const statusKey = Object.keys(statusText).find((k) => statusText[k] === accountLogStatus);
        if (log.status !== statusKey) return false;
      }
      return true;
    });
  }, [accountLogSearch, accountLogDate, accountLogStatus]);

  const renderPointsPage = () => {
    return (
      <section className="hx-employee-panel">
        <div className="hx-employee-points-summary-card">
          <div className="hx-employee-points-summary-main">
            <div className="hx-employee-points-summary-icon">✦</div>
            <div className="hx-employee-points-summary-copy">
              <p>Hi，{displayName}</p>
              <h3>你当前可用洪小星为 <strong>{userPoints}</strong></h3>
            </div>
          </div>
        </div>

        {/* 积分数据概览 */}
        <div className="hx-section-action-row" style={{ marginBottom: 16 }}>
          <span className="hx-section-action-title">数据概览</span>
        </div>

        {/* 统计卡片行：3列 */}
        <div className="hx-dashboard-stats">
          <div className="hx-stat-card">
            <div className="hx-stat-icon blue">
              <ClipboardList size={24} />
            </div>
            <div className="hx-stat-content">
              <span className="hx-stat-label">当前累计洪小星</span>
              <strong className="hx-stat-value">{userPoints}</strong>
            </div>
          </div>
          <div className="hx-stat-card">
            <div className="hx-stat-icon green">
              <Star size={24} />
            </div>
            <div className="hx-stat-content">
              <span className="hx-stat-label">本月新增洪小星</span>
              <strong className="hx-stat-value">246</strong>
            </div>
          </div>
          <div className="hx-stat-card">
            <div className="hx-stat-icon orange">
              <Gift size={24} />
            </div>
            <div className="hx-stat-content">
              <span className="hx-stat-label">累计兑换次数</span>
              <strong className="hx-stat-value">{exchangeHistory.length}</strong>
            </div>
          </div>
        </div>

        {/* ===== 洪小星收支明细 — 平铺直显 ===== */}
        <div className="hx-ledger">
          {/* Section Title */}
          <div className="hx-ledger-header">
            <div className="hx-ledger-title-wrap">
              <div className="hx-ledger-title-bar" />
              <h3 className="hx-ledger-title">洪小星收支明细</h3>
            </div>
            <span className="hx-ledger-count">共 {filteredAccountLogs.length} 条记录</span>
          </div>

          {/* Filter Row */}
          <div className="hx-ledger-filters" style={{ marginBottom: 4 }}>
            <div className="hx-ledger-filter-item hx-ledger-search">
              <Search size={14} />
              <input
                type="text"
                placeholder="搜索事件内容..."
                value={accountLogSearch}
                onChange={(e) => setAccountLogSearch(e.target.value)}
              />
            </div>
            <div className="hx-ledger-filter-item hx-ledger-date">
              <Calendar size={14} />
              <input
                type="date"
                value={accountLogDate}
                onChange={(e) => setAccountLogDate(e.target.value)}
              />
            </div>
            <div className="hx-ledger-filter-item hx-ledger-status-filter">
              <select
                value={accountLogStatus}
                onChange={(e) => setAccountLogStatus(e.target.value)}
              >
                <option>全部状态</option>
                <option>待交付</option>
                <option>已完成</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="hx-ledger-table-wrap">
            <div className="hx-ledger-table">
              <div className="hx-ledger-table-head">
                <span style={{ width: '30%' }}>事件</span>
                <span style={{ width: '35%' }}>发生时间</span>
                <span style={{ width: '15%' }}>洪小星变动</span>
                <span style={{ width: '20%' }}>当前状态</span>
              </div>
              <div className="hx-ledger-table-body">
                {filteredAccountLogs.length > 0 ? (
                  filteredAccountLogs.map((log) => (
                    <div key={log.id} className="hx-ledger-table-row">
                      <span style={{ width: '30%' }}>{log.event}</span>
                      <span style={{ width: '35%' }}>{log.time}</span>
                      <span style={{ width: '15%' }} className={`hx-ledger-amount ${log.amount.startsWith('+') ? 'plus' : 'minus'}`}>
                        {log.amount}
                      </span>
                      <span style={{ width: '20%' }}>
                        {log.isEarning && !log.status ? (
                          <span className="hx-ledger-status">—</span>
                        ) : (
                          <span className={`hx-ledger-status-badge ${log.status === 'completed' ? 'done' : log.status === 'revoked' ? 'revoked' : 'pending'}`}>
                            {statusText[log.status] || log.status || '—'}
                          </span>
                        )}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="hx-ledger-empty">暂无匹配的收支记录</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Ranking Pages — 荣誉中心
  const renderRankingPage = () => {
    const formatScore = (score) => new Intl.NumberFormat('zh-CN').format(score);
    const createRankingSegments = (items) => {
      if (items.length <= 20) {
        return {
          podium: items.slice(0, 3),
          upperList: items.slice(3),
          lowerList: [],
          hasGap: false,
        };
      }
      return {
        podium: items.slice(0, 3),
        upperList: items.slice(3, 10),
        lowerList: items.slice(-10),
        hasGap: true,
      };
    };

    const renderRankingPodium = (type, items) => {
      const layout = [items[1], items[0], items[2]].filter(Boolean);
      const isTeam = type === 'team';

      return (
        <div className={`hx-ranking-podium hx-ranking-podium-${type}`}>
          {layout.map((item) => {
            const medalClass = item.rank === 1 ? 'gold' : item.rank === 2 ? 'silver' : 'bronze';
            return (
              <article key={item.id} className={`hx-podium-card hx-podium-card-${item.rank} ${medalClass}`}>
                <div className={`hx-podium-avatar-wrap ${medalClass}`}>
                  <img src="/assets/皇冠.svg" alt="" className={`hx-podium-crown ${medalClass}`} aria-hidden="true" />
                  {isTeam ? (
                    <span className={`hx-team-badge hx-team-badge-podium ${medalClass}`}>{item.badgeText}</span>
                  ) : (
                    <img src={item.avatar} alt={item.name} className="hx-podium-avatar" />
                  )}
                </div>
                <div className="hx-podium-top-label">TOP {item.rank}</div>
                <div className="hx-podium-name">{isTeam ? item.teamName : item.name}</div>
                <div className={`hx-podium-score hx-podium-score-${item.rank}`}>{formatScore(item.score)}</div>
              </article>
            );
          })}
        </div>
      );
    };

    const renderRankingList = (type, items) => {
      return items.map((item) => {
        const trendUp = item.trend === 'up';
        return (
          <div key={`${type}-${item.id}`} className="hx-rank-row hx-rank-row-compact">
            <div className="hx-rank-row-left">
              <div className="hx-rank-no">
                <span className="hx-rank-plain">{item.rank}</span>
              </div>
              <p className="hx-rank-name">{type === 'team' ? item.teamName : item.name}</p>
            </div>
            <div className="hx-rank-row-right">
              <span className="hx-rank-score">{formatScore(item.score)}</span>
              <span className={`hx-trend ${trendUp ? 'is-up' : 'is-down'}`}>
                {trendUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {trendUp ? '↑' : '↓'}
              </span>
            </div>
          </div>
        );
      });
    };

    const renderRankingPanel = (type, title, items) => {
      const { podium, upperList, lowerList, hasGap } = createRankingSegments(items);
      return (
        <section className="hx-rank-panel">
          <div className="hx-rank-panel-head">
            <h3>{title}</h3>
            <span>{type === 'team' ? '团队维度' : '个人维度'}</span>
          </div>
          {renderRankingPodium(type, podium)}
          <div className="hx-rank-panel-list">
            {renderRankingList(type, upperList)}
            {hasGap ? <div className="hx-rank-ellipsis">···</div> : null}
            {renderRankingList(type, lowerList)}
          </div>
        </section>
      );
    };

    const renderBlackRankingRows = (type, items) => {
      return items.map((item) => {
        const trendUp = item.trend === 'up';
        const displayName = type === 'personal' ? item.name : item.teamName;
        return (
          <button
            key={`${type}-${item.id}`}
            type="button"
            className="hx-black-rank-row"
            onClick={() => setSelectedBlackReason({ ...item, type })}
          >
            <span className="hx-black-rank-no">{item.rank}</span>
            <span className="hx-black-rank-name" title={displayName}>{displayName}</span>
            <span className="hx-black-rank-reason" title={item.reasonTitle}>{item.reasonTitle}</span>
            <span className="hx-black-rank-score">
              <span className={`hx-trend ${trendUp ? 'is-up' : 'is-down'}`}>
                {formatScore(item.score)} {trendUp ? '↑' : '↓'}
              </span>
            </span>
          </button>
        );
      });
    };

    const renderBlackRankingPanel = () => {
      const currentItems = blackRankingTab === 'personal' ? personalBlackRankingData : teamBlackRankingData;
      return (
        <section className="hx-rank-panel hx-rank-panel-black">
          <div className="hx-rank-panel-head hx-rank-panel-head-black">
            <div>
              <h3>改进动态</h3>
              <p>累计罚分越高，排名越靠前，请及时关注并整改</p>
            </div>
            <div className="hx-black-rank-tabs">
              <button
                type="button"
                className={`hx-black-rank-tab ${blackRankingTab === 'personal' ? 'active' : ''}`}
                onClick={() => setBlackRankingTab('personal')}
              >
                个人黑榜
              </button>
              <button
                type="button"
                className={`hx-black-rank-tab ${blackRankingTab === 'team' ? 'active' : ''}`}
                onClick={() => setBlackRankingTab('team')}
              >
                团队黑榜
              </button>
            </div>
          </div>
          <div className="hx-black-rank-list">
            {renderBlackRankingRows(blackRankingTab, currentItems)}
          </div>
        </section>
      );
    };

    const renderBlackReasonModal = () => {
      if (!selectedBlackReason) return null;
      const isPersonal = selectedBlackReason.type === 'personal';
      return (
        <div className="hx-suggestion-overlay" onClick={() => setSelectedBlackReason(null)}>
          <div className="hx-suggestion-dialog hx-black-reason-modal" onClick={(event) => event.stopPropagation()}>
            <div className="hx-sd-header">
              <div className="hx-sd-header-left">
                <div className="hx-sd-header-icon">
                  <AlertTriangle size={18} color="#dc2626" />
                </div>
                <span className="hx-sd-header-title">原因明细</span>
              </div>
              <button type="button" className="hx-sd-close" onClick={() => setSelectedBlackReason(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="hx-sd-divider" />
            <div className="hx-sd-body">
              <div className="hx-black-reason-meta">
                <strong>{selectedBlackReason.reasonTitle}</strong>
                <span>{isPersonal ? selectedBlackReason.name : selectedBlackReason.teamName}</span>
                <span>{selectedBlackReason.date}</span>
                {isPersonal ? <span>负责人：{selectedBlackReason.owner || '待分配'}</span> : null}
              </div>
              <div className="hx-black-reason-content">{selectedBlackReason.detail}</div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <>
        {/* --- 1. 这是底图和透明热区 --- */}
        <section className="hx-employee-section">
          <div style={{ borderRadius: 16, overflow: 'hidden', position: 'relative' }}>
            <img
              src="/assets/hero-dashboard-bg.png"
              alt="质量榜单"
              style={{ width: '100%', display: 'block', objectFit: 'contain' }}
            />
            
            {/* 张三个人黑榜 - 透明热区 */}
            <div 
              onClick={() => setShowBlackImage(true)}
              className="absolute cursor-pointer hover:bg-black/10 transition-all rounded-md z-10"
              style={{ 
                top: '63%', 
                right: '3.5%', 
                width: '24%', 
                height: '4%' 
              }}
              title="点击查看详情"
            ></div>
          </div>
        </section>

       {/* 黑色遮罩弹窗（究极强化版） */}
       {showBlackImage && (
          <div 
            // 强化1：强制全屏固定，最高层级，毛玻璃+深黑半透明背景
            className="fixed top-0 left-0 w-screen h-screen bg-black/85 backdrop-blur-sm z-[99999] flex items-center justify-center cursor-zoom-out"
            onClick={() => setShowBlackImage(false)}
            style={{ position: 'fixed', inset: 0 }} // 双重保险
          >
            {/* 强化2：消除一切干扰背景，纯粹居中包裹图片 */}
            <div 
              className="relative flex items-center justify-center bg-transparent"
              onClick={(e) => e.stopPropagation()} // 阻止冒泡
            >
              {/* 强化3：图片强制不拉伸，去底色，自适应屏幕比例 */}
              <img 
                src="/assets/black_number.png" 
                alt="黑榜详情" 
                className="max-w-[85vw] max-h-[85vh] object-contain drop-shadow-[0_0_40px_rgba(0,0,0,0.5)] bg-transparent rounded-2xl"
              />
              
              {/* 强化4：关闭按钮悬浮在右上角外侧 */}
              <button 
                onClick={() => setShowBlackImage(false)}
                className="absolute -top-12 right-0 text-white hover:text-red-400 text-4xl font-light transition-colors drop-shadow-md cursor-pointer"
                title="关闭"
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </>
    );
  };

  // Admin Pages
  const renderAdminPendingPage = () => <PendingContent submissionRecords={submissionRecords} setSubmissionRecords={setSubmissionRecords} />;
  const renderAdminRedBlackPage = () => <RedBlackContent />;
  const renderAdminGiftsPage = () => <GiftsContent />;
  const renderAdminOrdersPage = () => <OrdersContent />;
  const renderAdminUsersPage = () => <UsersContent />;

  const renderCurrentPage = () => {
    if (currentPage === 'settings') return renderSettingsPage();
    if (currentPage === 'orders') return renderOrdersPage();
    if (currentPage === 'points') return renderPointsPage();
    if (currentPage === 'shop') return renderShopPage();

    // Ranking pages
    if (currentPage === 'ranking-red' || currentPage === 'ranking-black') return renderRankingPage();

    // 积分管理 pages
    if (currentPage === 'points-apply') return <PointsApplyPage user={user} submissionRecords={submissionRecords} setSubmissionRecords={setSubmissionRecords} />;
    if (currentPage === 'points-review') return <PointsReviewPage />;

    // Admin pages
    if (currentPage === 'admin-pending') return renderAdminPendingPage();
    if (currentPage === 'admin-redblack') return renderAdminRedBlackPage();
    if (currentPage === 'admin-gifts') return renderAdminGiftsPage();
    if (currentPage === 'admin-orders') return renderAdminOrdersPage();
    if (currentPage === 'admin-users') return renderAdminUsersPage();
    return renderShopPage();
  };

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
            <div className={`hx-employee-nav-group ${qualityActive ? 'active' : ''} ${navGroups.quality ? 'expanded' : 'collapsed'}`}>
              <div className="hx-employee-nav-item" onClick={() => toggleNavGroup('quality')}>
                <div className="hx-employee-nav-label">
                  <LayoutDashboard size={18} />
                  <span>质量改进</span>
                </div>
                {navGroups.quality ? <ChevronDown size={16} className="chevron-icon" /> : <ChevronRight size={16} className="chevron-icon" />}
              </div>
              <div className="hx-employee-subnav">

                {/* 积分管理 子分组 */}
                <div className={`hx-employee-nav-group ${pointsMgmtActive ? 'active' : ''} ${navGroups.pointsMgmt ? 'expanded' : 'collapsed'}`}>
                  <div className="hx-employee-nav-item" onClick={(e) => { e.stopPropagation(); toggleNavGroup('pointsMgmt'); }}>
                    <div className="hx-employee-nav-label">
                      <ClipboardList size={18} />
                      <span>改进管理</span>
                    </div>
                    {navGroups.pointsMgmt ? <ChevronDown size={16} className="chevron-icon" /> : <ChevronRight size={16} className="chevron-icon" />}
                  </div>
                  <div className="hx-employee-subnav">
                    <button type="button" className={`hx-employee-subnav-item ${currentPage === 'points-apply' ? 'active' : ''}`} onClick={() => handlePageChange('points-apply', 'pointsMgmt')}>
                      改进申请
                    </button>
                    <button type="button" className={`hx-employee-subnav-item ${currentPage === 'admin-pending' ? 'active' : ''}`} onClick={() => handlePageChange('admin-pending', 'pointsMgmt')}>
                      改进审核
                    </button>
                    <button type="button" className={`hx-employee-subnav-item ${currentPage === 'shop' ? 'active' : ''}`} onClick={() => handlePageChange('shop', 'quality')}>
                      即时奖申请
                    </button>
                    <button type="button" className={`hx-employee-subnav-item ${currentPage === 'admin-orders' ? 'active' : ''}`} onClick={() => handlePageChange('admin-orders', 'pointsMgmt')}>
                      即时奖台账
                    </button>
                  </div>
                </div>

                {/* 质量榜单 — 直达入口 */}
                <div
                  className={`hx-employee-nav-item${rankingActive ? ' active' : ''}`}
                  style={{minHeight:44,borderRadius:12,padding:'0 12px',cursor:'pointer',background:rankingActive ? '#007b7a1f' : undefined}}
                  onClick={() => handlePageChange('ranking-red', 'quality')}
                >
                  <div className="hx-employee-nav-label" style={{color:rankingActive ? '#007b7a' : undefined}}>
                    <Trophy size={16} />
                    <span>质量榜单</span>
                  </div>
                </div>

                {/* 我的洪小星 子分组 */}
                <div className={`hx-employee-nav-group ${mallActive ? 'active' : ''} ${navGroups.mall ? 'expanded' : 'collapsed'}`}>
                  <div className="hx-employee-nav-item" onClick={(e) => { e.stopPropagation(); toggleNavGroup('mall'); }}>
                    <div className="hx-employee-nav-label">
                      <Gift size={18} />
                      <span>荣誉账户</span>
                    </div>
                    {navGroups.mall ? <ChevronDown size={16} className="chevron-icon" /> : <ChevronRight size={16} className="chevron-icon" />}
                  </div>
                  <div className="hx-employee-subnav">
                    <button type="button" className={`hx-employee-subnav-item ${currentPage === 'points' ? 'active' : ''}`} onClick={() => handlePageChange('points', 'quality')}>
                      我的洪小星
                    </button>
                    <button type="button" className={`hx-employee-subnav-item ${currentPage === 'orders' ? 'active' : ''}`} onClick={() => handlePageChange('orders', 'quality')}>
                      我的即时奖
                    </button>
                  </div>
                </div>

                {/* 后台配置 子分组 */}
                <div className={`hx-employee-nav-group ${adminActive ? 'active' : ''} ${navGroups.admin ? 'expanded' : 'collapsed'}`}>
                  <div className="hx-employee-nav-item" onClick={(e) => { e.stopPropagation(); toggleNavGroup('admin'); }}>
                    <div className="hx-employee-nav-label">
                      <Settings2 size={18} />
                      <span>质量后台</span>
                    </div>
                    {navGroups.admin ? <ChevronDown size={16} className="chevron-icon" /> : <ChevronRight size={16} className="chevron-icon" />}
                  </div>
                  <div className="hx-employee-subnav">
                    <button type="button" className={`hx-employee-subnav-item ${currentPage === 'admin-redblack' ? 'active' : ''}`} onClick={() => handlePageChange('admin-redblack', 'admin')}>
                      质量问题
                    </button>
                    <button type="button" className={`hx-employee-subnav-item ${currentPage === 'admin-gifts' ? 'active' : ''}`} onClick={() => handlePageChange('admin-gifts', 'admin')}>
                      即时奖管理
                    </button>
                    <button type="button" className={`hx-employee-subnav-item ${currentPage === 'admin-users' ? 'active' : ''}`} onClick={() => handlePageChange('admin-users', 'admin')}>
                      洪小星调整
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </nav>
        </aside>

        <main className="hx-employee-main">
          {renderCurrentPage()}
        </main>
      </div>

      {showExchangeModal && selectedGift && (
        <div className="hx-suggestion-overlay" onClick={() => { setShowExchangeModal(false); setSelectedGift(null); }}>
          <div className="hx-suggestion-dialog" style={{ width: 720 }} onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="hx-sd-header">
              <div className="hx-sd-header-left">
                <div className="hx-sd-header-icon">
                  <Gift size={18} color="#007B7A" />
                </div>
                <span className="hx-sd-header-title">兑换商品</span>
              </div>
              <button type="button" className="hx-sd-close" onClick={() => { setShowExchangeModal(false); setSelectedGift(null); }}>
                <X size={18} />
              </button>
            </div>

            <div className="hx-sd-divider" />

            {/* Body */}
            <div className="hx-sd-body">
              {/* Gift info row */}
              <div className="hx-exchange-gift-row">
                <div className={`hx-employee-gift-visual ${selectedGift.color} modal`}>
                  <span>{getInitials(selectedGift.name)}</span>
                </div>
                <div className="hx-exchange-gift-info">
                  <h4>{selectedGift.name}</h4>
                  <p>{selectedGift.description}</p>
                  <span className="hx-exchange-unit-price">单价：{selectedGift.pointsCost} 洪小星 / 份</span>
                </div>
              </div>

              {/* 咖啡品类 — 必填 */}
              <div className="hx-sd-row">
                <div className="hx-sd-field" style={{ flex: 1 }}>
                  <label className="hx-sd-label">咖啡品类 <span style={{ color: '#ef4444' }}>*</span></label>
                  <select
                    className="hx-sd-input"
                    value={exchangeCoffeeCategory}
                    onChange={(e) => setExchangeCoffeeCategory(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, color: '#1e293b', background: '#fff', cursor: 'pointer' }}
                  >
                    <option value="">请选择品类</option>
                    {coffeeCategories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Form fields */}
              <div className="hx-sd-row">
                <div className="hx-sd-field">
                  <label className="hx-sd-label">兑换数量</label>
                  <div className="hx-exchange-qty">
                    <button
                      type="button"
                      className="hx-qty-btn"
                      onClick={() => setExchangeQty((q) => Math.max(1, q - 1))}
                      disabled={exchangeQty <= 1}
                    >−</button>
                    <span className="hx-qty-value">{exchangeQty}</span>
                    <button
                      type="button"
                      className="hx-qty-btn"
                      onClick={() => setExchangeQty((q) => q + 1)}
                    >+</button>
                  </div>
                </div>
                <div className="hx-sd-field">
                  <label className="hx-sd-label">领取日期</label>
                  <input
                    type="date"
                    className="hx-sd-input"
                    value={exchangeDate}
                    onChange={(e) => setExchangeDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="hx-sd-row">
                <div className="hx-sd-field">
                  <label className="hx-sd-label">时间段</label>
                  <div className="hx-exchange-period">
                    {['上午', '下午'].map((p) => (
                      <button
                        key={p}
                        type="button"
                        className={`hx-period-btn ${exchangePeriod === p ? 'active' : ''}`}
                        onClick={() => setExchangePeriod(p)}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="hx-sd-field" />
              </div>

              {/* Cost summary */}
              <div className="hx-exchange-cost-summary">
                <div className="hx-exchange-cost-row">
                  <span>本次消耗：</span>
                  <strong>{selectedGift.pointsCost * exchangeQty} 洪小星</strong>
                </div>
                <div className="hx-exchange-cost-row hx-exchange-balance">
                  <span>兑换后余额：</span>
                  <span>{userPoints - selectedGift.pointsCost * exchangeQty} 洪小星</span>
                </div>
              </div>
            </div>

            <div className="hx-sd-divider" />

            {/* Footer */}
            <div className="hx-sd-footer">
              <button
                onClick={confirmExchange}
                className="hx-sd-btn hx-sd-btn-submit"
                disabled={userPoints < selectedGift.pointsCost * exchangeQty || !exchangeCoffeeCategory}
              >
                确认兑换
              </button>
              <button
                onClick={() => { setShowExchangeModal(false); setSelectedGift(null); }}
                className="hx-sd-btn hx-sd-btn-cancel"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast 全局提示 */}
      {showToast && (
        <div style={{
          position: 'fixed',
          top: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 99999,
          background: 'linear-gradient(135deg, #059669, #047857)',
          color: '#fff',
          padding: '14px 28px',
          borderRadius: 12,
          fontSize: 14,
          fontWeight: 600,
          boxShadow: '0 12px 32px rgba(5,150,105,0.35), 0 4px 12px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          animation: 'hx-toast-in 0.3s ease-out',
        }}>
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}
      {showSuggestionModal && (
        <div className="hx-suggestion-overlay" onClick={handleCancelSuggestion}>
          <div className="hx-suggestion-dialog" onClick={(e) => e.stopPropagation()}>
            {/* ── Header ── */}
            <div className="hx-sd-header">
              <div className="hx-sd-header-left">
                <div className="hx-sd-header-icon">
                  <FileText size={18} color="#007B7A" />
                </div>
                <span className="hx-sd-header-title">提交质量改进建议</span>
              </div>
              <button type="button" className="hx-sd-close" onClick={handleCancelSuggestion}>
                <X size={18} />
              </button>
            </div>

            {/* ── Mode Switch ── */}
            <div className="hx-sd-mode-switch">
              <button
                type="button"
                className={`hx-sd-mode-btn ${suggestionMode === 'apply' ? 'active' : ''}`}
                onClick={() => setSuggestionMode('apply')}
              >
                积分申请
              </button>
              <button
                type="button"
                className={`hx-sd-mode-btn ${suggestionMode === 'recommend' ? 'active' : ''}`}
                onClick={() => setSuggestionMode('recommend')}
              >
                积分推荐
              </button>
            </div>

            {/* ── Divider ── */}
            <div className="hx-sd-divider" />

            {/* ── Body ── */}
            <div className="hx-sd-body">
              {/* Row 0: 相关人员 */}
              <div className="hx-sd-row hx-sd-row-full">
                <div className="hx-sd-field">
                  <label className="hx-sd-label">
                    相关人员 {suggestionMode === 'recommend' && <em>*</em>}
                  </label>
                  {suggestionMode === 'apply' ? (
                    <input
                      type="text"
                      value={displayName}
                      readOnly
                      disabled
                      className="hx-sd-input hx-sd-input-readonly"
                      placeholder="当前申报人"
                    />
                  ) : (
                    <>
                      <select
                        value={suggestionForm.relatedPerson}
                        onChange={handleSuggestionFormChange('relatedPerson')}
                        className={`hx-sd-input ${formErrors.relatedPerson ? 'hx-sd-err' : ''}`}
                      >
                        <option value="">请输入被推荐人的姓名</option>
                        {recommendUserOptions.map((u) => (
                          <option key={u.id} value={u.name}>
                            {u.name} ({u.empId})
                          </option>
                        ))}
                      </select>
                      {formErrors.relatedPerson && <span className="hx-sd-err-msg">{formErrors.relatedPerson}</span>}
                    </>
                  )}
                </div>
              </div>

              {/* Row 1: IPD阶段 + 改进方向类别 */}
              <div className="hx-sd-row">
                <div className="hx-sd-field">
                  <label className="hx-sd-label">
                    所属 IPD 阶段 <em>*</em>
                  </label>
                  <select
                    value={suggestionForm.ipdStage}
                    onChange={handleSuggestionFormChange('ipdStage')}
                    className={`hx-sd-input ${formErrors.ipdStage ? 'hx-sd-err' : ''}`}
                  >
                    <option value="">请选择</option>
                    {ipdStageOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                  {formErrors.ipdStage && <span className="hx-sd-err-msg">{formErrors.ipdStage}</span>}
                </div>
                <div className="hx-sd-field">
                  <label className="hx-sd-label">
                    改进方向类别 <em>*</em>
                    {suggestionForm.ipdStage && (
                      <span className="hx-sd-hint">已自动填充</span>
                    )}
                  </label>
                  <select
                    value={suggestionForm.improvementType}
                    onChange={handleSuggestionFormChange('improvementType')}
                    disabled={!!suggestionForm.ipdStage}
                    className={`hx-sd-input ${formErrors.improvementType ? 'hx-sd-err' : ''} ${suggestionForm.ipdStage ? 'hx-sd-ro' : ''}`}
                  >
                    <option value="">请选择</option>
                    {improvementTypeOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                  {formErrors.improvementType && <span className="hx-sd-err-msg">{formErrors.improvementType}</span>}
                </div>
              </div>

              {/* Row 2: 事由 */}
              <div className="hx-sd-row hx-sd-row-full">
                <div className="hx-sd-field">
                  <label className="hx-sd-label">
                    事由 <em>*</em>
                  </label>
                  <textarea
                    value={suggestionForm.reason}
                    onChange={handleSuggestionFormChange('reason')}
                    placeholder="请简述改进前/后对比、实施效果及价值预估..."
                    rows={5}
                    className={`hx-sd-textarea ${formErrors.reason ? 'hx-sd-err' : ''}`}
                  />
                  {formErrors.reason && <span className="hx-sd-err-msg">{formErrors.reason}</span>}
                </div>
              </div>

              {/* Row 3: 附件 */}
              <div className="hx-sd-row hx-sd-row-full">
                <div className="hx-sd-field">
                  <label className="hx-sd-label">
                    相关附件 <span className="hx-sd-optional">（选填）</span>
                  </label>
                  <div className="hx-sd-upload">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hx-sd-file-input"
                      accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                      id="sd-file-upload"
                    />
                    <label htmlFor="sd-file-upload" className="hx-sd-upload-btn">
                      <span className="hx-sd-upload-icon">📎</span>
                      <span>点击或拖拽文件到此处上传</span>
                      <span className="hx-sd-upload-hint">支持 JPG、PNG、PDF、DOC、DOCX</span>
                    </label>
                  </div>
                  {suggestionForm.files.length > 0 && (
                    <div className="hx-sd-files">
                      {suggestionForm.files.map((file, index) => (
                        <div key={index} className="hx-sd-file">
                          <span>📄</span>
                          <span className="hx-sd-file-name">{file.name}</span>
                          <span className="hx-sd-file-size">{(file.size / 1024).toFixed(1)} KB</span>
                          <button type="button" className="hx-sd-file-del" onClick={() => handleRemoveFile(index)}>✕</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── Divider ── */}
            <div className="hx-sd-divider" />

            {/* ── Footer ── */}
            <div className="hx-sd-footer">
              <button type="button" className="hx-sd-btn hx-sd-btn-cancel" onClick={handleCancelSuggestion}>
                取消
              </button>
              <button
                type="button"
                className="hx-sd-btn hx-sd-btn-submit"
                onClick={handleSubmitSuggestion}
                disabled={isSubmitting}
              >
                {isSubmitting ? '提交中...' : suggestionMode === 'apply' ? '提交申请' : '提交推荐'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Placeholder content styles
const placeholderStyles = `
.hx-placeholder-content {
  text-align: center;
  padding: 40px 20px;
  color: #6b7280;
}

.hx-placeholder-content h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #374151;
}

.hx-placeholder-content p {
  font-size: 14px;
}
`;

// Inject styles (in a real app, you'd use CSS modules or styled-components)
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = placeholderStyles;
  document.head.appendChild(style);
}

export default EmployeeGiftShop;
