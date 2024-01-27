import { ILabel, NewLabel } from './label.model';

export const sampleWithRequiredData: ILabel = {
  id: 2324,
};

export const sampleWithPartialData: ILabel = {
  id: 15350,
  label: 'amid',
};

export const sampleWithFullData: ILabel = {
  id: 8914,
  label: 'squall after into',
};

export const sampleWithNewData: NewLabel = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
