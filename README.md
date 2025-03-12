# NimbusHub

NimbusHub es una aplicación para consultar el clima actual en diferentes ciudades, además de mostrar la temperatura y el pronóstico según la ubicación del usuario. Esta aplicación está construida con React y Vite para un rendimiento rápido y una experiencia de usuario fluida.

## Enlace

Puedes acceder a la aplicación y consultar el clima en el siguiente enlace:

[nimbushub.netlify.app](https://nimbushub.netlify.app)

## Funcionalidades

- Consulta el clima actual de cualquier ciudad.
- Visualiza el pronóstico de temperatura y condiciones climáticas.
- Obtén el clima basado en tu ubicación actual.
- Interfaz sencilla y fácil de usar.


# Guía de Rutas

- **/**  
  Clima local (geolocalización).

- **/city**  
  Lista de ciudades. Al hacer clic, redirige a `/city/:lat/:lon`.

- **/city/:lat/:lon**  
  Clima para coordenadas específicas.

- **/localForecast** y **/cityForecast**  
  Pronósticos local y por ciudad.
  
## Tecnologías utilizadas

- React
- Vite
- API de OpenWeather (para obtener la información del clima)
- CSS

## Instalación

Si deseas clonar y ejecutar este proyecto en tu máquina local, sigue estos pasos:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/GonzalokHM/NimbuHub.git
