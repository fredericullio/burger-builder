import React from 'react';

import { NavLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  btnDesktop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    width: '150px',
    height: '100%',
    textAlign: 'center',
    color: '#ffff',
    fontWeight: 'bold',
    borderRadius: 0,
    borderBottom: '4px solid transparent',
    transition: '0.3s ease-in-out',
    '&:hover': {
      borderBottom: '4px solid #40a4c8',
      backgroundColor: theme.palette.secondary.main,
      height: '100%',
      boxSizing: 'border-box',
    },
  },
  btnMobile: {
    color: theme.palette.secondary.main,
  },
  activeD: {
    borderBottom: '4px solid #40a4c8',
    backgroundColor: theme.palette.secondary.main,
    height: '100%',
    boxSizing: 'border-box',
  },
  activeM: {
    color: theme.palette.primary.main,
  }
}));

const NavigationItem = (props) => {
  const classes = useStyles();
  return (
    <NavLink
      exact
      onClick={props.onClick}
      className={props.desktop ? classes.btnDesktop : classes.btnMobile}
      activeClassName={props.desktop ? classes.activeD : classes.activeM}
      to={props.link}
      style={{ textDecoration: 'none' }}
    >
      {props.children}
    </NavLink>
  );
};

export default NavigationItem;
