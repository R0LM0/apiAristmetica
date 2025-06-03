# 🧮 API Aristmética - Backend para Math Fun for Kids

Este repositorio contiene el backend de la aplicación educativa **Math Fun for Kids**, desarrollado con **Node.js**, **Express** y **PostgreSQL**, utilizando **Sequelize** como ORM. El objetivo principal es gestionar usuarios, progreso, niveles, autenticación y respuestas matemáticas.

---

## 🚀 Tecnologías utilizadas

- **Node.js**: Entorno de ejecución para JavaScript.
- **Express**: Framework para construir APIs REST.
- **PostgreSQL**: Base de datos relacional.
- **Sequelize**: ORM para facilitar consultas SQL.
- **jsonwebtoken**: Para autenticación basada en JWT.
- **dotenv**: Gestión de variables de entorno.
- **cors** y **morgan**: Seguridad y logging.
- **ws**: WebSocket para comunicación en tiempo real (opcional).

---

## ⚙️ Instalación

```bash
git clone https://github.com/R0LM0/apiAristmetica.git
cd apiAristmetica
📦 Dependencias
npm install
npm install express pg pg-hstore sequelize jsonwebtoken dotenv
npm install --save-dev nodemon sequelize-cli
npm install morgan cors
npm install ws
📁 Estructura del Proyecto (Clean Architecture)

src/
├── entities/              # Modelos del dominio (usuarios, sesiones, etc.)
│   ├── User.js
│   └── Location.js
├── use-cases/             # Casos de uso (login, registro, lógica de progreso)
│   ├── CreateUser.js
│   └── UserAuthentication.js
├── infrastructure/
│   ├── repositories/
│   └── database/
├── interface/
│   ├── controllers/
│   └── routes/
└── index.js               # Punto de entrada principal


📦 Despliegue
Este backend se encuentra desplegado en Render.com y expone su API mediante HTTPS. Puede conectarse directamente desde apps Flutter u otros clientes.

🔗 Repositorio del Frontend
📱 math_learning_app (Flutter)

🧠 Créditos
Este proyecto fue desarrollado como parte del curso de Diseño de Base de Datos y Servidores de la Universidad Nacional Casimiro Sotelo Montenegro. Se utilizaron herramientas modernas y apoyo con inteligencia artificial (ChatGPT) para mejorar código, resolver errores y generar propuestas de estructura.

📝 Licencia
MIT © 2025 - Equipo Numoki
