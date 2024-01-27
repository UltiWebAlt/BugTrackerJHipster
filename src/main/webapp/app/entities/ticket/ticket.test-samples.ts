import dayjs from 'dayjs/esm';

import { ITicket, NewTicket } from './ticket.model';

export const sampleWithRequiredData: ITicket = {
  id: 12526,
  title: 'adept wisely including',
};

export const sampleWithPartialData: ITicket = {
  id: 17351,
  title: 'lest yippee jealously',
  done: false,
};

export const sampleWithFullData: ITicket = {
  id: 22892,
  title: 'embossing till',
  description: 'yahoo',
  dueDate: dayjs('2024-01-26'),
  done: true,
};

export const sampleWithNewData: NewTicket = {
  title: 'poise gracefully fluffy',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
