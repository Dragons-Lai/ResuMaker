import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import ViewMode from "./ViewMode";
import EditMode from "./EditMode";
import { VIEW_MODE, EDIT_MODE } from "./config";
import { initChunk, insertChunk } from "./resumeSlice";
import { getPreparation } from "./api";

function Resume({loginState}) {
  const [mode, setMode] = useState("view");

  const dispatch = useDispatch();
  useEffect(() => {
    // remote version
    getPreparation()
      .then((chunkList) => {
        dispatch(initChunk(chunkList))
        if(chunkList.length === 0){
          dispatch(insertChunk(0, "type1", "up"))
        }
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  if (mode === VIEW_MODE) return <ViewMode />;
  else if (mode === EDIT_MODE) return <EditMode />;
}

export default Resume;
