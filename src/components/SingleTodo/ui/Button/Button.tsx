import cn from 'classnames';

import type { ButtonProps } from './Button.props';

import styles from './Button.module.scss';

const Button = ({ children, disabled, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn(styles.button, { [styles.visible]: !disabled })}
    >
      {children}
    </button>
  );
};

export default Button;
