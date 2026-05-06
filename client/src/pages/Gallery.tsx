import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── GALLERY DATA ─── */
const galleryImages = [
    { id: 1, src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80", alt: "Hotel Exterior", category: "Hotel" },
    { id: 2, src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80", alt: "Luxury Suite Bedroom", category: "Rooms" },
    { id: 3, src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80", alt: "Fine Dining Table", category: "Dining" },
    { id: 4, src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80", alt: "Pool Area", category: "Hotel" },
    { id: 5, src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80", alt: "Deluxe Room Interior", category: "Rooms" },
    { id: 6, src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80", alt: "Signature Dish", category: "Dining" },
    { id: 7, src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", alt: "Mountain View", category: "Views" },
    { id: 8, src: "https://images.unsplash.com/photo-1590490360182-c33d955571d5?w=600&q=80", alt: "Hotel Lobby", category: "Hotel" },
    { id: 9, src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80", alt: "Premium Room", category: "Rooms" },
    { id: 10, src: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&q=80", alt: "Breakfast Spread", category: "Dining" },
    { id: 11, src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80", alt: "Himalayan Peaks", category: "Views" },
    { id: 12, src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80", alt: "Hotel at Night", category: "Hotel" },
    { id: 13, src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80", alt: "Bed Detail", category: "Rooms" },
    { id: 14, src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80", alt: "Dessert Platter", category: "Dining" },
    { id: 15, src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80", alt: "Valley Landscape", category: "Views" },
    { id: 16, src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80", alt: "Hotel Reception", category: "Hotel" },
    { id: 17, src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80", alt: "Room with View", category: "Rooms" },
    { id: 18, src: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&q=80", alt: "Tea Service", category: "Dining" },
    { id: 19, src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80", alt: "Starry Night Sky", category: "Views" },
    { id: 20, src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80", alt: "Grand Entrance", category: "Hotel" },
];

/* ─── LIGHTBOX COMPONENT ─── */
const Lightbox = ({ image, onClose }: { image: typeof galleryImages[0] | null; onClose: () => void }) => {
    if (!image) return null;
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
                onClick={onClose}
            >
                <motion.img
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.85, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    src={image.src.replace('w=600', 'w=1200')}
                    alt={image.alt}
                    className="max-w-full max-h-[85vh] object-contain rounded-sm"
                    onClick={(e) => e.stopPropagation()}
                />
                {/* Close button */}
                <button onClick={onClose} className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors">
                    <span className="material-icons-outlined text-3xl">close</span>
                </button>
                {/* Caption */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
                    <p className="text-white font-serif text-lg">{image.alt}</p>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1">{image.category}</p>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

/* ─── MAIN GALLERY COMPONENT ─── */
const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

    return (
        <div className="min-h-screen bg-snow-white dark:bg-[#0a0a0a] pt-32 pb-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center mb-14">
                    <span className="text-primary/60 text-[10px] tracking-[0.5em] uppercase font-bold">Explore</span>
                    <h1 className="font-serif text-5xl md:text-7xl text-secondary dark:text-white mt-3">Gallery of Aarohi</h1>
                    <div className="w-16 h-[1px] bg-primary/30 mx-auto mt-6" />
                </div>

                {/* Masonry Grid */}
                <div className="columns-2 md:columns-3 lg:columns-4 gap-2 space-y-2">
                    {galleryImages.map((image, index) => (
                        <motion.div
                            key={image.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.4, delay: index * 0.03 }}
                            className="break-inside-avoid cursor-pointer"
                            onClick={() => setSelectedImage(image)}
                        >
                            <div className="relative overflow-hidden rounded-sm border border-primary/15 hover:border-primary hover:shadow-[0_0_12px_rgba(177,140,94,0.4)] transition-all duration-400">
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-auto block"
                                    loading="lazy"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
        </div>
    );
};

export default Gallery;
