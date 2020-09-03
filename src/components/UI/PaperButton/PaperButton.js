import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: '5px',
    transition: 'all 0.2s ease-out',
    '&:hover': {
      transform: 'scale(1.2,1.2)',
      animation: '$bump 0.5s ease-in-out',
    },
  },
  '@keyframes bump': {
    '0%': {
      transform: 'scale(1,1)',
    },
    '33%': {
      transform: 'scale(1.8,1.8)',
    },
    '66%': {
      transform: 'scale(0.9,0.9)',
    },
    '80%': {
      transform: 'scale(1,1)',
    },
    '100%': {
      transform: 'scale(1.2,1.2)',
    },
  },
}));

const PaperButton = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Button
        disabled={props.disabled}
        onClick={props.onClick}
        startIcon={props.startIcon}
        variant={props.variant}
        size={props.size}
        color={props.color}
        className={classes.root}
      >
        {props.children}
      </Button>
    </div>
  );
};

export default PaperButton;
