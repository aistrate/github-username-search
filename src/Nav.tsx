import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";

export default Nav;

function Nav() {
  return (
    <nav>
      <List>
        <NavItem to="/search">Search</NavItem>
        <NavItem to="/history">History</NavItem>
        <NavItem to="/about">About</NavItem>
      </List>
    </nav>
  );
}

type NavItemProps = {
  to: string;
  children?: React.ReactNode;
};

function NavItem({ to, children }: NavItemProps) {
  return (
    <ListItem>
      <StyledNavLink to={to} activeClassName="active">
        {children}
      </StyledNavLink>
    </ListItem>
  );
}

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: rgb(0, 0, 0, 0.85);
  font-size: 1.25rem;
`;

const ListItem = styled.li`
  float: left;
`;

const StyledNavLink = styled(NavLink)`
  display: block;
  color: rgb(255, 255, 255, 0.5);
  font-weight: 600;
  padding: 0.4em 0.8em;
  text-align: center;
  text-decoration: none;

  :hover {
    color: white;
    background-color: rgb(255, 255, 255, 0.1);
  }

  &.active {
    color: white;
  }
`;
