"use client"

import { generateInstagramPost } from "@/services";
import Image from "next/image";
import { useState } from "react";



const InstaPostGenerator = () => {
    const [objective, setObjective] = useState("");
    const [postCount, setPostCount] = useState(3);
    const [loading, setLoading] = useState(false);
    const [captionList, setCaptionList] = useState([]);
    const [imageList, setImageList] = useState([]);
    const [hashtagList, setHashtagList] = useState([]);

    const generatePosts = async() => {
        setLoading(true)
        const res = await generateInstagramPost(objective, postCount);
        if(res?.step_output?.state?.captions.length > 0){
            setCaptionList(res?.step_output?.state?.captions);
            setImageList(res?.step_output?.state?.image_urls);
            setHashtagList(res?.step_output?.state?.hashtags)
        }
        setLoading(false)
    }

    return(
        <div className="postGeneratorWrapper">
            <h1>Generate Insta Post</h1>
            <form>
                <p>Enter Detailed Objective for your Instagram Posts</p>
                <input type="text" value={objective} className="appInput" name="objective" onChange={(event) => setObjective(event.target.value)} placeholder="Enter Detailed Objective for your new Instagram Posts" />
                <p>Enter the number of posts you want to create</p>
                <input type="number" value={postCount} min={1} max={4} onChange={(event) => setPostCount(Number(event.target.value))}  />
                <button className="appButton" onClick={generatePosts} disabled={loading}>{loading ? 'Generating Posts...' : 'Generate Posts'}</button>
            </form>
            {/* <pre>{JSON.stringify(imageList, null, 2)}</pre>
            <pre>{JSON.stringify(captionList, null, 2)}</pre>
            <pre>{JSON.stringify(hashtagList, null, 2)}</pre> */}
            {!loading && captionList.length>0 && imageList.length>0 && hashtagList.length>0 && <div className="generatedPostWrapper">
                <h1>Hastags</h1>
                {hashtagList.map((hashtag: string, index: number) => {
                    return(
                        <p key={index}>{hashtag}</p>
                    )
                })}
                <h1>Posts</h1>
                {
                    captionList.map((caption: string, index: number) => {
                        return(
                            <div key={index} className="generatedPost">
                                <h4>{caption}</h4>
                                <Image 
                                    src={imageList[index]}
                                    height={500}
                                    width={500}
                                    alt="ai generated post copy"
                                />
                            </div>
                        )
                    })
                }
            </div>
            }
        </div>
    )
}




export default InstaPostGenerator;