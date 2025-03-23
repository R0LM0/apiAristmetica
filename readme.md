# npm init -y
# npm install express pg pg-hstore sequelize jsonwebtoken dotenv
<!-- Explicación de las dependencias:

express: Framework para construir el servidor API.
pg y pg-hstore: Driver de PostgreSQL para Node.js y Sequelize.
sequelize: ORM que facilita el manejo de la base de datos.
jsonwebtoken: Para manejar la autenticación basada en JWT.
dotenv: Para cargar variables de entorno desde un archivo .env. -->
# npm install --save-dev nodemon sequelize-cli
<!-- Explicación de las devDependencies:

nodemon: Observa los archivos y reinicia automáticamente el servidor al hacer cambios.
sequelize-cli: Herramienta para manejar migraciones, seeders y otras utilidades relacionadas con Sequelize. -->
# npm install morgan cors
<!-- Resumen:
Morgan: Middleware de registro de solicitudes HTTP para depuración y monitoreo de tráfico.
CORS: Middleware para habilitar o restringir solicitudes HTTP de diferentes orígenes (dominios) según las reglas de CORS.
Ambos son herramientas esenciales para el desarrollo de APIs seguras y monitoreadas -->
# npm install ws
# Clean Architecture
src/
│
├── entities/            # Modelos del dominio (usuarios, sesiones, ubicaciones, etc.)
│   └── User.js
│   └── Location.js
│
├── use-cases/           # Casos de uso (autenticación, registro, manejo de ubicaciones, etc.)
│   └── UserAuthentication.js
│   └── CreateUser.js
│
├── interface-adapters/  # Controladores y validaciones
│   └── controllers/
│       └── UserController.js
│   └── dtos/
│       └── UserDTO.js
│
├── infrastructure/      # Interacción con bases de datos y otras tecnologías
│   └── database/
│       └── models/      # Modelos de Sequelize
│           └── UserModel.js
│   └── services/
│       └── UserService.js
│   └── repositories/
│       └── UserRepository.js
│
├── config/              # Configuración del proyecto (Sequelize, variables de entorno, etc.)
│   └── database.js
│
├── index.js             # Archivo principal de inicio del servidor
