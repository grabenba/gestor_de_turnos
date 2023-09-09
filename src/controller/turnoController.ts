import picocolors from 'picocolors';
import { TurnoModel } from '../models/turnoModel'
import { Turno } from '../models/types'; 

export class TurnoController {
  private turnoModel: TurnoModel;

  constructor(turnoModel: TurnoModel) {
    this.turnoModel = turnoModel;
  }

  async asignarTurno(paciente: string, fecha: string) {
    try {
      const isTurnoDisponible = await this.turnoModel.verificarTurnoDisponible(fecha);

      if (isTurnoDisponible) {
        const turno = await this.turnoModel.asignarTurno(paciente, fecha);
        console.log(picocolors.green(`Se asignó el turno: ${turno.id}`));
      } else {
        console.log(picocolors.yellow('El turno solicitado ya está ocupado.'));
      }
    } catch (error) {
      console.error(picocolors.red('Error al asignar el turno:'), (error as Error).message);
    }
  }

  async consultarTurnosAsignados(semana: string): Promise<Turno[]> {
    try {
      const turnosAsignados = await this.turnoModel.consultarTurnosAsignados(semana);
      console.log('Turnos asignados para la semana:', semana);
      turnosAsignados.forEach((turno) => {
        console.log(`- ID: ${turno.id}, Fecha: ${turno.fecha}, Paciente: ${turno.paciente}`);
      });
  
      return turnosAsignados;
    } catch (error: any) {
      console.error(picocolors.red('Error al consultar los turnos asignados:'), error.message);
      throw error;
    }
  }

  async consultarTurnosDisponibles(semana: string): Promise<string[]> {
    try {
      const turnosDisponibles = await this.turnoModel.consultarTurnosDisponibles(semana);
      console.log('Turnos disponibles de la semana:', semana);
      turnosDisponibles.forEach((turno) => {
        console.log(`Fecha: ${turno}`);
      });
  
      return turnosDisponibles;
    } catch (error: any) {
      console.error(picocolors.red('Error al consultar los turnos disponibles:'), error.message);
      throw error;
    }
  }

  async cancelarTurno(idTurno: string) {
    try {
      const turnoCancelado = await this.turnoModel.cancelarTurno(idTurno);
      console.log(picocolors.green(`Se ha cancelado el turno con ID: ${idTurno}`));
    } catch (error) {
      console.error(picocolors.red('Error al cancelar el turno:'), (error as Error).message);
    }
  }

  async consultarTurnosCancelados() {
    try {
      const turnosCancelados = await this.turnoModel.consultarTurnosCancelados();
      console.log('Turnos cancelados:');
      turnosCancelados.forEach((turno) => {
        console.log(`- ID: ${turno.id}, Fecha: ${turno.fecha}, Paciente: ${turno.paciente}`);
      });
    } catch (error) {
      console.error(picocolors.red('Error al consultar los turnos cancelados:'), (error as Error).message);
    }
  }

  async consultarTurnosConEstado(estado: string): Promise<Turno[]> {
    const turnos = await this.turnoModel.readData();
    const turnosConEstado = turnos.filter((turno) => turno.estado === estado);
    return turnosConEstado;
  }
}

