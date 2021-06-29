import { createSlice } from "@reduxjs/toolkit";
import { VIEW_MODE, DEFAULT_CHUNK_VALUE } from "./config";
// import { TITLE, DURATION, COMPANY, DESCRIPTION } from "./constants";

const initialState = {
  mode: VIEW_MODE,
  chunkList: [],
  changeRecord: {
    update: [],
    delete: [],
  },
  sidebarIsOpen: false,
  currentChunkId: 0,
};

export const resumeSlice = createSlice({
  name: "chunkList",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    initChunk: (state, action) => {
      state.chunkList = action.payload.map((chunk) => ({ ...chunk }));
    },

    updateChunk: {
      reducer(state, action) {
        const { chunkId, data, metadata } = action.payload;

        const targetIdx = state.chunkList.findIndex((chunk) => chunk.id === chunkId);
        switch (state.chunkList[targetIdx].type) {
          // case "type1":
          //   state.chunkList[targetIdx].value.text = data;
          case "infoChunk_1":
            switch (metadata[0]) {
              case "title":
                state.chunkList[targetIdx].value.title = data;
                break;
              case "content":
                state.chunkList[targetIdx].value.content = data;
                break;
              case "icon_pair":
                state.chunkList[targetIdx].value.icon_pair = data;
                break;
            }
            break;
          case "bpChunk_1":
          case "bpChunk_2":
            switch (metadata[0]) {
              case "title":
                state.chunkList[targetIdx].value.text[metadata[1]][0] = data;
                break;
              case "content":
                state.chunkList[targetIdx].value.text[metadata[1]][1] = data;
                break;
              case "insert":
                if ((state.chunkList[targetIdx].value.text.length === 4) & (state.chunkList[targetIdx].type === "bpChunk_2")) {
                  break;
                }
                state.chunkList[targetIdx].value.text = [
                  ...state.chunkList[targetIdx].value.text.slice(0, metadata[1] + 1),
                  ["BulletPoint", "1. \n2. \n3. "],
                  ...state.chunkList[targetIdx].value.text.slice(metadata[1] + 1, state.chunkList[targetIdx].value.text.length),
                ];
                break;
              case "delete":
                state.chunkList[targetIdx].value.text = [
                  ...state.chunkList[targetIdx].value.text.slice(0, metadata[1]),
                  ...state.chunkList[targetIdx].value.text.slice(metadata[1] + 1, state.chunkList[targetIdx].value.text.length),
                ];
                break;
            }
            break;
          case "mtChunk_1":
          case "mcChunk_1":
            state.chunkList[targetIdx].value.text = data;
            break;
          // case "type2":
          //   state.chunkList[targetIdx].value.text = data;
          //   break;
          // case "type3":
          //   if (metadata === TITLE) {
          //     state.chunkList[targetIdx].value.title = data;
          //   } else if (metadata === DURATION) {
          //     state.chunkList[targetIdx].value.duration = data;
          //   } else if (metadata === COMPANY) {
          //     state.chunkList[targetIdx].value.companyName = data;
          //   } else if (metadata === DESCRIPTION) {
          //     state.chunkList[targetIdx].value.description = data;
          //   }
          //   break;
          default:
            break;
        }
        const targetIdx2 = state.changeRecord["update"].findIndex((chunk) => chunk.id === chunkId);
        if (targetIdx2 === -1) {
          state.changeRecord["update"].push(state.chunkList[targetIdx]);
        } else {
          state.changeRecord["update"].splice(targetIdx2, 1, state.chunkList[targetIdx]);
        }
        // console.log(`Update chunk ${chunkId}`);
      },
      prepare(chunkId, data, metadata) {
        return {
          payload: { chunkId, data, metadata },
        };
      },
    },

    insertChunk: {
      reducer(state, action) {
        const { chunkId, type, position } = action.payload;

        const newChunk = {
          id: new Date().getTime(),
          type: type,
          value: DEFAULT_CHUNK_VALUE[type],
        };

        var insertIndex = state.chunkList.findIndex((chunk) => chunk.id === chunkId);
        if (position === "down") insertIndex += 1;

        state.chunkList = [...state.chunkList.slice(0, insertIndex), newChunk, ...state.chunkList.slice(insertIndex, state.chunkList.length)];

        state.changeRecord["update"].push(newChunk);
        // console.log(`Add a new chunk ${newChunk.id}`);
      },
      prepare(chunkId, type, position) {
        return {
          payload: { chunkId, type, position },
        };
      },
    },

    deleteChunk: (state, action) => {
      const chunkId = action.payload;
      if (state.chunkList.length <= 1) return;

      state.chunkList = state.chunkList.filter((chunk) => chunk.id !== chunkId);
      if (state.changeRecord["delete"].find((id) => id === chunkId) === undefined) {
        state.changeRecord["delete"].push(chunkId);
        // console.log(`Delete chunk ${chunkId}`);
      }
    },

    clearChangeRecord: (state, action) => {
      state.changeRecord = {
        update: [],
        delete: [],
      };
    },

    moveUpChunk: (state, action) => {
      const chunkId = action.payload;
      // find Object that contains chunkId
      const chunkIndex = state.chunkList.findIndex((element) => element.id === chunkId);
      if (state.chunkList.length > 1 && chunkIndex !== 0) {
        /**
         * Move up the object by one index
         *
         * Done by breaking up the head, swap
         * and tail of the array
         * This is to cover edge cases (ex: id is 1)
         * and avoid repeated code
         */

        // head of the chunkList
        let chunkListHead = [];
        if (chunkIndex !== 1) {
          chunkListHead = state.chunkList.slice(0, chunkIndex - 1);
        }

        // tail of the chunkList
        const chunkListTail = state.chunkList.slice(chunkIndex + 1, state.chunkList.length);

        state.chunkList = [...chunkListHead, state.chunkList[chunkIndex], state.chunkList[chunkIndex - 1], ...chunkListTail];
      }
    },

    moveDownChunk: (state, action) => {
      const chunkId = action.payload;
      // find Object that contains chunkId
      const chunkIndex = state.chunkList.findIndex((element) => element.id === chunkId);
      if (state.chunkList.length > 1 && chunkIndex !== state.chunkList.length - 1) {
        /**
         * Move down the object by one index
         *
         * Method is same as moveUpChunk
         */

        // head of the chunkList
        const chunkListHead = state.chunkList.slice(0, chunkIndex);

        // tail of the chunkList
        const chunkListTail = state.chunkList.slice(chunkIndex + 2, state.chunkList.length);

        state.chunkList = [...chunkListHead, state.chunkList[chunkIndex + 1], state.chunkList[chunkIndex], ...chunkListTail];
      }
    },
    sidebarSwitch: (state, action) => {
      const chunkId = action.payload;
      state.currentChunkId = chunkId;
      if (typeof chunkId === "undefined") {
        state.sidebarIsOpen = !state.sidebarIsOpen;
      } else {
        state.sidebarIsOpen = true;
      }
    },
  },
});

export const { initChunk, updateChunk, insertChunk, deleteChunk, clearChangeRecord, moveUpChunk, moveDownChunk, sidebarSwitch } = resumeSlice.actions;
export const selectChunkById =
  (chunkId) =>
  ({ resume }) =>
    resume.chunkList.find((chunk) => chunk.id === chunkId);
export const selectChunkIdList = ({ resume }) => resume.chunkList.map((chunk) => chunk.id);
export const selectChangeRecord = ({ resume }) => resume.changeRecord;
export const selectSidebarStatus = ({ resume }) => resume.sidebarIsOpen;
export const selectCurrentChunkId = ({ resume }) => resume.currentChunkId;
export default resumeSlice.reducer;
