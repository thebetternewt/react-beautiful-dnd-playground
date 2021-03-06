import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Task = ({ task, index }) => {
  // const isDragDisabled = task.id === 'task-1';
  const isDragDisabled = false;

  return (
    <Draggable
      draggableId={task.id}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          isDragDisabled={isDragDisabled}
        >
          {/* <Handle {...provided.dragHandleProps} /> */}
          {task.content}
        </Container>
      )}
    </Draggable>
  );
};

const Container = styled.div`
  margin-bottom: 8px;
  border: 1px solid lightgray;
  border-radius: 2px;
  padding: 8px;
  background-color: ${props =>
    props.isDragDisabled
      ? 'lightgray'
      : props.isDragging
      ? 'yellow'
      : 'lightcyan'};

  display: flex;
`;

// const Handle = styled.div`
//   width: 20px;
//   height: 20px;
//   background-color: orangered;
//   border-radius: 4px;
//   margin-right: 0.5rem;
// `;

export default Task;
