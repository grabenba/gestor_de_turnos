interface Turno {
  id: string;
  paciente: string;
  fecha: string;
  pagado: boolean;
  estado: "L" | "O" | "C"; // "L" para libre, "O" para ocupado, "C" para cancelado
}

export { Turno };
