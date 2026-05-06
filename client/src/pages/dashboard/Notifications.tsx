import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { api } from './api';
import { Toast } from './Components';

const Notifications = () => {
    const [notifications, setNotifications] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [filter, setFilter] = React.useState<'all' | 'unread' | 'read'>('all');
    const [toast, setToast] = React.useState({ show: false, message: '', type: 'success' as 'success' | 'error' | 'info' });
    const navigate = useNavigate();

    const showToast = (msg: string, type: 'success' | 'error' | 'info') => { setToast({ show: true, message: msg, type }); setTimeout(() => setToast(t => ({ ...t, show: false })), 3000); };

    const load = () => {
        setLoading(true);
        api.getNotifications()
            .then(data => { setNotifications(Array.isArray(data) ? data : mockNotifications); setLoading(false); })
            .catch(() => { setNotifications(mockNotifications); setLoading(false); });
    };

    React.useEffect(() => { load(); }, []);

    const handleClick = async (n: any) => {
        if (!n.read) {
            try { await api.markNotificationRead(n.id); } catch { }
        }
        // Navigate to the relevant section
        const routes: Record<string, string> = { room: '/dashboard/listings', booking: '/dashboard/bookings', gallery: '/dashboard/gallery', customer: '/dashboard/customers' };
        if (n.entityType && routes[n.entityType]) navigate(routes[n.entityType]);
    };

    const handleMarkAllRead = async () => {
        try { await api.markAllRead(); showToast('All marked as read', 'success'); load(); }
        catch { showToast('Failed', 'error'); }
    };

    const handleClearAll = async () => {
        try { await api.clearAllNotifications(); showToast('All notifications cleared', 'success'); setNotifications([]); }
        catch { showToast('Failed', 'error'); }
    };

    const typeConfig: Record<string, { icon: string; color: string; bg: string }> = {
        success: { icon: 'check_circle', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        error: { icon: 'error', color: 'text-red-500', bg: 'bg-red-500/10' },
        warning: { icon: 'warning', color: 'text-amber-500', bg: 'bg-amber-500/10' },
        info: { icon: 'info', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    };

    const entityIcons: Record<string, string> = { room: 'bed', booking: 'calendar_today', gallery: 'photo_library', customer: 'person' };

    const filtered = filter === 'all' ? notifications : filter === 'unread' ? notifications.filter(n => !n.read) : notifications.filter(n => n.read);

    const unreadCount = notifications.filter(n => !n.read).length;

    if (loading) return <div className="flex justify-center py-24"><div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div></div>;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex gap-2">
                    {(['all', 'unread', 'read'] as const).map(f => (
                        <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold rounded-sm transition-all ${filter === f ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-700 text-gray-500 hover:border-primary'}`}>
                            {f} {f === 'unread' && unreadCount > 0 && <span className="ml-1 bg-red-500 text-white px-1.5 py-0.5 rounded-full text-[8px]">{unreadCount}</span>}
                        </button>
                    ))}
                </div>
                <div className="flex gap-2">
                    <button onClick={handleMarkAllRead} className="px-4 py-2 text-[10px] uppercase tracking-widest font-bold border border-gray-200 dark:border-gray-700 hover:border-primary hover:text-primary transition-all rounded-sm">Mark All Read</button>
                    <button onClick={handleClearAll} className="px-4 py-2 text-[10px] uppercase tracking-widest font-bold border border-red-200 dark:border-red-500/20 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all rounded-sm">Clear All</button>
                </div>
            </div>

            {/* Notifications List */}
            <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 rounded-sm overflow-hidden divide-y divide-gray-50 dark:divide-gray-800">
                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16"><span className="material-icons-outlined text-5xl text-gray-200 dark:text-gray-700 mb-4">notifications_off</span><p className="text-sm text-gray-400">No notifications</p></div>
                ) : filtered.map((n, idx) => {
                    const cfg = typeConfig[n.type] || typeConfig.info;
                    return (
                        <motion.div key={n.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.03 }} onClick={() => handleClick(n)} className={`flex items-center gap-4 px-6 py-4 cursor-pointer transition-all hover:bg-gray-50/50 dark:hover:bg-white/[0.02] ${!n.read ? 'bg-primary/[0.03] border-l-2 border-l-primary' : ''}`}>
                            <div className={`h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-sm ${cfg.bg}`}>
                                <span className={`material-icons-outlined ${cfg.color}`}>{cfg.icon}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <p className={`text-xs ${!n.read ? 'font-bold' : 'font-medium'} text-secondary dark:text-white truncate`}>{n.message}</p>
                                    {!n.read && <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0"></div>}
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    {n.entityType && <span className="flex items-center gap-1 text-[9px] text-gray-400 uppercase tracking-widest"><span className="material-icons-outlined text-[10px]">{entityIcons[n.entityType] || 'label'}</span>{n.entityType}</span>}
                                    <span className="text-[9px] text-gray-300">•</span>
                                    <span className="text-[9px] text-gray-400">{formatTime(n.createdAt)}</span>
                                </div>
                            </div>
                            <span className="material-icons-outlined text-gray-300 text-lg flex-shrink-0">chevron_right</span>
                        </motion.div>
                    );
                })}
            </div>
            <Toast {...toast} />
        </div>
    );
};

function formatTime(dateStr: string) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(diff / 3600000);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(diff / 86400000);
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString();
}

const mockNotifications = [
    { id: '1', message: 'New booking for Pearl Suite — BK-2345', type: 'success', entityType: 'booking', entityId: '1', read: false, createdAt: new Date(Date.now() - 7200000).toISOString() },
    { id: '2', message: 'Room "Golden Horizon" status changed to Booked', type: 'warning', entityType: 'room', entityId: '2', read: false, createdAt: new Date(Date.now() - 14400000).toISOString() },
    { id: '3', message: 'Gallery image "Lobby View" has been added', type: 'info', entityType: 'gallery', entityId: '3', read: true, createdAt: new Date(Date.now() - 18000000).toISOString() },
    { id: '4', message: 'Customer "Sarah Wilson" profile updated', type: 'info', entityType: 'customer', entityId: '4', read: true, createdAt: new Date(Date.now() - 86400000).toISOString() },
    { id: '5', message: 'Room "Royal Glass" has been deleted', type: 'error', entityType: 'room', entityId: '5', read: true, createdAt: new Date(Date.now() - 172800000).toISOString() },
];

export default Notifications;
