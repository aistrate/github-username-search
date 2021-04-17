import { ExternalLink } from "../Shared/Styled";
import { WindowTitle } from "../Shared/Utils";

export default AboutPage;

type AboutPageProps = {
  appName: string;
};

function AboutPage({ appName }: AboutPageProps) {
  return (
    <>
      <WindowTitle value={`About - ${appName}`} />

      <p>
        Check out the source code for the website{" "}
        <ExternalLink href="https://github.com/aistrate/github-username-search">
          here
        </ExternalLink>
        .
      </p>

      <h3>How to search</h3>

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
