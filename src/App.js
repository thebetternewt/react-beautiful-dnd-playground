import React, { useReducer } from 'react';
import { initialData } from './initial-data';
import Column from './components/Column';

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialData);

  return (
    <div>
      {state.columnOrder.map(columnId => {
        const column = state.columns[columnId];
        const tasks = column.taskIds.map(taskId => state.tasks[taskId]);

        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </div>
  );
}

export default App;
