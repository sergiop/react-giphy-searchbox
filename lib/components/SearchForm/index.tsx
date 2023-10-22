import styles from "./styles.module.css";

interface SearchFormProps {
  onSubmit: Function,
  placeholder: string,
  searchFormClassName: string,
  setValue: Function,
  value: string,
  autoFocus: boolean,
}

export const SearchForm = ({
  onSubmit,
  placeholder,
  searchFormClassName,
  setValue,
  value,
  autoFocus,
}: SearchFormProps) => {
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
        autoFocus={autoFocus}
      />
    </form>
  )
}
