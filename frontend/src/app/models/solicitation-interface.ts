export interface Solicitation {
  id: number;
  equip: string; //seria a categoria do equipamento? 
  data: string;
  est: string;
  desc: string;
  // campos adicionais para o lado func
  idCliente?: number;
  nomeCliente?: string;
  cpfCliente?: string;
  emailCliente?: string;
  valorOrcamento?: number;
  nomeCategoria?: string;
}