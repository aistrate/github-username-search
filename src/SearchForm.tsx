import { useState } from "react";
import { TextInput, Button } from "./Styled";

export type { SearchEvent };
export default SearchForm;

type SearchEvent = {
  value: string;
};

type SearchFormProps = {
  fieldName?: string;
  onSearch?: (e: SearchEvent) => void;
};

function SearchForm({ fieldName, onSearch }: SearchFormProps) {
  const [value, setValue] = useState("");

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ value });
    }
  };

  return (
    <form className="SearchForm" onSubmit={handleSubmit}>
      <TextInput
        placeholder={fieldName}
        value={value}
        onChange={handleTextChange}
      />
      <Button type="submit">Search</Button>
    </form>
  );
}
