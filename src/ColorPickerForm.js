import React, { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker } from "react-color";
import { styled } from "@mui/material/styles";
import styles from "./styles/ColorPickerFormStyles";

const Component = styled("div")(styles);

export default function ColorPickerForm(props) {
  const formRef = useRef(null);
  const [currentColor, setCurrentColor] = useState("teal");
  const [newColorName, setNewColorName] = useState("");
  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) =>
      props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule("isColorUnique", (value) =>
      props.colors.every(({ color }) => color !== currentColor)
    );
  });

  function updateCurrentColor(newColor) {
    setCurrentColor(newColor.hex);
  }
  function handleChange(evt) {
    setNewColorName(evt.target.value);
  }
  function handleSubmit() {
    const newColor = {
      color: currentColor,
      name: newColorName,
    };
    props.addNewColor(newColor);
    setNewColorName("");
  }

  const { paletteIsFull } = props;
  return (
    <Component>
      <ChromePicker
        color={currentColor}
        onChangeComplete={updateCurrentColor}
        className="picker"
      />
      <ValidatorForm onSubmit={handleSubmit} ref={formRef}>
        <TextValidator
          value={newColorName}
          className="colorNameInput"
          placeholder="Color Name"
          name="newColorName"
          variant="filled"
          margin="normal"
          onChange={handleChange}
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          errorMessages={[
            "Enter a color name",
            "Color name must be unique",
            "Color already used!",
          ]}
        />
        <Button
          variant="contained"
          type="submit"
          color="primary"
          disabled={paletteIsFull}
          className="addColor"
          style={{
            backgroundColor: paletteIsFull ? "grey" : currentColor,
          }}
        >
          {paletteIsFull ? "Palette Full" : "Add Color"}
        </Button>
      </ValidatorForm>
    </Component>
  );
}
