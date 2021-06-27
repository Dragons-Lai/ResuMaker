// import { useState, useEffect } from "react";
import "./config.css";
import ButtonMenu from "./ButtonMenu";

export default function ({ chunkId, children }) {
  return <div className="chunk-wrapper" contentEditable="true">
    <ButtonMenu chunkId={chunkId} position="up"></ButtonMenu>
    {children}
    <ButtonMenu chunkId={chunkId} position="down"></ButtonMenu>
  </div >
}