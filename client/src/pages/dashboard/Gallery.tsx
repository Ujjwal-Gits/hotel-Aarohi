import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from './api';
import { Modal, Input, Select, ImageUpload, ConfirmDialog, EmptyState, Toast } from './Components';

const API_BASE = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || '';

const defaultForm = { title: '', category: 'Interior', description: '' };
const categories = ['All', 'Interior', 'Exterior', 'Food', 'Room', 'Event', 'Other'];

const GalleryDash = () => {
    const [images, setImages] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [editing, setEditing] = React.useState<any>(null);
    const [form, setForm] = React.useState(defaultForm);
    const [imageFile, setImageFile] = React.useState<File | null>(null);
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);
    const [deleteId, setDeleteId] = React.useState<string | null>(null);
    const [selectedCat, setSelectedCat] = React.useState('All');
    const [lightbox, setLightbox] = React.useState<string | null>(null);
    const [toast, setToast] = React.useState({ show: false, message: '', type: 'success' as 'success' | 'error' | 'info' });

    const showToast = (msg: string, type: 'success' | 'error' | 'info') => { setToast({ show: true, message: msg, type }); setTimeout(() => setToast(t => ({ ...t, show: false })), 3000); };

    const load = () => {
        setLoading(true);
        api.getGallery(selectedCat !== 'All' ? selectedCat : undefined)
            .then(data => { setImages(Array.isArray(data) ? data : mockImages); setLoading(false); })
            .catch(() => { setImages(mockImages); setLoading(false); });
    };

    React.useEffect(() => { load(); }, [selectedCat]);

    const resolveUrl = (url: string) => url?.startsWith('/') ? `${API_BASE}${url}` : url;

    const openCreate = () => { setEditing(null); setForm(defaultForm); setImageFile(null); setImagePreview(null); setModalOpen(true); };
    const openEdit = (img: any) => {
        setEditing(img);
        setForm({ title: img.title || '', category: img.category || 'Interior', description: img.description || '' });
        setImageFile(null);
        setImagePreview(resolveUrl(img.imageUrl));
        setModalOpen(true);
    };

    const handleImageChange = (file: File | null) => {
        setImageFile(file);
        if (file) { const r = new FileReader(); r.onload = (e) => setImagePreview(e.target?.result as string); r.readAsDataURL(file); }
        else setImagePreview(editing ? resolveUrl(editing.imageUrl) : null);
    };

    const handleSave = async () => {
        if (!imageFile && !editing) { showToast('Image is required', 'error'); return; }
        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) => fd.append(k, v));
        if (imageFile) fd.append('image', imageFile);
        try {
            if (editing) { await api.updateGallery(editing.id, fd); showToast('Image updated', 'success'); }
            else { await api.createGallery(fd); showToast('Image uploaded', 'success'); }
            setModalOpen(false); load();
        } catch { showToast('Operation failed', 'error'); }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        try { await api.deleteGallery(deleteId); showToast('Image deleted', 'success'); setDeleteId(null); load(); }
        catch { showToast('Delete failed', 'error'); }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                        <button key={cat} onClick={() => setSelectedCat(cat)} className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold rounded-sm transition-all ${selectedCat === cat ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-700 text-gray-500 hover:border-primary'}`}>{cat}</button>
                    ))}
                </div>
                <button onClick={openCreate} className="bg-black text-white dark:bg-white dark:text-black px-6 py-2.5 text-[10px] uppercase tracking-widest font-bold hover:bg-primary hover:text-white transition-all flex items-center gap-2">
                    <span className="material-icons-outlined text-sm">upload</span> Upload Image
                </button>
            </div>

            {loading ? <div className="flex justify-center py-16"><div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div></div> : images.length === 0 ? <EmptyState icon="photo_library" title="No images" description="Upload your first image to get started" /> : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((img, i) => (
                        <motion.div key={img.id || i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }} className="group relative aspect-square bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 p-1.5 overflow-hidden rounded-sm">
                            <img src={resolveUrl(img.imageUrl)} alt={img.title || `Gallery ${i}`} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-3">
                                <div className="flex gap-2">
                                    <button onClick={() => setLightbox(resolveUrl(img.imageUrl))} className="h-9 w-9 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all"><span className="material-icons-outlined text-sm">visibility</span></button>
                                    <button onClick={() => openEdit(img)} className="h-9 w-9 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all"><span className="material-icons-outlined text-sm">edit</span></button>
                                    <button onClick={() => setDeleteId(img.id)} className="h-9 w-9 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-full flex items-center justify-center backdrop-blur-md transition-all"><span className="material-icons-outlined text-sm">delete</span></button>
                                </div>
                                {img.title && <p className="text-white text-[10px] uppercase tracking-widest font-bold mt-2 text-center truncate w-full">{img.title}</p>}
                                {img.category && <p className="text-white/60 text-[9px] uppercase tracking-widest">{img.category}</p>}
                            </div>
                        </motion.div>
                    ))}
                    <button onClick={openCreate} className="aspect-square border-2 border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5 transition-all text-gray-400 hover:text-primary rounded-sm">
                        <span className="material-icons-outlined text-3xl">add_a_photo</span>
                        <span className="text-[10px] uppercase tracking-widest font-bold">Add Image</span>
                    </button>
                </div>
            )}

            {/* Upload/Edit Modal */}
            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Image' : 'Upload Image'}>
                <div className="space-y-4">
                    <Input label="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Lobby View" />
                    <Select label="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} options={categories.filter(c => c !== 'All').map(c => ({ value: c, label: c }))} />
                    <Input label="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Short description..." />
                    <ImageUpload label="Image (JPG, JPEG, PNG)" preview={imagePreview} onChange={handleImageChange} />
                </div>
                <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <button onClick={() => setModalOpen(false)} className="px-6 py-2.5 text-[10px] uppercase tracking-widest font-bold border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">Cancel</button>
                    <button onClick={handleSave} className="px-6 py-2.5 text-[10px] uppercase tracking-widest font-bold bg-black text-white dark:bg-white dark:text-black hover:bg-primary hover:text-white transition-all">{editing ? 'Update' : 'Upload'}</button>
                </div>
            </Modal>

            {/* Lightbox */}
            <AnimatePresence>
                {lightbox && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightbox(null)} className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-8 cursor-zoom-out">
                        <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} src={lightbox} alt="Fullscreen" className="max-w-full max-h-full object-contain" />
                        <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 text-white/50 hover:text-white"><span className="material-icons-outlined text-3xl">close</span></button>
                    </motion.div>
                )}
            </AnimatePresence>

            <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Image" message="Are you sure?" />
            <Toast {...toast} />
        </div>
    );
};

const mockImages = [
    { id: '1', title: 'Lobby View', imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=600', category: 'Interior' },
    { id: '2', title: 'Garden', imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600', category: 'Exterior' },
    { id: '3', title: 'Room Interior', imageUrl: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=600', category: 'Room' },
    { id: '4', title: 'Thakali Set', imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600', category: 'Food' },
];

export default GalleryDash;
