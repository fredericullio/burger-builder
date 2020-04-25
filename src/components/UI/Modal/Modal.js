import React from "react";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Slide from "@material-ui/core/Slide";

const ModalElement = (props) => (
  <Modal
    open={props.show}
    onClose={props.modalClosed}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
  >
    <Slide direction="down" in={props.show} timeout={{enter: 500, exit: 500}}>
      {props.children}
    </Slide>
  </Modal>
);

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.show === nextProps.show &&
    nextProps.children === prevProps.children
  );
};

// <React.Fragment>
//   <Backdrop show={props.show} clicked={props.modalClosed} />
//   <div
//     className={classes.Modal}
//     style={{
//       transform: props.show ? "translateY(0)" : "translateY(-100vh)",
//       opacity: props.show ? "1" : "0"
//     }}
//   >
//     {props.children}
//   </div>
// </React.Fragment>

export default React.memo(ModalElement, areEqual);
