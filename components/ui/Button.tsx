import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

type BaseProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
};

type ButtonAsButton = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' };
type ButtonAsAnchor = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export default function Button(props: ButtonProps) {
  const { children, variant = 'primary', className = '', as = 'button', ...rest } = props;
  
  const variantClass = variant === 'secondary' ? styles.secondary : styles.primary;
  const combinedClassName = `${styles.button} ${variantClass} ${className}`;
  
  if (as === 'a') {
    return (
      <a className={combinedClassName} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }
  
  return (
    <button className={combinedClassName} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
