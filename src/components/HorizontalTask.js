import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Task = ({ task, index }) => {
  // const isDragDisabled = task.id === 'task-1';

  return (
    <Draggable
      draggableId={task.id}
      index={index}
      // isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          // isDragDisabled={isDragDisabled}
        >
          {task.content[0]}
        </Container>
      )}
    </Draggable>
  );
};

const Container = styled.div`
  border: 1px solid lightgray;
  border-radius: 50%;
  padding: 8px;
  margin-right: 8px;
  background-color: ${props =>
    props.isDragDisabled
      ? 'lightgray'
      : props.isDragging
      ? 'yellow'
      : 'lightcyan'};
  width: 40px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    outline: none;
    border-color: red;
  }
`;

export default Task;
