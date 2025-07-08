import type { InputProps } from './Input.props';

import styles from './Input.module.scss';

const Input = ({ ...props }: InputProps) => {
  return <input {...props} className={styles.input} name="newTask" />;
};

export default Input;
