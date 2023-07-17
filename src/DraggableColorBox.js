import React from "react";
import { SortableElement } from "react-sortable-hoc";
import { Delete } from "@mui/icons-material";
import styles from "./styles/DraggableColorBoxStyles";
import { styled } from "@mui/material/styles";
const Component = styled("div")(styles);

const DraggableColorBox = SortableElement((props) => {
  const { handleClick, name, color } = props;
  return (
    <Component className="root" style={{ backgroundColor: color }}>
      <div className="boxContent">
        <span> {name}</span>
        <Delete className="deleteIcon" onClick={handleClick} />
      </div>
    </Component>
  );
});
export default DraggableColorBox;
