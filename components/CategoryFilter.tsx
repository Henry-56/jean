
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Shirt, Footprints, LayoutGrid } from 'lucide-react';

export default function CategoryFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get('category') || 'all';

    const categories = [
        { id: 'all', label: 'Todo', icon: LayoutGrid },
        { id: 'zapatillas', label: 'Zapatillas', icon: Footprints },
        { id: 'ropa', label: 'Ropa', icon: Shirt },
    ];

    const handleFilter = (id: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (id === 'all') {
            params.delete('category');
        } else {
            params.set('category', id);
        }
        router.push(`/?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = currentCategory === cat.id;

                return (
                    <button
                        key={cat.id}
                        onClick={() => handleFilter(cat.id)}
                        className={`
                            flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300
                            ${isActive
                                ? 'bg-white text-black border-white scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                                : 'bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:border-zinc-500 hover:text-white'
                            }
                        `}
                    >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-bold uppercase tracking-wider">{cat.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
