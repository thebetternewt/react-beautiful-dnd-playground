import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { initialData } from '../initial-data';

import Task from './Task';

const InnerList = React.memo(({ tasks = [] }) =>
  tasks.map((task, index) => <Task key={task.id} task={task} index={index} />)
);

const DraggableColumn = ({ column, tasks, index, isDropDisabled = false }) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {provided => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <Title {...provided.dragHandleProps}>{column.title}</Title>
          <Droppable
            droppableId={column.id}
            type="TASK"
            isDropDisabled={isDropDisabled}
          >
            {(provided, snapshot) => (
              <TaskList
                {...provided.droppableProps}
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <InnerList tasks={tasks} />
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
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
    isDraggingOver ? '#ddd' : 'inherit'};
  flex-grow: 1;

  /* Make sure that if all lists are empty, there is still a droppable area for tasks. */
  min-height: 100px;
`;

export default DraggableColumn;
