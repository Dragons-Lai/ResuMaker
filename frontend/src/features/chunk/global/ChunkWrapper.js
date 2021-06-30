// import { useState, useEffect } from "react";
import "./config.css";
import ButtonMenu from "./ButtonMenu";
import { EDIT_MODE } from "../../resume/config";

export default function ({ chunkId, children, mode }) {
  return (
    <div className="chunk-wrapper" contentEditable="false" suppressContentEditableWarning={true}>
      {/* <ButtonMenu chunkId={chunkId} position="up"></ButtonMenu> */}
      {children}
      {mode === EDIT_MODE ? <ButtonMenu chunkId={chunkId} position="down"></ButtonMenu> : false}
    </div>
  );
}
