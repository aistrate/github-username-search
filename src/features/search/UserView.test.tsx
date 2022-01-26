import renderer from "react-test-renderer";
import { removeClassNames } from "../../common/testUtils";
import { CompanyList } from "./UserView";

test("<CompanyList> transforms company names prefixed with '@' into links to each company's GitHub username", () => {
  const tree = renderer
    .create(
      <div>
        <CompanyList names="@Google, @Microsoft, OtherCompany" />
      </div>
    )
    .toJSON();

  removeClassNames(tree);

  expect(tree).toMatchSnapshot();
});
