import {
  useCallback,
  useEffect,
  useMemo,
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
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

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

  const filteredTodos = useMemo(() => {
    if (filter === 'active') {
      return data.filter(todo => !todo.isDone);
    }
    if (filter === 'completed') {
      return data.filter(todo => todo.isDone);
    }
    return data;
  }, [data, filter]);

  const clearCompleted = () => {
    setData(data.filter(todo => todo.isDone === false));
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleChange = (id: number, checked: boolean) => {
    setData(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, isDone: checked } : todo))
    );
  };

  const listenChange = useCallback((id: number, checked: boolean) => {
    handleChange(id, checked);
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

  const activeItemsCount = data.filter(todo => todo.isDone === false).length;

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
            {isLoading && <div className={styles.loading}>Загрузка...</div>}

            {!isLoading &&
              filteredTodos.map(toDo => (
                <SingleTodo
                  id={toDo.id}
                  title={toDo.title}
                  isDone={toDo.isDone}
                  toggleIsDone={listenChange}
                  key={toDo.id}
                />
              ))}
          </ul>
          <div className={styles.footer}>
            <div className={styles.count}>
              {activeItemsCount}{' '}
              {activeItemsCount == 1 ? 'item left' : 'items left'}
            </div>
            <div className={styles.buttonsOfLists}>
              <Button onClick={() => setFilter('all')}>All</Button>
              <Button onClick={() => setFilter('active')}>Active</Button>
              <Button onClick={() => setFilter('completed')}>Completed</Button>
            </div>
            <Button onClick={clearCompleted}>Clear Completed</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
