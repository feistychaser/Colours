import { useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider, createTheme, makeStyles } from "@mui/material/styles";

import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import seedColors from "./seedColors";
import NewPaletteForm from "./NewPaletteForm";
import { generatePalette } from "./colorHelpers";
import React from "react";
import Home from "./pages/Home";
import HelpLayout from "./layouts/HelpLayout";
import RootLayout from "./layouts/RootLayout";
import Faq from "./pages/help/Faq";
import NotFound from "./pages/NotFound";

const theme = createTheme();

function App() {
  const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));

  const [palettes, setPalettes] = useState(savedPalettes || seedColors);

  const findPalette = (id) => {
    return palettes.find((palette) => palette.id === id);
  };
  const savePalette = (newPalette) => {
    const syncLocalStorage = () => {
      window.localStorage.setItem("palettes", JSON.stringify(palettes));
    };
    setPalettes([...palettes, newPalette]);
    syncLocalStorage();
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="help" element={<HelpLayout />}>
          <Route path="faq" element={<Faq />} />
        </Route>
        <Route path="/palettes" element={<PaletteList palettes={palettes} />} />
        <Route
          path="/palette/new"
          element={
            <NewPaletteForm savePalette={savePalette} palettes={palettes} />
          }
        />
        <Route
          path="/palette/:paletteId/:colorId"
          element={
            <SingleColorPalette
              generatePalette={generatePalette}
              findPalette={findPalette}
            />
          }
        />
        <Route
          path="/palette/:id"
          element={
            <Palette
              generatePalette={generatePalette}
              findPalette={findPalette}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
