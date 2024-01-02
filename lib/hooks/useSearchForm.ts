import { ChangeEvent, FormEvent, useState } from 'react';

export const useSearchForm = () => {
  const [query, setQuery] = useState<string>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setQuery(e.target.value);
  };

  return {
    handleSubmit,
    handleInputChange,
    query,
  };
};
