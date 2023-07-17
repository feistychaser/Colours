import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slider from "rc-slider";

import "rc-slider/assets/index.css";
import styles from "./styles/NavbarStyles";
import { styled } from "@mui/material/styles";
const Component = styled("div")(styles);

export default function Navbar(props) {
  const [format, setFormat] = useState("hex");
  const [open, setOpen] = useState(false);

  const handleFormatChange = (e) => {
    setFormat(e.target.value);
    setOpen(true);
    props.handleChange(e.target.value);
  };
  const closeSnackbar = () => {
    setOpen(false);
  };
  const { level, changeLevel, showingAllColors } = props;
  return (
    <Component>
      <header className="Navbar">
        {showingAllColors && (
          <div>
            <span>Level: {level}</span>
            <div className="slider">
              <Slider
                defaultValue={level}
                min={100}
                max={900}
                step={100}
                onAfterChange={changeLevel}
              />
            </div>
          </div>
        )}
        <div className="selectContainer">
          <Select value={format} onChange={handleFormatChange}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255,255,255, 1.0)</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={open}
          autoHideDuration={3000}
          message={
            <span id="message-id">
              Format Changed To {format.toUpperCase()}
            </span>
          }
          ContentProps={{
            "aria-describedby": "message-id",
          }}
          onClose={closeSnackbar}
          action={[
            <IconButton
              onClick={closeSnackbar}
              color="inherit"
              key="close"
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </header>
    </Component>
  );
}
