import renderer from "react-test-renderer";
import { CompanyList } from "./UserView";

test("<CompanyList> transforms company names prefixed with '@' into links to each company's GitHub username", () => {
  const tree = renderer
    .create(
      <div>
        <CompanyList names="@Google, @Microsoft, OtherCompany" />
      </div>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
