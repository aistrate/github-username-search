import { Link } from "../Shared/Styled";

export default AboutPage;

function AboutPage() {
  return (
    <>
      <p>
        Check out the source code for the website{" "}
        <Link href="https://github.com/aistrate/github-username-search">
          here
        </Link>
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
