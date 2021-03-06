import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/macro";
import { useAppDispatch } from "../../app/store";
import DocumentTitle from "../../common/DocumentTitle";
import { formatDateTime } from "../../common/formatting";
import { LargeHeading } from "../../common/styled/headings";
import { InternalLink } from "../../common/styled/links";
import Row from "../../common/styled/Row";
import {
  HistoryItem,
  loadHistory,
  resetHistory,
  selectHistory,
} from "./historySlice";

export default HistoryPage;

function HistoryPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadHistory());

    return () => {
      dispatch(resetHistory());
    };
  }, [dispatch]);

  const history = useSelector(selectHistory);

  return (
    <>
      <DocumentTitle value="History" />

      <LargeHeading>
        History {history ? `(${history.length})` : ""}
      </LargeHeading>

      {history && (
        <div data-testid="historyList">
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

function HistoryRow({ historyItem: { timestamp, username } }: HistoryRowProps) {
  return (
    <Row
      label={
        <Timestamp>{formatDateTime(timestamp, "weekday-date-time")}</Timestamp>
      }
      labelSuffix=""
    >
      <InternalLink to={`/search?username=${username}`}>
        {username}
      </InternalLink>
    </Row>
  );
}

const Timestamp = styled.span`
  opacity: 0.65;
`;
