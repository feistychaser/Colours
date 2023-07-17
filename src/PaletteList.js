import React from "react";
import { Link, useNavigate } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import styles from "./styles/PaletteListStyles";
import { styled } from "@mui/material/styles";

const Component = styled("div")(styles);

export default function PaletteList(props) {
  const navigate = useNavigate();

  function goToPalette(id) {
    navigate(`/palette/${id}`);
  }
  const { palettes } = props;
  return (
    <Component className="root">
      <div className="container">
        <nav className="nav">
          <h1>React Colors</h1>
          <Link to="/palette/new">Create Palette</Link>
        </nav>
        <div className="palettes">
          {palettes.map((palette) => (
            <MiniPalette
              {...palette}
              handleClick={() => goToPalette(palette.id)}
            />
          ))}
        </div>
      </div>
    </Component>
  );
}
