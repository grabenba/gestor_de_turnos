import { TurnoController } from './controller/turnoController';
import { TurnoModel } from './models/turnoModel';
import picocolors from 'picocolors';
import readlineSync from 'readline-sync';

const dbFilePath = './database/db.json'; // Ruta al archivo de base de datos
const turnoModel = new TurnoModel(dbFilePath);
const turnoController = new TurnoController(turnoModel);

async function main() {
  console.log(picocolors.blue('Bienvenido al Sistema de Gestión de Turnos'));

  while (true) {
    console.log('\nSeleccione una opción:');
    console.log('1. Asignar turno');
    console.log('2. Consultar turnos asignados');
    console.log('3. Consultar turnos disponibles');
    console.log('4. Cancelar turno');
    console.log('5. Consultar turnos cancelados');
    console.log('6. Salir');

    const opcion = readlineSync.question('Opcion: ');

    switch (opcion) {
      case '1':
        const paciente = readlineSync.question('Nombre del paciente: ');
        const fecha = readlineSync.question('Fecha del turno (YYYY-MM-DD HH:mm): ');
        await turnoController.asignarTurno(paciente, fecha);
        break;
      case '2':
        const semanaAsig = readlineSync.question('Semana (YYYY-MM-DD HH:mm): ');
        await turnoController.consultarTurnosAsignados(semanaAsig);
        break;
      case '3':
        const semanaDisp = readlineSync.question('Semana (YYYY-MM-DD HH:mm): ');
        await turnoController.consultarTurnosDisponibles(semanaDisp);
        break;
      case '4':
        const idTurnoCancelar = readlineSync.question('ID del turno a cancelar: ');
        await turnoController.cancelarTurno(idTurnoCancelar);
        break;
      case '5':
        const turnosCancelados = await turnoController.consultarTurnosConEstado('C');
        if (Array.isArray(turnosCancelados) && turnosCancelados.length === 0) {
          console.log('No hay turnos cancelados.');
        } else {
          console.log('Turnos cancelados:');
          (turnosCancelados as any[]).forEach((turno) => {
            console.log(`- ID: ${turno.id}, Fecha: ${turno.fecha}, Paciente: ${turno.paciente}`);
          });
        }
        break;
      case '6':
        console.log(picocolors.blue('Gracias por usar el Sistema de Gestión de Turnos. ¡Hasta luego!'));
        process.exit(0);
      default:
        console.log(picocolors.red('Opción no válida. Por favor, seleccione una opción válida.'));
        break;
    }
  }
}

main();


