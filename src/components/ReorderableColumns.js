import React, { useReducer } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { initialData } from '../initial-data';
import Column from './DraggableColumn';

const InnerList = React.memo(
  ({ column, taskMap, index, isDropDisabled = false }) => {
    const tasks = column.taskIds.map(taskId => taskMap[taskId]);
    return (
      <Column
        key={column.id}
        column={column}
        tasks={tasks}
        index={index}
        isDropDisabled={isDropDisabled}
      />
    );
  }
);

const ACTION_TYPES = {
  UPDATE_COLUMN: 'UPDATE_COLUMN',
  UPDATE_HOME_INDEX: 'UPDATE_HOME_INDEX',
  UPDATE_COLUMN_ORDER: 'UPDATE_COLUMN_ORDER',
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
    case ACTION_TYPES.UPDATE_COLUMN_ORDER:
      return {
        ...state,
        columnOrder: action.payload,
      };
    default:
      return state;
  }
};

const DroppableColumns = () => {
  const [state, dispatch] = useReducer(reducer, initialData);

  const onDragStart = start => {
    const homeIndex = state.columnOrder.indexOf(start.source.droppableId);

    dispatch({ type: ACTION_TYPES.UPDATE_HOME_INDEX, payload: homeIndex });
  };

  const onDragEnd = result => {
    dispatch({ type: ACTION_TYPES.UPDATE_HOME_INDEX, payload: null });

    const { destination, source, draggableId, type } = result;

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

    if (type === 'COLUMN') {
      const newColumnOrder = [...state.columnOrder];
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      return dispatch({
        type: ACTION_TYPES.UPDATE_COLUMN_ORDER,
        payload: newColumnOrder,
      });
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
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="COLUMN">
        {provided => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {state.columnOrder.map((columnId, index) => {
              const column = state.columns[columnId];

              return (
                <InnerList
                  key={column.id}
                  column={column}
                  taskMap={state.tasks}
                  index={index}
                  // isDropDisabled={index < state.homeIndex}
                />
              );
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const Container = styled.div`
  display: flex;
`;

export default DroppableColumns;
