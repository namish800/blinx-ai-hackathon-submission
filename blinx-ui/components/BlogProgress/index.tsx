import { LinearProgress } from "@mui/material"

interface BlogProgressProps{
    progress: number
}

export default function({progress}: BlogProgressProps){
    return(
        <>        
            <LinearProgress sx={{marginBottom: "20px"}} value={progress*33.33333} variant="determinate"/>
        </>
    )
}