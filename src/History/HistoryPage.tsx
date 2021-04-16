import { Link as RouterLink } from "react-router-dom";
import { HistoryItem } from "./Models";
import { LargeHeading, Row, Link } from "../Shared/Styled";
import { formatDateTime } from "../Shared/Utils";

export default HistoryPage;

const history: HistoryItem[] = [
  {
    username: "mojombo",
    timestamp: 1618518450088,
  },
  {
    username: "gaearon",
    timestamp: 1618518412719,
  },
  {
    username: "rtfeldman",
    timestamp: 1618518302425,
  },
];

function HistoryPage() {
  return (
    <>
      <LargeHeading>History</LargeHeading>

      {history.map((historyItem) => (
        <Row label={formatDateTime(historyItem.timestamp)}>
          <RouterLink to={`/search?q=${historyItem.username}`} component={Link}>
            {historyItem.username}
          </RouterLink>
        </Row>
      ))}
    </>
  );
}
