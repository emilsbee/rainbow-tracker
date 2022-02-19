import * as i from 'types';

export type CategoryTypesFull = {
  categoryTypes: i.CategoryType[];
  activityTypes: i.ActivityType[];
}

export type CategoryType = {
  categoryid:string;
  userid:string;
  color:string;
  name:string;
  archived:boolean;
};

export type ActivityType = {
  activityid:string;
  categoryid:string;
  userid:string;
  long:string;
  short:string;
  archived:boolean;
};
