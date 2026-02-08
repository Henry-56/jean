
import { Facebook, Instagram, Twitter, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-black text-white flex items-center gap-2">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-zinc-700">
                                <img src="/api/images/jean/logo-1770568717019.jpeg" alt="Logo" className="object-cover w-full h-full" />
                            </div>
                            JEAN SNEAKERS
                        </h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            La casa de las zapatillas exclusivas. Jean Sneakers te trae lo último en moda urbana y lanzamientos limitados.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://www.tiktok.com/@jean.snekears" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.45-.13 3.52-.06 7.04-.15 10.56-.14 2.01-1.04 4.03-2.8 5.14-1.61 1.05-3.77 1.34-5.6 1.03-2.03-.31-3.95-1.74-4.83-3.61-.92-1.92-.81-4.3.38-6.1 1.01-1.57 2.82-2.61 4.7-2.67 1.13-.04 2.27.17 3.32.58.01-.89 0-1.78.01-2.67-1.16-.4-2.4-.55-3.6-.39-2.14.3-4.21 1.6-5.32 3.49-1.12 1.95-1.18 4.46-.3 6.47.8 1.86 2.47 3.43 4.47 3.92 2.13.52 4.58.07 6.35-1.28 1.72-1.33 2.5-3.56 2.41-5.71-.02-3.32-.01-6.64-.01-9.96-.01-2.4 1.57-4.57 3.97-5.01V.02h-4.26c-.01.88-.01 1.76-.01 2.64-.01.01-.01.01-.02.02V.02z" /></svg>
                            </a>
                            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white">Enlaces Rápidos</h3>
                        <ul className="space-y-2 text-sm text-zinc-400">
                            <li><a href="/" className="hover:text-white transition-colors">Inicio</a></li>
                            <li><a href="#catalogo" className="hover:text-white transition-colors">Catálogo</a></li>
                            <li><a href="#ubicacion" className="hover:text-white transition-colors">Ubicación</a></li>
                            <li><a href="/admin" className="hover:text-white transition-colors">Admin</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white">Contacto</h3>
                        <ul className="space-y-3 text-sm text-zinc-400">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-zinc-500 shrink-0" />
                                <span>Av. Ferrocarril 1035, Real Plaza Huancayo 12001, Perú</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-zinc-500 shrink-0" />
                                <span>+51 943 677 832</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-zinc-500 shrink-0" />
                                <span>ventas@jeansneakers.pe</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-zinc-900 pt-8 text-center">
                    <p className="text-zinc-600 text-sm">
                        © {new Date().getFullYear()} Jean Sneakers. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
