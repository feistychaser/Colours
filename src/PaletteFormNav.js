import React, { useState } from "react";
import PaletteMetaForm from "./PaletteMetaForm";
import { Link } from "react-router-dom";
import classNames from "classnames";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import Button from "@mui/material/Button";
import styles from "./styles/PaletteFormNavStyles";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";

export default function PaletteFormNav(props) {
  const theme = useTheme();
  const Component = styled("div")(styles(theme));
  const [newPaletteName, setNewPaletteName] = useState("");
  const [formShowing, setFormShowing] = useState(false);

  const showForm = () => {
    setFormShowing(true);
  };
  const hideForm = () => {
    setFormShowing(false);
  };

  const { open, palettes, handleSubmit } = props;
  return (
    <Component className="root">
      <CssBaseline />
      <AppBar
        color="default"
        className={classNames("appBar", {
          ["appBarShift"]: open,
        })}
      >
        <Toolbar disableGutters={!open}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={props.handleDrawerOpen}
            className={classNames("menuButton", {
              ["hide"]: open,
            })}
          >
            <AddToPhotosIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap>
            Create A Palette
          </Typography>
        </Toolbar>
        <div className="navBtns">
          <Link to="/">
            <Button variant="contained" color="secondary" className="button">
              Go Back
            </Button>
          </Link>
          <Button
            variant="contained"
            color="primary"
            onClick={showForm}
            className="button"
          >
            Save
          </Button>
        </div>
      </AppBar>
      {formShowing && (
        <PaletteMetaForm
          palettes={palettes}
          handleSubmit={handleSubmit}
          hideForm={hideForm}
        />
      )}
    </Component>
  );
}
