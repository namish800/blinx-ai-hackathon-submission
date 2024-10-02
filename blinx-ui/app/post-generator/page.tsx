import dynamic from "next/dynamic";

const InstaPostGenerator = dynamic(() => import("@/components/InstaPostGenerator"))

const PostGenerator = () => {
    return(
        <InstaPostGenerator />
    )
}


export default PostGenerator;