import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const ProgressCircle = withStyles((theme) => ({
  root: {
    color: "#703B09",
  },
}))(CircularProgress);

export default ProgressCircle;
