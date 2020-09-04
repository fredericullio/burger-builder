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
    },
    [theme.breakpoints.up('xl')]: {
      width: '700px'
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    maxHeight: '90%',
    justifyContent: 'space-around',
    boxSizing: 'border-box'
  },
  paper: {
    padding: '20px',
  },
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

          <Box className={classes.brgrContainer} width='100%' overflow='auto' >
            <Burger ingredients={props.ingredients} />
          </Box>
          <Box width={{xs: '100%', lg: '80%'}}>
          <Paper elevation={8} className={classes.paper}>
            <Typography align='center' style={{ padding: 'auto', fontFamily: 'Times New Roman, serif' }}>
              Behold your burger of choice.{<br />} Please, confirm these are
              the ingredients you desire.
            </Typography>
          </Paper>
          <Box
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            pb='20px'
            pt='20px'
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
              CONFIRM
            </PaperButton>
          </Box>
          </Box>
      </Paper>
    </Box>
  );
};

export default CheckoutSummary;
