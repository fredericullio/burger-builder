import React from 'react';

import moment from 'moment';

import Burger from '../Burger/Burger';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';

const Order = (props) => {

  const createDisplayItem = (name, content) => {
    return (
      <React.Fragment>
        <Box component='span' fontWeight='bold'>
          {name}:
        </Box>{' '}
        {content}
        <Box>
        <br />
        </Box>
      </React.Fragment>
    );
  };

  return (
    <ListItem>
      <Box
        border='1px solid #eee'
        borderRadius='10px'
        p='10px'
        m='10px auto'
        boxSizing='border-box'
        boxShadow={4}
        textAlign='center'
        display='flex'
        flexDirection='column'
        width={{xs: '100%', sm: '500px'}}
      ><Box display='flex' flexDirection={{xs: 'column', sm: 'row'}} alignItems='center'>

      
          <Box
              style={{transition: 'all 0.8s ease-out'}}
              borderRadius='6px'
              boxSizing='border-box'
              display='flex'
              maxWidth={{xs: '100%', sm: '320px', lg: '250px'}}
              padding='20px'
              marginBottom='20px'
              boxShadow='gray 3px 3px 6px'
              
          >
            <Typography align='left' style={{textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap'}}>
              <Box component='span' fontSize={{ xs: 12, sm: 14 }}>
                {createDisplayItem('Date', moment(props.date).format('llll'))}

                {createDisplayItem('First name', props.data.firstName)}
                {createDisplayItem('Last name', props.data.lastName)}
                {createDisplayItem('Postal code', props.data.postalCode)}
                {createDisplayItem('Street', props.data.street)}
                {createDisplayItem('Delivery', props.data.delivery)}
                {createDisplayItem('Price', `$${props.price.toFixed(2)}`)}
              </Box>
            </Typography>
          </Box>
          <Box display='flex' flexGrow={1} overflow='auto' maxHeight={{xs: '150px', lg:'250px'}}>
          <Burger ingredients={props.ingredients} scale={3}/>
          </Box>
          
      
          </Box>
          <Box display='flex' flexDirection='column'>
            <Box component='span' fontWeight='bold'>
              {`Ingredients: `}
            </Box>
            <Box
              display='flex'
              justifyContent='center'
              mt='20px'
              flexWrap='wrap'
            >
              {Object.keys(props.ingredients).filter(ingName => props.ingredients[ingName] > 0).map((ingName) => {
                     return <Box
                     key={ingName + '-' + props.id}
                     boxShadow='2px 2px 5px gray'
                     m='5px'
                     p={1}
                     borderRadius='3px'
                   >
                    <strong>{ingName}: </strong>{props.ingredients[ingName]}
                   </Box>

              })}
            </Box>
          </Box>
      </Box>
    </ListItem>
  );
};

export default Order;
