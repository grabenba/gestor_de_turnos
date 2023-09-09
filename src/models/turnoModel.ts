import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { Turno } from '../models/types';

export class TurnoModel {
  private dbFilePath: string;

  constructor(dbFilePath: string) {
    this.dbFilePath = path.join(__dirname, '..', dbFilePath);
  }

  async fetchDataFromAPI() {
    try {
      const response = await axios.get('https://api.example.com/data');
      return response.data;
    } catch (error) {
      throw new Error('No se pudo obtener datos de la API');
    }
  }

  async readData(): Promise<Turno[]> {
    try {
      const data = await fs.promises.readFile(this.dbFilePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error al leer datos de la base de datos:', error);
      throw new Error('Error al leer datos de la base de datos');
    }
  }

  async writeData(data: Turno[]) {
    try {
      await fs.promises.writeFile(this.dbFilePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error al escribir en la base de datos:', error);
      throw new Error('Error al escribir en la base de datos');
    }
  }

  async asignarTurno(paciente: string, fecha: string): Promise<Turno> {
    const turnos = await this.readData();
    const nuevoTurno: Turno = {
      id: Date.now().toString(),
      paciente,
      fecha,
      pagado: false,
      estado: "O"
    };
    turnos.push(nuevoTurno);
    await this.writeData(turnos);
    return nuevoTurno;
  }

  async consultarTurnosCancelados(): Promise<Turno[]> {
    const turnos = await this.readData();
    const turnosCancelados = turnos.filter((turno) => turno.estado === "C");
    return turnosCancelados;
  }

async cancelarTurno(idTurno: string): Promise<Turno> {
  const turnos = await this.readData();
  const turnoExistente = turnos.find((turno) => turno.id === idTurno);

  if (turnoExistente) {
    turnoExistente.estado = 'C'; 
    await this.writeData(turnos);
    return turnoExistente;
  } else {
    throw new Error('El turno con ID especificado no existe.');
  }
}

async verificarTurnoDisponible(fecha: string): Promise<boolean> {
    const turnos = await this.readData();
    const turnoExistente = turnos.find((turno) => turno.fecha === fecha && turno.estado !== "C"); 
    return !turnoExistente;
  }

  async consultarTurnosAsignados(semana: string): Promise<Turno[]> {
    const turnos = await this.readData();
    const semanaIngresada = new Date(semana);

    const turnosAsignados = turnos.filter((turno) => {
      const fechaTurno = new Date(turno.fecha);
      const inicioSemana = new Date(semanaIngresada);
      const finSemana = new Date(semanaIngresada);
      finSemana.setDate(inicioSemana.getDate() + 7);

      return fechaTurno >= inicioSemana && fechaTurno < finSemana && turno.estado !== "C";
    });

    return turnosAsignados;
  }

  async consultarTurnosDisponibles(semana: string): Promise<string[]> {
    const turnos = await this.readData();
    const semanaIngresada = new Date(semana);

    // Obtener la fecha de inicio (lunes) y fin (sábado) de la semana
    const inicioSemana = new Date(semanaIngresada);
    inicioSemana.setHours(0, 0, 0, 0);
    inicioSemana.setDate(inicioSemana.getDate() - inicioSemana.getDay() + 1); // Retroceder al lunes

    const finSemana = new Date(inicioSemana);
    finSemana.setDate(finSemana.getDate() + 5); // Avanzar cinco días para llegar al sábado

    // Generar turnos disponibles cada hora de 8 am a 8 pm para los días laborables (lunes a sábado)
    const turnosDisponibles: string[] = [];

    for (let fecha = new Date(inicioSemana); fecha <= finSemana; fecha.setDate(fecha.getDate() + 1)) {
      // Saltar el domingo (día 0)
      if (fecha.getDay() !== 0) {
        for (let hora = 8; hora <= 20; hora++) {
          const fechaFormateada = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}-${fecha.getDate().toString().padStart(2, '0')} ${hora.toString().padStart(2, '0')}:00`;
          const franjaHorariaOcupada = turnos.some((turno) => turno.fecha === fechaFormateada && turno.estado === 'O');
          if (!franjaHorariaOcupada) {
            turnosDisponibles.push(`Fecha: ${fechaFormateada}`);
          }
        }
      }
    }
    return turnosDisponibles;
  }
}