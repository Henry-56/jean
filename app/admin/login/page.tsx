
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            if (response.ok) {
                router.push('/admin');
                router.refresh();
            } else {
                setError('Contraseña incorrecta. Inténtalo de nuevo.');
            }
        } catch (err) {
            setError('Error de conexión. Inténtalo más tarde.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-zinc-900 flex items-center justify-center p-4 relative overflow-hidden font-sans">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#FFB900]/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-yellow-100/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="relative z-10 w-full max-w-md bg-white border border-zinc-100 p-10 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] space-y-10">
                <div className="text-center space-y-3">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#FFB900] to-[#E6A600] rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-yellow-100 transform -rotate-12">
                        <ShieldCheck className="w-10 h-10 text-black" />
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-[#FFB900] font-black uppercase tracking-[0.3em] text-[10px] mb-1">Acceso Seguro</span>
                        <h1 className="text-4xl font-black tracking-tighter text-zinc-900 uppercase">PORTAL<br /><span className="text-zinc-400">ADMIN</span></h1>
                    </div>
                    <p className="text-zinc-500 font-medium text-sm">Gestiona la colmena de Apicultura Elite.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Clave de Acceso</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-5 focus:ring-2 focus:ring-[#FFB900] focus:outline-none transition-all placeholder:text-zinc-300 font-bold tracking-widest"
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-xs font-black text-center bg-red-50 py-3 rounded-xl border border-red-100 animate-in fade-in zoom-in duration-500 uppercase tracking-tight">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all hover:bg-zinc-800 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group shadow-xl shadow-zinc-200 uppercase tracking-[0.2em] text-xs"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                INGRESAR <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </>
                        )}
                    </button>
                </form>

                <div className="pt-6 text-center">
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                        Apicultura Elite &copy; {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </div>
    );
}
