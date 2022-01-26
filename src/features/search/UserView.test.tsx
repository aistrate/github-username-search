import renderer from "react-test-renderer";
import { removeClassNames } from "../../common/testUtils";
import { CompanyList } from "./UserView";

test("<CompanyList> transforms company names prefixed with '@' into links to each company's GitHub username", () => {
  let tree = renderer
    .create(<CompanyList names="@Google, @Microsoft, OtherCompany" />)
    .toJSON();

  removeClassNames(tree);

  expect(tree).toMatchSnapshot();
});
