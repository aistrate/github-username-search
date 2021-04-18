import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import type { HistoryItem } from "./Models";
import { getLocalStorageItem } from "../Shared/LocalStorage";
import { LargeHeading, Row } from "../Shared/Styled";
import { WindowTitle, formatDateTime } from "../Shared/Utils";

export default HistoryPage;

type HistoryPageProps = {
  appName: string;
};

function HistoryPage({ appName }: HistoryPageProps) {
  const [history, setHistory] = useState<HistoryItem[] | null>(null);

  useEffect(() => {
    setHistory(getLocalStorageItem<HistoryItem[]>("searchHistory", []));
  }, []);

  return (
    <>
      <WindowTitle value={`History - ${appName}`} />

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
        <span className="HistoryRow__timestamp">
          {formatDateTime(historyItem.timestamp, "weekday-date-time")}
        </span>
      }
      labelSuffix=""
    >
      <RouterLink className="Link" to={`/search?q=${historyItem.username}`}>
        {historyItem.username}
      </RouterLink>
    </Row>
  );
}
