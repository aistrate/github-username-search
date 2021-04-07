import { TextInput, Button } from "./Styled";

export default SearchForm;

function SearchForm() {
  return (
    <form action="#" className="SearchForm">
      <TextInput placeholder="Username" />
      <Button type="submit">Search</Button>
    </form>
  );
}
