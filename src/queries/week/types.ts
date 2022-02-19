import * as i from 'types';

export type Week = {
  weekid: string;
  userid: string;
  weekNr: number;
  weekYear: number;
};

export type FullWeek = i.Week & { 
  categories: i.Category[][];
  notes: i.Note[][];
};

export type Note = {
  weekid: string;
  weekDay: number;
  notePosition: number;
  stackid: string;
  userid: string;
  note: string;
  weekDayDate: string;
};

export type Category = {
  weekid: string;
  weekDay: number;
  categoryPosition: number;
  userid: string;
  categoryid: string | null;
  activityid: string | null;
  weekDayDate: string;
};
