ADA ITW - CARRERA DE BACKEND - DESAFIO INTEGRADOR TYPESRIPT

# Gestor de Turnos App

Esta aplicación proporciona una implementación básica de un sistema de gestión de turnos de pacientes en
Typescript. En una versíon próxima permitirá interactuar con Google Calendar. Se desarrolló para presentar 
como Trabajo Práctico integrador del Módulo Typescript, en la carrera de BACKEND de la institución educativa 
ADA ITW (2023).

# Autor: Graciela Benbassat
# Fecha: Septiembre 2023

- Desarrollado según patrón MVC

  /turno-app
    /src
      index.ts
      /controllers
        turnoController.ts
      /models
        turnoModel.ts
      /database
        db.json
    package.json
    README.md


## Instrucciones de uso

1. Instala las dependencias:

   npm install

    minimist
    picocolors
    axios
    readline-sync
 
    API Pública: Google Calendar (no incluido en esta versión)
    
    npm install

      googleapis
      dotenv
      
2. Ejecuta la aplicación con el comando

    npm run dev

3. Sigue las instrucciones de consola para gestionar turnos.

- Menu principal:

  Bienvenido al Sistema de Gestión de Turnos

  Seleccione una opción:
  1. Asignar turno
  2. Consultar turnos asignados.
  3. Consultar turnos disponibles.
  4. Cancelar turno.
  5. Consultar turnos cancelados.
  6. Salir
  Opcion:

- Funciones: 

  1- Asignar turno, selecciona la opción '1' y presiona Enter. Luego deberás ingresar el nombre del paciente y la fecha y hora del turno a asignar en formato "YYYY-MM-DD HH:MM". En caso de estar ocupado se informará con un mensaje por consola.
  
  2- Consultar los turnos asignados en una semana en particular. Selecciona la opción '2' y presiona Enter. Luego, la app te pedirá que ingreses la semana que deseas consultar. Debes ingresar la semana en el formato "YYYY-MM-DD". La aplicación retrocederá hasta el día lunes de la semana ingresada y te mostrará los turnos asignados desde el lunes hasta el sábado, dentro de la franja horaria laborable, de 8:00 a 20:00 hs. Se listarán todos los trunos asignados de la semana.

  3- Consultar turnos disponibles, selecciona la opción '3' y presiona Enter. Luego, la app te pedirá que ingreses la semana desde la que deseas consultar. Debes ingresar la semana en el formato "YYYY-MM-DD". La aplicación retrocederá hasta el día lunes de la semana ingresada y te mostrará los turnos disponibles desde el lunes de esa semana en adelante, dentro de la franja horaria laborable, de 8:00 a 20:00 hs. Se listarán todos los turnos disponibles de la semana ingresada.

  4- Cancelar turno. Selecciona la opción '4' y presiona Enter. La aplicación te solicitará que ingresse el ID del turno a cancelar. Para reconcoer el ID se deben consultar los turnos asignados previamente.

  5- Consultar turnos cancelados. Selecciona la opción '6' y presiona Enter. Se mostarán por consola un listado de todos los trunos cancelados que no hayan sido ocupados nuevamente.

  6- Salir. Finaliza la ejecución de la aplicación.

  Notas:

  - Queda pendiente de implementar la interacción con Google Calendar API. 
  - Quedan pendientes el desarrollo e implementación de mejoras en el formato de datos, manejo de validaciones e interacción con el usuario.
# gestor_de_turnos
