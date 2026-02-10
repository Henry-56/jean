
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MapSection from '@/components/MapSection';
import { db } from '@/lib/db';
import { products } from '@/lib/schema';
import { desc, eq } from 'drizzle-orm';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import CategoryFilter from '@/components/CategoryFilter';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  let query = db.select().from(products).orderBy(desc(products.createdAt));

  if (category && category !== 'all') {
    // @ts-ignore - drizzle type inference
    query = db.select().from(products).where(eq(products.category, category)).orderBy(desc(products.createdAt));
  }

  const allProducts = await query;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: 'Jean Sneakers Huancayo',
    image: 'https://dripstore.pe/api/images/jean/logo-1770568717019.jpeg',
    description: 'La mejor selección de Streetwear y Sneakers exclusivos en Huancayo.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Ferrocarril 1035, Real Plaza Huancayo',
      addressLocality: 'Huancayo',
      addressRegion: 'Junín',
      postalCode: '12001',
      addressCountry: 'PE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -12.0700833,
      longitude: -75.2064669,
    },
    url: 'https://jeansnekears.com',
    telephone: '+51 943 677 832',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '10:00',
        closes: '22:00',
      },
    ],
    priceRange: '$$',
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-purple-500 selection:text-white font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      {/* Hero Section Redesigned */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)]"></div>
        </div>

        <div className="z-10 text-center space-y-8 px-4 max-w-5xl mx-auto mt-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-medium text-white/80 tracking-widest uppercase">New Collection 2026</span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none">
            <span className="block bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-500">
              JEAN
            </span>
            <span className="block text-4xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mt-2">
              SNEAKERS
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
            Redefiniendo el streetwear en el centro del Perú. <br className="hidden md:block" />
            Calidad premium, exclusividad y estilo sin límites.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <a
              href="#catalogo"
              className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                VER COLECCIÓN <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
            <a
              href="#ubicacion"
              className="px-8 py-4 text-white border border-white/20 rounded-full font-medium hover:bg-white/10 transition-colors"
            >
              Visitar Tienda
            </a>
          </div>
        </div>
      </section>

      {/* Grid de Productos */}
      <section id="catalogo" className="max-w-7xl mx-auto px-4 py-32 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Latest Drops
            </h2>
            <p className="text-zinc-400">Las piezas más codiciadas de la temporada.</p>
          </div>
          <div className="h-px bg-zinc-800 flex-1 ml-8 hidden md:block mb-4"></div>
        </div>

        {/* Categories Filter */}
        <CategoryFilter />

        {allProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {allProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                size={product.size}
                imageUrl={product.imageUrl}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-zinc-900/30 rounded-3xl border border-zinc-800 border-dashed backdrop-blur-sm">
            <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 text-zinc-500" />
            </div>
            <p className="text-zinc-400 text-xl font-medium">Inventario agotado</p>
            <p className="text-zinc-600 text-sm mt-2">Estamos preparando el próximo drop.</p>
          </div>
        )}
      </section>

      {/* Map Section */}
      <MapSection />

      <Footer />
    </main>
  );
}
