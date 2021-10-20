import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { ButtonBase } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: "100%",
  },
  image: {
    width: 300,
    height: 190,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

export default function UserItem({
  users,
  handleSubmit,
  handleConfigure,
  handleDelete,
  handleShowModal,
  handleId,
}) {
  const classes = useStyles();

  const productClick = (imgUrl) => {};

  const { username, title, address, phone, media, active } = users;

  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.paper} style={{ marginTop: "20px" }}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase
                className={classes.image}
                onClick={() => {
                  productClick(media);
                }}
              >
                <img style={{width:300,height:250}} className={classes.img} alt="complex" src={media} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm={12} md={6} container>
              <Grid
                item
                xs
                sm
                md
                container
                direction="column"
                spacing={2}
                alignItems="start"
                style={{ paddingLeft: "50px", paddingTop: "40px" }}
              >
                <Grid item xs sm md>
                  <Typography gutterBottom variant="h5">
                    Nomi: {title}
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    Manzil: {address}
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    Telefon: {phone}
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    Rahbari: {username}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item alignItems="start" style={{ paddingTop: "20px" }}>
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    handleShowModal();
                    handleId(users.id);
                  }}
                >
                  <DeleteIcon style={{ color: "red" }} />
                </IconButton>
                <IconButton
                  aria-label="edit"
                  component={Link}
                  to={{ pathname: "/edituser", user: users }}
                >
                  <EditIcon style={{ color: "green" }} />
                </IconButton>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="top"
                    control={
                      <Switch
                        checked={active}
                        onChange={handleSubmit}
                        name="isActive"
                        color="primary"
                      />
                    }
                    label="Status"
                    labelPlacement="top"
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  );
}
