import React from 'react';

import BurgerLogo from '../../../assets/images/logo.png';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    rotation: {
      height: '80px',
      width: '100px',
      margin: '0 auto 50px',
      display: 'block',
  
      animation: '$rotate 3s infinite linear',
    },
    '@keyframes rotate': {
      from: {
        transform: 'rotate(0deg)',
      },
      to: {
        transform: 'rotate(359deg)',
      },
    },
  }));

const RotatingLogo = (props) => {
    const classes = useStyles();
    return <img style={{transform: `scale(${props.scale || 1}, ${props.scale || 1})`}} className={classes.rotation} src={BurgerLogo} alt='logo' />
}

export default RotatingLogo; 