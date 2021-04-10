import { useState, useEffect } from "react";
import { TextInput, Button } from "./Styled";

export type { SearchEvent };
export default SearchForm;

type SearchEvent = {
  value: string;
};

type SearchFormProps = {
  fieldName?: string;
  initialValue?: string;
  onSearch: (e: SearchEvent) => void;
};

function SearchForm({
  fieldName,
  initialValue = "",
  onSearch,
}: SearchFormProps) {
  const [value, setValue] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const textChanged = (val: string) => {
    setValue(val);
    setButtonDisabled(val.trim().length === 0);
  };

  useEffect(() => {
    textChanged(initialValue);
  }, [initialValue]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    textChanged(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = value.trim();
    setValue(trimmed);
    onSearch({ value: trimmed });
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
