# Nuestro Baby Shower

Web de Valentina y Sergio para el **12 de diciembre de 2026, 14:30, America/Santiago**, inspirada en la [referencia Canva](https://sea-turtle-q4pqwm.my.canva.site/nuestrobabyshower). Next.js App Router, TypeScript, Tailwind CSS y Supabase. Solo regalos por reserva, **sin pagos**. Rediseñada como una web con navegación, portada a dos columnas, detalles del evento, catálogo integrado y confirmación por WhatsApp.

## Incluido

- `/`: web responsive con secciones de celebración, regalos y asistencia. Conserva la paleta, ilustraciones, nombres, fecha y ubicación; incorpora una presentación nueva adaptada a web y un contador propio.
- `/regalos`: imágenes, filtro disponible/reservado, formulario con nombre, confirmación y actualización cada 15 segundos y al recuperar el foco.
- `/admin`: acceso con Supabase Auth, alta y edición de regalos, imagen por URL, orden, ocultación y listado/liberación de reservas.
- SQL con RLS, lista explícita de administradores, RPC de reservas, bloqueo de fila, `UNIQUE(gift_id)` e idempotencia por solicitud UUID. La persistencia es PostgreSQL real; no se usa localStorage para reservas.
- Los nombres de invitados nunca aparecen en el catálogo ni pueden consultarse anónimamente. El navegador usa únicamente la clave pública de Supabase; no se necesita service-role.

## Arranque local

Requiere Node.js 22 o superior y npm.

```sh
npm ci
cp .env.example .env.local
# Completa los dos valores públicos de un proyecto NUEVO de Supabase.
npm run dev
```

Abrir `http://localhost:3000`. Sin configuración de Supabase, se muestran seis regalos de ejemplo identificados como tales. Se puede abrir su formulario, pero la confirmación está deshabilitada hasta conectar Supabase; nunca simula una reserva exitosa. Con Supabase configurado, los regalos y estados provienen de la base real y se habilita la reserva.

## Supabase: proyecto nuevo

1. Crear un **proyecto nuevo**. No ejecutar estas migraciones en bases existentes.
2. En SQL Editor ejecutar, una vez, `supabase/migrations/001_initial.sql`.
3. Opcionalmente ejecutar `supabase/seed.sql`. Son **regalos de ejemplo**, con ilustraciones locales; confirmar tallas y productos con los anfitriones. No se extrajo un catálogo de regalos de Canva: su botón llevaba a un enlace de edición.
4. En Authentication → Users crear el usuario de los anfitriones. Configurar su contraseña directamente en Supabase, sin incorporarla al código. Desactivar el registro público si no se necesita. La aplicación no ofrece registro ni acceso administrativo automático.
5. Copiar el UUID del usuario y ejecutar en SQL Editor:

```sql
insert into public.admins(user_id) values ('UUID_REAL_DEL_USUARIO');
```

6. Copiar Project URL y publishable key / anon key a `.env.local`:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://TU_PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=TU_CLAVE_PUBLICA
```

7. Reiniciar el servidor. Entrar en `/admin` con el usuario autorizado y revisar los regalos. El panel admite imágenes mediante URL HTTPS o los SVG incluidos en `/gifts/`. Puede usarse un bucket de Supabase Storage para alojar fotos y pegar sus URLs públicas; esta versión no incluye subida de archivos.

**No colocar** contraseñas, claves service-role, secretos JWT ni conexión de PostgreSQL en variables `NEXT_PUBLIC_*`, GitHub, README o archivos versionados. `.env.local` está ignorado. La clave pública está diseñada para estar en el navegador; la seguridad depende de las políticas SQL incluidas.

## Verificación

```sh
npm run typecheck
npm run build
```

Prueba real de concurrencia y permisos, **solo en un proyecto nuevo de pruebas**, con la migración aplicada y un administrador autorizado:

```dotenv
# Añadir únicamente a .env.local, nunca al repositorio:
TEST_ADMIN_EMAIL=correo_del_administrador_de_pruebas
TEST_ADMIN_PASSWORD=contraseña_del_administrador_de_pruebas
```

```sh
npm run test:integration
```

La prueba crea un regalo, lanza dos reservas anónimas simultáneas y exige un único ganador; prueba reintentos, estado persistido, protección de nombres e inserciones directas. Al finalizar libera la reserva y oculta el regalo de pruebas. No ejecutar contra el catálogo del evento.

Consultar `verification/NOTES.md` para el alcance de las comprobaciones realizadas en la entrega. Sin un proyecto conectado no puede afirmarse que se haya probado la persistencia en vivo.

## Despliegue en Vercel

1. Importar **Dreama64/baby-shower** como un proyecto nuevo.
2. Framework: Next.js. Directorio raíz: raíz del repositorio. Instalación: `npm ci`; build: `npm run build`.
3. Añadir las dos variables públicas de Supabase en Production y, si se usan, Preview. Redeploy después de cambiarlas: Next.js las incorpora al compilar.
4. Configurar en Supabase Auth la Site URL con el dominio final. Esta aplicación usa contraseña; si se habilitan invitaciones o recuperación por correo, configurar también sus redirects.
5. Probar desde dos navegadores que el mismo regalo solo puede reservarse una vez, que recargar mantiene la reserva, y que un usuario sin permisos no puede leer los nombres ni administrar.
6. Revisar productos, fecha, lugar y teléfonos con los anfitriones antes de compartir el enlace.

Alternativa: cualquier host Node que ejecute `npm ci`, `npm run build` y `npm start`, con las mismas variables. No es un sitio estático exportado.

## Decisiones visuales y recursos

Se inspeccionaron todas las secciones de Canva. Tras la revisión del usuario, la composición se rediseñó como una web: navegación, portada a dos columnas, detalles del evento, catálogo integrado y asistencia. Se conservaron los datos del evento, la cita, los nombres y la identidad visual. El botón de la portada lleva a `#regalos`; `/regalos` también permite abrir el catálogo directamente. El contador respeta el instante `2026-12-12T14:30:00-03:00` y deja de descontar en cero.

Las ilustraciones, SVG y fuentes de `public/invitation` proceden de la referencia facilitada; no se importó el código de ejecución de Canva. La composición usa secciones fluidas y una adaptación específica a móvil. La nube tiene un movimiento suave que se desactiva con la preferencia de movimiento reducido. Los regalos usan SVG originales de este proyecto y pueden sustituirse por fotos desde el panel. Los recursos Canva no se ofrecen como una biblioteca bajo licencia abierta.

## Pendiente para publicar

- Crear/conectar Supabase, ejecutar migración y opcional seed, autorizar al administrador.
- Validar el catálogo real con los anfitriones.
- Ejecutar la prueba de integración sobre una base de pruebas.
- Crear el proyecto de despliegue y configurar sus variables; verificar dos reservas simultáneas en la web final.

No se modifican repositorios, bases de datos ni servicios existentes.
