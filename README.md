## Clonar el repositorio 

```bash
git clone
```
## Instalar dependencias
```bash
npm install
```
## Se requiere tener instalado Docker y que se este ejecutando en el equipo
``` 
https://www.docker.com/products/docker-desktop
```
## Ejecutar el siguiente comando para crear la imagen de la base de datos
```
docker-compose up -d
```

## Correr el proyecto
```bash
npm start
```

## Para desplegar la app en produccion se debe ejecutar el siguiente comando que migra la base de datos en produccion
```
prisma:migrate:prod
```