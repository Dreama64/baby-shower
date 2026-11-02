# Verificación de la web integrada

La web fue rediseñada tras la revisión del usuario: navegación, portada a dos columnas, fecha y ubicación, contador, catálogo integrado y confirmación por WhatsApp. Conserva la paleta y las ilustraciones de la referencia Canva.

Verificación visual a 1280 px y 390 px: sin desbordamiento horizontal, imágenes cargadas, navegación interna y apertura/cierre del formulario de regalo correctos. El catálogo sin Supabase muestra seis ejemplos explícitos y no permite confirmar reservas. No se inventan reservas ni nombres de invitados.

Compilación de producción y revisión TypeScript correctas con Webpack. Capturas desktop.jpg, mobile.jpg e integrated-gifts.jpg actualizadas con el rediseño.

El 2 de noviembre de 2026 se creó un proyecto nuevo de Supabase y se aplicaron la migración y el catálogo inicial. Se configuraron las variables públicas de GitHub Actions y se desplegó la web con conexión real. Una cuenta creada por el usuario fue incluida en la lista de administradores; las contraseñas permanecen fuera del código y del chat.

Prueba real contra la API pública: dos reservas simultáneas sobre un regalo temporal produjeron exactamente un ganador y un error de unicidad para la segunda petición. El reintento del ganador fue idempotente. El estado reservado persistió y fue visible en el catálogo público; el nombre del invitado no fue accesible anónimamente. Las inserciones directas en reservas fueron rechazadas. El regalo y la reserva temporales se eliminaron con autorización explícita del usuario.

Estado comprobado por SQL tras limpiar: un administrador, seis regalos y cero reservas. Comprobación web: catálogo real sin aviso de ejemplo y botones de reserva habilitados. El acceso interactivo con la contraseña elegida debe comprobarlo el usuario desde /admin/; no se solicitó ni se leyó esa contraseña.
