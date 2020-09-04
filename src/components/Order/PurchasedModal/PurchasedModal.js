import React from 'react';

import Paper from '@material-ui/core/Paper';

import PaperButton from '../../UI/PaperButton/PaperButton';

const PurchasedModal = (props) => {
  return (
    <Paper style={{textAlign:'center', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', justifyContent: 'space-between', height: '200px', boxSizing: 'border-box'}}>
     
        <h1 style={{margin: 0}}>Great success!</h1>
       <p style={{margin: 0}}>Your order has been filed and you'll be able to devour your burger soon!</p>
      
      <PaperButton onClick={props.close} variant='contained' color='primary'>close</PaperButton>
    </Paper>
  );
};

export default PurchasedModal;