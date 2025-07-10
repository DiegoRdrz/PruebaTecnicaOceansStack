//src/components/Button.tsx

import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'danger'; 
}

// Componente botón reutilizable con estilos condicionales según la variante
export const Button = ({ children, variant = 'primary', ...props }: ButtonProps) => {
  const base = 'px-4 py-2 rounded text-white font-semibold transition';
  const styles = {
    primary: 'bg-blue-600 hover:bg-blue-700',
    danger: 'bg-red-600 hover:bg-red-700'
  };

  return (
    <button className={`${base} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
};
