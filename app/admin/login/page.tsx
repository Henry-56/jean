
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight, Loader2 } from 'lucide-react';

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // We use a simple fetch to a small inline API or use cookies directly if we want
        // But better use a server action or an API route to set the cookie securely
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            if (response.ok) {
                router.push('/admin');
                router.refresh(); // Important to trigger middleware re-evaluation
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
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[128px]"></div>
            </div>

            <div className="relative z-10 w-full max-w-md bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl backdrop-blur-xl shadow-2xl space-y-8">
                <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-8 h-8 text-purple-500" />
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter">ACCESO ADMIN</h1>
                    <p className="text-zinc-400 text-sm font-light">Panel de Control Jean Sneakers</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-4 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder:text-zinc-800"
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm font-medium text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20 animate-in fade-in zoom-in duration-300">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-zinc-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                ENTRAR <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </>
                        )}
                    </button>
                </form>

                <p className="text-center text-xs text-zinc-600 pt-4">
                    Jean Sneakers &copy; {new Date().getFullYear()}
                </p>
            </div>
        </div>
    );
}
