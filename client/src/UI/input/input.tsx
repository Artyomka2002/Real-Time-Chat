import classNames from "classnames";
import cl from "./input.module.css";
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  className?: string;
  label?: string;
  error?: string;
  required?: boolean;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setUser?: (value: string) => void;
}

const Input: React.FC<Props> = ({
  id,
  label,
  className,
  placeholder,
  error,
  value,
  onChange,
  setUser,
  ...attrs
}) => {
  const classes = classNames(cl.input, className);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setUser) setUser(e.target.value);
    if (onChange) onChange(e);
  };
  return (
    <div className={cl.inputWrapper}>
      {label && (
        <label className={cl.inputLabel} htmlFor={id}>
          {label}
          {attrs.required && <span className={cl.inputRequired}></span>}
        </label>
      )}
      <input
        placeholder={placeholder}
        name={id}
        id={id}
        className={classes}
        value={value}
        onChange={handleChange}
        {...attrs}
      />
      {error && <span className={cl.inputError}>{"Введите имя чтобы войти!"}</span>}
    </div>
  );
};

export default Input;

// Готов
