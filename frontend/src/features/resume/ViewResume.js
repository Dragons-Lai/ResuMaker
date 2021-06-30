import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { message } from "antd";

import { VIEW_MODE } from "./config";
import ResumeBody from "./ResumeBody";
import { initChunk, insertChunk } from "./resumeSlice";
import { getPreparation } from "./api";

function ViewResume() {
  let { url_suffix } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    // remote version
    getPreparation(url_suffix)
      .then((chunkList) => {
        dispatch(initChunk(chunkList));
      })
      .catch((err) => {
        message.error(err.data.message, 0);
        console.log(err.data.message);
      });
  }, []);

  return <ResumeBody mode={VIEW_MODE}></ResumeBody>;
}

export default ViewResume;
