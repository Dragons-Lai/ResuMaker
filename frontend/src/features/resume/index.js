import {useState, useEffect} from "react"
import {useDispatch} from "react-redux"
import ViewMode from "./ViewMode"
import EditMode from "./EditMode"
import {VIEW_MODE, EDIT_MODE} from "./config"
import { initChunk } from "./resumeSlice"


function Resume(){
    const [mode, setMode] = useState("view")
    const dispatch = useDispatch()
    
    useEffect(() => {
        // remote version
        // getPreparation() // get the all chunk of the user, we may attach cookies in this request
        // .then((res) => dispatch(initChunk(res)))
        // .catch((err) => {
        //     console.log(err)
        // })

        // local version
        const sampleInit = [{
            id: (new Date()).getTime(), 
            type: "type1", 
            value: {
                text: "word"
            }
        }]
        dispatch(initChunk(sampleInit))
    }, [])

    if(mode === VIEW_MODE)
        return <ViewMode />
    else if(mode === EDIT_MODE)
        return <EditMode />
}

export default Resume