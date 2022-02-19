import { WeekNumbers } from 'luxon';

export type DateType = {
  weekNr: WeekNumbers;
  year: number;
};

export type DateContextDispatch = (dateData: DateType) => DateType;

export type DateContextType = DateType & {
  updateDate: DateContextDispatch;
  realWeekNr: WeekNumbers;
  realYear: number;
} | undefined;
