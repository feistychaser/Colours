import React from "react";
import styles from "./styles/PaletteFooterStyles";
import { styled } from "@mui/material/styles";

const Component = styled("div")(styles);
export default function PaletteFooter(props) {
  const { paletteName, emoji } = props;
  return (
    <Component>
      <footer className="PaletteFooter">
        {paletteName}
        <span className="emoji">{emoji}</span>
      </footer>
    </Component>
  );
}
