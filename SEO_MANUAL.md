
# 🚀 Guía de Configuración SEO y Google Search Console

Esta guía te ayudará a registrar tu tienda **Drip Store Huancayo** en Google para que aparezca en los resultados de búsqueda.

## ✅ Paso 1: Desplegar a Producción
Antes de configurar Google, tu web debe estar publicada en internet (por ejemplo, en Vercel).
1.  Sube tu proyecto a [Vercel](https://vercel.com).
2.  Obtén tu dominio final (ej: `https://dripstore-huancayo.vercel.app` o tu dominio `.pe`).

## ⚙️ Paso 2: Configurar URL Base
Una vez tengas tu dominio, ve a tu proyecto en Vercel:
1.  Settings -> Environment Variables.
2.  Añade una variable llamada `NEXT_PUBLIC_APP_URL`.
3.  Valor: `https://tu-dominio-final.com` (sin barra al final).
4.  Redespliega el proyecto (Redeploy).

## 🔍 Paso 3: Google Search Console
1.  Ve a [Google Search Console](https://search.google.com/search-console).
2.  Inicia sesión con tu cuenta de Google.
3.  **Añadir propiedad**:
    *   Si tienes dominio propio (`.pe`), elige **Dominio** (requiere configurar DNS).
    *   Si usas Vercel (`.app`), elige **Prefijo de URL** y pon `https://tu-proyecto.vercel.app`.
4.  **Verificación**:
    *   El método más fácil es **Etiqueta HTML**: Copia la meta etiqueta que te dan.
    *   Pónmela en el chat y yo la agrego a tu `layout.tsx`, o agrégala tú mismo en el `<head>`.

## 🗺️ Paso 4: Enviar Sitemap
Una vez verificado:
1.  En el menú de la izquierda, ve a **Sitemaps**.
2.  En "Añadir un sitemap nuevo", escribe `sitemap.xml`.
3.  Dale a **Enviar**.
4.  Google leerá tu archivo y descubrirá tus páginas automáticamente.

## 📊 Paso 5: Validar Datos Estructurados (JSON-LD)
Tu web ya incluye datos para que Google sepa que eres una **Tienda en Huancayo**.
1.  Ve a [Prueba de resultados enriquecidos](https://search.google.com/test/rich-results).
2.  Pon la URL de tu web.
3.  Debería detectar un elemento **"Store"** o **"LocalBusiness"** válido.

---

### 💡 Tips Adicionales
*   **Imágenes**: Trata de que tus imágenes de productos tengan nombres descriptivos antes de subirlas (ej: `nike-dunk-panda-peru.jpg` en lugar de `img-123.jpg`).
*   **Redes Sociales**: Comparte tu enlace en Facebook/Instagram. La previsualización ahora se verá profesional gracias a las etiquetas "Open Graph" que hemos configurado.
