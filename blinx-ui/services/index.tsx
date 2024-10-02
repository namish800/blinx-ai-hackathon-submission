import { APP_ENDPOINT } from "@/config/app.config"

interface GenerateTitles {
    blogTopic: string
}

const createBrandPersona = async(brandUrl: string) => {
    try{
        const res = await fetch(`${APP_ENDPOINT}/createBrandPersona`, {
            method: "POST",
            body: JSON.stringify({
                "user_id": "a093b5be-ab1c-46eb-bdca-1ee223c6a948",
                "brand_url": brandUrl
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if(!res.ok){
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    }catch(err){
        console.log(`Error creating brand persona: ${err}`);
        return null
    }
}

const getBrandPersona = async(userId: string) => {
    try{
        const res = await fetch(`${APP_ENDPOINT}/getBrandPersona?user_id=${userId}`);
        if(!res.ok){
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    }catch(err){
        console.log(`Error fetching brand persona: ${err}`);
        return null
    }
}

const generateTitles = async({blogTopic=""}: GenerateTitles) => {
    try{
        const res = await fetch(`${APP_ENDPOINT}/generateBlog`, {
            method: "POST",
            body: JSON.stringify({
                    "user_id": "a093b5be-ab1c-46eb-bdca-1ee223c6a948",
                    "user_prompt": blogTopic,
                    "max_suggestions": 3,
                    "max_sections": 3,
                    "max_images": 1,
                    "include_images": false
            }),
            headers: {
                "Content-Type": "application/json",
            },
            // mode: "no-cors"
        })
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json()
    }
    catch(err){
        console.log(`Error sending blog topic: ${err}`);
        return null;
    }
}


const generateOutlines = async(selectedTitle : string, sessionId: string) => {
    try{
        const res = await fetch(`${APP_ENDPOINT}/resumeBlogGeneration`, {
            method: "POST",
            body: JSON.stringify({
                "session_id": sessionId,
                "blog_generation_step": 105,
                "user_prompt": selectedTitle
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        if(!res.ok){
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    }catch(err) {
        console.log(`Error sending selected title: ${err}`);
        return null;
    }
}


const generateFinalBlog = async(finalSections: string, sessionId: string) => {
    try{
        const res = await fetch(`${APP_ENDPOINT}/resumeBlogGeneration`, {
            method: "POST",
            body: JSON.stringify({
                "session_id": sessionId,
                "blog_generation_step": 107,
                "user_prompt": finalSections
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        if(!res.ok){
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    }catch(err){
        console.log(`Error sending final blog config: ${err}`);
        return null
    }
}


const newFbAd = async(ad_objective: string, ad_details: string, feedback: string, step: number, sessionId: string) => {
    try{
        const res = await fetch(`${APP_ENDPOINT}/generateAd`, {
            method: "POST",
            body: JSON.stringify({
                "user_id": "a093b5be-ab1c-46eb-bdca-1ee223c6a948",
                "ad_objective": ad_objective,
                "ad_details": ad_details,
                "human_feedback": feedback,
                "ad_gen_step": step,
                "session_id": sessionId
            }),
            headers:{
                "Content-Type": "application/json"
            }
        });
        if(!res.ok){
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    }catch(err){
        console.log(`Error in sending generate ad fields: ${err}`);
        return null;
    }
}


const generateFbAd = async(ad_objective: string, ad_details: string, session_id: string) => {
    try{
        const res = await fetch(`${APP_ENDPOINT}/generateAd`, {
            method: "POST",
            body: JSON.stringify({
                "user_id": "a093b5be-ab1c-46eb-bdca-1ee223c6a948",
                "ad_objective": ad_objective,
                "ad_details": ad_details,
                "human_feedback": "no feedback",
                "ad_gen_step": 124,
                "session_id": session_id
            }),
            headers:{
                "Content-Type": "application/json"
            }
        });
        if(!res.ok){
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    }catch(err){
        console.log(`Error in submiting feedback! ${err}`);
        return null
    }
}

const generateInstagramPost = async(objective: string, numberOfPosts: number) => {
    try{
        const res = await fetch(`${APP_ENDPOINT}/generateInstagramPost`, {
            method: "POST",
            body: JSON.stringify({
                "user_id": "a093b5be-ab1c-46eb-bdca-1ee223c6a948",
                "objective": objective,
                "max_posts": numberOfPosts,
                "include_images": false
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if(!res.ok){
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    }catch(err){
        console.log(`Error in generating Instagram Post: ${err}`)
        return null
    }
}



// const submitFeedback = async() => {
//     try{
//         const res = await fetch(`${APP_ENDPOINT}/`)
//     }
// }




export {
    getBrandPersona,
    generateTitles,
    generateOutlines,
    generateFinalBlog,
    newFbAd,
    generateFbAd,
    createBrandPersona,
    generateInstagramPost
}