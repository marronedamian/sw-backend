# Star Wars API

API RESTful de Star Wars con arquitectura hexagonal, conectada a SWAPI.dev. Permite explorar personajes, películas, naves y planetas, gestionar favoritos y comparar ítems.

## Características Principales

- ✅ **Arquitectura Hexagonal**: Dominio, aplicación e infraestructura separados.
- 🌐 **Conexión a SWAPI**: Datos en tiempo real de [swapi.dev](https://swapi.dev).
- ⭐ **Sistema de Favoritos**: Guarda tus ítems favoritos.
- ⚖️ **Comparación**: Compara personajes, naves o planetas.
- 🧪 **100% Testeado**: Cobertura completa con Jest.
- 🔐 **Seguridad**: Validación de datos y protección de rutas.

## Tecnologías

- **Backend**: NestJS
- **Base de Datos**: SQLite (favoritos)
- **Cache**: Redis
- **Testing**: Jest + Supertest
- **Documentación**: Swagger / OpenAPI

## Instalación

1. **Clonar repositorio**:

   ```bash
   git clone https://github.com/tu-usuario/star-wars-api.git
   ```

2. **Instalar dependencias**:

   ```bash
   npm install
   ```

3. **Configurar entorno (.env)**:
   ```bash
   cp .env.example .env
   ```

## Configuración (.env)

```env
PORT=3021
SWAPI_BASE_URL=https://swapi.info/api
DATABASE_URL=file:./db.sqlite
REDIS_HOST=localhost
REDIS_PORT=6379
CACHE_TTL=3600
```

## Ejecución

```bash
# Modo desarrollo
npm run start:dev

# Modo producción
npm run build
npm run start:prod

# Ejecutar tests
npm run test
```

## Estructura del Proyecto

```
src/
├── core/              # Lógica de negocio
│   ├── domain         # Modelos e interfaces
│   └── application    # Servicios y casos de uso
├── infrastructure/    # Implementaciones concretas
│   ├── adapters       # SWAPI, Redis
│   ├── controllers    # Endpoints REST
│   └── repositories   # Base de datos
├── config/            # Configuración
└── modules/           # Módulos organizados
```

## Uso de la API

### Endpoints Principales:

| Categoría   | Endpoint                           | Método | Descripción                 |
| ----------- | ---------------------------------- | ------ | --------------------------- |
| Personajes  | `/star-wars/people`                | GET    | Listar personajes           |
|             | `/star-wars/people/:id`            | GET    | Detalles de personaje       |
| Películas   | `/star-wars/films`                 | GET    | Listar películas            |
| Naves       | `/star-wars/starships`             | GET    | Listar naves espaciales     |
| Planetas    | `/star-wars/planets`               | GET    | Listar planetas             |
| Favoritos   | `/favorites`                       | POST   | Agregar favorito            |
|             | `/favorites?userId=:userId`        | GET    | Listar favoritos de usuario |
|             | `/favorites/:id`                   | DELETE | Eliminar favorito           |
| Comparación | `/star-wars/:type/compare?ids=1,2` | GET    | Comparar ítems              |

## Ejemplo: Obtener personaje

**GET** `/star-wars/people/1`

**Respuesta**:

```json
{
  "id": "1",
  "name": "Luke Skywalker",
  "height": "172",
  "mass": "77",
  "hair_color": "blond",
  "birth_year": "19BBY",
  "gender": "male",
  "homeworld": "https://swapi.dev/api/planets/1/",
  "films": ["https://swapi.dev/api/films/1/", "https://swapi.dev/api/films/2/"],
  "created": "2014-12-09T13:50:51.644000Z",
  "edited": "2014-12-20T21:17:56.891000Z"
}
```

## Documentación API (Swagger)

Accede a la documentación interactiva en tiempo de ejecución:  
👉 [http://localhost:3021/api](http://localhost:3021/api)

## Colección Postman

Importa la colección desde:  
📁 `docs/postman-collection.json`