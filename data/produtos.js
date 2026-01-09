import { fones } from './categorias/fones';
import { relogios } from './categorias/relogios';
import { celulares } from './categorias/celulares';
import { consoles } from './categorias/consoles';
export const produtos = [
  ...fones,
  ...relogios,
  ...celulares,
  ...consoles
];
