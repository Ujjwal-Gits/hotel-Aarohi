import React from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Overview from './dashboard/Overview';
import Listings from './dashboard/Listings';
import Bookings from './dashboard/Bookings';
import GalleryDash from './dashboard/Gallery';
import Customers from './dashboard/Customers';
import Notifications from './dashboard/Notifications';
import RoomStatus from './dashboard/RoomStatus';
import { api } from './dashboard/api';

/* ─── DASHBOARD LAYOUT ─── */
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const [unreadCount, setUnreadCount] = React.useState(0);

    React.useEffect(() => {
        api.getUnreadCount().then(d => setUnreadCount(d.count || 0)).catch(() => setUnreadCount(3));
    }, [location.pathname]);

    const menuItems = [
        { name: 'Overview', path: '/dashboard', icon: 'dashboard' },
        { name: 'Listings', path: '/dashboard/listings', icon: 'hotel' },
        { name: 'Room Status', path: '/dashboard/room-status', icon: 'meeting_room' },
        { name: 'Bookings', path: '/dashboard/bookings', icon: 'event_available' },
        { name: 'Gallery', path: '/dashboard/gallery', icon: 'photo_library' },
        { name: 'Customers', path: '/dashboard/customers', icon: 'groups' },
        { name: 'Notifications', path: '/dashboard/notifications', icon: 'notifications', badge: unreadCount },
    ];

    const isActive = (path: string) => {
        if (path === '/dashboard') return location.pathname === path;
        return location.pathname.startsWith(path);
    };

    const currentPage = menuItems.find(i => isActive(i.path))?.name || 'Dashboard';

    return (
        <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#080808] flex font-sans">
            {/* Mobile Overlay */}
            {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

            {/* Sidebar */}
            <aside className={`w-64 bg-white dark:bg-[#0F0F0F] border-r border-gray-100 dark:border-gray-800 p-6 flex flex-col fixed h-full z-40 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                <div className="mb-10">
                    <Link to="/" className="font-serif text-2xl tracking-widest text-black dark:text-white font-bold uppercase">Aarohi</Link>
                    <p className="text-[10px] text-primary uppercase tracking-[0.3em] mt-1 font-bold">Admin Panel</p>
                </div>

                <nav className="flex-1 space-y-1">
                    {menuItems.map((item) => (
                        <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-all duration-200 relative ${isActive(item.path)
                                ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg shadow-black/10'
                                : 'text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                                }`}>
                            <span className="material-icons-outlined text-xl">{item.icon}</span>
                            <span className="text-xs uppercase tracking-widest font-bold">{item.name}</span>
                            {item.badge !== undefined && item.badge > 0 && (
                                <span className="absolute right-3 bg-red-500 text-white text-[8px] font-bold h-5 min-w-[20px] flex items-center justify-center rounded-full px-1">{item.badge}</span>
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
                    <button onClick={() => navigate('/')} className="flex items-center gap-3 px-4 py-3 rounded-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors w-full">
                        <span className="material-icons-outlined text-xl">logout</span>
                        <span className="text-xs uppercase tracking-widest font-bold">Back to Site</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64 min-h-screen">
                {/* Top Header */}
                <header className="sticky top-0 z-20 bg-white/80 dark:bg-[#080808]/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-6 lg:px-10 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-gray-500 hover:text-black dark:hover:text-white"><span className="material-icons-outlined">menu</span></button>
                            <div>
                                <h1 className="font-serif text-xl lg:text-2xl text-secondary dark:text-white uppercase tracking-tight">{currentPage}</h1>
                                <p className="text-gray-400 text-[9px] uppercase tracking-widest hidden sm:block">Management Console</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link to="/dashboard/notifications" className="relative p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-sm transition-colors">
                                <span className="material-icons-outlined text-gray-400">notifications</span>
                                {unreadCount > 0 && <span className="absolute top-1 right-1 bg-red-500 h-2 w-2 rounded-full"></span>}
                            </Link>
                            <div className="h-9 w-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                                <span className="material-icons-outlined text-primary text-lg">person</span>
                            </div>
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-bold text-secondary dark:text-white">Admin</p>
                                <p className="text-[9px] text-gray-400 uppercase tracking-widest">Administrator</p>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-6 lg:p-10">
                    <motion.div key={location.pathname} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                        {children}
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

/* ─── MAIN DASHBOARD COMPONENT ─── */
const Dashboard = () => {
    return (
        <DashboardLayout>
            <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/listings" element={<Listings />} />
                <Route path="/room-status" element={<RoomStatus />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/gallery" element={<GalleryDash />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/notifications" element={<Notifications />} />
            </Routes>
        </DashboardLayout>
    );
};

export default Dashboard;
