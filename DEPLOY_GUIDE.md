
# 🚀 Guía de Despliegue en Vercel

Sigue estos pasos para poner tu tienda **Jean Sneakers** en línea para todo el mundo.

### 1. Sube tu código a GitHub
Si aún no lo has hecho, inicializa un repositorio y sube tu proyecto:
```bash
git init
git add .
git commit -m "feat: ready for deployment"
# Crea un repo en GitHub y sigue sus instrucciones para el 'git remote add' y 'git push'
```

### 2. Importa el proyecto en Vercel
1. Ve a [Vercel Dashboard](https://vercel.com/dashboard).
2. Haz clic en **"Add New"** > **"Project"**.
3. Selecciona tu repositorio de GitHub.

### 3. Configura las Variables de Entorno (CRÍTICO)
En la sección **"Environment Variables"**, copia y pega los valores de tu archivo `.env.local`. **Es muy importante** que pongas todas estas:

*   `DATABASE_URL`
*   `R2_ACCESS_KEY_ID`
*   `R2_SECRET_ACCESS_KEY`
*   `R2_BUCKET`
*   `R2_ENDPOINT`
*   `NEXT_PUBLIC_WHATSAPP_NUMBER`
*   `ADMIN_PASSWORD`

### 4. Despliega
Haz clic en **"Deploy"**. Vercel tardará un par de minutos en compilar y darte tu URL pública.

### 5. Configuración de Imágenes (Cloudflare R2)
Debido a que usamos un proxy de imágenes API, asegúrate de que tu `metadataBase` en `app/layout.tsx` use la URL final de Vercel para que las imágenes de SEO funcionen bien.

---
¡Felicidades! Una vez terminado, tu tienda estará disponible en la web. 👟🔥
