import React from "react";
import styles from "./styles/MiniPaletteStyles";
import { styled } from "@mui/material/styles";
const Component = styled("div")(styles);

export default function MiniPalette(props) {
  const { paletteName, emoji, colors } = props;
  const miniColorBoxes = colors.map((color) => (
    <div
      className="miniColor"
      style={{ backgroundColor: color.color }}
      key={color.name}
    />
  ));

  return (
    <Component className="root" onClick={props.handleClick}>
      <div className="colors">{miniColorBoxes}</div>
      <h5 className="title">
        {paletteName} <span className="emoji">{emoji}</span>
      </h5>
    </Component>
  );
}
