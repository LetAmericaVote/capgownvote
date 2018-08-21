import React from 'react';
import BaseWrapper from './BaseWrapper';
import Link from '../routing/Link';
import logo from '../assets/capgownvote.svg';
import invertedLogo from '../assets/capgownvote-light.svg';
import { toggleNavMenu } from '../actions';
import {
  selectAuthId, selectUserRole, selectIsNavOpen,
  selectIsAuthenticated, selectCurrentRoute,
} from '../selectors';
import {
  Nav, NavLogo, NavLinkLayout, NavHamburger,
  NavHamburgerLayout, NavHamburgerWrapper,
  NavLinkMenu, NavLink,
} from '../blocks';

const PageNav = (props) => {
  const {
    currentRoute, isNavOpen,
    toggleNavMenu, isAuthenticated,
    isFloated, isInverted,
  } = props;

  const HomeLink = Link(({ onClick }) => (
    <NavLogo
      src={isInverted && ! isNavOpen ? invertedLogo : logo}
      alt="Logo"
      onClick={onClick}
    />
  ), '/');

  const menuLinks = [
    {
      title: 'Student Ambassadors',
      to: '/ambassador',
    },
    {
      title: 'Activists',
      to: '/activist',
    },
    {
      title: 'School Leaderboard',
      to: '/leaderboard',
    },
    {
      title: 'Register To Vote',
      to: '/register',
    },
  ];

  if (isAuthenticated) {
    menuLinks.push({
      title: 'Profile',
      to: '/auth',
    });
  }

  return (
    <Nav float={isFloated} transparent={isInverted} fillPage={isFloated && isNavOpen}>
      <HomeLink />
      <NavLinkMenu open={isNavOpen}>
        <NavLinkLayout open={isNavOpen}>
          {menuLinks.map(link => {
            const { title, to } = link;

            const MenuLink = Link(({ onClick }) => (
              <NavLink
                onClick={() => {
                  onClick();
                  toggleNavMenu();
                }}
                active={currentRoute === to}
                invertColors={isInverted && ! isNavOpen}
              >{title}</NavLink>
            ), to);

            return (
              <MenuLink key={title} />
            );
          })}
        </NavLinkLayout>
      </NavLinkMenu>
      <NavHamburgerLayout>
        <NavHamburgerWrapper onClick={toggleNavMenu}>
          <NavHamburger open={isNavOpen} invertColors={isInverted && ! isNavOpen} />
        </NavHamburgerWrapper>
      </NavHamburgerLayout>
    </Nav>
  );
};

PageNav.mapStateToProps = (state) => ({
  userRole: selectUserRole(selectAuthId(state), state),
  isNavOpen: selectIsNavOpen(state),
  isAuthenticated: selectIsAuthenticated(state),
  currentRoute: selectCurrentRoute(state),
});

PageNav.actionCreators = {
  toggleNavMenu,
};

export default BaseWrapper(PageNav);
