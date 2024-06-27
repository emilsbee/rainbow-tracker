export type DateType = {
  weekNr: number;
  year: number;
};

export type DateContextDispatch = (dateData: DateType) => DateType;

export type DateContextType = DateType & {
  updateDate: DateContextDispatch;
  realWeekNr: number;
  realYear: number;
} | undefined;
