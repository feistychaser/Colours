import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Button from "@mui/material/Button";
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from "react-sortable-hoc";
import styles from "./styles/NewPaletteFormStyles";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";

export default function NewPaletteForm(props) {
  const theme = useTheme();
  const navigate = useNavigate();

  const Component = styled("div")(styles(theme));
  const [open, setOpen] = useState(true);
  const [colors, setColors] = useState(props.palettes[0].colors);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const addNewColor = (newColor) => {
    setColors([...colors, newColor]);
  };
  const handleChange = (evt) => {
    setColors(evt.target.value);
  };
  const clearColors = () => {
    setColors([]);
  };
  const addRandomColor = () => {
    const allColors = props.palettes.map((p) => p.colors).flat();
    const rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
    setColors([...colors, randomColor]);
  };
  const handleSubmit = (newPalette) => {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
    newPalette.colors = colors;
    props.savePalette(newPalette);
    navigate("/");
  };
  const removeColor = (colorName) => {
    setColors(colors.filter((color) => color.name !== colorName));
  };
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  };

  const { maxColors, palettes } = props;
  const paletteIsFull = colors.length >= maxColors;
  return (
    <Component className="root">
      <PaletteFormNav
        open={open}
        palettes={palettes}
        handleSubmit={handleSubmit}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Drawer
        className="drawer"
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: "drawerPaper",
        }}
      >
        {" "}
        <div className="drawerHeader">
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className="container">
          <Typography variant="h4" gutterBottom>
            Design Your Palette
          </Typography>
          <div className="buttons">
            <Button
              variant="contained"
              color="secondary"
              onClick={clearColors}
              className="button"
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              className="button"
              color="primary"
              onClick={addRandomColor}
              disabled={paletteIsFull}
            >
              Random Color
            </Button>
          </div>
          <ColorPickerForm
            paletteIsFull={paletteIsFull}
            addNewColor={addNewColor}
            colors={colors}
          />
        </div>
      </Drawer>
      <main
        className={classNames("content", {
          ["contentShift"]: open,
        })}
      >
        <DraggableColorList
          colors={colors}
          removeColor={removeColor}
          axis="xy"
          onSortEnd={onSortEnd}
        />
      </main>
    </Component>
  );
}
