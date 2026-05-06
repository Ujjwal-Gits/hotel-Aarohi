import { forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';

/* ─── MENU DATA ─── */
const menuSections = [
    {
        title: "Starters",
        items: [
            { name: "Paneer Tikka", price: "380", desc: "Grilled cottage cheese in spiced yogurt" },
            { name: "Chicken Sekuwa", price: "450", desc: "Charcoal-grilled Nepali spiced skewers" },
            { name: "Mushroom Manchurian", price: "350", desc: "Golden-fried mushrooms in tangy glaze" },
            { name: "Pork Choila", price: "400", desc: "Newari smoked and spiced pork" },
            { name: "Fish Fingers", price: "480", desc: "Crumbed river fish with tartar dip" },
        ]
    },
    {
        title: "Mo:Mo",
        items: [
            { name: "Buff Mo:Mo (Steam)", price: "250", desc: "Classic steamed buffalo dumplings" },
            { name: "Chicken Mo:Mo (Steam)", price: "280", desc: "Steamed chicken with tomato achar" },
            { name: "Fried Mo:Mo (Buff)", price: "300", desc: "Crispy golden-fried dumplings" },
            { name: "Jhol Mo:Mo", price: "350", desc: "Dumplings in spicy sesame soup" },
            { name: "C-Mo:Mo (Buff)", price: "320", desc: "Chilli-fried buffalo mo:mo in sauce" },
        ]
    },
    {
        title: "Thakali Set",
        items: [
            { name: "Mutton Thakali Set", price: "950", desc: "Goat curry, dal, rice, saag & achar" },
            { name: "Chicken Thakali Set", price: "750", desc: "Farm chicken with traditional sides" },
            { name: "Fish Thakali Set", price: "850", desc: "River fish curry & seasonal greens" },
            { name: "Veg Thakali Set", price: "550", desc: "Organic vegetables with buckwheat dhido" },
            { name: "Pork Thakali Set", price: "800", desc: "Spiced pork belly with heritage rice" },
        ]
    },
    {
        title: "Main Course",
        items: [
            { name: "Butter Chicken", price: "680", desc: "Creamy tomato gravy with chicken" },
            { name: "Mutton Rogan Josh", price: "850", desc: "Slow-cooked in Kashmiri spices" },
            { name: "Dal Makhani", price: "400", desc: "Black lentils simmered in cream" },
            { name: "Chicken Biryani", price: "620", desc: "Fragrant rice layered with chicken" },
            { name: "Paneer Butter Masala", price: "550", desc: "Cottage cheese in rich butter sauce" },
        ]
    },
    {
        title: "Noodles & Rice",
        items: [
            { name: "Veg Chowmein", price: "250", desc: "Stir-fried noodles with vegetables" },
            { name: "Chicken Chowmein", price: "350", desc: "Wok-tossed noodles with chicken" },
            { name: "Egg Fried Rice", price: "280", desc: "Wok-fried rice with scrambled egg" },
            { name: "Chicken Fried Rice", price: "380", desc: "Fragrant rice with soy and chicken" },
            { name: "Thukpa (Chicken)", price: "300", desc: "Hot Tibetan noodle soup" },
        ]
    },
    {
        title: "Newari Specials",
        items: [
            { name: "Samay Baji Set", price: "850", desc: "The classic Newari feast platter" },
            { name: "Chatamari Special", price: "350", desc: "Rice crepe with minced meat & egg" },
            { name: "Choila (Duck)", price: "500", desc: "Smoked spiced duck delicacy" },
            { name: "Yomari", price: "250", desc: "Sweet filled rice flour dumplings" },
            { name: "Bara & Wo", price: "300", desc: "Lentil patties with chutney" },
        ]
    },
    {
        title: "Beverages",
        items: [
            { name: "Masala Tea", price: "80", desc: "Traditional spiced milk tea" },
            { name: "Himalayan Coffee", price: "150", desc: "Strong brewed highland Arabica" },
            { name: "Fresh Lime Soda", price: "150", desc: "Sparkling soda with lime & salt" },
            { name: "Mango Lassi", price: "200", desc: "Thick yogurt smoothie with mango" },
            { name: "Fresh Juice", price: "250", desc: "Pressed seasonal fruit juice" },
        ]
    },
    {
        title: "Desserts",
        items: [
            { name: "Gulab Jamun", price: "200", desc: "Milk dumplings in rose syrup" },
            { name: "Ras Malai", price: "250", desc: "Cheese patties in saffron cream" },
            { name: "Juju Dhau", price: "180", desc: "Traditional Bhaktapur king yogurt" },
            { name: "Brownie & Ice Cream", price: "350", desc: "Warm fudge brownie with vanilla" },
            { name: "Kheer", price: "200", desc: "Rice pudding with nuts & saffron" },
        ]
    },
];

/* ─── A single page component (must use forwardRef for react-pageflip) ─── */

const CoverPage = forwardRef<HTMLDivElement>((_, ref) => (
    <div ref={ref} className="page-content">
        <div className="h-full w-full bg-[#1e1a14] flex flex-col items-center justify-center relative overflow-hidden">
            {/* Spine shadow */}
            <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-black/30 to-transparent" />
            {/* Leather grain */}
            <div className="absolute inset-0 opacity-[0.04] bg-[repeating-linear-gradient(135deg,transparent,transparent_3px,rgba(255,255,255,0.04)_3px,rgba(255,255,255,0.04)_6px)]" />
            {/* Gold frame */}
            <div className="absolute inset-6 md:inset-10 border border-[#b18c5e]/25 pointer-events-none">
                <div className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-[#b18c5e]/60" />
                <div className="absolute -top-px -right-px w-5 h-5 border-t-2 border-r-2 border-[#b18c5e]/60" />
                <div className="absolute -bottom-px -left-px w-5 h-5 border-b-2 border-l-2 border-[#b18c5e]/60" />
                <div className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-[#b18c5e]/60" />
            </div>
            <span className="text-[#b18c5e]/50 text-[9px] tracking-[0.5em] uppercase font-bold mb-2">Hotel</span>
            <h2 className="font-serif text-4xl md:text-6xl text-[#e8dcc8] tracking-tight">Aarohi</h2>
            <div className="w-16 h-[1px] bg-[#b18c5e]/40 my-5" />
            <h3 className="text-[#b18c5e] text-base md:text-lg tracking-[0.4em] uppercase font-light">Menu</h3>

            {/* Blinking swipe hint — just below Menu */}
            <div className="mt-8 flex flex-col items-center gap-2 swipe-blink">
                <span className="text-[#d4a85c] text-[10px] tracking-[0.3em] uppercase font-bold">Swipe to Turn</span>
                <span className="material-icons-outlined text-[#d4a85c] text-lg">east</span>
            </div>
        </div>
    </div>
));
CoverPage.displayName = 'CoverPage';

const InnerCoverPage = forwardRef<HTMLDivElement>((_, ref) => (
    <div ref={ref} className="page-content">
        <div className="h-full w-full bg-[#faf6ee] flex flex-col items-center justify-center p-8 md:p-12 relative">
            {/* Left spine shadow */}
            <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/[0.06] to-transparent" />
            <span className="material-icons-outlined text-[#b18c5e]/40 text-5xl mb-6">restaurant</span>
            <h3 className="font-serif text-2xl md:text-3xl text-[#2c2418] italic mb-4 text-center">Welcome to Aarohi</h3>
            <div className="w-10 h-[1px] bg-[#b18c5e]/30 mb-6" />
            <p className="text-[#8a8070] text-xs md:text-sm italic text-center max-w-xs leading-relaxed">
                "Every dish is a story of our heritage, crafted with the finest local ingredients from the heart of Chandrapur."
            </p>
            <p className="text-[#b18c5e]/60 text-[10px] uppercase tracking-widest mt-8 font-bold">Chandrapur · Rautahat · Nepal</p>
        </div>
    </div>
));
InnerCoverPage.displayName = 'InnerCoverPage';

interface MenuPageProps {
    section: typeof menuSections[0];
    pageNum: number;
}

const MenuPage = forwardRef<HTMLDivElement, MenuPageProps>(({ section, pageNum }, ref) => (
    <div ref={ref} className="page-content">
        <div className="h-full w-full bg-[#faf6ee] relative flex flex-col">
            {/* Spine shadow */}
            {pageNum % 2 === 1 ? (
                <div className="absolute left-0 top-0 bottom-0 w-5 bg-gradient-to-r from-black/[0.06] to-transparent" />
            ) : (
                <div className="absolute right-0 top-0 bottom-0 w-5 bg-gradient-to-l from-black/[0.06] to-transparent" />
            )}

            <div className="flex-1 p-6 md:p-10 flex flex-col">
                {/* Header */}
                <div className="flex items-end justify-between border-b-2 border-[#b18c5e]/20 pb-3 mb-5">
                    <h3 className="font-serif text-xl md:text-2xl text-[#2c2418] italic">{section.title}</h3>
                    <span className="text-[8px] md:text-[9px] text-[#b0a898] tracking-widest uppercase font-bold">{pageNum}</span>
                </div>

                {/* Menu Items */}
                <div className="flex-1 flex flex-col justify-start gap-[14px] md:gap-5">
                    {section.items.map((item, i) => (
                        <div key={i}>
                            <div className="flex items-baseline gap-1.5">
                                <span className="font-serif text-[14px] md:text-[17px] text-[#2c2418] font-medium whitespace-nowrap">{item.name}</span>
                                <span className="flex-1 border-b border-dotted border-[#d4cbb8] min-w-[12px] translate-y-[-3px]" />
                                <span className="text-[#b18c5e] font-bold text-[13px] md:text-[16px] font-serif whitespace-nowrap">NPR {item.price}</span>
                            </div>
                            <p className="text-[#9a9080] text-[10px] md:text-[12px] italic mt-[2px] leading-snug">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Bottom footer */}
                <div className="mt-auto pt-4 border-t border-[#e8e0d0] flex justify-between items-center">
                    <span className="text-[8px] text-[#c4baa8] tracking-widest uppercase">Hotel Aarohi</span>
                    <span className="text-[8px] text-[#c4baa8] tracking-widest uppercase">Menu</span>
                </div>
            </div>
        </div>
    </div>
));
MenuPage.displayName = 'MenuPage';

const BackCoverPage = forwardRef<HTMLDivElement>((_, ref) => (
    <div ref={ref} className="page-content">
        <div className="h-full w-full bg-[#1e1a14] flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/30 to-transparent" />
            <div className="absolute inset-0 opacity-[0.04] bg-[repeating-linear-gradient(135deg,transparent,transparent_3px,rgba(255,255,255,0.04)_3px,rgba(255,255,255,0.04)_6px)]" />
            <div className="absolute inset-6 md:inset-10 border border-[#b18c5e]/20 pointer-events-none" />
            <h2 className="font-serif text-3xl md:text-4xl text-[#e8dcc8] italic mb-4">Thank You</h2>
            <div className="w-12 h-[1px] bg-[#b18c5e]/40 mb-6" />
            <p className="text-[#b18c5e]/60 text-[10px] uppercase tracking-widest font-bold mb-2">Reservations</p>
            <p className="font-serif text-xl text-[#e8dcc8]">+977 1234567890</p>
            <p className="text-[#e8dcc8]/30 text-xs font-light mt-2">Open daily · 7 AM – 10:30 PM</p>

            {/* Swipe back hint */}
            <div className="mt-8 flex flex-col items-center gap-2 swipe-blink">
                <span className="material-icons-outlined text-[#d4a85c] text-lg">west</span>
                <span className="text-[#d4a85c] text-[10px] tracking-[0.3em] uppercase font-bold">Swipe Back to Browse</span>
            </div>
        </div>
    </div>
));
BackCoverPage.displayName = 'BackCoverPage';

/* ─── MAIN COMPONENT ─── */
const Restaurant = () => {
    return (
        <div className="min-h-screen bg-[#f0ebe3] dark:bg-[#0e0c09] pt-32 pb-24 px-4">
            <div className="max-w-6xl mx-auto flex flex-col items-center">

                {/* Page Title */}
                <div className="text-center mb-10">
                    <h1 className="font-serif text-4xl md:text-6xl text-[#2c2418] dark:text-[#e8dcc8]">Aarohi Restaurant</h1>
                    <p className="text-[#a09888] text-sm mt-3 tracking-[0.3em] uppercase font-light">Our Menu</p>
                </div>

                {/* Book Container */}
                <div className="menu-book-wrapper relative">
                    {/* @ts-ignore */}
                    <HTMLFlipBook

                        width={400}
                        height={480}
                        size="stretch"
                        minWidth={280}
                        maxWidth={500}
                        minHeight={340}
                        maxHeight={580}
                        showCover={true}
                        mobileScrollSupport={false}
                        className="menu-book"
                        flippingTime={800}
                        usePortrait={true}
                        startZIndex={0}
                        autoSize={true}
                        maxShadowOpacity={0.25}
                        drawShadow={true}
                        useMouseEvents={true}
                        swipeDistance={30}
                        clickEventForward={false}
                        startPage={0}
                        showPageCorners={false}
                        disableFlipByClick={false}
                        style={{}}
                        onFlip={() => { }}
                        onChangeOrientation={() => { }}
                        onChangeState={() => { }}
                        onInit={() => { }}
                        onUpdate={() => { }}
                    >
                        {/* Front Cover */}
                        <CoverPage />

                        {/* Inner Cover */}
                        <InnerCoverPage />

                        {/* Menu Pages */}
                        {menuSections.map((section, i) => (
                            <MenuPage key={i} section={section} pageNum={i + 1} />
                        ))}

                        {/* Back Cover */}
                        <BackCoverPage />
                    </HTMLFlipBook>
                </div>

                {/* Reservation */}
                <div className="text-center mt-14">
                    <p className="text-[#a09888] text-[10px] uppercase tracking-[0.2em] font-bold mb-1">Reservations</p>
                    <p className="font-serif text-2xl text-[#2c2418] dark:text-[#e8dcc8]">+977 1234567890</p>
                    <p className="text-[#a09888] text-sm font-light mt-1">Open daily · 7:00 AM – 10:30 PM</p>
                </div>
            </div>

            <style>{`
                .menu-book-wrapper {
                    width: 100%;
                    max-width: 500px;
                    display: flex;
                    justify-content: center;
                    filter: drop-shadow(0 8px 24px rgba(0,0,0,0.12));
                }

                .menu-book {
                    /* Library handles the actual element */
                }

                .page-content {
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }

                /* Prevent text selection during flip */
                .menu-book-wrapper * {
                    -webkit-user-select: none;
                    user-select: none;
                }

                /* Bright golden blink for swipe hint */
                .swipe-blink {
                    animation: swipePulse 2s ease-in-out infinite;
                }

                @keyframes swipePulse {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 1; filter: brightness(1.4); }
                }
            `}</style>
        </div>
    );
};

export default Restaurant;
