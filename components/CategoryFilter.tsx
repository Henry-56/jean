
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { LayoutGrid, Loader2, Zap, Droplets, Hammer, Package } from 'lucide-react';

const categories = [
    { id: 'all', label: 'Todo', icon: Package },
    { id: 'miel', label: 'Miel Pura', icon: Droplets },
    { id: 'herramientas', label: 'Herramientas', icon: Hammer },
    { id: 'equipos', label: 'Equipos', icon: Zap },
];

export default function CategoryFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeCategory = searchParams.get('category') || 'all';

    const handleCategoryChange = (id: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (id === 'all') {
            params.delete('category');
        } else {
            params.set('category', id);
        }
        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mb-20">
            {categories.map((category) => {
                const isActive = activeCategory === category.id;
                const Icon = category.icon;

                return (
                    <button
                        key={category.id}
                        onClick={() => handleCategoryChange(category.id)}
                        className={`
                            px-8 py-4 rounded-2xl flex items-center gap-3 transition-all duration-500 text-sm font-black uppercase tracking-widest border-2
                            ${isActive
                                ? 'bg-white text-zinc-900 border-[#FFB900] shadow-xl shadow-yellow-100 scale-105'
                                : 'bg-zinc-50 text-zinc-400 border-zinc-50 hover:border-zinc-200 hover:bg-white hover:text-zinc-600'
                            }
                        `}
                    >
                        <Icon className={`w-5 h-5 ${isActive ? 'text-[#FFB900]' : 'text-zinc-300'}`} />
                        {category.label}
                    </button>
                );
            })}
        </div>
    );
}
