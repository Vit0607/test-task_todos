import { memo } from 'react';

import type { SingleTodoProps } from './SingleTodo.props';

import styles from './SingleTodo.module.scss';

const SingleTodo = ({ id, title, isDone, toggleIsDone }: SingleTodoProps) => {
  return (
    <li className={styles.todo} key={id}>
      <input
        id={String(id)}
        name={title}
        type="checkbox"
        checked={isDone}
        onChange={e => toggleIsDone(id, e.target.checked)}
        className={styles.checkbox}
      />
      <label htmlFor={title} className={isDone ? styles.completed : ''}>
        {title}
      </label>
    </li>
  );
};

export default memo(SingleTodo);
