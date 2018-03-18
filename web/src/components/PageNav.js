import React from 'react';
import BaseWrapper from './BaseWrapper';
import Link from '../routing/Link';
import logo from '../assets/capgownvote.svg';
import { toggleNavMenu } from '../actions';
import {
  selectAuthId, selectUserRole, selectIsNavOpen,
} from '../selectors';
import {
  Nav, NavLogo, NavLinkLayout, NavHamburger,
  NavHamburgerLayout, NavHamburgerWrapper,
  NavLinkMenu, NavLink,
} from '../blocks';

const PageNav = (props) => {
  const { isNavOpen, toggleNavMenu } = props;

  const HomeLink = Link(({ onClick }) => (
    <NavLogo
      src={logo}
      alt="Logo"
      onClick={onClick}
    />
  ), '/');

  const menuLinks = [
    {
      title: 'About',
      to: '/about',
    },
    {
      title: 'Register',
      to: '/register',
    },
    {
      title: 'Leaderboard',
      to: '/leaderboard',
    },
  ];

  return (
    <Nav>
      <HomeLink />
      <NavLinkMenu open={isNavOpen}>
        <NavLinkLayout open={isNavOpen}>
          {menuLinks.map(link => {
            const { title, to } = link;

            const MenuLink = Link(({ onClick }) => (
              <NavLink onClick={onClick}>{title}</NavLink>
            ), to);

            return (
              <MenuLink key={title} />
            );
          })}
        </NavLinkLayout>
      </NavLinkMenu>
      <NavHamburgerLayout>
        <NavHamburgerWrapper onClick={toggleNavMenu}>
          <NavHamburger open={isNavOpen} />
        </NavHamburgerWrapper>
      </NavHamburgerLayout>
    </Nav>
  );
};

PageNav.mapStateToProps = (state) => ({
  userRole: selectUserRole(selectAuthId(state), state),
  isNavOpen: selectIsNavOpen(state),
});

PageNav.actionCreators = {
  toggleNavMenu,
};

export default BaseWrapper(PageNav);
