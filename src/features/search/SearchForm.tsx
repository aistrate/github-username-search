import { useEffect, useRef, useState } from "react";
import styled from "styled-components/macro";
import Button from "../../common/styled/Button";
import { ExternalLink } from "../../common/styled/Links";
import TextInput from "../../common/styled/TextInput";
import { usernameValidationError } from "./validation";

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
  const inputRef = useRef<HTMLInputElement>(null!);

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setValue(initialValue);
    setSubmitted(false);

    if (inputRef.current) {
      if (initialValue === "") {
        inputRef.current.focus();
      } else {
        inputRef.current.blur();
      }
    }
  }, [initialValue]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const normalizedValue = value.trim().toLowerCase();
    setValue(normalizedValue);
    setSubmitted(true);

    if (!usernameValidationError(normalizedValue)) {
      onSearch({ value: normalizedValue });
    }
  }

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function isButtonDisabled() {
    return (
      value.trim().length === 0 ||
      (submitted && !!usernameValidationError(value))
    );
  }

  return (
    <form className={className} onSubmit={handleSubmit}>
      <TextInput
        placeholder="Username"
        value={value}
        ref={inputRef}
        onChange={handleTextChange}
      />

      <Button name="Search" type="submit" disabled={isButtonDisabled()}>
        Search
      </Button>

      {submitted && usernameValidationError(value) && (
        <ValidationMessage>{usernameValidationError(value)}</ValidationMessage>
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
