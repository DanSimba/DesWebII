export interface Solicitation {
  id: number;
  equip: string;
  data: string;
  est: string;
  desc: string;
  // campos adicionais para o lado func
  nomeCliente?: string;
  valorOrcamento?: number;
  idCliente?: number;
}