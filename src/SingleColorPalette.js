import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import styles from "./styles/PaletteStyles";
import ColorBox from "./ColorBox";
import { styled } from "@mui/material/styles";
const Component = styled("div")(styles);
export default function SingleColorPalette(props) {
  const { colorId, paletteId } = useParams();
  const { findPalette, generatePalette } = props;
  const palette = generatePalette(findPalette(paletteId));
  const [format, setFormat] = useState("hex");
  const gatherShades = (palette, colorToFilterBy) => {
    let shades = [];
    let allColors = palette.colors;

    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colorToFilterBy)
      );
    }
    return shades.slice(1);
  };
  const _shades = gatherShades(palette, colorId);

  const changeFormat = (val) => {
    setFormat(val);
  };
  const { paletteName, emoji } = palette;

  const colorBoxes = _shades.map((color) => (
    <ColorBox
      key={color.name}
      name={color.name}
      background={color[format]}
      showingFullPalette={false}
    />
  ));
  return (
    <Component className="Palette">
      <Navbar handleChange={changeFormat} showingAllColors={false} />
      <div className="colors">
        {colorBoxes}
        <div className="goBack">
          <Link to={`/palette/${paletteId}`}>GO BACK</Link>
        </div>
      </div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </Component>
  );
}
