import React from 'react';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const ControlButton = withStyles((theme) => ({
  root: {
    display: 'block',
    boxShadow: '1px 1px 3px' + theme.palette.grey[900],
    position: 'relative',
    font: 'inherit',
    padding: '5px',
    margin: '0 5px',
    width: '80px',
    cursor: 'pointer',
    outline: 'none',
    borderRadius: 0,
    transition: 'all 0.3s',
    '&:hover': {
      boxShadow: '2px 2px 5px ' + theme.palette.grey[900],
      fontWeight: 'bold',
      borderRadius: '10px',
      transform: 'scale(1.1,1.1)'
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  less: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    '&:hover': {
      backgroundColor: '#DAA972',
    },
    '&:disabled': {
      backgroundColor: '#AC9980',
      color: '#ccc',
      boxShadow: 'none',
      border: 'solid 1px ' + theme.palette.grey[600],
      transform: 'scale(0.95,0.95)'
    },
  },
  more: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
}));

const BuildControl = (props) => {
  const classes = useStyles();

  return (
    <Box
      display='flex'
      direction='column'
      justifyContent='space-between'
      alignItems='center'
      mt='5px'
      mr={0}
    >
      <Box p='10px' fontWeight='bold' width='80px'>
        {props.label}
      </Box>
      <span style={{ cursor: props.disabled ? 'not-allowed' : 'pointer' }}>
        <ControlButton
          disabled={props.disabled}
          onClick={props.removed}
          className={classes.less}
        >
          Less
        </ControlButton>
      </span>
      <ControlButton onClick={props.added} className={classes.more}>
        More
      </ControlButton>
    </Box>
  );
};

export default BuildControl;
