import { styled } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

import styles from "./styles/ColorBoxStyles";
export default function ColorBox(props) {
  const [copied, setCopied] = useState(false);
  const Component = styled("div")(styles(props));

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    }
  });
  function changeCopyState() {
    setCopied(true);
  }

  const { name, background, moreUrl, showingFullPalette } = props;
  return (
    <Component>
      <CopyToClipboard text={background} onCopy={changeCopyState}>
        <div style={{ background }} className="ColorBox">
          <div
            style={{ background }}
            className={`copyOverlay ${copied && "showOverlay"}`}
          />
          <div className={`copyMessage ${copied && "showMessage"}`}>
            <h1>copied!</h1>
            <p className="copyText">{props.background}</p>
          </div>
          <div>
            <div className="boxContent">
              <span className="colorName">{name}</span>
            </div>
            <button className="copyButton">Copy</button>
          </div>
          {showingFullPalette && (
            <Link to={moreUrl} onClick={(e) => e.stopPropagation()}>
              <span className="seeMore">MORE</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    </Component>
  );
}
