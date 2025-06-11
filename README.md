# desarrollo_web_Maria_Acuna


# CSS
Está hecho con colores pastel para que sea agradable de ver, intenté que los botones hicieran algo siempre que hubiera algún hover y que las letras contrastaran bien con el fondo para que fuera mas o menos facil de usar.

# Tablas
Están creadas dinámicamente, pensé que sería util para la T2 y sería menos trabajo en html.

# Formulario
Se permite el ingreso de archivos 5 veces en el apartado de fotos, en el ingreso de tema "otro" pensé en hacer que esto fuera una especie de clase especial que solo exista si se eige otro y que contenga el input del tema, esto para efectos de filtro si es que se requiere agregar uno a futuro.


# Estadisticas
Los gráficos están hechos con charts.js, y la data es aleatoria.



# Tarea 2 - Programación Web

## Descripción

Este proyecto implementa un sistema web en Flask + MySQL para registrar actividades ciudadanas.

## Decisiones Técnicas

- Se usó Flask por su simpleza y compatibilidad con SQLAlchemy.
- Se conservaron las validaciones JavaScript del formulario original.
- Se creó una carpeta `uploads/` para almacenar fotos subidas.
- Se limitaron las fotos a un máximo de 5, tanto en frontend como backend.
- Se usó paginación para mostrar actividades en bloques de 5 por página.

## Instalación

1. Clona el repositorio
2. Crea y activa un entorno virtual
3. Instala dependencias (`pip install -r requirements.txt`)
4. Crea y carga la base de datos con `tarea2.sql` y `region-comuna.sql`
5. Ejecuta `flask run`

## Credenciales

- DB: `cc5002`
- Password: `programacionweb`
