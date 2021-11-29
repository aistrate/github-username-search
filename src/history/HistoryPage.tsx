import styled from "styled-components/macro";
import { formatDateTime } from "../common/formatting";
import WindowTitle from "../common/WindowTitle";
import { LargeHeading } from "../styled/Headings";
import { InternalLink } from "../styled/Links";
import Row from "../styled/Row";
import type { HistoryItem } from "./models";
import { useLoadHistory } from "./persistHistory";

export default HistoryPage;

function HistoryPage() {
  const history = useLoadHistory();

  return (
    <>
      <WindowTitle value="History" />

      <LargeHeading>
        History {history ? `(${history.length})` : ""}
      </LargeHeading>

      {history && (
        <div>
          {history.length > 0 ? (
            history.map((historyItem) => (
              <HistoryRow
                key={historyItem.timestamp}
                historyItem={historyItem}
              />
            ))
          ) : (
            <>(empty)</>
          )}
        </div>
      )}
    </>
  );
}

type HistoryRowProps = {
  historyItem: HistoryItem;
};

function HistoryRow({ historyItem }: HistoryRowProps) {
  return (
    <Row
      label={
        <Timestamp>
          {formatDateTime(historyItem.timestamp, "weekday-date-time")}
        </Timestamp>
      }
      labelSuffix=""
    >
      <InternalLink to={`/search?q=${historyItem.username}`}>
        {historyItem.username}
      </InternalLink>
    </Row>
  );
}

const Timestamp = styled.span`
  opacity: 0.65;
`;
