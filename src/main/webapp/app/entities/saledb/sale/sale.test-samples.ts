import { ISale, NewSale } from './sale.model';

export const sampleWithRequiredData: ISale = {
  id: 'e3d390cb-6ca7-40d1-872d-cd036a294d97',
};

export const sampleWithPartialData: ISale = {
  id: '8640e7b3-e408-4d53-bf52-f2f0387d03b6',
  idinvoice: 'Shoes',
  qty: 96402,
};

export const sampleWithFullData: ISale = {
  id: '10d6304c-900a-4046-868a-77233f80c06e',
  idinvoice: 'transmit Danish',
  qty: 90650,
};

export const sampleWithNewData: NewSale = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
