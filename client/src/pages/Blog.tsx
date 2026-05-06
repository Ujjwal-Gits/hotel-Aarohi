import { motion } from 'framer-motion';

const Blog = () => {
    const blogs = [
        {
            id: 1,
            title: 'The Art of Himalayan Minimalism',
            author: 'Aarohan Sharma',
            date: 'March 1, 2024',
            description: 'Discover how simplicity and nature intertwine to create a space of ultimate tranquility in the heart of the mountains.',
            img: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop',
            category: 'Design'
        },
        {
            id: 2,
            title: 'Gastronomy: A Taste of Aarohi',
            author: 'Maya Gurung',
            date: 'February 24, 2024',
            description: 'Our head chef shares the secrets behind our signature Thakali set and the fusion of local ingredients with global techniques.',
            img: 'https://images.unsplash.com/photo-1547524314-72213707f152?q=80&w=2070&auto=format&fit=crop',
            category: 'Cuisine'
        },
        {
            id: 3,
            title: 'The Future of Luxury Hospitality',
            author: 'Siddhartha Raj',
            date: 'February 15, 2024',
            description: 'Exploring how glass architecture and sustainable practices are redefining the 7-star boutique experience.',
            img: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2098&auto=format&fit=crop',
            category: 'Innovation'
        },
        {
            id: 4,
            title: 'Wellness: Mountain Meditation',
            author: 'Priya Thapa',
            date: 'February 2, 2024',
            description: 'Learn the ancient techniques of Himalayan meditation and how our spa retreat helps you reconnect with your inner self.',
            img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1999&auto=format&fit=crop',
            category: 'Wellness'
        },
        {
            id: 5,
            title: 'Hidden Trails Around Aarohi',
            author: 'Karma Leki',
            date: 'January 20, 2024',
            description: 'A guide to the secret hiking paths that offer the most breathtaking views of the valley, just steps from our grand entrance.',
            img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop',
            category: 'Adventure'
        },
        {
            id: 6,
            title: 'Seasonal Cocktails & Himalayan Spirits',
            author: 'Biraj Magar',
            date: 'January 12, 2024',
            description: 'A deep dive into our bar’s unique infusions, featuring local herbs and the finest spirits from the region.',
            img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop',
            category: 'Bar'
        }
    ];

    return (
        <div className="min-h-screen bg-snow-white dark:bg-[#0F0F0F] pt-32 pb-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 text-center">
                    <span className="text-primary/60 uppercase tracking-[0.5em] text-[10px] font-bold">Journal</span>
                    <h1 className="font-serif text-5xl md:text-6xl text-secondary dark:text-white mt-4">Aarohi Blog</h1>
                    <div className="w-16 h-[1px] bg-primary/30 mx-auto mt-6" />
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog, index) => (
                        <motion.article
                            key={blog.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group flex flex-row lg:flex-col bg-white dark:bg-[#141414] border border-gray-100 dark:border-gray-900 transition-all duration-500 overflow-hidden cursor-pointer shadow-sm hover:shadow-md relative min-h-[160px] lg:min-h-0"
                        >
                            {/* Premium Golden Trace Overlay */}
                            <div className="absolute inset-0 pointer-events-none z-30 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <rect
                                        x="0" y="0" width="100" height="100"
                                        pathLength="1"
                                        vectorEffect="non-scaling-stroke"
                                        className="stroke-primary stroke-[1.5] fill-none"
                                        style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
                                    />
                                </svg>
                            </div>

                            <div className="w-[40%] lg:w-full aspect-[4/5] lg:aspect-[16/10] overflow-hidden shrink-0">
                                <img
                                    alt={blog.title}
                                    className="w-full h-full object-cover transition-transform duration-1000"
                                    src={blog.img}
                                />
                            </div>

                            <div className="flex-1 p-5 lg:p-6 flex flex-col">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 border border-primary/30 text-primary font-bold">
                                        {blog.category}
                                    </span>
                                    <span className="text-[10px] text-gray-400 font-light">{blog.date}</span>
                                </div>

                                <h3 className="font-serif text-lg lg:text-xl text-secondary dark:text-white group-hover:text-primary transition-colors leading-tight mb-4">
                                    {blog.title}
                                </h3>

                                <p className="text-gray-500 dark:text-gray-400 text-xs lg:text-[13px] leading-relaxed line-clamp-3 mb-6">
                                    {blog.description}
                                </p>

                                <div className="mt-auto pt-5 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] font-bold">
                                            {blog.author[0]}
                                        </div>
                                        <span className="text-[11px] font-bold text-secondary dark:text-gray-300 uppercase tracking-widest">
                                            {blog.author}
                                        </span>
                                    </div>
                                    <span className="material-icons-outlined text-gray-300 group-hover:text-primary transition-colors text-lg">
                                        arrow_forward
                                    </span>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
