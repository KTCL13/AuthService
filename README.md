#  AuthService

Servicio de autenticación responsable de registro, inicio de sesión, gestión de tokens y autorización.

---

##  Tech Stack

- **Node.js**: Entorno de ejecución de JavaScript.  
- **Express**: Framework minimalista para creación de APIs.  
- **Sequelize**: ORM para interacción con PostgreSQL.  
- **PostgreSQL**: Base de datos relacional principal.  
- **JWT (JSON Web Token)**: Autenticación segura basada en tokens.  
- **bcrypt**: Cifrado de contraseñas.  
- **Docker**: Entorno reproducible de base de datos local.  
- **Jest & Supertest**: Pruebas unitarias y de integración automatizadas.  
- **dotenv**: Manejo de variables de entorno.  

---

##  Instalación y ejecución local

### 1️ Clona el repositorio

```bash
git clone https://github.com/tu-usuario/AuthService.git
cd AuthService
```

---

### 2️ Instala las dependencias

```bash
npm install
```

---

### 3️ Configura las variables de entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
NODE_ENV=development
PORT=3000

NODE_ENV=development
PORT=3000
DATABASE_URL=postgres://auth_user:auth_password@localhost:5432/auth_db
JWT_SECRET=una_clave_super_secreta
JWT_EXPIRES_IN=1h

# Config opcional
EMAIL_SERVICE=gmail
EMAIL_USER=admin@quejas.com
EMAIL_PASS=a123
```

---

### 4️ Levanta la base de datos local con Docker

Asegúrate de tener **Docker** y **docker-compose** instalados, luego ejecuta:

```bash
docker-compose up -d
```

Esto creará un contenedor **PostgreSQL** accesible en `localhost:5432`.

---

### 5️ Inicializa la base de datos

Ejecuta las migraciones y los seeds para crear las tablas y datos iniciales:

```bash
npm run db:migrate
npm run db:seed
```

Si necesitas reiniciar la base de datos:

```bash
npm run db:reset
```

---

### 6️ Inicia el servidor

```bash
npm start
```

El servidor estará disponible en:  
 [http://localhost:3000](http://localhost:3000)

---

##  Scripts útiles

| Comando | Descripción |
|----------|--------------|
| `npm run dev` | Ejecuta el servidor en modo desarrollo con reinicio automático (nodemon). |
| `npm test` | Ejecuta las pruebas unitarias y de integración con Jest y Supertest. |
| `npm run lint` | Revisa el código con ESLint. |
| `npm run lint:fix` | Corrige errores de linting automáticamente. |
| `npm run db:migrate` | Ejecuta migraciones de la base de datos. |
| `npm run db:seed` | Inserta datos de ejemplo en la base de datos. |
| `npm run db:reset` | Elimina y recrea la base de datos (para desarrollo). |

---

##  Pruebas

Para ejecutar las pruebas unitarias y de integración:

```bash
npm test
```

---

#  Endpoints principales - AuthService

## **POST /api/auth/register**
Crea un nuevo usuario en la base de datos.

**Body (JSON):**
```json
{
  "name": "usuario X",
  "email": "usuario@example.com",
  "password": "123456"
}
```

**Respuesta (201 Created):**
```json
{
  "message": "Usuario registrado correctamente",
  "user": {
    "id": 1,
    "name": "usuario X",
    "email": "usuario@example.com"
  }
}
```

---

## **POST /api/auth/login**
Inicia sesión y devuelve un **token JWT** para futuras peticiones.

**Body (JSON):**
```json
{
  "email": "usuario@example.com",
  "password": "123456"
}
```

**Respuesta (200 OK):**
```json
{
  "message": "Inicio de sesión exitoso",
  "token": "<jwt_token>",
  "user": {
    "id": 1,
    "email": "usuario@example.com"
  }
}
```

---

## **GET /api/auth/profile**
Obtiene la información del usuario autenticado mediante el token JWT.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Respuesta (200 OK):**
```json
{
  "id": 1,
  "name": "usuario X",
  "email": "usuario@example.com",
  "createdAt": "2025-10-27T14:00:00.000Z"
}
```

---

## **POST /api/auth/logout**
Invalida el token actual o cierra la sesión del usuario (opcional según implementación).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Respuesta (200 OK):**
```json
{
  "message": "Sesión cerrada correctamente"
}
```

---

## **PATCH /api/auth/change-password**
Permite al usuario cambiar su contraseña.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Body (JSON):**
```json
{
  "oldPassword": "123456",
  "newPassword": "nuevaClave789"
}
```

**Respuesta (200 OK):**
```json
{
  "message": "Contraseña actualizada exitosamente"
}
```


##  Licencia

Este proyecto está bajo la licencia **MIT**.

---

##  Contacto
Para dudas o sugerencias, abre un issue o contacta a través de los canales habituales.
