import React from "react";

import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";



const useStyles =  makeStyles(theme => ({
    input: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    }
}));

const Input = (props) => {
    const classes = useStyles();



  switch (props.component) {
    case "textfield":
       return <TextField  disabled={props.disabled} value={props.value} error={props.error} helperText={props.helperText} onChange={props.changed} className={classes.input} fullWidth {...props.elementConfig} variant="outlined" />;
     
    case "select":
      return (
        <FormControl  fullWidth className={classes.input} variant="outlined">
          <InputLabel id="select-label-id">{props.elementConfig.label}</InputLabel>
          <Select id="select-element" labelId="select-label-id" label="Delivery" value={props.value} onChange={props.changed}>
            {props.elementConfig.options.map((op) => {
            return(
              <MenuItem key={op.display} value={op.value}>
                {op.display}
              </MenuItem>
            )})}
          </Select>
        </FormControl>
      );
      default:
          return null;
  }
};

const areEqual = (prevProps, nextProps) => prevProps.value === nextProps.value;

export default React.memo(Input, areEqual);
