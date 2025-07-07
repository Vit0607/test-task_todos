import { useCallback, useEffect, useState } from 'react';
import type { Todo } from './types/todo';
import { DEFAULT_TODO_LIST } from './mocks/defaultTodoList';
import './components/SingleTodo/SingleTodo';

import './App.css';
import SingleTodo from './components/SingleTodo/SingleTodo';

function App() {
  const [data, setData] = useState<Todo[]>([]);

  useEffect(() => {
    setData(DEFAULT_TODO_LIST);
  }, []);

  useEffect(() => {
    console.log('dataChanged: ', data);
  }, [data]);

  const handleChange = (checked: boolean, index: number) => {
    setData(prev => {
      prev[index].isDone = checked;
      return [...prev];
    });
  };

  const listenChange = useCallback((checked: boolean, index: number) => {
    handleChange(checked, index);
  }, []);

  return (
    <>
      <h1>Todos</h1>
      <div>
        <input />
        <ul>
          {data?.map((toDo: Todo, index: number) => (
            <SingleTodo
              id={toDo.id}
              title={toDo.title}
              isDone={toDo.isDone}
              index={index}
              toggleIsDone={listenChange}
              key={toDo.id}
            />
          ))}
        </ul>
        <div>Нижняя панель</div>
      </div>
    </>
  );
}

export default App;
