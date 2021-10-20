import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable"; // this is must learn

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function ComfirmComponent({
  show,
  text,
  handleClickOpen,
  handleClose,
  handleConfigure,
}) {
  return (
    <div>
      <Dialog
        open={show}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Ogoxlantirish 
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ color: "black", fontSize: "29px" }}>
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="contained">
            Bekor qilish
          </Button>
          <Button
            onClick={() => {handleConfigure(true); handleClose()}}
            color="primary"
            variant="contained"
          >
            Tasdiqlash
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
