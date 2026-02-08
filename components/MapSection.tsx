
import { MapPin } from 'lucide-react';

export default function MapSection() {
    return (
        <section id="ubicacion" className="py-20 bg-zinc-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-12 items-center">

                    {/* Text Content */}
                    <div className="w-full md:w-1/3 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-400 uppercase tracking-wider">
                            <MapPin className="w-3 h-3" />
                            Visítanos
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            Encuéntranos en el Corazón de Huancayo
                        </h2>
                        <p className="text-zinc-400 leading-relaxed">
                            Ven a ver nuestra colección exclusiva en persona. Estamos ubicados en una zona accesible para que puedas probarte tus sneakers favoritos.
                        </p>
                        <div className="space-y-4 pt-4 border-t border-zinc-900">
                            <div>
                                <h4 className="text-white font-medium">Dirección</h4>
                                <p className="text-zinc-500 text-sm">Av. Ferrocarril 1035, Real Plaza Huancayo</p>
                            </div>
                            <div>
                                <h4 className="text-white font-medium">Horario</h4>
                                <p className="text-zinc-500 text-sm">Lunes - Domingo: 10:00 AM - 10:00 PM</p>
                            </div>
                        </div>
                    </div>

                    {/* Map Container */}
                    <div className="w-full md:w-2/3 h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl relative group">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3901.625345688673!2d-75.20646692412852!3d-12.070083288168277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDA0JzEyLjMiUyA3NcKwMTInMTUuNCJX!5e0!3m2!1ses!2spe!4v1707400000000!5m2!1ses!2spe"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="grayscale hover:grayscale-0 transition-all duration-500"
                        ></iframe>

                        {/* Overlay for aesthetic */}
                        <div className="absolute inset-0 pointer-events-none border-4 border-zinc-800/50 rounded-2xl"></div>
                    </div>

                </div>
            </div>
        </section>
    );
}
