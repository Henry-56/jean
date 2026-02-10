
'use client';

import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '51943677832';
    const message = "¡Hola Apicultura Elite! 🐝 Vengo de la página web y me gustaría consultar sobre sus productos de miel y equipamiento.";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-[90] bg-[#FFB900] text-black p-4 rounded-full shadow-[0_0_30px_rgba(255,185,0,0.3)] transition-all duration-300 hover:scale-110 hover:rotate-6 active:scale-90 group flex items-center gap-2 overflow-hidden max-w-[60px] hover:max-w-[200px]"
            aria-label="Contactar por WhatsApp"
        >
            <MessageCircle className="w-7 h-7 shrink-0" />
            <span className="font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                ¡Chatea con nosotros!
            </span>
        </a>
    );
}
