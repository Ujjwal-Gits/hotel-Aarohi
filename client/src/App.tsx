import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from './components/common/SEO';

const Navbar = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    return (
        <nav className="fixed w-full z-50 transition-all duration-300 bg-snow-white/90 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-24">
                    <div className="flex-shrink-0 flex items-center">
                        <a className="font-serif text-2xl tracking-widest text-black dark:text-white font-bold uppercase" href="#">Aarohi</a>
                    </div>
                    <div className="hidden md:flex space-x-10 items-center">
                        <a className="text-xs uppercase tracking-widest hover:text-gray-500 transition-colors font-medium" href="#suites">Suites</a>
                        <a className="text-xs uppercase tracking-widest hover:text-gray-500 transition-colors font-medium" href="#dining">Dining</a>
                        <a className="text-xs uppercase tracking-widest hover:text-gray-500 transition-colors font-medium" href="#gallery">Gallery</a>
                        <a className="text-xs uppercase tracking-widest hover:text-gray-500 transition-colors font-medium" href="#journal">Journal</a>
                        <button className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 px-8 py-3 uppercase text-[10px] tracking-widest font-bold transition-all">
                            Book Your Stay
                        </button>
                        <button
                            className="p-2 text-gray-400 hover:text-black dark:hover:text-white flex items-center justify-center"
                            onClick={() => setIsDark(!isDark)}
                        >
                            <span className="material-icons-outlined text-lg">{isDark ? 'light_mode' : 'dark_mode'}</span>
                        </button>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button className="text-gray-900 dark:text-white hover:text-gray-500">
                            <span className="material-icons-outlined text-3xl">menu</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

const Header = () => (
    <header className="relative h-screen h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 z-0">
            <img alt="Modern glass house suite interior" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDW2X1QQZnFpMvb8iHz6gGu06UTGg32F1ZKFQZu90xgLxPhmi1oLv2RnZu574GUoxjW1LatbX7fb6RsIO7PP52nT7ZlRhORi2Quv3KJZWgmIVTkhNkvwMdbd22lXzng8H-Yf0lEqhrviiYcq7J68yT3XQ8omEvTdxzFdLP18a8c3sZBSlPkvAXVVCAS3k0pUhniwAD0Z9nQHGXmCFw3B4OgVyjWtYvilyTlbe2R-9RonkRclqaJOfBuFRZYjbPzAeP8VN0hgdn14YTS" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/40 dark:from-black/30 dark:to-black/80"></div>
        </div>

        <div className="absolute top-32 right-8 md:right-16 z-20 hidden md:block">
            <div className="flex flex-col items-end space-y-6 text-white/90 drop-shadow-md text-right">
                <div>
                    <p className="text-4xl font-serif">15+</p>
                    <p className="text-[10px] uppercase tracking-widest opacity-80">Years of Excellence</p>
                </div>
                <div>
                    <p className="text-4xl font-serif">50k+</p>
                    <p className="text-[10px] uppercase tracking-widest opacity-80">Guests Served</p>
                </div>
            </div>
        </div>

        <div className="absolute bottom-12 right-8 z-20 hidden lg:block group cursor-pointer">
            <div className="relative w-32 h-24 overflow-hidden rounded border border-white/30 hover:border-white transition-all duration-300">
                <img alt="Gallery Preview" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGcgcSfQ3T5FEqiMRT0GulxTN2MqKukhPvuj3BXUl-wwm5C89YoBXSvepBXSiMJkYI_-U4yQPEaB8II8LaqO6evUw9P19dBncInn0L1qjSPfaPdEcasFbagVOx6GNLn8gtB7NlGhs64u9rKLrkFu6B87NyUbGEjWlbe0Kik7fXZY9gDtOhR9tmQypyEe9bJJTWxYEGKMw8dRcTvkCwbti_WiEHSFBF37d9NL2cMiwoUJHk4YRGAa5PW_DRMEcuq00E3HujcV2ar7CU" />
            </div>
            <p className="text-white text-[10px] uppercase tracking-widest mt-2 text-right">View Gallery</p>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex flex-col items-center">
            <h2 className="text-white text-[10px] md:text-sm uppercase tracking-[0.4em] mb-4 font-medium text-shadow opacity-90">The Art of Living</h2>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-8xl text-white font-medium tracking-tight mb-8 leading-none drop-shadow-lg text-center">
                AAROHI<span className="font-light opacity-80">HOTELS</span>
            </h1>

            <div className="w-full max-w-4xl mx-auto animate-fade-in-up">
                <div className="flex justify-center mb-0 scale-90 md:scale-100 transform origin-bottom">
                    <button className="px-6 md:px-8 py-2 md:py-3 bg-white/90 backdrop-blur-md text-black text-[10px] md:text-xs uppercase tracking-widest font-bold rounded-t-lg border-b-2 border-black">Book a Room</button>
                    <button className="px-6 md:px-8 py-2 md:py-3 bg-black/40 backdrop-blur-md text-white hover:bg-white/90 hover:text-black text-[10px] md:text-xs uppercase tracking-widest font-bold rounded-t-lg border-b-2 border-transparent transition-all">Book a Hall</button>
                </div>
                <div className="glass-panel p-4 md:p-6 rounded-b-lg rounded-tr-lg shadow-glass flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-end justify-between scale-95 md:scale-100">
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full">
                        <div className="flex flex-col items-start border-b md:border-b-0 md:border-r border-gray-300/30 pb-2 md:pb-0 md:pr-4">
                            <label className="text-[9px] text-gray-600 uppercase tracking-widest font-bold mb-1">Check In</label>
                            <input className="bg-transparent border-none text-gray-900 p-0 focus:ring-0 w-full cursor-pointer font-sans text-xs font-medium" type="date" />
                        </div>
                        <div className="flex flex-col items-start border-b md:border-b-0 md:border-r border-gray-300/30 pb-2 md:pb-0 md:pr-4">
                            <label className="text-[9px] text-gray-600 uppercase tracking-widest font-bold mb-1">Check Out</label>
                            <input className="bg-transparent border-none text-gray-900 p-0 focus:ring-0 w-full cursor-pointer font-sans text-xs font-medium" type="date" />
                        </div>
                        <div className="flex flex-col items-start col-span-2 md:col-span-1">
                            <label className="text-[9px] text-gray-600 uppercase tracking-widest font-bold mb-1">Guests</label>
                            <select className="bg-transparent border-none text-gray-900 p-0 focus:ring-0 w-full cursor-pointer font-sans text-xs font-medium">
                                <option value="1">1 Guest</option>
                                <option value="2">2 Guests</option>
                                <option value="3">3 Guests</option>
                                <option value="4+">4+ Guests</option>
                            </select>
                        </div>
                    </div>
                    <button className="w-full md:w-auto bg-black hover:bg-gray-800 text-white px-8 py-3 rounded uppercase text-[9px] tracking-widest font-bold transition-all duration-300 shadow-lg whitespace-nowrap">
                        Check Availability
                    </button>
                </div>
            </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <span className="material-icons-outlined text-white/80 text-2xl">arrow_downward</span>
        </div>
    </header>
);

const Features = () => (
    <section className="bg-snow-white dark:bg-[#121212] py-16 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="text-center md:text-right border-r-0 md:border-r border-gray-200 dark:border-gray-800 pr-0 md:pr-12">
                    <span className="text-gray-400 font-sans text-xs uppercase tracking-widest block mb-3">Tonight's Exclusive</span>
                    <h3 className="text-secondary dark:text-white text-4xl font-serif mb-3">Chef's Tasting Menu</h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-light max-w-md ml-auto">A 7-course journey through local terroir paired with vintage wines, curated by Chef Alexander.</p>
                </div>
                <div className="text-center md:text-left pl-0 md:pl-12">
                    <span className="text-gray-400 font-sans text-xs uppercase tracking-widest block mb-3">Seasonal Ritual</span>
                    <h3 className="text-secondary dark:text-white text-4xl font-serif mb-3">Winter Solstice Spa</h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-light max-w-md mr-auto">Hot stone massage & hydrotherapy circuit access included. Restore your balance.</p>
                </div>
            </div>
        </div>
    </section>
);

const Suites = () => (
    <section className="py-24 bg-cream dark:bg-[#0A0A0A] relative" id="suites">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                <div className="mb-6 md:mb-0">
                    <span className="text-gray-400 uppercase tracking-[0.2em] text-xs font-bold">Accommodations</span>
                    <h2 className="font-serif text-5xl text-secondary dark:text-white mt-4">Luxury Rooms & Suites</h2>
                </div>
                <div className="hidden md:block">
                    <button className="border-b border-black dark:border-white pb-1 text-xs uppercase tracking-widest hover:text-gray-500 transition-colors">View All Suites</button>
                </div>
            </div>

            <div className="flex md:grid overflow-x-auto md:overflow-x-visible snap-x md:snap-none scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {[
                    { title: 'The Pearl Suite', price: '$450', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA76qKrD0P6doBgfJWd5GBDTBnOq1DHXX3rXhiRiK2UDsJ5BqGR4t3riM8wuf2Dukz6a0Fy-vrEz7moBUQ8WukuDnXZkg8GMkE4SgFn2lkkyp2fABTjJRq1ESH6wqmAy3bMs3EwPtMg2jObFO38cJ1wNIWGk_rDR4D4eWGGdvdrAxekbq_qVq8or3QvhFG91F-eWVRTkg9Vofe2eOmARck1ZE2Djhrj_L7GHUgUhSuWJGoOa5nwfokQGXTe7IkQESjftAY0UF1pAHr7', features: ['1 Bed', '1 Bath', '700 sqft'] },
                    { title: 'Golden Horizon', price: '$550', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtF26tO7R-UNOAFwv2yJvNMK4lT14oSJ1XuMbu6czIt9JRqTPvi5qVpOvlsGfdHX-1ic_PaEMBpTbAMJwtDOppaR9gGvTnurxLIMcH_daeUPo1iORsIjXtDMGsB3bPWfIi_Bcyen0QLNDg8xMfnp9hiuYW-rPIisdH8rBT3etdzmEQUTlwbCEKGYIeHSDkNICP8U2dC35ommYLR2AQzDjOjACOQzgepZm-GsCwVhAAbbTemqzIy6CLVL3c6-bCzD46p-ISNFQ3C5vw', features: ['2 Beds', '2 Baths', '920 sqft'] },
                    { title: 'The Royal Glass', price: '$850', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCT-o2Xx-kAWjEy_FtCVN88cpI_EhgcD28CHAB742YsOpmKP2ybTjHd2MNMyWxHWJo0latjR3I3Cz-sSJR-S38OxF2oCcfL0iqeW4AEFM58OnBb9qu0IO6DM9f6Kk2AnKAyOPhi5akSQ8Wr9hZEKL7ccdKgeqz1LkXEw4O45r0HD6TYwFlsNK2-5VrLRLMNhRWxFNB_n3knnXXP_0EdySpGWXK5-ZFGu1-RDFFs9dkseNblDyjo6wr92eAPvmOb3ygu8TdpEG-4BG-Q', features: ['2 Beds', 'Spa', '1200 sqft'] }
                ].map((suite, idx) => (
                    <article key={idx} className="group relative min-w-[300px] w-[85vw] md:w-auto md:min-w-0 snap-center bg-white dark:bg-[#141414] transition-all duration-500 overflow-hidden cursor-pointer">
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
                        <div className="relative overflow-hidden aspect-[4/3]">
                            <img alt={suite.title} className="w-full h-full object-cover" src={suite.img} />
                        </div>
                        <div className="pt-8 pb-4 px-2">
                            <div className="flex justify-between items-baseline mb-4">
                                <h3 className="font-serif text-2xl text-secondary dark:text-white group-hover:text-gray-600 transition-colors">{suite.title}</h3>
                                <div className="text-xl font-serif text-secondary dark:text-white">{suite.price}</div>
                            </div>
                            <div className="flex gap-6 py-4 border-t border-gray-100 dark:border-gray-800 text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                {suite.features.map((f, i) => <span key={i}>{f}</span>)}
                            </div>
                            <button className="w-full mt-6 bg-transparent border border-gray-200 dark:border-gray-700 text-secondary dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black py-3 uppercase text-[10px] tracking-widest transition-all">
                                Reserve
                            </button>
                        </div>
                    </article>
                ))}
            </div>

            <div className="mt-20 flex justify-center">
                <button className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-black transition duration-300 ease-out border border-gray-900 rounded-sm shadow-md bg-white dark:bg-black dark:text-white dark:border-white">
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-black dark:bg-white dark:text-black group-hover:translate-x-0 ease">
                        <span className="material-icons-outlined">arrow_forward</span>
                    </span>
                    <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease dark:text-white text-xs uppercase tracking-widest font-bold">View All Accommodations</span>
                    <span className="relative invisible text-xs uppercase tracking-widest font-bold">View All Accommodations</span>
                </button>
            </div>
        </div>
    </section>
);

const Dining = () => {
    return (
        <section className="py-24 bg-[#FDFBF7] dark:bg-[#0A0A0A] overflow-hidden" id="dining">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Side: Culinary Story */}
                    <div className="space-y-6">
                        <div>
                            <span className="text-accent uppercase tracking-[0.2em] text-xs font-bold">Gastronomy</span>
                            <h2 className="font-serif text-4xl md:text-5xl text-secondary dark:text-white mt-2 leading-tight uppercase">
                                Today's Special<br />
                                <span className="font-light opacity-50">At Hotel Aarohi</span>
                            </h2>
                            <div className="w-12 h-0.5 bg-black dark:bg-white mt-6"></div>
                        </div>

                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm">
                            Discover our daily curated selection of pure Himalayan flavors,
                            prepared with fresh local ingredients by our master chefs.
                        </p>

                        <button className="text-secondary dark:text-white uppercase text-[10px] tracking-widest font-bold border-b border-black dark:border-white pb-1 hover:opacity-60 transition-all">
                            View Collection
                        </button>
                    </div>

                    {/* Right Side: Blackboard Menu */}
                    <div className="relative">
                        <div className="blackboard p-8 md:p-10 rounded-sm max-w-md mx-auto transform -rotate-1 shadow-2xl">
                            <div className="text-center mb-10 border-b border-white/10 pb-6">
                                <p className="chalk-text text-[10px] opacity-80 uppercase tracking-[0.3em] mb-2">
                                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                                </p>
                                <h3 className="chalk-text text-3xl mb-1">Today's Menu</h3>
                                <p className="chalk-text text-sm opacity-60 uppercase tracking-widest">Special Selection</p>
                            </div>

                            <div className="space-y-6">
                                {[
                                    { name: 'Thakali Thali', desc: 'Basmati rice, black lentil set', price: '1,250' },
                                    { name: 'Signature Mo:Mo', desc: 'Buffalo or chicken dumplings', price: '550' },
                                    { name: 'Newari Khaja', desc: 'Authentic local platter', price: '950' },
                                    { name: 'Himalayan Trout', desc: 'Pan-seared local fish', price: '1,450' },
                                    { name: 'Juju Dhau', desc: 'Bhaktapur yogurt brulée', price: '450' }
                                ].map(item => (
                                    <div key={item.name} className="flex justify-between items-baseline gap-4">
                                        <div className="flex-1">
                                            <h4 className="chalk-text text-lg uppercase tracking-tight">{item.name}</h4>
                                            <p className="chalk-text text-xs italic opacity-50">{item.desc}</p>
                                        </div>
                                        <div className="chalk-accent text-lg font-bold">NPR {item.price}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="text-center mt-10 opacity-40">
                                <p className="chalk-text text-sm italic">Local Taste • Luxury Service</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Gallery = () => {
    const [selectedImg, setSelectedImg] = useState<string | null>(null);

    const images = [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA76qKrD0P6doBgfJWd5GBDTBnOq1DHXX3rXhiRiK2UDsJ5BqGR4t3riM8wuf2Dukz6a0Fy-vrEz7moBUQ8WukuDnXZkg8GMkE4SgFn2lkkyp2fABTjJRq1ESH6wqmAy3bMs3EwPtMg2jObFO38cJ1wNIWGk_rDR4D4eWGGdvdrAxekbq_qVq8or3QvhFG91F-eWVRTkg9Vofe2eOmARck1ZE2Djhrj_L7GHUgUhSuWJGoOa5nwfokQGXTe7IkQESjftAY0UF1pAHr7",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDGcgcSfQ3T5FEqiMRT0GulxTN2MqKukhPvuj3BXUl-wwm5C89YoBXSvepBXSiMJkYI_-U4yQPEaB8II8LaqO6evUw9P19dBncInn0L1qjSPfaPdEcasFbagVOx6GNLn8gtB7NlGhs64u9rKLrkFu6B87NyUbGEjWlbe0Kik7fXZY9gDtOhR9tmQypyEe9bJJTWxYEGKMw8dRcTvkCwbti_WiEHSFBF37d9NL2cMiwoUJHk4YRGAa5PW_DRMEcuq00E3HujcV2ar7CU",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDvWfJL2u9x8IC9MtL4ch1423YeMRtcqyN68EbmRR1akt_qYW3JlcGGsgUfPNa-sIGcsqWtq7oNFi2RKhRHQotoawMXZlElMlNDf-sPUUT6-GkOecm8kiy58me2aMUbwpPevX7_5GXqxJ6_JEIUT6249EMndSU0tGgElmAtSaZkUCi4gbtugl-THpgsstWkUxS21nzpu96SBSTB7LtEZfNznBlm_ctQ2RKQ4-3zRVmEK-m5bv2yKv10erylZNsqpQMeDHYAgKrLF9J7",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDLd7u4stdwq-jyFc5OB9XTls__s16ViwW6K9uDXCxE_kpsWwBn0cDYRi0R_Ohc3qrwwnEmjqZbDIuZD04LiUyHipDb8x-VCqdTNHoGW2p2JspiXWCWfIhRx7xWsqbkETmF6-sbp2v3T41II35Crqk8pur3-r2C7tfDhUESWGLV0yaz3IiH7wfwuBhWwIiSHmOQqfM_i-89EmeTQte0i6FB5NARtmt4S44VW9XRKVK5BJvNu8LoZBfk-wQXXdi7MMLyDU-pY9OPkE-m",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDZh87yFJlXuyC2J1W23_0WRhN-evdbbUYhFVXyPZE7ArG3R8ZUUafmGMX75vB2tyhVWWgpTG_H0R_ruopIVpeeonNhfwOEIhl5kt74GP_a04uSe5B0rIa3xyqQsYdt5EarcchCszzic65nhWB8v1nUAA4HKrwpHdGDaev7hh63zB6ojwhSKQV_xgPpTfZd2OCV0YeSLc54YZRCiWgq6MhRVo1lfVPDd6aLXOKCEWf3ICbIdUF9QW9fr8NiK8ZIlVqkWw0KH-LCKyrO",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD20qMW5men1cFFZ89uitJ2OqRzV1XOhUPFsuZi9C4PBQszd8gr-DSMg0IqJIRrayH1ODAjgwjThLlKiUGNHBvWx6Tc2NHOYINcsfKA1sXzaABRbfcxUfR28z3-zKTWammhiggnJizrezXuG7gOAKYIEsbvnvoaxrKdYK479TPtX7YhW85WwNKV3gUkvTsFyRP5R7UXFt8LORF6j13fzzzOLXUCSJNCeXTr5c6f_dFZs9p4QCm7aS2umBKhFzS9_ALzrC4C1LYUHuUc"
    ];

    return (
        <section className="py-20 bg-snow-white dark:bg-[#121212]" id="gallery">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-accent uppercase tracking-[0.2em] text-xs font-bold">Visual Experience</span>
                    <h2 className="font-serif text-4xl md:text-5xl text-secondary dark:text-white mt-3 mb-6">Our Gallery</h2>
                </div>
                <div className="gallery-grid">
                    {images.slice(0, 3).map((img, i) => (
                        <div key={i} className="gallery-item cursor-pointer" onClick={() => setSelectedImg(img)}>
                            <img alt={`Gallery ${i + 1}`} src={img} />
                        </div>
                    ))}
                    <div className="gallery-item bg-black flex items-center justify-center">
                        <span className="font-serif text-white text-xl italic p-4 text-center">"Every detail matters."</span>
                    </div>
                    {images.slice(3, 6).map((img, i) => (
                        <div key={i + 3} className="gallery-item cursor-pointer" onClick={() => setSelectedImg(img)}>
                            <img alt={`Gallery ${i + 4}`} src={img} />
                        </div>
                    ))}
                    <div className="gallery-item bg-white flex items-center justify-center border border-gray-100">
                        <a className="text-accent uppercase tracking-widest text-xs font-bold border-b border-accent pb-1 hover:text-black hover:border-black transition-colors" href="#">View Full Gallery</a>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {selectedImg && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImg(null)}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-5xl w-full h-full flex items-center justify-center"
                        >
                            <img
                                src={selectedImg}
                                alt="Enlarged gallery view"
                                className="max-w-full max-h-full object-contain shadow-2xl border border-white/10"
                            />
                            <button
                                className="absolute top-0 right-0 m-4 text-white/50 hover:text-white transition-colors"
                                onClick={() => setSelectedImg(null)}
                            >
                                <span className="material-icons-outlined text-4xl">close</span>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

const Services = () => (
    <section className="py-24 bg-white dark:bg-[#0F0F0F] text-secondary dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div>
                    <h2 className="font-serif text-4xl mb-12 uppercase tracking-wide">Our Services</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
                        {[
                            { id: '01', title: 'Michelin Dining', desc: 'Elegant, high-impact culinary masterpieces.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArjmri9wQ4baZVMPfzyJDR0CjY9GkDI1ESlZOe-eHsFf5yJAh16P6U0V7Y6DbaV5E0bjAlWTOHBpLm4FS3QmM3ux_9kqhHNl6eQtfIZ6ooCnnUjLcrPy0R6c_PqWd-BdZLHcAq3siEgz1qDEbF6dpkW6RQQrYmpKCcjNA69k7i9tEnDJoffBAGgSniR70Cn3KGzMb6tUqurrv-6enVicxb7n-GPvoBx9IaxPeAo-T5g2ltLvoLcqhjR5AGfdqXOM-FE6yUr6w5w4EN' },
                            { id: '02', title: 'Holistic Spa', desc: 'Spaces designed to harmonize mind and body.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZh87yFJlXuyC2J1W23_0WRhN-evdbbUYhFVXyPZE7ArG3R8ZUUafmGMX75vB2tyhVWWgpTG_H0R_ruopIVpeeonNhfwOEIhl5kt74GP_a04uSe5B0rIa3xyqQsYdt5EarcchCszzic65nhWB8v1nUAA4HKrwpHdGDaev7hh63zB6ojwhSKQV_xgPpTfZd2OCV0YeSLc54YZRCiWgq6MhRVo1lfVPDd6aLXOKCEWf3ICbIdUF9QW9fr8NiK8ZIlVqkWw0KH-LCKyrO' },
                            { id: '03', title: 'Jet Charter', desc: 'Timeless transport blending form and function.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiAJ37GCSaPDLwnCzDYyuzvpIHudloHTlGox-gFuR3dKzaWDO1g9tXxC4Qcb5S-twCvDpjnoNhwFVDcQzsRtySI8YHrj18xNeVSGb1cpmRpFyLjnGXabrfMI4ocVOhyPd8KtGdqd3Cd_LDxrIf-S4cGfCcI4CdaBhmBqOwy1VcFAmbd62aU1T91VogyKggZwu2EkVCeg7Uxa_vUKrF6MQloZ4Y3gf5t7WWsC4uP9rG027pQdDBCDJhwC0BYwYjM8NubEY7FlyScrZx' },
                            { id: '04', title: 'Space Planning', desc: 'Purposeful interiors designed for flow and balance.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD20qMW5men1cFFZ89uitJ2OqRzV1XOhUPFsuZi9C4PBQszd8gr-DSMg0IqJIRrayH1ODAjgwjThLlKiUGNHBvWx6Tc2NHOYINcsfKA1sXzaABRbfcxUfR28z3-zKTWammhiggnJizrezXuG7gOAKYIEsbvnvoaxrKdYK479TPtX7YhW85WwNKV3gUkvTsFyRP5R7UXFt8LORF6j13fzzzOLXUCSJNCeXTr5c6f_dFZs9p4QCm7aS2umBKhFzS9_ALzrC4C1LYUHuUc' }
                        ].map(service => (
                            <div key={service.id} className="group">
                                <div className="overflow-hidden mb-6">
                                    <img alt={service.title} className="w-full h-56 object-cover grayscale group-hover:grayscale-0 transition duration-700" src={service.img} />
                                </div>
                                <div className="flex items-baseline gap-4 mb-3">
                                    <span className="text-xs font-bold text-gray-300">{service.id}</span>
                                    <h3 className="text-lg font-serif uppercase tracking-wider">{service.title}</h3>
                                </div>
                                <p className="text-gray-500 text-sm leading-relaxed font-light">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-cream dark:bg-[#151515] p-6 md:p-8 self-start sticky top-24 shadow-sm border border-black/5 dark:border-white/5">
                    <h2 className="font-serif text-2xl mb-8 uppercase tracking-widest">Lodge Elevation</h2>
                    <div className="flex flex-col gap-6">
                        <div className="w-full h-[220px] overflow-hidden rounded-sm">
                            <img
                                alt="Lodge Elevation"
                                className="w-full h-full object-cover object-center mix-blend-multiply dark:mix-blend-normal opacity-90 scale-110"
                                src="/lodge_profile.png"
                            />
                        </div>
                        <div className="w-full">
                            <ul className="space-y-3 text-xs font-light">
                                {[
                                    { name: 'Master Bedrooms', count: '20' },
                                    { name: 'Sweet Rooms', count: '5' },
                                    { name: 'Halls', count: '2' },
                                    { name: 'Private Cabins', count: '2' },
                                    { name: 'Restaurant', count: '1' },
                                    { name: 'Parking', count: '1' }
                                ].map(item => (
                                    <li key={item.name} className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                                        <span className="text-gray-500 dark:text-gray-400">{item.name}</span>
                                        <span className="font-medium">{item.count}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const Journal = () => (
    <section className="py-24 bg-snow-white dark:bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-16 mb-24 opacity-40 hover:opacity-100 transition-all duration-700 grayscale">
                <div className="flex flex-col items-center gap-3 text-center">
                    <span className="material-icons-outlined text-4xl">emoji_events</span>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-secondary dark:text-gray-300">World Luxury<br />Hotel Awards</div>
                </div>
                <div className="flex flex-col items-center gap-3 text-center">
                    <span className="material-icons-outlined text-4xl">star</span>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-secondary dark:text-gray-300">5 Star Diamond<br />Award 2023</div>
                </div>
                <div className="flex flex-col items-center gap-3 text-center">
                    <span className="material-icons-outlined text-4xl">verified</span>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-secondary dark:text-gray-300">Conde Nast<br />Traveler Choice</div>
                </div>
            </div>

            <div className="flex justify-between items-end mb-16 border-b border-gray-100 dark:border-gray-800 pb-6">
                <div>
                    <span className="text-gray-400 uppercase tracking-widest text-xs font-bold">From the Blog</span>
                    <h2 className="font-serif text-4xl text-secondary dark:text-white mt-3">The Journal</h2>
                </div>
                <a className="hidden md:inline-block text-secondary dark:text-white uppercase text-xs tracking-widest border-b border-transparent hover:border-black dark:hover:border-white pb-1 transition-all" href="#">View All Stories</a>
            </div>

            <div className="grid grid-cols-3 gap-6 md:gap-8">
                {[
                    { title: 'The Art of Autumnal Plating', cat: 'Dining', date: 'Oct 12, 2023', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGcgcSfQ3T5FEqiMRT0GulxTN2MqKukhPvuj3BXUl-wwm5C89YoBXSvepBXSiMJkYI_-U4yQPEaB8II8LaqO6evUw9P19dBncInn0L1qjSPfaPdEcasFbagVOx6GNLn8gtB7NlGhs64u9rKLrkFu6B87NyUbGEjWlbe0Kik7fXZY9gDtOhR9tmQypyEe9bJJTWxYEGKMw8dRcTvkCwbti_WiEHSFBF37d9NL2cMiwoUJHk4YRGAa5PW_DRMEcuq00E3HujcV2ar7CU' },
                    { title: 'Minimalism Warmth: Design', cat: 'Design', date: 'Sep 28, 2023', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvWfJL2u9x8IC9MtL4ch1423YeMRtcqyN68EbmRR1akt_qYW3JlcGGsgUfPNa-sIGcsqWtq7oNFi2RKhRHQotoawMXZlElMlNDf-sPUUT6-GkOecm8kiy58me2aMUbwpPevX7_5GXqxJ6_JEIUT6249EMndSU0tGgElmAtSaZkUCi4gbtugl-THpgsstWkUxS21nzpu96SBSTB7LtEZfNznBlm_ctQ2RKQ4-3zRVmEK-m5bv2yKv10erylZNsqpQMeDHYAgKrLF9J7' },
                    { title: 'Nature\'s Silent Embrace', cat: 'Wellness', date: 'Nov 05, 2023', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA76qKrD0P6doBgfJWd5GBDTBnOq1DHXX3rXhiRiK2UDsJ5BqGR4t3riM8wuf2Dukz6a0Fy-vrEz7moBUQ8WukuDnXZkg8GMkE4SgFn2lkkyp2fABTjJRq1ESH6wqmAy3bMs3EwPtMg2jObFO38cJ1wNIWGk_rDR4D4eWGGdvdrAxekbq_qVq8or3QvhFG91F-eWVRTkg9Vofe2eOmARck1ZE2Djhrj_L7GHUgUhSuWJGoOa5nwfokQGXTe7IkQESjftAY0UF1pAHr7' }
                ].map(post => (
                    <article key={post.title} className="group relative cursor-pointer bg-white dark:bg-[#141414] p-4 transition-all duration-500">
                        {/* Premium Golden Trace Overlay */}
                        <div className="absolute inset-0 pointer-events-none z-30">
                            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <rect
                                    x="0" y="0" width="100" height="100"
                                    pathLength="1"
                                    vectorEffect="non-scaling-stroke"
                                    className="stroke-primary stroke-1 md:stroke-2 fill-none border-trace-svg"
                                />
                            </svg>
                        </div>

                        <div className="overflow-hidden mb-6 aspect-video">
                            <img alt={post.title} className="w-full h-full object-cover transition duration-700" src={post.img} />
                        </div>
                        <div className="flex items-center text-[8px] md:text-[10px] text-gray-400 mb-3 uppercase tracking-widest space-x-2">
                            <span>{post.cat}</span>
                            <span className="w-px h-2 bg-gray-300"></span>
                            <span>{post.date}</span>
                        </div>
                        <h3 className="font-serif text-base md:text-xl lg:text-2xl text-secondary dark:text-white mb-3 group-hover:text-primary transition-colors uppercase leading-tight">{post.title}</h3>
                        <p className="hidden md:block text-gray-500 dark:text-gray-400 font-light mb-4 line-clamp-2 text-xs leading-relaxed">Curated journal entries exploring the intersection of luxury and silence.</p>
                        <button className="text-[9px] uppercase tracking-widest font-bold border-b border-black dark:border-white pb-1 transition-all">Read More</button>
                    </article>
                ))}
            </div>
        </div>
    </section>
);

const Map = () => (
    <section className="h-[500px] w-full relative bg-gray-900 overflow-hidden">
        <img alt="Map" className="w-full h-full object-cover opacity-50 grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLd7u4stdwq-jyFc5OB9XTls__s16ViwW6K9uDXCxE_kpsWwBn0cDYRi0R_Ohc3qrwwnEmjqZbDIuZD04LiUyHipDb8x-VCqdTNHoGW2p2JspiXWCWfIhRx7xWsqbkETmF6-sbp2v3T41II35Crqk8pur3-r2C7tfDhUESWGLV0yaz3IiH7wfwuBhWwIiSHmOQqfM_i-89EmeTQte0i6FB5NARtmt4S44VW9XRKVK5BJvNu8LoZBfk-wQXXdi7MMLyDU-pY9OPkE-m" />
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 dark:bg-black/80 p-12 text-center backdrop-blur-md max-w-lg mx-4 shadow-2xl">
                <span className="material-icons-outlined text-black dark:text-white text-4xl mb-6">near_me</span>
                <h3 className="text-secondary dark:text-white font-serif text-3xl mb-4">Locate Sanctuary</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 font-light leading-relaxed">Nestled in the pristine forests of Quebec, a 45-minute helicopter ride from Montreal.</p>
                <button className="text-black dark:text-white border border-black dark:border-white px-8 py-3 text-[10px] uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">Get Directions</button>
            </div>
        </div>
    </section>
);
const Footer = () => (
    <footer className="bg-white dark:bg-[#050505] text-secondary dark:text-white pt-24 pb-12 border-t border-gray-100 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                <div>
                    <h2 className="font-serif text-2xl font-bold mb-8 tracking-widest">AAROHI<span className="font-light">HOTELS</span></h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8 font-light">
                        A sanctuary of silence and style. Redefining luxury hospitality through architectural brilliance and impeccable service.
                    </p>
                    <div className="flex space-x-6 text-gray-400">
                        <span className="material-icons-outlined cursor-pointer hover:text-black dark:hover:text-white transition-colors">facebook</span>
                        <span className="material-icons-outlined cursor-pointer hover:text-black dark:hover:text-white transition-colors">camera_alt</span>
                        <span className="material-icons-outlined cursor-pointer hover:text-black dark:hover:text-white transition-colors">alternate_email</span>
                    </div>
                </div>

                <div>
                    <h4 className="text-gray-900 dark:text-white uppercase tracking-widest text-[10px] font-bold mb-8">Contact Us</h4>
                    <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400 font-light">
                        <li className="flex items-start">
                            <span className="material-icons-outlined text-gray-400 mr-3 text-base">location_on</span>
                            1200 Borealis Avenue,<br />Quebec, Canada
                        </li>
                        <li className="flex items-center">
                            <span className="material-icons-outlined text-gray-400 mr-3 text-base">phone</span>
                            +1 (555) 123-4567
                        </li>
                        <li className="flex items-center">
                            <span className="material-icons-outlined text-gray-400 mr-3 text-base">email</span>
                            reservations@aarohi.com
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-gray-900 dark:text-white uppercase tracking-widest text-[10px] font-bold mb-8">Explore</h4>
                    <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400 font-light">
                        {['Our Story', 'Suites & Villas', 'Dining', 'Wellness & Spa', 'Sustainability'].map(item => (
                            <li key={item}><a className="hover:text-black dark:hover:text-white transition-colors" href="#">{item}</a></li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-gray-900 dark:text-white uppercase tracking-widest text-[10px] font-bold mb-8">Newsletter</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 font-light">Subscribe for exclusive offers.</p>
                    <div className="flex flex-col space-y-4">
                        <input className="bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-800 text-secondary dark:text-white px-4 py-3 focus:outline-none focus:border-black dark:focus:border-white text-sm placeholder-gray-400" placeholder="Your Email" type="email" />
                        <button className="bg-black text-white dark:bg-white dark:text-black px-4 py-3 uppercase text-[10px] tracking-widest font-bold transition-all hover:bg-gray-800 dark:hover:bg-gray-200">Subscribe</button>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-900 pt-10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 font-light">
                <p>© 2026 Aarohi Hotels. All rights reserved.</p>
                <div className="flex space-x-8 mt-6 md:mt-0">
                    <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>
);

const Home = () => (
    <main className="font-sans antialiased text-secondary bg-snow-white dark:bg-[#0F0F0F] dark:text-ivory transition-colors duration-300">
        <Navbar />
        <Header />
        <Features />
        <Suites />
        <Dining />
        <Services />
        <Gallery />
        <Journal />
        <Map />
        <Footer />
    </main>
);

function App() {
    return (
        <>
            <SEO
                title="Aarohi | Snow-white Luxury"
                description="Experience the pinnacle of modern luxury at Aarohi Hotels. 7-star boutique experience featuring glass architecture and warm minimalism."
            />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </>
    );
}

export default App;
