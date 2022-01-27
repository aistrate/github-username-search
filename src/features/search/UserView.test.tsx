import { render } from "@testing-library/react";
import { CompanyList } from "./UserView";

test("<CompanyList> transforms company names prefixed with '@' into links to each company's GitHub username", () => {
  const { container } = render(
    <div>
      <CompanyList names="@Google, @Microsoft, OtherCompany" />
    </div>
  );

  expect(container.firstChild).toMatchSnapshot();
});
