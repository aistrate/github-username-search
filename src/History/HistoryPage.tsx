import { useState, useEffect } from "react";
import styled from "styled-components/macro";
import type { HistoryItem } from "./Models";
import { getLocalStorageItem } from "../Shared/LocalStorage";
import { WindowTitle } from "../Shared/WindowTitle";
import { LargeHeading } from "../Styled/Headings";
import { Row } from "../Styled/Row";
import { InternalLink } from "../Styled/Links";
import { formatDateTime } from "../Shared/Formatting";

export default HistoryPage;

function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[] | null>(null);

  useEffect(() => {
    setHistory(getLocalStorageItem<HistoryItem[]>("searchHistory", []));
  }, []);

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
