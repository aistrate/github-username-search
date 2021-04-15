import { Link } from "react-router-dom";
import { HistoryItem } from "./Models";

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
      <p>
        <Link to="/search?q=mojombo">mojombo</Link>
      </p>
      <p>
        <Link to="/search?q=gaearon">gaearon</Link>
      </p>
      <p>
        <Link to="/search?q=rtfeldman">rtfeldman</Link>
      </p>
    </>
  );
}
