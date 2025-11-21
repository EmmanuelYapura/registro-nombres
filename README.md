# 📌 Proyecto SPA con Vue.js

Este proyecto es una **Single Page Application (SPA)** desarrollada con **Vue.js**, que incluye un sistema de autenticación (login/registro) y una sección protegida accesible solo para usuarios autenticados.
En esta app podras almacenar, editar y eliminar nombres en una base de datos **Firebase**, la tematica principal es para niñas. 

---

## 🚀 Tecnologías utilizadas
- [Vue.js 3](https://vuejs.org/) - Framework principal
- [Vue Router](https://router.vuejs.org/) - Manejo de rutas y protección de vistas
- [Firebase Authentication](https://firebase.google.com/docs/auth) - Autenticación de usuarios
- [Netlify](https://www.netlify.com/) - Deploy y hosting del proyecto

---

## 📂 Estructura del proyecto
```bash
src/
 ├── assets/         # Imágenes y recursos estáticos
 ├── components/     # Componentes reutilizables (LoginComponent, ListMain, etc.)
 ├── composables/    # Funciones reutilizables (useAuth)
 ├── router.js       # Configuración de rutas y protección con meta
 ├── App.vue         # Componente raíz
 └── main.js         # Punto de entrada de la app
```

---

## ⚙️ Funcionalidades
- ✅ Registro y login de usuarios con Firebase  
- ✅ Rutas protegidas (solo accesibles si el usuario está autenticado)  
- ✅ Redirección automática al login si el usuario no está logueado  
- ✅ SPA con navegación fluida sin recargar la página  
- ✅ Deploy automático en Netlify  

---

## ▶️ Instalación y ejecución local
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/usuario/nombre-del-proyecto.git nombre-del-proyecto
   cd nombre-del-proyecto
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Ejecutar en desarrollo:
   ```bash
   npm run dev
   ```

4. Abrir en el navegador:
   ```
   http://localhost:5173/
   ```
   
---

## 🌍 Deploy
El proyecto está desplegado en **Netlify**.  
Podés acceder en: [🔗 Demo en vivo](https://registro-nombres.netlify.app/)

---

## ⏰ Funciones en desarrollo 
- Modo para niños

---

## 👨‍💻 Autor
- Nombre: **Emmanuel Yapura**
- LinkedIn: [Emmanuel Yapura](https://www.linkedin.com/in/emmanuelyapura/)

---
