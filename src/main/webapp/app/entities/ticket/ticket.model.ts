import dayjs from 'dayjs/esm';
import { IProject } from 'app/entities/project/project.model';
import { ILabel } from 'app/entities/label/label.model';

export interface ITicket {
  id: number;
  title?: string | null;
  description?: string | null;
  dueDate?: dayjs.Dayjs | null;
  done?: boolean | null;
  project?: IProject | null;
  labels?: ILabel[] | null;
}

export type NewTicket = Omit<ITicket, 'id'> & { id: null };
