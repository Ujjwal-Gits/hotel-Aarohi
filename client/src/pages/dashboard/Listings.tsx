import React from 'react';
import { motion } from 'framer-motion';
import { api } from './api';
import { Modal, Input, TextArea, Select, ImageUpload, Badge, ConfirmDialog, EmptyState, Toast } from './Components';

const API_BASE = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || '';

const defaultForm = { name: '', type: 'Deluxe', description: '', specialFeatures: '', price: '', capacity: '2', hotelId: '', roomStatus: 'AVAILABLE' };

const Listings = () => {
    const [list, setList] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [editing, setEditing] = React.useState<any>(null);
    const [form, setForm] = React.useState(defaultForm);
    const [imageFile, setImageFile] = React.useState<File | null>(null);
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);
    const [deleteId, setDeleteId] = React.useState<string | null>(null);
    const [toast, setToast] = React.useState({ show: false, message: '', type: 'success' as 'success' | 'error' | 'info' });
    const [search, setSearch] = React.useState('');

    const showToast = (message: string, type: 'success' | 'error' | 'info') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast(t => ({ ...t, show: false })), 3000);
    };

    const load = () => {
        setLoading(true);
        api.getListings()
            .then(data => { setList(Array.isArray(data) ? data : mockData); setLoading(false); })
            .catch(() => { setList(mockData); setLoading(false); });
    };

    React.useEffect(() => { load(); }, []);

    const openCreate = () => { setEditing(null); setForm(defaultForm); setImageFile(null); setImagePreview(null); setModalOpen(true); };
    const openEdit = (item: any) => {
        setEditing(item);
        setForm({ name: item.name || '', type: item.type || 'Deluxe', description: item.description || '', specialFeatures: item.specialFeatures || '', price: item.price?.toString() || '', capacity: item.capacity?.toString() || '2', hotelId: item.hotelId || '', roomStatus: item.roomStatus || 'AVAILABLE' });
        setImageFile(null);
        setImagePreview(item.imageUrl ? (item.imageUrl.startsWith('/') ? `${API_BASE}${item.imageUrl}` : item.imageUrl) : null);
        setModalOpen(true);
    };

    const handleImageChange = (file: File | null) => {
        setImageFile(file);
        if (file) { const r = new FileReader(); r.onload = (e) => setImagePreview(e.target?.result as string); r.readAsDataURL(file); }
        else setImagePreview(editing?.imageUrl ? `${API_BASE}${editing.imageUrl}` : null);
    };

    const handleSave = async () => {
        if (!form.name || !form.type || !form.price) { showToast('Name, type & price are required', 'error'); return; }
        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) => fd.append(k, v));
        if (imageFile) fd.append('image', imageFile);
        try {
            if (editing) { await api.updateListing(editing.id, fd); showToast('Listing updated', 'success'); }
            else { await api.createListing(fd); showToast('Listing created', 'success'); }
            setModalOpen(false); load();
        } catch { showToast('Operation failed', 'error'); }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        try { await api.deleteListing(deleteId); showToast('Listing deleted', 'success'); setDeleteId(null); load(); }
        catch { showToast('Delete failed', 'error'); }
    };

    const filtered = list.filter(i => i.name?.toLowerCase().includes(search.toLowerCase()) || i.type?.toLowerCase().includes(search.toLowerCase()));

    const statusColor = (s: string) => s === 'AVAILABLE' ? 'green' : s === 'BOOKED' ? 'red' : 'amber';

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 rounded-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="relative flex-1 max-w-xs">
                        <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-lg">search</span>
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search listings..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:border-primary rounded-sm" />
                    </div>
                    <button onClick={openCreate} className="bg-black text-white dark:bg-white dark:text-black px-6 py-2.5 text-[10px] uppercase tracking-widest font-bold hover:bg-primary hover:text-white transition-all flex items-center gap-2">
                        <span className="material-icons-outlined text-sm">add</span> Add Listing
                    </button>
                </div>

                {loading ? <div className="flex justify-center py-16"><div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div></div> : filtered.length === 0 ? <EmptyState icon="hotel" title="No listings found" description="Create your first listing to get started" /> : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-gray-800">
                                <tr>
                                    {['Image', 'Name', 'Type', 'Price', 'Features', 'Status', 'Actions'].map(h => (
                                        <th key={h} className="px-6 py-3.5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                {filtered.map((item, idx) => (
                                    <motion.tr key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.03 }} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="h-12 w-16 rounded-sm overflow-hidden bg-gray-100 dark:bg-white/5 border border-gray-100 dark:border-gray-800">
                                                {item.imageUrl ? <img src={item.imageUrl.startsWith('/') ? `${API_BASE}${item.imageUrl}` : item.imageUrl} alt={item.name} className="h-full w-full object-cover" /> : <div className="h-full w-full flex items-center justify-center"><span className="material-icons-outlined text-gray-300 text-lg">image</span></div>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4"><p className="text-xs font-bold text-secondary dark:text-white">{item.name}</p>{item.description && <p className="text-[10px] text-gray-400 mt-0.5 max-w-[200px] truncate">{item.description}</p>}</td>
                                        <td className="px-6 py-4 text-xs text-gray-500">{item.type}</td>
                                        <td className="px-6 py-4 text-xs font-serif font-bold text-secondary dark:text-white">NPR {item.price?.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-[10px] text-gray-400 max-w-[150px] truncate">{item.specialFeatures || '—'}</td>
                                        <td className="px-6 py-4"><Badge text={item.roomStatus || 'AVAILABLE'} color={statusColor(item.roomStatus || 'AVAILABLE')} /></td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-1">
                                                <button onClick={() => openEdit(item)} className="p-1.5 hover:text-blue-500 transition-colors" title="Edit"><span className="material-icons-outlined text-sm">edit</span></button>
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

            {/* Create/Edit Modal */}
            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Listing' : 'New Listing'} wide>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input label="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. The Pearl Suite" />
                    <Select label="Type" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} options={[{ value: 'Deluxe', label: 'Deluxe' }, { value: 'Suite', label: 'Suite' }, { value: 'Standard', label: 'Standard' }, { value: 'Family', label: 'Family' }, { value: 'Couple', label: 'Couple' }, { value: 'Hall', label: 'Hall' }]} />
                    <Input label="Price (NPR)" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="e.g. 4500" />
                    <Input label="Capacity" type="number" value={form.capacity} onChange={e => setForm({ ...form, capacity: e.target.value })} placeholder="e.g. 2" />
                    <div className="md:col-span-2"><TextArea label="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Short description of this room/hall..." /></div>
                    <div className="md:col-span-2"><Input label="Special Features" value={form.specialFeatures} onChange={e => setForm({ ...form, specialFeatures: e.target.value })} placeholder="e.g. AC, WiFi, Mountain View, Spa (comma-separated)" /></div>
                    <Select label="Status" value={form.roomStatus} onChange={e => setForm({ ...form, roomStatus: e.target.value })} options={[{ value: 'AVAILABLE', label: 'Available' }, { value: 'BOOKED', label: 'Booked' }, { value: 'RESERVED', label: 'Reserved' }]} />
                    <div></div>
                    <div className="md:col-span-2"><ImageUpload label="Room Image (JPG, JPEG, PNG)" preview={imagePreview} onChange={handleImageChange} /></div>
                </div>
                <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <button onClick={() => setModalOpen(false)} className="px-6 py-2.5 text-[10px] uppercase tracking-widest font-bold border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">Cancel</button>
                    <button onClick={handleSave} className="px-6 py-2.5 text-[10px] uppercase tracking-widest font-bold bg-black text-white dark:bg-white dark:text-black hover:bg-primary hover:text-white transition-all">{editing ? 'Update' : 'Create'}</button>
                </div>
            </Modal>

            <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Listing" message="Are you sure you want to delete this listing? This action cannot be undone." />
            <Toast {...toast} />
        </div>
    );
};

const mockData = [
    { id: '1', name: 'The Pearl Suite', type: 'Suite', price: 4500, capacity: 2, description: 'Luxurious suite with mountain view', specialFeatures: 'AC, WiFi, Mountain View', roomStatus: 'AVAILABLE', imageUrl: '' },
    { id: '2', name: 'Golden Horizon', type: 'Deluxe', price: 5500, capacity: 3, description: 'Spacious deluxe room', specialFeatures: 'AC, WiFi, Balcony', roomStatus: 'BOOKED', imageUrl: '' },
    { id: '3', name: 'Grand Hall A', type: 'Hall', price: 25000, capacity: 250, description: 'Event hall with full AC', specialFeatures: 'AC, Stage, Sound System', roomStatus: 'AVAILABLE', imageUrl: '' },
];

export default Listings;
