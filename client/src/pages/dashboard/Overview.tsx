import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { api } from './api';

const Overview = () => {
    const [stats, setStats] = React.useState<any>({ bookings: 0, rooms: 0, gallery: 0, customers: 0, revenue: 0, roomStatus: { available: 0, booked: 0, reserved: 0 }, unreadNotifications: 0, recentActivity: [] });
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        api.getStats()
            .then(data => { setStats(data); setLoading(false); })
            .catch(() => {
                setStats({
                    bookings: 128, rooms: 25, gallery: 54, customers: 340, revenue: 45200, roomStatus: { available: 15, booked: 7, reserved: 3 }, unreadNotifications: 5, recentActivity: [
                        { id: '1', message: 'New booking for Pearl Suite', type: 'success', time: '2h ago' },
                        { id: '2', message: 'Gallery updated by Admin', type: 'info', time: '4h ago' },
                        { id: '3', message: 'Room status changed to Booked', type: 'warning', time: '5h ago' },
                    ]
                });
                setLoading(false);
            });
    }, []);

    const statCards = [
        { label: 'Total Bookings', value: stats.bookings, icon: 'calendar_today', color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { label: 'Total Rooms', value: stats.rooms, icon: 'bed', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        { label: 'Total Revenue', value: `NPR ${(stats.revenue || 0).toLocaleString()}`, icon: 'payments', color: 'text-amber-500', bg: 'bg-amber-500/10' },
        { label: 'Customers', value: stats.customers, icon: 'groups', color: 'text-purple-500', bg: 'bg-purple-500/10' },
    ];

    const roomStatusCards = [
        { label: 'Available', value: stats.roomStatus?.available || 0, icon: 'check_circle', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-200 dark:border-emerald-500/20' },
        { label: 'Booked', value: stats.roomStatus?.booked || 0, icon: 'event_busy', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-200 dark:border-red-500/20' },
        { label: 'Reserved', value: stats.roomStatus?.reserved || 0, icon: 'schedule', color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-200 dark:border-amber-500/20' },
    ];

    if (loading) return <div className="flex items-center justify-center py-24"><div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div></div>;

    return (
        <div className="space-y-10">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {statCards.map((stat, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 p-5 rounded-sm shadow-sm hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-3">
                            <div className={`p-2.5 rounded-sm ${stat.bg}`}><span className={`material-icons-outlined ${stat.color} text-xl`}>{stat.icon}</span></div>
                        </div>
                        <h3 className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">{stat.label}</h3>
                        <p className="font-serif text-2xl text-secondary dark:text-white mt-1">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Room Status Overview */}
            <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 p-6 rounded-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-serif text-lg uppercase tracking-wider text-secondary dark:text-white">Room Availability</h3>
                    <Link to="/dashboard/room-status" className="text-[10px] text-primary font-bold uppercase tracking-widest hover:underline">Manage →</Link>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {roomStatusCards.map((card, i) => (
                        <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.1 }} className={`border ${card.border} rounded-sm p-5 text-center`}>
                            <div className={`inline-flex p-3 rounded-full ${card.bg} mb-3`}><span className={`material-icons-outlined ${card.color} text-2xl`}>{card.icon}</span></div>
                            <p className="font-serif text-3xl text-secondary dark:text-white">{card.value}</p>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mt-1">{card.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 p-6 rounded-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-serif text-lg uppercase tracking-wider">Recent Activity</h3>
                        <Link to="/dashboard/notifications" className="text-[10px] text-primary font-bold uppercase tracking-widest hover:underline">View All</Link>
                    </div>
                    <div className="space-y-4">
                        {(stats.recentActivity || []).slice(0, 5).map((item: any) => (
                            <div key={item.id} className="flex gap-3 items-center pb-4 border-b border-gray-50 dark:border-gray-800 last:border-0 last:pb-0">
                                <div className={`h-9 w-9 flex items-center justify-center rounded-sm ${item.type === 'success' ? 'bg-emerald-500/10' : item.type === 'error' ? 'bg-red-500/10' : item.type === 'warning' ? 'bg-amber-500/10' : 'bg-blue-500/10'}`}>
                                    <span className={`material-icons-outlined text-sm ${item.type === 'success' ? 'text-emerald-500' : item.type === 'error' ? 'text-red-500' : item.type === 'warning' ? 'text-amber-500' : 'text-blue-500'}`}>circle_notifications</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold text-secondary dark:text-white truncate">{item.message}</p>
                                    <p className="text-[10px] text-gray-400 mt-0.5">{item.time}</p>
                                </div>
                            </div>
                        ))}
                        {(!stats.recentActivity || stats.recentActivity.length === 0) && <p className="text-xs text-gray-400 text-center py-8">No recent activity</p>}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 p-6 rounded-sm">
                    <h3 className="font-serif text-lg mb-6 uppercase tracking-wider">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { icon: 'add_circle_outline', label: 'New Listing', path: '/dashboard/listings' },
                            { icon: 'add_photo_alternate', label: 'Add Photo', path: '/dashboard/gallery' },
                            { icon: 'person_add', label: 'Add Customer', path: '/dashboard/customers' },
                            { icon: 'meeting_room', label: 'Room Status', path: '/dashboard/room-status' },
                        ].map(action => (
                            <Link key={action.label} to={action.path} className="flex flex-col items-center justify-center p-5 border border-dashed border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-primary/5 transition-all group rounded-sm">
                                <span className="material-icons-outlined text-gray-300 group-hover:text-primary mb-2 text-2xl">{action.icon}</span>
                                <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500 group-hover:text-primary">{action.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
