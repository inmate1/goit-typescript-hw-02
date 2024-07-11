import { ChangeEvent, FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (value: string) => void;
}
const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const [value, setValue] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value === '' || /^[^a-zA-Z]*$/.test(value)) {
      toast.error('To search for images you need to enter text in English!');
      setValue('');
      return;
    }
    onSubmit(value);
    setValue('');
  };

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
       const trimmedValue = evt.target.value.trim();
       setValue(trimmedValue);
  };

  return (
    <header>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          type='text'
          value={value}
          onChange={handleChange}
          autoComplete='off'
          autoFocus
          placeholder='Search images and photos'
        />
        <button type='submit'> Search </button>
      </form>
      <div>
        <Toaster />
      </div>
    </header>
  );
};

export default SearchBar;
