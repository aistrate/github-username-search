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
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);

    const buttonDisabled = value.trim().length === 0;
    setButtonDisabled(buttonDisabled);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = value.trim();
    setValue(trimmed);

    if (onSearch) {
      onSearch({ value: trimmed });
    }
  };

  return (
    <form className="SearchForm" onSubmit={handleSubmit}>
      <TextInput
        placeholder={fieldName}
        value={value}
        onChange={handleTextChange}
      />
      <Button type="submit" disabled={buttonDisabled}>
        Search
      </Button>
    </form>
  );
}
