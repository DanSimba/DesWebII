export interface MaintenanceRequest {
  id: number;
  dateTime: Date;
  clientName: string;
  description: string;
  status: 'ABERTA' | 'ORÇADA' | 'REJEITADA' | 'APROVADA' | 'REDIRECIONADA' | 'ARRUMADA' | 'PAGA' | 'FINALIZADA';
}