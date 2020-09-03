import React from 'react';

import Burger from '../../Burger/Burger';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import PaperButton from '../../UI/PaperButton/PaperButton';

const useStyles = makeStyles((theme) => ({
  btn: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  container: {
    [theme.breakpoints.down('sm')]: {
      transform: 'scale(0.9)',
      height: '90%'
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px 20px 0',
    height: '80%',
    justifyContent: 'space-around'
  },
  paper: {
    padding: '20px',
  }
}));

const CheckoutSummary = (props) => {
  const classes = useStyles();

  return (
    <Box
      height='calc(100vh - 70px)'
      width='100%'
      display='flex'
      justifyContent='center'
      alignItems='center'
      boxSizing='border-box'
    >
      <Paper className={classes.container} elevation={6}>
          <Box
            component='span'
            fontSize={{ xs: 40, sm: 60 }}
            fontFamily="'Dancing Script', cursive"
          >
            Bon Appétit!
          </Box>

          <Box width='100%' mx='auto' overflow='auto'>
            <Burger ingredients={props.ingredients} />
          </Box>
          <Paper elevation={8} className={classes.paper}>
            <Typography align='center' style={{ padding: 'auto', fontFamily: 'Times New Roman, serif' }}>
              Behold your burger of choice.{<br />} Please, comfirm these are
              the ingredients you desire.
            </Typography>
          </Paper>
          <Box
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            pb='20px'
            pt='20px'
            width='100%'
          >
            <PaperButton
              onClick={props.checkoutCancel}
              className={classes.btn}
              color='secondary'
              variant='contained'
            >
              CANCEL
            </PaperButton>
            <PaperButton
              onClick={props.checkoutContinue}
              className={classes.btn}
              color='primary'
              variant='contained'
            >
              COMFIRM
            </PaperButton>
          </Box>
      </Paper>
    </Box>
  );
};

export default CheckoutSummary;
