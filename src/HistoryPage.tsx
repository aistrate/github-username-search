import { Link } from "react-router-dom";

export default HistoryPage;

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
