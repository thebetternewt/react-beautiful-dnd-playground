import React, { useReducer } from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';

import { initialData } from '../initial-data';
import Column from './Column';

const ACTION_TYPES = {
  UPDATE_COLUMN: 'UPDATE_COLUMN',
  UPDATE_HOME_INDEX: 'UPDATE_HOME_INDEX',
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_COLUMN:
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.payload.id]: action.payload,
        },
      };
    case ACTION_TYPES.UPDATE_HOME_INDEX:
      return {
        ...state,
        homeIndex: action.payload,
      };
    default:
      return state;
  }
};

const DroppableColumns = () => {
  const [state, dispatch] = useReducer(reducer, initialData);

  // const onDragStart = () => {
  //   document.body.style.color = 'orange';
  //   document.body.style.transition = 'background-color 0.2s ease';
  // };

  const onDragStart = start => {
    const homeIndex = state.columnOrder.indexOf(start.source.droppableId);

    dispatch({ type: ACTION_TYPES.UPDATE_HOME_INDEX, payload: homeIndex });
  };

  // const onDragUpdate = update => {
  //   const { destination } = update;
  //   const opacity = destination
  //     ? destination.index / Object.keys(state.tasks).length
  //     : 0;

  //   document.body.style.backgroundColor = `rgba(153, 141, 210, ${opacity})`;
  // };

  const onDragEnd = result => {
    // document.body.style.color = 'inherit';
    // document.body.style.backgroundColor = 'inherit';
    dispatch({ type: ACTION_TYPES.UPDATE_HOME_INDEX, payload: null });

    const { destination, source, draggableId } = result;

    // If there is no destination, then do nothing.
    if (!destination) {
      return;
    }

    // If the position of the drop is the same as the source, then do nothing.
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    // If start and finish columns are the same, then simply reorder tasks in current column.
    if (start === finish) {
      const newTaskIds = [...start.taskIds];

      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...start, taskIds: newTaskIds };

      dispatch({ type: ACTION_TYPES.UPDATE_COLUMN, payload: newColumn });
    } else {
      const startTaskIds = [...start.taskIds];

      startTaskIds.splice(source.index, 1);
      const updatedStartColumn = { ...start, taskIds: startTaskIds };

      const finishTaskIds = [...finish.taskIds];
      finishTaskIds.splice(destination.index, 0, draggableId);

      const updatedFinishColumn = { ...finish, taskIds: finishTaskIds };

      dispatch({
        type: ACTION_TYPES.UPDATE_COLUMN,
        payload: updatedStartColumn,
      });
      dispatch({
        type: ACTION_TYPES.UPDATE_COLUMN,
        payload: updatedFinishColumn,
      });
    }
  };

  return (
    <Container>
      <DragDropContext
        onDragStart={onDragStart}
        // onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        {state.columnOrder.map((columnId, index) => {
          const column = state.columns[columnId];
          const tasks = column.taskIds.map(taskId => state.tasks[taskId]);

          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              isDropDisabled={index < state.homeIndex}
            />
          );
        })}
      </DragDropContext>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

export default DroppableColumns;
