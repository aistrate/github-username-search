import { useEffect, useRef, useState } from "react";
import styled from "styled-components/macro";
import Button from "../../common/styled/Button";
import { ExternalLink } from "../../common/styled/Links";
import TextInput from "../../common/styled/TextInput";
import { validateUsername } from "./validation";

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

  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    setTextAndButton(initialValue);
    setSubmitted(false);

    if (initialValue === "") {
      inputRef.current.focus();
    } else {
      inputRef.current.blur();
    }
  }, [initialValue]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmed = value.trim();
    setValue(trimmed);
    setSubmitted(true);

    if (!validationError) {
      onSearch({ value: trimmed });
    }
  }

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTextAndButton(e.target.value);
  }

  function setTextAndButton(val: string) {
    setValue(val);
    setValidationError(validateUsername(val));
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

      <Button name="Search" type="submit" disabled={buttonDisabled}>
        Search
      </Button>

      {submitted && validationError && (
        <ValidationMessage>{validationError}</ValidationMessage>
      )}

      <Instructions>
        Type in a full username (see{" "}
        <ExternalLink href="./about">examples</ExternalLink>).
      </Instructions>
    </form>
  );
}

const ValidationMessage = styled.div`
  margin-top: 0.4rem;
  color: red;
`;

const Instructions = styled.div`
  margin-top: 0.6rem;
  opacity: 0.8;
`;
