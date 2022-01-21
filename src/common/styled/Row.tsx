import styled from "styled-components/macro";

export default Row;

type RowProps = {
  label?: React.ReactNode;
  labelSuffix?: string;
  children?: React.ReactNode;
};

function Row({ label, labelSuffix = ":", children }: RowProps) {
  return (
    <Container>
      <Label>
        {label}
        {labelSuffix}
      </Label>
      <Text data-testid="rowValue">{children}</Text>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  line-height: 1.5;
  padding: 0.5em 0;
  position: relative;

  :nth-child(even)::before {
    content: "";
    position: absolute;
    left: -1rem;
    right: -1rem;
    top: 0;
    bottom: 0;
    pointer-events: none;
    background-color: hsla(198, 45%, 10%, 0.04);
  }

  @media (max-width: 40em) {
    & {
      flex-direction: column;
    }
  }
`;

const Label = styled.dt`
  flex: 0 0 33%;
  min-width: 10.5em;
  margin-right: 1.5em;

  @media (max-width: 40em) {
    & {
      margin-bottom: 0.25em;
    }
  }
`;

const Text = styled.dd`
  flex: 1;
  margin-left: 0;
  font-weight: 600;
`;
