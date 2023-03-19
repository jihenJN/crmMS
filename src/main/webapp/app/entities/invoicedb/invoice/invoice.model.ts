export interface IInvoice {
  id: string;
  code?: string | null;
}

export type NewInvoice = Omit<IInvoice, 'id'> & { id: null };
