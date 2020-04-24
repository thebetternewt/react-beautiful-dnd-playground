import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import { initialData } from '../initial-data';

import Task from './HorizontalTask';

const Column = ({ column, tasks, isDropDisabled = true }) => {
  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable
        droppableId={column.id}
        // type={column.id === 'column-3' ? 'done' : 'active'}
        isDropDisabled={isDropDisabled}
        direction="horizontal"
      >
        {(provided, snapshot) => (
          <TaskList
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
};

const Container = styled.div`
  margin: 1rem 1rem 0;
  border: 1px solid lightgray;
  border-radius: 2px;
  background-color: white;

  display: flex;
  flex-direction: column;
  flex-basis: calc(100% / ${initialData.columnOrder.length});
`;
const Title = styled.h3`
  margin: 1rem;
`;
const TaskList = styled.div`
  padding: 1rem;
  transition: background-color 0.2s ease;
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? '#ddd' : 'white'};
  /* flex-grow: 1; */

  /* Make sure that if all lists are empty, there is still a droppable area for tasks. */
  /* min-height: 100px; */

  display: flex;
`;

export default Column;
