import { ChangeEvent, FormEvent } from 'react';
import styles from './styles.module.css';

interface SearchFormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  placeholder: string;
  searchFormClassName: string | undefined;
  setValue: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  autoFocus: boolean;
}

export function SearchForm({
  onSubmit,
  placeholder,
  searchFormClassName,
  setValue,
  value,
  autoFocus,
}: SearchFormProps) {
  return (
    <form
      data-testid="SearchFormForm"
      onSubmit={onSubmit}
      autoComplete="off"
      className={`${styles.form}${
        searchFormClassName ? ` ${searchFormClassName}` : ''
      }`}
    >
      <input
        data-testid="SearchFormInput"
        type="text"
        placeholder={placeholder}
        onChange={setValue}
        value={value}
        name="search"
        className={styles.input}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={autoFocus}
      />
    </form>
  );
}
