import { IProject, NewProject } from './project.model';

export const sampleWithRequiredData: IProject = {
  id: 22787,
};

export const sampleWithPartialData: IProject = {
  id: 10352,
};

export const sampleWithFullData: IProject = {
  id: 983,
  name: 'gah wonderfully',
};

export const sampleWithNewData: NewProject = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
