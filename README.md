# Laboratorio: Convertidor de Texto a Imagen y Voz

Este proyecto es una aplicación web fullstack que permite convertir texto en imágenes utilizando un modelo de Hugging Face y transformar texto en voz mediante APIs públicas. El proyecto incluye un frontend desarrollado en Angular y un backend en Node.js.

## Requisitos Previos
Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu computadora:

- Node.js (versión 16 o superior).
- Angular CLI (versión 16 o superior).
- Un editor de texto o IDE como Visual Studio Code.
- Una conexión a Internet para acceder a las APIs públicas.

Además, asegúrate de tener configurado un archivo `.env` en el directorio del backend con las credenciales necesarias para las APIs.

## Estructura del Proyecto

### Frontend
- `index.html`: Página principal del frontend.
- `main.ts`: Archivo de entrada principal de Angular.
- `styles.css`: Estilos globales.
- `app/`: Carpeta que contiene los componentes de Angular.
- `assets/`: Carpeta para recursos como imágenes.

### Backend
- `server.js`: Archivo principal del servidor.
- `.env`: Archivo para configurar las variables de entorno (API keys y configuraciones).

## Instrucciones de Instalación y Ejecución

### 1. Clonar el Repositorio
Clona el repositorio desde GitHub a tu máquina local:
  ``bash

  - `git clone https://github.com/alrivera4/Lab2_3P.git/`
    
  - `cd Lab2_3P`

### 2. Configurar el backend
Instala las dependencias necesarias:
  npm install

### 3. Configura el archivo .env con las siguientes variables:

HUGGINGFACE_API_KEY=tu_api_key

### 4. Inicia el servidor backend:
  node server.js
  El backend estará disponible en http://localhost:3000.

### 5. Configurar el Frontend
en la terminal ejecuta:
  cd src
  npm install
  ng serve
### 6. El frontend estará disponible en http://localhost:4200.

Acceso a la Aplicación
  - Abre tu navegador web y visita http://localhost:4200.
  - Ingresa el texto que deseas convertir a imagen y voz.
  - Visualiza el resultado con la imagen generada y reproduce el audio generado.

### 7. Anexos
Vistas principales como:
Pantalla de inicio y ejecución.
![image](https://github.com/user-attachments/assets/4e13bce7-0ce0-42fa-b7f5-3b5660574059)

Se puede observar los resultados con la imagen y el audio generado.

### 8. Tecnologías Utilizadas
  - Frontend: Angular 16, Bootstrap.
  - Backend: Node.js, Express.
  - APIs: Hugging Face (generación de texto a imagen y conversión de texto a voz).
  - Control de Versiones: Git y GitHub.

### 9. Licencia
Este proyecto se encuentra bajo la licencia MIT.

### 10. Autores
  - Rodriguez Danny
  - Rivera Amanda
  - Moreno Douglas
