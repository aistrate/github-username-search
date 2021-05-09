import { WindowTitle } from "../Shared/WindowTitle";
import { SmallHeading } from "../Styled/Headings";
import { ExternalLink } from "../Styled/Links";

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

      <SmallHeading largeMarginTop>Rate limit</SmallHeading>

      <p>
        For unauthenticated requests, the GitHub API has a{" "}
        <ExternalLink href="https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting">
          rate limit
        </ExternalLink>{" "}
        of 60 requests per hour, associated with your IP address. The website
        makes two types of requests:
      </p>
      <ul>
        <li>user info</li>
        <li>page of repositories</li>
      </ul>

      <p>
        The browser might do some caching on recent requests, so the actual
        number of requests you get can be slightly higher.
      </p>

      <p>
        Please bear in mind this limit when using the website (be economical
        with requests, especially when paging through repositories).
      </p>
    </>
  );
}
