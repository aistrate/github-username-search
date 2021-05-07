import { useState, useEffect, useRef } from "react";
import styled from "styled-components/macro";
import { TextInput } from "../Styled/TextInput";
import { Button } from "../Styled/Button";
import { ExternalLink } from "../Styled/Link";

export type { SearchEvent };
export default SearchForm;

type SearchEvent = {
  value: string;
};

type SearchFormProps = {
  initialValue?: string;
  onSearch: (e: SearchEvent) => void;
  className?: string;
};

function SearchForm({
  initialValue = "",
  onSearch,
  className,
}: SearchFormProps) {
  const [value, setValue] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    setTextAndButton(initialValue);

    if (initialValue.trim().length === 0) {
      inputRef.current.focus();
    } else {
      inputRef.current.blur();
    }
  }, [initialValue]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmed = value.trim();
    setValue(trimmed);
    onSearch({ value: trimmed });
  }

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTextAndButton(e.target.value);
  }

  function setTextAndButton(val: string) {
    setValue(val);
    setButtonDisabled(val.trim().length === 0);
  }

  return (
    <form className={className} onSubmit={handleSubmit}>
      <TextInput
        placeholder="Username"
        value={value}
        ref={inputRef}
        onChange={handleTextChange}
      />

      <Button type="submit" disabled={buttonDisabled}>
        Search
      </Button>

      <Instructions>
        Type in a full username (see{" "}
        <ExternalLink href="./about">examples</ExternalLink>)
      </Instructions>
    </form>
  );
}

const Instructions = styled.div`
  margin-top: 0.6rem;
  opacity: 0.8;
`;
