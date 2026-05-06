import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Rooms = () => {
    const [filter, setFilter] = useState('All');

    const rooms = [
        { id: 1, title: 'Deluxe Queen', type: 'Deluxe', price: 'NPR 3,500', img: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop', features: ['1 Queen Bed', 'City View', 'WiFi'] },
        { id: 2, title: 'Luxury King', type: 'Luxury', price: 'NPR 4,500', img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop', features: ['1 King Bed', 'Garden View', 'WiFi'] },
        { id: 3, title: 'Presidential', type: 'Suite', price: 'NPR 12,500', img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop', features: ['Sky Terrace', 'Private Spa', 'Butler'] },
        { id: 4, title: 'Executive Twin', type: 'Standard', price: 'NPR 2,800', img: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?q=80&w=1974&auto=format&fit=crop', features: ['2 Twin Beds', 'Mountain View', 'WiFi'] },
        { id: 5, title: 'Royal Suite', type: 'Suite', price: 'NPR 18,000', img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop', features: ['Penthouse', 'Pool Access', 'Mini Bar'] },
        { id: 6, title: 'Classic Double', type: 'Standard', price: 'NPR 3,200', img: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974&auto=format&fit=crop', features: ['2 Beds', 'Balcony', 'Room Service'] },
        { id: 7, title: 'Zen Garden', type: 'Luxury', price: 'NPR 5,500', img: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1974&auto=format&fit=crop', features: ['1 King Bed', 'Spa Access', 'Breakfast'] },
        { id: 8, title: 'Sky Loft', type: 'Deluxe', price: 'NPR 6,500', img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2070&auto=format&fit=crop', features: ['Loft Design', 'City View', 'WiFi'] }
    ];

    const filteredRooms = filter === 'All' ? rooms : rooms.filter(room => room.type === filter);

    return (
        <div className="min-h-screen bg-snow-white dark:bg-[#0F0F0F] pt-32 pb-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 text-center">
                    <span className="text-gray-400 uppercase tracking-[0.3em] text-[10px] font-bold">Discover</span>
                    <h1 className="font-serif text-5xl md:text-6xl text-secondary dark:text-white mt-4">Hotel Aarohi Rooms</h1>
                </div>

                {/* Filters */}
                <div className="flex flex-nowrap w-full lg:w-auto overflow-x-auto scrollbar-hide justify-between lg:justify-center gap-4 mb-16 underline-offset-8 -mx-4 px-4 lg:mx-0 lg:px-0">
                    {['All', 'Standard', 'Deluxe', 'Luxury', 'Suite'].map((category) => (
                        <button
                            key={category}
                            onClick={() => setFilter(category)}
                            className={`flex-1 lg:flex-none px-2 lg:px-6 py-2 text-[12px] lg:text-[10px] uppercase tracking-widest font-medium lg:font-bold transition-all duration-300 border-b-2 whitespace-nowrap ${filter === category ? 'border-primary text-black dark:text-white' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Rooms Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredRooms.map((room) => (
                            <motion.article
                                layout
                                key={room.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="group flex flex-row lg:flex-col bg-white dark:bg-[#141414] border border-gray-100 dark:border-gray-900 transition-all duration-500 overflow-hidden cursor-pointer shadow-sm hover:shadow-xl relative min-h-[160px] lg:min-h-0"
                            >
                                {/* Premium Golden Trace Overlay */}
                                <div className="absolute inset-0 pointer-events-none z-30">
                                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                        <rect
                                            x="0" y="0" width="100" height="100"
                                            pathLength="1"
                                            vectorEffect="non-scaling-stroke"
                                            className="stroke-primary stroke-2 fill-none border-trace-svg"
                                        />
                                    </svg>
                                </div>

                                <div className="w-[42%] lg:w-full aspect-[4/3] lg:aspect-[3/2] overflow-hidden shrink-0">
                                    <img
                                        alt={room.title}
                                        className="w-full h-full object-cover"
                                        src={room.img}
                                    />
                                </div>

                                <div className="flex-1 p-4 lg:p-5 flex flex-col justify-between">
                                    <div>
                                        <div className="flex flex-col sm:flex-row lg:flex-row justify-between items-start sm:items-baseline lg:items-baseline mb-2 lg:mb-3">
                                            <h3 className="font-serif text-[15px] sm:text-lg lg:text-xl text-secondary dark:text-white group-hover:text-primary transition-colors truncate pr-2">{room.title}</h3>
                                            <div className="text-[13px] sm:text-base lg:text-lg font-serif text-primary lg:text-secondary lg:dark:text-white font-bold lg:font-normal mt-1 sm:mt-0 flex flex-col items-start lg:items-end">
                                                <span>{room.price}</span>
                                                <span className="text-[8px] uppercase tracking-tighter opacity-70 lg:hidden">per night</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-x-2 sm:gap-x-4 gap-y-1 py-1.5 lg:py-3 border-t border-gray-100 dark:border-gray-800 text-[8px] sm:text-[9px] uppercase tracking-wider text-gray-400 dark:text-gray-500">
                                            {room.features.map((f, i) => <span key={i}>{f}</span>)}
                                        </div>
                                    </div>
                                    <button className="w-full mt-2 lg:mt-4 bg-transparent border border-gray-200 dark:border-gray-700 text-secondary dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black py-2 lg:py-2.5 uppercase text-[9px] tracking-widest font-bold transition-all">
                                        View Details
                                    </button>
                                </div>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Rooms;
