'use client';

import { Facebook, Instagram, Twitter, MapPin, Mail, Phone, ArrowUp } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-zinc-100 pt-24 pb-12 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20">
                    {/* Brand Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-[#FFB900] rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-100">
                                <span className="text-black font-black text-2xl">A</span>
                            </div>
                            <span className="text-3xl font-black text-zinc-900 tracking-tighter">
                                APICULTURA<span className="text-[#FFB900]">ELITE</span>
                            </span>
                        </div>
                        <p className="text-zinc-500 text-lg leading-relaxed max-w-md">
                            Líderes en equipos apícolas profesionales y derivados 100% naturales. Comprometidos con la excelencia del panal a tu mesa.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: Instagram, label: "Instagram" },
                                { icon: Facebook, label: "Facebook" },
                                { icon: Twitter, label: "Twitter" }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center text-zinc-400 hover:bg-[#FFB900] hover:text-black hover:shadow-lg transition-all"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-6 h-6" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Column */}
                    <div>
                        <h4 className="text-zinc-900 font-black uppercase tracking-widest text-sm mb-8">Compañía</h4>
                        <ul className="space-y-4">
                            {['Inicio', 'Catálogo', 'Testimonios', 'Ubicación', 'Portal Admin'].map((link) => (
                                <li key={link}>
                                    <a
                                        href={link === 'Inicio' ? '/' : link === 'Portal Admin' ? '/admin' : `#${link.toLowerCase()}`}
                                        className="text-zinc-500 hover:text-zinc-900 font-medium transition-colors"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="text-zinc-900 font-black uppercase tracking-widest text-sm mb-8">Contáctanos</h4>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4 group">
                                <div className="p-3 bg-zinc-50 rounded-xl text-[#FFB900] group-hover:bg-[#FFB900] group-hover:text-black transition-all">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-zinc-900 font-bold text-sm">Oficina Central</p>
                                    <p className="text-zinc-500 text-sm">Sector Industrial, Huancayo 12001, Perú</p>
                                </div>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <div className="p-3 bg-zinc-50 rounded-xl text-[#FFB900] group-hover:bg-[#FFB900] group-hover:text-black transition-all">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <a href="tel:+51943677832" className="text-zinc-500 font-medium hover:text-zinc-900 transition-colors">
                                    +51 943 677 832
                                </a>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <div className="p-3 bg-zinc-50 rounded-xl text-[#FFB900] group-hover:bg-[#FFB900] group-hover:text-black transition-all">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <a href="mailto:ventas@apiculturaelite.pe" className="text-zinc-500 font-medium hover:text-zinc-900 transition-colors">
                                    ventas@apiculturaelite.pe
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Final Row */}
                <div className="pt-10 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-zinc-400 text-sm font-medium">
                        © {currentYear} APICULTURA ELITE. Diseñado para la excelencia apícola.
                    </p>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="p-4 bg-zinc-50 rounded-2xl text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-all"
                    >
                        <ArrowUp className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </footer>
    );
}
