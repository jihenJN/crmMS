import { IInvoice, NewInvoice } from './invoice.model';

export const sampleWithRequiredData: IInvoice = {
  id: 'e9811367-3777-4285-ab8f-e916c058e54f',
};

export const sampleWithPartialData: IInvoice = {
  id: 'b482b229-2c5e-4fde-9318-6e041cf839c7',
  code: 'application invoice',
};

export const sampleWithFullData: IInvoice = {
  id: 'f9872707-ae10-4f51-8a24-8cf88a02ac50',
  code: 'metrics',
};

export const sampleWithNewData: NewInvoice = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
