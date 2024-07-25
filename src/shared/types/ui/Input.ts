import { InputHTMLAttributes, ReactNode} from "react";

export type InputProps = InputHTMLAttributes <HTMLInputElement> & {
    name: string;
    disabled?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    placeholder?: string;
    helperText?: string;
    error?: boolean;
    shape?: 'default' | 'pill';
    state?: 'default' | 'error' | 'success' ;
    classNames?: string[];
    children: ReactNode;
    icon?: ReactNode;
  }