import { removePX, getStackHeight } from './helpers'
import React from 'react';
import ReactDOM from 'react-dom';
import Note from './Note';

const note = {
    day: 'Monday',
    position: 10,
    note: 'note',
    stackid: 'stackid1',
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Note note={note} max={2} min={1}/>, div);
});
it('removePX should return correct integer value', () => {
    expect(removePX('1px')).toEqual(1)
    expect(removePX('10px')).toEqual(10)
    expect(removePX('100px')).toEqual(100)
    expect(removePX('1000px')).toEqual(1000)
})

it('should return correct stack height', () => {
    expect(getStackHeight(2,1, '20px', '2px')).toBe('42px')
    expect(getStackHeight(10,7, '20px', '2px')).toBe('86px')
})