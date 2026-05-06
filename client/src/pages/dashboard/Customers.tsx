import React from 'react';
import { motion } from 'framer-motion';
import { api } from './api';
import { Modal, Input, TextArea, ConfirmDialog, EmptyState, Toast } from './Components';

const defaultForm = { name: '', email: '', phone: '', address: '', notes: '' };

const Customers = () => {
    const [list, setList] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [editing, setEditing] = React.useState<any>(null);
    const [form, setForm] = React.useState(defaultForm);
    const [deleteId, setDeleteId] = React.useState<string | null>(null);
    const [search, setSearch] = React.useState('');
    const [toast, setToast] = React.useState({ show: false, message: '', type: 'success' as 'success' | 'error' | 'info' });

    const showToast = (msg: string, type: 'success' | 'error' | 'info') => { setToast({ show: true, message: msg, type }); setTimeout(() => setToast(t => ({ ...t, show: false })), 3000); };

    const load = () => {
        setLoading(true);
        api.getCustomers(search || undefined)
            .then(data => { setList(Array.isArray(data) ? data : mockCustomers); setLoading(false); })
            .catch(() => { setList(mockCustomers); setLoading(false); });
    };

    React.useEffect(() => { load(); }, []);

    const openCreate = () => { setEditing(null); setForm(defaultForm); setModalOpen(true); };
    const openEdit = (c: any) => { setEditing(c); setForm({ name: c.name || '', email: c.email || '', phone: c.phone || '', address: c.address || '', notes: c.notes || '' }); setModalOpen(true); };

    const handleSave = async () => {
        if (!form.name || !form.email) { showToast('Name & email are required', 'error'); return; }
        try {
            if (editing) { const res = await api.updateCustomer(editing.id, form); if (res.error) { showToast(res.error, 'error'); return; } showToast('Customer updated', 'success'); }
            else { const res = await api.createCustomer(form); if (res.error) { showToast(res.error, 'error'); return; } showToast('Customer created', 'success'); }
            setModalOpen(false); load();
        } catch { showToast('Operation failed', 'error'); }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        try { await api.deleteCustomer(deleteId); showToast('Customer deleted', 'success'); setDeleteId(null); load(); }
        catch { showToast('Delete failed', 'error'); }
    };

    const handleSearch = () => { load(); };

    const filtered = list.filter(c => c.name?.toLowerCase().includes(search.toLowerCase()) || c.email?.toLowerCase().includes(search.toLowerCase()) || c.phone?.includes(search));

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 rounded-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="relative flex-1 max-w-xs">
                        <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-lg">search</span>
                        <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} placeholder="Search by name, email, phone..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:border-primary rounded-sm" />
                    </div>
                    <button onClick={openCreate} className="bg-black text-white dark:bg-white dark:text-black px-6 py-2.5 text-[10px] uppercase tracking-widest font-bold hover:bg-primary hover:text-white transition-all flex items-center gap-2">
                        <span className="material-icons-outlined text-sm">person_add</span> Add Customer
                    </button>
                </div>

                {loading ? <div className="flex justify-center py-16"><div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div></div> : filtered.length === 0 ? <EmptyState icon="groups" title="No customers found" description="Add your first customer or adjust the search" /> : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-gray-800">
                                <tr>{['Name', 'Email', 'Phone', 'Address', 'Notes', 'Joined', 'Actions'].map(h => <th key={h} className="px-6 py-3.5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">{h}</th>)}</tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                {filtered.map((c, idx) => (
                                    <motion.tr key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.03 }} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"><span className="text-primary text-xs font-bold">{c.name?.[0]?.toUpperCase()}</span></div>
                                                <span className="text-xs font-bold text-secondary dark:text-white">{c.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-gray-500">{c.email}</td>
                                        <td className="px-6 py-4 text-xs text-gray-500">{c.phone || '—'}</td>
                                        <td className="px-6 py-4 text-xs text-gray-400 max-w-[150px] truncate">{c.address || '—'}</td>
                                        <td className="px-6 py-4 text-xs text-gray-400 max-w-[120px] truncate">{c.notes || '—'}</td>
                                        <td className="px-6 py-4 text-[10px] text-gray-400">{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : '—'}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-1">
                                                <button onClick={() => openEdit(c)} className="p-1.5 hover:text-blue-500 transition-colors"><span className="material-icons-outlined text-sm">edit</span></button>
                                                <button onClick={() => setDeleteId(c.id)} className="p-1.5 hover:text-red-500 transition-colors"><span className="material-icons-outlined text-sm">delete</span></button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Customer' : 'New Customer'}>
                <div className="space-y-4">
                    <Input label="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. John Smith" />
                    <Input label="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="e.g. john@email.com" />
                    <Input label="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="e.g. +977 9812345678" />
                    <Input label="Address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="e.g. Kathmandu, Nepal" />
                    <TextArea label="Notes" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Any additional notes..." />
                </div>
                <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <button onClick={() => setModalOpen(false)} className="px-6 py-2.5 text-[10px] uppercase tracking-widest font-bold border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">Cancel</button>
                    <button onClick={handleSave} className="px-6 py-2.5 text-[10px] uppercase tracking-widest font-bold bg-black text-white dark:bg-white dark:text-black hover:bg-primary hover:text-white transition-all">{editing ? 'Update' : 'Create'}</button>
                </div>
            </Modal>

            <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Customer" message="Are you sure? This action cannot be undone." />
            <Toast {...toast} />
        </div>
    );
};

const mockCustomers = [
    { id: '1', name: 'John Smith', email: 'john@email.com', phone: '+977 9812345678', address: 'Kathmandu', notes: 'VIP guest', createdAt: '2026-01-15' },
    { id: '2', name: 'Sarah Wilson', email: 'sarah@email.com', phone: '+977 9887654321', address: 'Pokhara', notes: '', createdAt: '2026-02-20' },
    { id: '3', name: 'Robert Chen', email: 'robert@email.com', phone: '+977 9856781234', address: 'Chitwan', notes: 'Regular customer', createdAt: '2026-03-01' },
];

export default Customers;
