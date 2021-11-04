import { makeStyles } from "@material-ui/core/styles";
const bgcolor = "white";
export const useStyles = makeStyles((theme) => ({
  inputs: {
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "10px",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  paper: {
    padding: "0px 30px 0px 30px",
    textAlign: "center",
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: bgcolor,
    borderRadius: "20px",
  },
  wrapper: {
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: bgcolor,
    borderRadius: "10px",
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    width: "100%",
  },
  input: {
    display: "none",
  },
  buttonGroup: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
    justifyContent: "center",
    backgroundColor: bgcolor,
  },
}));
