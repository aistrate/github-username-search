import { WindowTitle } from "../Shared/WindowTitle";
import { SmallHeading } from "../Styled/Headings";
import { ExternalLink } from "../Styled/Link";

export default AboutPage;

function AboutPage() {
  return (
    <>
      <WindowTitle value="About" />

      <p>
        Check out the source code for the website{" "}
        <ExternalLink href="https://github.com/aistrate/github-username-search">
          here
        </ExternalLink>
        .
      </p>

      <SmallHeading largeMarginTop>How to search</SmallHeading>

      <p>Search for full usernames, not partials.</p>

      <p>Examples:</p>
      <ul>
        <li>
          <b>Organizations:</b> facebook, google, netflix, apple, amzn, aws,
          microsoft, github, reddit, twitter, airbnb, shopify, intel, ibm,
          JetBrains, nodejs, graphql, gatsbyjs
        </li>
        <li>
          <b>Individuals:</b> fabpot, taylorotwell, wycats, mojombo, gaearon,
          yyx990803, Rich-Harris, rtfeldman, lattner, kentcdodds, shanselman,
          jskeet, serras
        </li>
      </ul>
    </>
  );
}
