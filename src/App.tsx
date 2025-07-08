import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent
} from 'react';

import type { Todo } from './types/todo';
import { DEFAULT_TODO_LIST } from './mocks/defaultTodoList';
import './components/SingleTodo/SingleTodo';
import SingleTodo from './components/SingleTodo/SingleTodo';
import { delay } from './utils/delay';
import Button from './components/SingleTodo/ui/Button/Button';
import Input from './components/SingleTodo/ui/Input/Input';

import styles from './App.module.scss';

function App() {
  const [data, setData] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState('');

  const getTodos = async () => {
    setIsLoading(true);
    try {
      const tasks = await delay(DEFAULT_TODO_LIST, 1000);
      setData(tasks);
    } catch (error) {
      console.log(`Ошибка: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleChange = (checked: boolean, index: number) => {
    setData(prev => {
      prev[index].isDone = checked;
      return [...prev];
    });
  };

  const listenChange = useCallback((checked: boolean, index: number) => {
    handleChange(checked, index);
  }, []);

  const addTodo = (e: FormEvent) => {
    e.preventDefault();

    if (!newTodo.trim()) return;

    const task: Todo = {
      id: Date.now(),
      title: newTodo,
      isDone: false
    };

    setData([...data, task]);
    setNewTodo('');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.todos}>
        <h1>todos</h1>
        <div className={styles.content}>
          <form className={styles.todoForm} onSubmit={addTodo}>
            <Input
              type="text"
              placeholder="What needs to be done?"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewTodo(e.target.value)
              }
              value={newTodo}
            />
            <Button disabled={Boolean(!newTodo.trim())}>Добавить</Button>
          </form>
          <ul className={styles.list}>
            {isLoading ? (
              <div className={styles.loading}>Загрузка...</div>
            ) : (
              data?.map((toDo: Todo, index: number) => (
                <SingleTodo
                  id={toDo.id}
                  title={toDo.title}
                  isDone={toDo.isDone}
                  index={index}
                  toggleIsDone={listenChange}
                  key={toDo.id}
                />
              ))
            )}
          </ul>
          <div>Нижняя панель</div>
        </div>
      </div>
    </div>
  );
}

export default App;
