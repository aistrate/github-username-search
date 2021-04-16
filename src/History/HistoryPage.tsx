import { Link as RouterLink } from "react-router-dom";
import { HistoryItem } from "./Models";
import { LargeHeading, Row } from "../Shared/Styled";
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

      <History />
    </>
  );
}

function History() {
  return (
    <>
      {history.map((historyItem) => (
        <Row
          key={historyItem.timestamp}
          label={
            <span className="History__timestamp">
              {formatDateTime(historyItem.timestamp)}
            </span>
          }
          labelSuffix=""
        >
          <RouterLink className="Link" to={`/search?q=${historyItem.username}`}>
            {historyItem.username}
          </RouterLink>
        </Row>
      ))}
    </>
  );
}
