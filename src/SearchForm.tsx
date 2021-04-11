import { useState, useEffect, useRef } from "react";
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
  const inputRef = useRef<HTMLInputElement>(null!);

  const textChanged = (val: string) => {
    setValue(val);
    setButtonDisabled(val.trim().length === 0);
  };

  useEffect(() => {
    textChanged(initialValue);
    if (initialValue.trim().length === 0) {
      inputRef.current.focus();
    } else {
      inputRef.current.blur();
    }
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
        ref={inputRef}
        onChange={handleTextChange}
      />
      <Button type="submit" disabled={buttonDisabled}>
        Search
      </Button>
    </form>
  );
}
