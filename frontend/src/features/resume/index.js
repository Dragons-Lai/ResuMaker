import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { message } from "antd";

import ViewMode from "./ViewMode";
import EditMode from "./EditMode";
import { VIEW_MODE, EDIT_MODE } from "./config";
import { initChunk, insertChunk } from "./resumeSlice";
import { getPreparation } from "./api";

function Resume() {
  const [mode, setMode] = useState("view");

  const dispatch = useDispatch();
  useEffect(() => {
    // remote version
    getPreparation()
      .then((chunkList) => {
        dispatch(initChunk(chunkList));
        if (chunkList.length === 0) {
          dispatch(insertChunk(0, "bpChunk_1", "up"));
          dispatch(insertChunk(0, "mtChunk_1", "up"));
          dispatch(insertChunk(0, "infoChunk_1", "up"));
          // dispatch(insertChunk(2, "type3", "up"));
        }
      })
      .catch((err) => {
        message.error("Server Error. Please refresh the page and wait. ", 0);
        console.log(err);
      });
  }, []);

  if (mode === VIEW_MODE) return <ViewMode />;
  else if (mode === EDIT_MODE) return <EditMode />;
}

export default Resume;
