export interface Solicitation {
  id: number;
  equip: string; //seria a categoria do equipamento? 
  data: string;
  est: string;
  desc: string;
  motivoRej?: any;//campo opcional
  idCategoria?: number;
  // campos adicionais para o lado func
  idCliente?: number;
  nomeCliente?: string;
  cpfCliente?: string;
  emailCliente?: string;
  valorOrcamento?: number;
  nomeCategoria?: string;
  idFuncDestino?: number; // pra redirecionar gostoso 
  
}

export interface HistoricoItem {
  id: number;
  dataHora: string;
  observacao?: string;
  estadoAnterior?: string;
  estadoNovo: string;
  nomeFuncionario?: string;
}
///eu vou colocar aqui mesmo e quem não gostou que se mate 