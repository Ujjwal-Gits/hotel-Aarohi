import React from 'react';
import { motion } from 'framer-motion';
import { api } from './api';
import { Badge, Toast } from './Components';

const API_BASE = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || '';

const RoomStatus = () => {
    const [rooms, setRooms] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [filter, setFilter] = React.useState('ALL');
    const [toast, setToast] = React.useState({ show: false, message: '', type: 'success' as 'success' | 'error' | 'info' });

    const showToast = (msg: string, type: 'success' | 'error' | 'info') => {
        setToast({ show: true, message: msg, type });
        setTimeout(() => setToast(t => ({ ...t, show: false })), 3000);
    };

    const load = () => {
        setLoading(true);
        api.getListings()
            .then(data => { setRooms(Array.isArray(data) ? data : mockRooms); setLoading(false); })
            .catch(() => { setRooms(mockRooms); setLoading(false); });
    };

    React.useEffect(() => { load(); }, []);

    const changeStatus = async (id: string, newStatus: string) => {
        try {
            await api.updateRoomStatus(id, newStatus);
            showToast(`Room status updated to ${newStatus}`, 'success');
            load();
        } catch { showToast('Failed to update status', 'error'); }
    };

    const filtered = filter === 'ALL' ? rooms : rooms.filter(r => r.roomStatus === filter);

    const statusConfig: Record<string, { color: string; bg: string; border: string; icon: string }> = {
        AVAILABLE: { color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-300 dark:border-emerald-500/30', icon: 'check_circle' },
        BOOKED: { color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-300 dark:border-red-500/30', icon: 'event_busy' },
        RESERVED: { color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-300 dark:border-amber-500/30', icon: 'schedule' },
    };

    const counts = { ALL: rooms.length, AVAILABLE: rooms.filter(r => r.roomStatus === 'AVAILABLE').length, BOOKED: rooms.filter(r => r.roomStatus === 'BOOKED').length, RESERVED: rooms.filter(r => r.roomStatus === 'RESERVED').length };

    if (loading) return <div className="flex justify-center py-24"><div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div></div>;

    return (
        <div className="space-y-6">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
                {(['ALL', 'AVAILABLE', 'BOOKED', 'RESERVED'] as const).map(s => (
                    <button key={s} onClick={() => setFilter(s)} className={`px-5 py-2.5 text-[10px] uppercase tracking-widest font-bold rounded-sm transition-all flex items-center gap-2 ${filter === s ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg' : 'bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-700 text-gray-500 hover:border-primary hover:text-primary'}`}>
                        {s === 'ALL' ? 'All Rooms' : s} <span className="text-[9px] opacity-60">({counts[s]})</span>
                    </button>
                ))}
            </div>

            {/* Room Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((room, idx) => {
                    const cfg = statusConfig[room.roomStatus] || statusConfig.AVAILABLE;
                    return (
                        <motion.div key={room.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }} className={`bg-white dark:bg-[#111] border ${cfg.border} rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all group`}>
                            {/* Image */}
                            <div className="h-36 relative overflow-hidden bg-gray-100 dark:bg-white/5">
                                {room.imageUrl ? (
                                    <img src={room.imageUrl.startsWith('/') ? `${API_BASE}${room.imageUrl}` : room.imageUrl} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center"><span className="material-icons-outlined text-gray-200 dark:text-gray-700 text-4xl">bed</span></div>
                                )}
                                <div className="absolute top-2 right-2"><Badge text={room.roomStatus} color={room.roomStatus === 'AVAILABLE' ? 'green' : room.roomStatus === 'BOOKED' ? 'red' : 'amber'} /></div>
                            </div>

                            {/* Info */}
                            <div className="p-4">
                                <h4 className="font-serif text-base text-secondary dark:text-white mb-1">{room.name}</h4>
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">{room.type} · {room.capacity} guests</p>
                                {room.specialFeatures && <p className="text-[10px] text-gray-400 mb-3 truncate">{room.specialFeatures}</p>}
                                <p className="text-sm font-serif font-bold text-secondary dark:text-white mb-3">NPR {room.price?.toLocaleString()}</p>

                                {/* Status Actions */}
                                <div className="flex gap-1.5">
                                    {['AVAILABLE', 'BOOKED', 'RESERVED'].map(s => (
                                        <button key={s} onClick={() => changeStatus(room.id, s)} disabled={room.roomStatus === s} className={`flex-1 py-2 text-[8px] uppercase tracking-widest font-bold rounded-sm transition-all ${room.roomStatus === s ? `${statusConfig[s].bg} ${statusConfig[s].color}` : 'bg-gray-50 dark:bg-white/5 text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10'}`}>
                                            {s === 'AVAILABLE' ? 'Avail' : s === 'BOOKED' ? 'Book' : 'Rsrv'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {filtered.length === 0 && <div className="text-center py-16"><span className="material-icons-outlined text-4xl text-gray-200 dark:text-gray-700 mb-3 block">meeting_room</span><p className="text-sm text-gray-400">No rooms found with this filter</p></div>}
            <Toast {...toast} />
        </div>
    );
};

const mockRooms = [
    { id: '1', name: 'Pearl Suite', type: 'Suite', price: 4500, capacity: 2, specialFeatures: 'AC, WiFi, View', roomStatus: 'AVAILABLE', imageUrl: '' },
    { id: '2', name: 'Golden Horizon', type: 'Deluxe', price: 5500, capacity: 3, specialFeatures: 'AC, WiFi, Balcony', roomStatus: 'BOOKED', imageUrl: '' },
    { id: '3', name: 'Royal Glass', type: 'Suite', price: 8500, capacity: 2, specialFeatures: 'AC, Spa, View', roomStatus: 'RESERVED', imageUrl: '' },
    { id: '4', name: 'Standard Room 1', type: 'Standard', price: 2500, capacity: 2, specialFeatures: 'WiFi, Fan', roomStatus: 'AVAILABLE', imageUrl: '' },
    { id: '5', name: 'Family Room A', type: 'Family', price: 6000, capacity: 5, specialFeatures: 'AC, WiFi, Extra Beds', roomStatus: 'AVAILABLE', imageUrl: '' },
];

export default RoomStatus;
