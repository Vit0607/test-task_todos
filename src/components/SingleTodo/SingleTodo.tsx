import { memo } from 'react';

import type { SingleTodoProps } from './SingleTodo.props';

import styles from './SingleTodo.module.scss';

const SingleTodo = ({
  id,
  title,
  isDone,
  toggleIsDone,
  index
}: SingleTodoProps) => {
  console.log(`TODO_${id}`);

  return (
    <li className={styles.todo} key={id}>
      <input
        id={String(id)}
        name={title}
        type="checkbox"
        checked={isDone}
        onChange={e => toggleIsDone(e.target.checked, index)}
      />
      <label htmlFor={title} className={isDone ? styles.completed : ''}>
        {title}
      </label>
    </li>
  );
};

export default memo(SingleTodo);
