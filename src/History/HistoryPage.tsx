import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import styles from "./HistoryPage.module.css";
import type { HistoryItem } from "./Models";
import { getLocalStorageItem } from "../Shared/LocalStorage";
import WindowTitle from "../Shared/WindowTitle";
import { LargeHeading } from "../Styled/Headings";
import Row from "../Styled/Row";
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
        <span className={styles.timestamp}>
          {formatDateTime(historyItem.timestamp, "weekday-date-time")}
        </span>
      }
      labelSuffix=""
    >
      <RouterLink
        className={styles.usernameLink}
        to={`/search?q=${historyItem.username}`}
      >
        {historyItem.username}
      </RouterLink>
    </Row>
  );
}
