export type TotalPerDaySpecific = {
  weekDay: number
  categories: {
    categoryid: string | null
    count: number
    name: string
    color: string
  }[]
};
