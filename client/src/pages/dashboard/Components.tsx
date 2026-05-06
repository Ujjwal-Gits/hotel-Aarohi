import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── MODAL ─── */
export const Modal = ({ open, onClose, title, children, wide }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode; wide?: boolean }) => (
    <AnimatePresence>
        {open && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className={`bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 shadow-2xl rounded-sm ${wide ? 'w-full max-w-3xl' : 'w-full max-w-lg'} max-h-[90vh] overflow-y-auto`}>
                    <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
                        <h3 className="font-serif text-xl uppercase tracking-wider text-secondary dark:text-white">{title}</h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-black dark:hover:text-white transition-colors"><span className="material-icons-outlined">close</span></button>
                    </div>
                    <div className="p-6">{children}</div>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);

/* ─── INPUT ─── */
export const Input = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className="space-y-1.5">
        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">{label}</label>
        <input {...props} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-secondary dark:text-white focus:outline-none focus:border-primary transition-colors rounded-sm" />
    </div>
);

/* ─── TEXTAREA ─── */
export const TextArea = ({ label, ...props }: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <div className="space-y-1.5">
        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">{label}</label>
        <textarea {...props} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-secondary dark:text-white focus:outline-none focus:border-primary transition-colors rounded-sm resize-none" rows={3} />
    </div>
);

/* ─── SELECT ─── */
export const Select = ({ label, options, ...props }: { label: string; options: { value: string; label: string }[] } & React.SelectHTMLAttributes<HTMLSelectElement>) => (
    <div className="space-y-1.5">
        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">{label}</label>
        <select {...props} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm text-secondary dark:text-white focus:outline-none focus:border-primary transition-colors rounded-sm">
            {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
    </div>
);

/* ─── IMAGE UPLOAD ─── */
export const ImageUpload = ({ label, preview, onChange }: { label: string; preview: string | null; onChange: (file: File | null) => void }) => (
    <div className="space-y-1.5">
        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">{label}</label>
        <div className="relative border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-sm p-4 hover:border-primary transition-colors cursor-pointer" onClick={() => document.getElementById('img-upload')?.click()}>
            {preview ? (
                <div className="relative">
                    <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded-sm" />
                    <button onClick={(e) => { e.stopPropagation(); onChange(null); }} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full text-xs"><span className="material-icons-outlined text-sm">close</span></button>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                    <span className="material-icons-outlined text-3xl mb-2">cloud_upload</span>
                    <p className="text-xs font-bold uppercase tracking-widest">Upload Image</p>
                    <p className="text-[10px] mt-1 text-gray-300">JPG, JPEG, PNG (max 5MB)</p>
                </div>
            )}
            <input id="img-upload" type="file" accept=".jpg,.jpeg,.png" className="hidden" onChange={(e) => onChange(e.target.files?.[0] || null)} />
        </div>
    </div>
);

/* ─── BADGE ─── */
export const Badge = ({ text, color }: { text: string; color: 'green' | 'red' | 'amber' | 'blue' | 'purple' | 'gray' }) => {
    const colors = {
        green: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
        red: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
        amber: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
        blue: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
        purple: 'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400',
        gray: 'bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400',
    };
    return <span className={`text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-sm ${colors[color]}`}>{text}</span>;
};

/* ─── CONFIRM DELETE ─── */
export const ConfirmDialog = ({ open, onClose, onConfirm, title, message }: { open: boolean; onClose: () => void; onConfirm: () => void; title: string; message: string }) => (
    <Modal open={open} onClose={onClose} title={title}>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
            <button onClick={onClose} className="px-6 py-2 text-[10px] uppercase tracking-widest font-bold border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">Cancel</button>
            <button onClick={onConfirm} className="px-6 py-2 text-[10px] uppercase tracking-widest font-bold bg-red-500 text-white hover:bg-red-600 transition-colors">Delete</button>
        </div>
    </Modal>
);

/* ─── EMPTY STATE ─── */
export const EmptyState = ({ icon, title, description }: { icon: string; title: string; description: string }) => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
        <span className="material-icons-outlined text-5xl text-gray-200 dark:text-gray-700 mb-4">{icon}</span>
        <h4 className="font-serif text-lg text-gray-400 mb-2">{title}</h4>
        <p className="text-xs text-gray-300 dark:text-gray-600 max-w-sm">{description}</p>
    </div>
);

/* ─── TOAST ─── */
export const Toast = ({ message, type, show }: { message: string; type: 'success' | 'error' | 'info'; show: boolean }) => {
    const colors = { success: 'bg-emerald-500', error: 'bg-red-500', info: 'bg-blue-500' };
    const icons = { success: 'check_circle', error: 'error', info: 'info' };
    return (
        <AnimatePresence>
            {show && (
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className={`fixed bottom-6 right-6 z-[60] ${colors[type]} text-white px-6 py-3 rounded-sm shadow-2xl flex items-center gap-3`}>
                    <span className="material-icons-outlined text-lg">{icons[type]}</span>
                    <span className="text-xs font-bold uppercase tracking-widest">{message}</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
