import * as i from 'types';
import { Action, ThunkOn } from 'easy-peasy';

export type Note = {
  weekid: string,
  weekDay: number,
  notePosition: number,
  stackid: string,
  userid: string,
  note: string,
  weekDayDate: string
};

export interface NotesModel {
  notes: i.Note[][],
  setNotes: Action<NotesModel, {notes: i.Note[][]}>,
  syncToDb: ThunkOn<NotesModel>,

  aboveDifferenceCache: { draggedIntoPosition:number, dragPosition:number, weekDay:number, dragStackid:string, dragNoteText:string },
  /**
     * Updates notes above the drag note.
  */
  aboveDifference: Action<NotesModel, {draggedIntoPosition:number, dragPosition:number, weekDay:number, dragStackid:string, dragNoteText:string}>,

  belowDifferenceCache: { draggedIntoPosition:number, dragPosition:number, weekDay:number, dragStackid:string, oldStackid:string, oldNote:string},
  /**
     * Updates notes below the drag note.
  */
  belowDifference: Action<NotesModel, {draggedIntoPosition:number, dragPosition:number, weekDay:number, dragStackid:string, oldStackid:string, oldNote:string }>,

  setNoteText: Action<NotesModel, i.Note>,
  deleteNoteText: Action<NotesModel, i.Note>,
  deleteNoteStack: Action<NotesModel, {stackid:string, weekDay:number}>,
}
