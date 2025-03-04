import clsx from 'clsx';
import { ComponentProps } from 'react';

interface InputFieldProps extends ComponentProps<'input'> {
  variant?: 'outline' | 'filled' | 'default'; 
} 

export const InputField = ({variant, className, ...props}: InputFieldProps) => {
  const inputClasses = clsx(
    "p-3 py-2 rounded-md transition-all",
    {
      "bg-none": variant === 'default',
    },
    className
  )
  
  return <input type="text" {...props} className={inputClasses}/>
}