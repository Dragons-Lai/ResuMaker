import { createSlice, current } from '@reduxjs/toolkit';
import { VIEW_MODE, DEFAULT_CHUNK_VALUE } from './config';


const initialState = {
  mode: VIEW_MODE, 
  chunkList: [], 
  changeRecord: {
    "update": [], 
    "delete": [], 
  }
};

export const resumeSlice = createSlice({
  name: 'chunkList',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    initChunk: (state, action) => {
      state.chunkList = action.payload.map(chunk => ({...chunk}));
    },
    
    updateChunk: {  
      reducer(state, action) {
        const { chunkId, data } = action.payload

        const targetIdx = state.chunkList.findIndex(chunk => chunk.id === chunkId)
        switch(state.chunkList[targetIdx].type){
          case("type1"):
            state.chunkList[targetIdx].value.text = data
          default:
            if(state.changeRecord["update"].find(id => id === chunkId) === undefined){
              state.changeRecord["update"].push(chunkId)
            }
            console.log(`Update chunk ${chunkId}`)
        }
      },
      prepare(chunkId, data) {
        return {
          payload: { chunkId, data },
        }
      },
    },

    insertChunk: {
      reducer(state, action) {
        const { chunkId, type, position } = action.payload
        
        const newChunk = {
          id: (new Date()).getTime(), 
          type: type, 
          value: DEFAULT_CHUNK_VALUE[type]
        }

        var insertIndex = state.chunkList.findIndex(chunk => chunk.id === chunkId)
        if(position == "down")
          insertIndex += 1

        state.chunkList = [
          ...state.chunkList.slice(0, insertIndex), 
          newChunk, 
          ...state.chunkList.slice(insertIndex, state.chunkList.length)
        ]
        
        state.changeRecord["update"].push(newChunk.id)
        console.log(`Add a new chunk ${newChunk.id}`)
      },
      prepare(chunkId, type, position) {
        return {
          payload: { chunkId, type, position },
        }
      },
    },
    
    deleteChunk: (state, action) => {
      const chunkId = action.payload
      if(state.chunkList.length > 1)
        state.chunkList = state.chunkList.filter(chunk => chunk.id !== chunkId)
        if(state.changeRecord["delete"].find(id => id === chunkId) === undefined){
          state.changeRecord["delete"].push(chunkId)
          console.log(`Delete chunk ${chunkId}`)

        }
    },
  }
});

export const { initChunk, updateChunk, insertChunk, deleteChunk } = resumeSlice.actions;
export const selectChunkById = chunkId => ({resume}) => resume.chunkList.find(chunk => chunk.id === chunkId)
export const selectChunkIdList = ({resume}) => resume.chunkList.map(chunk => chunk.id)
export const selectChangeRecord = ({resume}) => resume.changeRecord

export default resumeSlice.reducer;
