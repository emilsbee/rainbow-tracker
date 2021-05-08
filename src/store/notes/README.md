# Idea behind dragging notes

## Drag start

When the event listener onDragStart on one of the Note components detects drag, it fires the onNoteDragStart
method within Day component. This method sets the drag image to transparent image to avoid ghost image, and then
sets the dragNote as the local react state dragNote.

## Drag enter

 ### Within components Day and Note

When one of the notes detects a onDragOver event, it firess the onNoteDragEnter method
within Day Component. This method determines whether the drag is coming from another note
or a category component, then proceeds if it comes from another note. Then it decides whether the drag is upwards or downards, calling the 
respective action aboveDifference or belowDifference from easy-peasy store notes model. 

### Within easy-peasy store model notes

#### aboveDifference

This action has two main tasks

1) Update stackid and note text for notes above the drag note up to and including the note dragged onto itself.
The updates include changing the stackid to drag note's stackid, and for the top-most
note also the note text has to be changed to drag note text. This is because it is the highest note from the drag note stack so it is the one being rendered. Hence, it must
have the note text since no other note from the stack below it will have the text.

2) Set the text to an empty string for all the notes below the note that was dragged onto, which is the highest note in the stack. 

#### belowDifference

This action has three main tasks

1) Set the stackid to the stackid of drag note for all the notes below the drag note up to and including the note that was dragged onto.

2) Set the note text to an empty string for all the notes below the drag note up to and including the note that was dragged onto.

3) If the note that was dragged onto is a stack note, then set the text of second highest note of the stack to the note text of note that was dragged into.


## Paths of components/files mentioned in this documentation

Day component `src/components/Day`

Note component `src/components/Note`

Easy-peasy notes model `src/models/notes`
