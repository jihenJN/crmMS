export interface ISale {
  id: string;
  idinvoice?: string | null;
  qty?: number | null;
}

export type NewSale = Omit<ISale, 'id'> & { id: null };
