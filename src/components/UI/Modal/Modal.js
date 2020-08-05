import React from 'react';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Slide from '@material-ui/core/Slide';
import Box from '@material-ui/core/Box'

const ModalElement = (props) => (
  <Modal
    open={props.show}
    onClose={props.modalClosed}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'auto' }}
  >
    <Slide direction='down' in={props.show} timeout={{ enter: 500, exit: 500 }}>
      <Box display='flex' alignItems='center' justifyContent='center'>{props.children}</Box>
    </Slide>
  </Modal>
);

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.show === nextProps.show &&
    nextProps.children === prevProps.children
  );
};

export default React.memo(ModalElement, areEqual);
