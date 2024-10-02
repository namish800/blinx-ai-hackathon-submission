"use client"

import { generateFinalBlog, generateOutlines, generateTitles } from "@/services";
import { useState } from "react";
import {blogTopics} from './responseTopic';
import { sectionList } from "./generateSections";
import './style.scss'
import { finalSections } from "./finalSections";

interface BlogViews{
    progress: number,
    setProgress: (num: number)=>void
}

interface Outlines {
    selected_title?: string,
    introduction?: string,
    sections?: any
}


const list = [
    {
        id: "1",
        title: "Hello this is the First title. Lorem Ipsum there used to be a gallery, wagons wheels available in town."
    },
    {
        id: "2",
        title: "Hello this is the First title. Lorem Ipsum there used to be a gallery, wagons wheels available in town."
    },
    {
        id: "3",
        title: "Hello this is the First title. Lorem Ipsum there used to be a gallery, wagons wheels available in town."
    },
    {
        id: "4",
        title: "Hello this is the First title. Lorem Ipsum there used to be a gallery, wagons wheels available in town."
    },
    {
        id: "5",
        title: "Hello this is the First title. Lorem Ipsum there used to be a gallery, wagons wheels available in town."
    },
    {
        id: "6",
        title: "Hello this is the First title. Lorem Ipsum there used to be a gallery, wagons wheels available in town."
    }
]



const BlogViews = ({progress, setProgress}: BlogViews) => {
    const [selectedTitle, setSelectedTitle] = useState("");
    const [titleList, setTitleList] = useState([]);
    const [outlines, setOutlines] = useState<Outlines>({});
    const [finalOutlines, setFinalOutlines] = useState<any>({});
    const [finalBlog, setFinalBlog] = useState([]);
    const [loadingTitles, setLoadingTitles] = useState(false);
    const [loadingOutline, setLoadingOutline] = useState(false);
    const [loadingFinalBlog, setLoadingFinalBlog] = useState(false);
    const [sessionId, setSessionId] = useState("");
    const [formData, setFormData] = useState({
        blogTopic: "",
        blogTitle: "",
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event?.target?.name]: event?.target?.value,
        })
    }

    
    const selectTitle = (e: string) => {
        setSelectedTitle(e)
    }

    const startBlog = async (blogTopic: string) => {
        setLoadingTitles(true)
        const res = await generateTitles({blogTopic});
        setSessionId(res?.session_id);
        localStorage.setItem("blog-session-id", res?.session_id)
        setOutlines({});
        setTitleList(res?.message?.state?.generated_titles);
        setLoadingTitles(false)
        if(res?.message?.state?.generated_titles.length > 0){
            setProgress(progress + 1);
        }
    }


    const generateOutline = async () =>{
        if(selectedTitle){
            setLoadingOutline(true);
            let temp: any = {};
            const res = await generateOutlines(selectedTitle, sessionId);
            if(res?.step_output?.state?.introduction){
                setOutlines({
                    ...outlines,
                    selected_title: res?.step_output?.state?.selected_title || "",
                    introduction: res?.step_output?.state?.introduction || "",
                    sections: res?.step_output?.state?.sections || []
                });
                setProgress(progress+1);
                res?.step_output?.state?.sections.length > 0 && res?.step_output?.state?.sections.forEach((element: any) => {
                    temp[element.section_header] = element.description;
                });
                setFinalOutlines({
                    ...temp
                })
            }
            setLoadingOutline(false);
        }
    }

    const updateOutline = (sectionHeader: string, updatedDesc: string) => {
        setFinalOutlines({
            ...finalOutlines,
            [sectionHeader] : updatedDesc
        })
    }

    const finaliseBlog = async () => {
        setLoadingFinalBlog(true);
        const res = await generateFinalBlog(JSON.stringify(Object.keys(finalOutlines).map((element: string, index: number) => {
            return({
                section_header: element,
                description: finalOutlines[element]
            })
        })), sessionId);
        if(res?.step_output?.state?.generated_sections.length > 0){
            setFinalBlog(res?.step_output?.state?.generated_sections);
            setProgress(progress+1)
        }
        setLoadingFinalBlog(false);
    }

    const goBack = () => {
        if(progress >= 1){
            setProgress(progress--)
        }
    }

    const goNext = () => {
        if(progress <= 4){
            setProgress(progress++)
        }
    }

    switch(progress){
        case 0:
            return (<div className="stagePage">
                <h2>Blog Topic</h2>
                <p className="stageHeading">What would you like to write about? *</p>
                <input type="textArea" className="appInput" name="blogTopic" placeholder="Enter detailed description for blog idea" onChange={ handleChange } value={formData?.blogTopic} />
                {/* <p>{formData?.blogTopic}</p> */}
                <div className="stageControls">
                    {/* <button disabled={(loadingTitles || progress) ? true : false} onClick={goBack}>Back</button>                     */}
                    <button onClick={() => startBlog(formData?.blogTopic)} className={(formData?.blogTopic?.length < 10 || loadingTitles) ? "appButton disabled" : "appButton"} disabled={formData?.blogTopic?.length < 10 || loadingTitles}>
                        {!loadingTitles ? "Generate Titles" : "Generating..."}
                    </button>
                    {Object.keys(titleList).length>0 && <button className="appButton" onClick={goNext}>Next</button>}
                </div>
            </div>)
        case 1: 
            return (<div className="stagePage">
                <h2>Blog Title</h2>
                <p className="stageHeading">Pick a title for your post.</p>
                <div className="titleListWrapper">
                    {titleList.length > 0 && titleList.map((e, index) => {
                        return(
                        <div className={`${e === selectedTitle ? 'active titleWrapper': 'titleWrapper'}`} key={index} onClick={() => selectTitle(e)}>
                            {/* <div className={`titleRadio ${e === selectedTitle ? 'active': ''}`}></div> */}
                            <div className="titlePicker" key={index}>
                                <p className="titleNumber">{`#Title ${index++}`}</p>
                                <p className="title">{`${e}`}</p>
                            </div>
                        </div>
                        )})
                    }
                </div>
                {/* <p>{selectedTitle}</p> */}
                <div className="stageControls">
                    <button className={'appButton'} onClick={goBack}>Back</button>                     
                    <button onClick={generateOutline} className={(loadingOutline || !selectedTitle) ? 'appButton disabled' : 'appButton'} disabled={loadingOutline || !selectedTitle} >{loadingOutline ? "Generating..." : `Generate Outline`}</button>
                    {Object.keys(outlines).length>0 && <button className={'appButton'} onClick={goNext}>Next</button>}
                </div>
                {/* {outlines && <pre>{JSON.stringify( outlines, null, 2)}</pre>} */}
            </div>)
        case 2:
            return  (<div className="stagePage">
                <h2>Blog Outline</h2>
                <p className="stageHeading">Edit your outline as desired</p>
                <div className="blogTable">
                    <p className="tableHeading">Intro</p>
                    <p className="blogIntro">{outlines?.introduction}</p>
                </div>
                {Object.keys(outlines).length > 0 && Object.keys(finalOutlines).length > 0 && outlines?.sections?.length! > 0 && outlines?.sections!.map((section: any, index: number) => {
                    return(
                        <div className="generatedSection" key={index}>
                            <div className="blogTable">
                                <p className="sectionHeading">Heading</p>
                                <h2>{section?.section_header}</h2>
                            </div>
                            <div className="blogTable">
                                <p className="sectionHeading">Description</p>
                                <input type="textarea" value={finalOutlines[section?.section_header]} className="appTextArea" onChange={(event) => updateOutline(section?.section_header, event.target.value)} />
                            </div>
                        </div>
                    )
                })}
                <div className="stageControls">
                    <button onClick={goBack} className="appButton">Back</button>                     
                    <button onClick={finaliseBlog} className={loadingFinalBlog ? 'appButton disabled' : 'appButton'}>{loadingFinalBlog ? 'Finalising Blog...' : 'Finalise Blog'}</button>
                </div>
            </div>) 
        case 3: 
            return <div className="stagePage finalBlogView">
                <h2>Final Blog</h2>
                {/* <p className="stageHeading">Your final blog!</p> */}
                <h1 className="finalBlogTitle">{selectedTitle}</h1>
                <p className="finalBlogIntro">{outlines?.introduction}</p>
                {finalBlog.length > 0 && finalBlog.map((section: any, index: number) => {
                    return(
                        <div key={index} className="finalBlogSection">
                            <h3 className="finalBlogSubHeadings">{section?.section_header}</h3>
                            <p>{section?.section_content}</p>
                        </div>
                    )
                })}
            </div>
        default: 
            return <></>
        }
}


export default BlogViews