import React from 'react';
import { motion } from 'framer-motion';
import { api } from './api';
import { Badge, ConfirmDialog, EmptyState, Toast } from './Components';

const Bookings = () => {
    const [list, setList] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [deleteId, setDeleteId] = React.useState<string | null>(null);
    const [filter, setFilter] = React.useState('ALL');
    const [toast, setToast] = React.useState({ show: false, message: '', type: 'success' as 'success' | 'error' | 'info' });

    const showToast = (msg: string, type: 'success' | 'error' | 'info') => { setToast({ show: true, message: msg, type }); setTimeout(() => setToast(t => ({ ...t, show: false })), 3000); };

    const load = () => {
        setLoading(true);
        api.getBookings()
            .then(data => { setList(Array.isArray(data) ? data : mockBookings); setLoading(false); })
            .catch(() => { setList(mockBookings); setLoading(false); });
    };

    React.useEffect(() => { load(); }, []);

    const updateStatus = async (id: string, status: string) => {
        try { await api.updateBookingStatus(id, status); showToast(`Booking ${status.toLowerCase()}`, 'success'); load(); }
        catch { showToast('Update failed', 'error'); }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        try { await api.deleteBooking(deleteId); showToast('Booking deleted', 'success'); setDeleteId(null); load(); }
        catch { showToast('Delete failed', 'error'); }
    };

    const statusColor = (s: string): 'blue' | 'green' | 'amber' | 'red' | 'gray' => {
        const map: Record<string, 'blue' | 'green' | 'amber' | 'red' | 'gray'> = { CONFIRMED: 'blue', COMPLETED: 'green', PENDING: 'amber', CANCELLED: 'red' };
        return map[s] || 'gray';
    };

    const filtered = filter === 'ALL' ? list : list.filter(b => b.status === filter);
    const counts: Record<string, number> = { ALL: list.length, PENDING: list.filter(b => b.status === 'PENDING').length, CONFIRMED: list.filter(b => b.status === 'CONFIRMED').length, COMPLETED: list.filter(b => b.status === 'COMPLETED').length, CANCELLED: list.filter(b => b.status === 'CANCELLED').length };

    if (loading) return <div className="flex justify-center py-24"><div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div></div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
                {['ALL', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map(s => (
                    <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold rounded-sm transition-all ${filter === s ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-700 text-gray-500 hover:border-primary'}`}>
                        {s === 'ALL' ? 'All' : s} <span className="opacity-60">({counts[s]})</span>
                    </button>
                ))}
            </div>

            <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 rounded-sm overflow-hidden">
                {filtered.length === 0 ? <EmptyState icon="event_available" title="No bookings" description="No bookings match this filter" /> : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-gray-800">
                                <tr>{['ID', 'Guest', 'Room', 'Check In', 'Check Out', 'Status', 'Actions'].map(h => <th key={h} className="px-6 py-3.5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">{h}</th>)}</tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                {filtered.map((item, idx) => (
                                    <motion.tr key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.03 }} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4 text-[10px] font-bold text-gray-400 font-mono">#{item.id?.slice(0, 8)}</td>
                                        <td className="px-6 py-4"><p className="text-xs font-bold text-secondary dark:text-white">{item.user?.name || item.guest || '—'}</p><p className="text-[10px] text-gray-400">{item.user?.email || ''}</p></td>
                                        <td className="px-6 py-4 text-xs text-gray-500">{item.room?.type || item.room || '—'}</td>
                                        <td className="px-6 py-4 text-xs text-gray-500">{item.checkIn ? new Date(item.checkIn).toLocaleDateString() : '—'}</td>
                                        <td className="px-6 py-4 text-xs text-gray-500">{item.checkOut ? new Date(item.checkOut).toLocaleDateString() : '—'}</td>
                                        <td className="px-6 py-4"><Badge text={item.status} color={statusColor(item.status)} /></td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-1">
                                                {item.status === 'PENDING' && <button onClick={() => updateStatus(item.id, 'CONFIRMED')} className="p-1.5 hover:text-blue-500 transition-colors" title="Confirm"><span className="material-icons-outlined text-sm">check</span></button>}
                                                {(item.status === 'CONFIRMED') && <button onClick={() => updateStatus(item.id, 'COMPLETED')} className="p-1.5 hover:text-green-500 transition-colors" title="Complete"><span className="material-icons-outlined text-sm">done_all</span></button>}
                                                {item.status !== 'CANCELLED' && item.status !== 'COMPLETED' && <button onClick={() => updateStatus(item.id, 'CANCELLED')} className="p-1.5 hover:text-amber-500 transition-colors" title="Cancel"><span className="material-icons-outlined text-sm">block</span></button>}
                                                <button onClick={() => setDeleteId(item.id)} className="p-1.5 hover:text-red-500 transition-colors" title="Delete"><span className="material-icons-outlined text-sm">delete</span></button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Booking" message="Are you sure? This action cannot be undone." />
            <Toast {...toast} />
        </div>
    );
};

const mockBookings = [
    { id: 'BK001abc', guest: 'John Smith', room: 'Pearl Suite', checkIn: '2026-03-15', checkOut: '2026-03-18', status: 'CONFIRMED', user: { name: 'John Smith', email: 'john@email.com' } },
    { id: 'BK002def', guest: 'Sarah Wilson', room: 'Grand Hall A', checkIn: '2026-03-20', checkOut: '2026-03-20', status: 'PENDING', user: { name: 'Sarah Wilson', email: 'sarah@email.com' } },
    { id: 'BK003ghi', guest: 'Robert Chen', room: 'Golden Horizon', checkIn: '2026-04-01', checkOut: '2026-04-05', status: 'COMPLETED', user: { name: 'Robert Chen', email: 'robert@email.com' } },
];

export default Bookings;
