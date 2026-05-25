import React, { useMemo, useState } from 'react';
import {
  Bell,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  Gift,
  LockKeyhole,
  Medal,
  MessageCircle,
  Settings2,
  ShoppingBag,
  Star,
  UserRound,
  Wrench,
  ClipboardList,
  Home,
  FileText,
  LayoutDashboard,
} from 'lucide-react';

const brandColor = '#007B7A';
const avatarUrl = 'https://i.pravatar.cc/120?img=12';

const rankingData = [
  { id: 1, name: 'Alaya****', points: '61.38万颗', avatar: 'https://i.pravatar.cc/100?img=15' },
  { id: 2, name: '沙拉**', points: '60.89万颗', avatar: 'https://i.pravatar.cc/100?img=14' },
  { id: 3, name: 'leoxi*****', points: '58.82万颗', avatar: 'https://i.pravatar.cc/100?img=49' },
];

const giftsSeed = [
  {
    id: 1,
    name: '星巴克咖啡券',
    description: '全国门店通用，适合午后补给与团队下午茶兑换。',
    pointsCost: 300,
    stock: 50,
    category: '餐饮',
    rating: 4.8,
    color: 'coffee',
  },
  {
    id: 2,
    name: '京东购物卡',
    description: '价值100元的京东购物卡，满足日常购物需求。',
    pointsCost: 1000,
    stock: 20,
    category: '购物',
    rating: 4.9,
    color: 'shopping',
  },
  {
    id: 3,
    name: '电影票兑换券',
    description: '热门影院通用，享受高品质观影体验。',
    pointsCost: 200,
    stock: 30,
    category: '娱乐',
    rating: 4.7,
    color: 'entertainment',
  },
];

const categories = [
  { id: 'all', name: '全部', count: 12 },
  { id: 'dining', name: '餐饮', count: 4 },
  { id: 'shopping', name: '购物', count: 3 },
  { id: 'entertainment', name: '娱乐', count: 3 },
  { id: 'life', name: '生活', count: 2 },
];

const pointsTabs = ['我的洪小星', '洪小星收支明细', '兑换记录'];

const recentActivity = [
  { id: 1, type: '签到奖励', time: '2026-04-16 08:30:12', value: '+5' },
  { id: 2, type: '任务完成', time: '2026-04-15 14:22:08', value: '+50' },
  { id: 3, type: '团队协作', time: '2026-04-14 16:45:33', value: '+20' },
];

const toolItems = [
  { id: 'points', label: '洪小星明细' },
  { id: 'orders', label: '我的订单' },
  { id: 'service', label: '联系客服' },
];

const EmployeeGiftShop = ({ user, onLogout }) => {
  const [currentPage, setCurrentPage] = useState('shop');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [selectedGift, setSelectedGift] = useState(null);
  const [userPoints] = useState(1200);
  const [navGroups, setNavGroups] = useState({
    quality: false,
    mall: true,
    settings: false,
  });

  const displayName = user?.name || '我是迷人的疯子';

  const filteredGifts = useMemo(() => {
    if (selectedCategory === 'all') return giftsSeed;
    return giftsSeed.filter(gift => gift.category === selectedCategory);
  }, [selectedCategory]);

  const handleExchange = (gift) => {
    if (userPoints < gift.pointsCost) {
      alert('洪小星不足，无法兑换此礼品！');
      return;
    }
    setSelectedGift(gift);
    setShowExchangeModal(true);
  };

  const confirmExchange = () => {
    alert(`成功兑换 ${selectedGift.name}！消耗 ${selectedGift.pointsCost} 洪小星`);
    setShowExchangeModal(false);
    setSelectedGift(null);
  };

  const toggleNavGroup = (group) => {
    setNavGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  const handlePageChange = (page, group) => {
    setCurrentPage(page);
    if (group) {
      setNavGroups(prev => ({
        ...prev,
        [group]: true
      }));
    }
  };

  const renderShopPage = () => (
    <>
      <section className="mb-8">
        {/* Cinematic Notification Banner */}
        <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 mb-8 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-400/30 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-cyan-400/30 to-transparent rounded-full translate-y-24 -translate-x-24"></div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-xl">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-2xl mb-2">激励不过夜，荣誉即感知</h3>
                <p className="text-slate-300 text-lg">本月已累计发放 <span className="font-bold text-emerald-400 text-2xl">5,280 颗洪小星</span></p>
              </div>
            </div>
            <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-lg rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              查看规则 →
            </button>
          </div>
        </div>

        {/* Hero Asset Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
          {/* Main Asset Card */}
          <div className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 rounded-3xl p-10 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"></div>
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-24 translate-x-24"></div>
            <div className="absolute bottom-0 left-0 w-36 h-36 bg-white/5 rounded-full translate-y-18 -translate-x-18"></div>

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-10">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <img src={avatarUrl} alt={displayName} className="w-20 h-20 rounded-3xl object-cover border-4 border-white/30 shadow-2xl" />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-3xl mb-2">{displayName}</h2>
                    <span className="text-emerald-100 text-lg font-medium bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">通用用户</span>
                  </div>
                </div>
                <button className="text-white/80 hover:text-white transition-all p-3 hover:bg-white/20 rounded-2xl backdrop-blur-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>

              <div className="mb-10">
                <div className="text-emerald-100/90 text-lg font-medium mb-3">当前可用洪小星</div>
                <div className="text-white text-7xl font-black mb-2 leading-none">{userPoints.toLocaleString()}</div>
                <div className="text-emerald-100/80 text-xl">洪小星余额</div>
              </div>

              <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/95 text-lg font-medium">洪小星有效期默认180天</p>
                    <p className="text-white/70 text-base mt-1">快去兑换心仪权益吧</p>
                  </div>
                  <button onClick={() => setCurrentPage('points')} className="px-6 py-3 bg-white/25 hover:bg-white/35 text-white font-bold text-lg rounded-2xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/30">
                    洪小星明细
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Ranking Card */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-full -translate-y-16 translate-x-16"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-slate-800 font-black text-2xl">🏆 成长排行榜</h3>
                <button className="text-slate-400 hover:text-slate-600 transition-all font-medium text-lg hover:bg-slate-50 px-4 py-2 rounded-xl">更多排名 →</button>
              </div>

              <div className="flex space-x-2 mb-8 bg-slate-50 rounded-2xl p-2">
                <button className="flex-1 py-3 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg rounded-xl shadow-lg">洪小星总榜</button>
                <button className="flex-1 py-3 px-6 text-slate-600 hover:bg-white hover:shadow-md font-bold text-lg rounded-xl transition-all">洪小星月榜</button>
              </div>

              <div className="space-y-4 mb-8">
                {rankingData.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 rounded-2xl transition-all group cursor-pointer">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black shadow-lg ${
                      item.id === 1 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' :
                      item.id === 2 ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-white' :
                      item.id === 3 ? 'bg-gradient-to-br from-orange-400 to-red-500 text-white' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {item.id}
                    </div>
                    <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-md" />
                    <div className="flex-1">
                      <div className="text-slate-800 font-bold text-lg">{item.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-emerald-600 font-black text-xl">{item.points}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-slate-100 pt-6">
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-200 shadow-md">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-lg font-black text-white shadow-lg">100+</div>
                  <img src={avatarUrl} alt={displayName} className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-md" />
                  <div className="flex-1">
                    <div className="text-slate-800 font-bold text-lg">我的当前排名</div>
                  </div>
                  <div className="text-right">
                    <div className="text-emerald-600 font-black text-xl">0 颗</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gift Exchange Section */}
      <section className="bg-white rounded-3xl p-10 shadow-2xl border border-slate-100">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center space-x-4">
            <div className="w-2 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
            <h3 className="text-slate-800 font-black text-3xl">积分兑换</h3>
            <span className="text-slate-500 text-lg bg-slate-100 px-4 py-2 rounded-full">礼品每周10:00上新</span>
          </div>
          <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-bold text-lg rounded-2xl shadow-lg transition-all duration-300 hover:scale-105">
            <Bell size={20} />
            <span>提醒我</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-2xl font-bold text-lg transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg scale-105'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:scale-105'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGifts.map((gift) => (
            <div key={gift.id} className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 hover:border-emerald-200 hover:scale-105">
              <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10"></div>
                <Gift size={64} className="text-slate-400 group-hover:text-emerald-500 transition-colors duration-500" />
              </div>
              <div className="p-8">
                <h4 className="font-bold text-xl text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors">{gift.name}</h4>
                <p className="text-slate-600 text-lg mb-6 leading-relaxed">{gift.description}</p>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <Star size={18} className="text-amber-400 fill-current" />
                    <span className="text-slate-600 text-lg font-medium">{gift.rating}</span>
                  </div>
                  <span className="text-emerald-600 font-bold text-lg bg-emerald-50 px-3 py-1 rounded-full">库存: {gift.stock}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-emerald-600">{gift.pointsCost} 洪小星</span>
                  <button
                    onClick={() => handleExchange(gift)}
                    className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-lg rounded-2xl shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    立即兑换
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-80 bg-white/80 backdrop-blur-xl border-r border-slate-200/60 min-h-screen sticky top-0">
          <div className="p-8">
            <div className="flex items-center space-x-4 mb-12">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-xl">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-slate-800 font-black text-2xl">洪兴门户</h1>
                <p className="text-slate-500 text-sm font-medium">激励商城</p>
              </div>
            </div>

            <nav className="space-y-3">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-1 border border-emerald-100">
                <div className="flex items-center space-x-4 px-4 py-3 text-emerald-700 font-bold text-lg">
                  <Gift size={20} />
                  <span>激励商城</span>
                </div>
              </div>
            </nav>

            <div className="mt-12 pt-8 border-t border-slate-200">
              <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl">
                <img src={avatarUrl} alt={displayName} className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1">
                  <div className="text-slate-800 font-bold text-lg">{displayName}</div>
                  <div className="text-slate-500 text-sm">通用用户</div>
                </div>
                <button onClick={onLogout} className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-white rounded-xl">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-12">
          {renderShopPage()}
        </main>
      </div>

      {/* Exchange Modal */}
      {showExchangeModal && selectedGift && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-10 max-w-md w-full shadow-2xl">
            <h3 className="text-slate-800 font-black text-2xl mb-6">确认兑换</h3>
            <div className="mb-8">
              <p className="text-slate-600 text-lg mb-4">您即将兑换：</p>
              <div className="bg-slate-50 rounded-2xl p-6">
                <h4 className="font-bold text-xl text-slate-800 mb-2">{selectedGift.name}</h4>
                <p className="text-slate-600 text-lg mb-4">{selectedGift.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-600 font-black text-2xl">{selectedGift.pointsCost} 洪小星</span>
                  <span className="text-slate-500 text-lg">库存: {selectedGift.stock}</span>
                </div>
              </div>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-between text-lg">
                <span className="text-slate-600">当前洪小星:</span>
                <strong className="text-slate-800 font-bold">{userPoints} 洪小星</strong>
              </div>
              <div className="flex items-center justify-between text-lg mt-2">
                <span className="text-slate-600">兑换后余额:</span>
                <strong className="text-emerald-600 font-bold">{userPoints - selectedGift.pointsCost} 洪小星</strong>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowExchangeModal(false)}
                className="flex-1 px-6 py-4 border-2 border-slate-200 text-slate-600 font-bold text-lg rounded-2xl hover:bg-slate-50 transition-all"
              >
                取消
              </button>
              <button
                onClick={confirmExchange}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-lg rounded-2xl shadow-lg transition-all duration-300 hover:scale-105"
              >
                确认兑换
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeGiftShopPremium;