"use client"

import { USER_ID } from "@/config/app.config";
import { createBrandPersona, getBrandPersona } from "@/services";
import { useEffect, useState } from "react"

export default function(){

    const [websiteUrl, setWebsiteURL] = useState("")
    const [personaLoading, setPersonaLoading] = useState(false);
    const [persona, setPersona] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [bpExist, setBpExist] = useState(false)
    const userId = USER_ID;


    const createPersona = async() => {
        if(isUrlValid(websiteUrl)){
            setLoading(true);
            const res = await createBrandPersona(websiteUrl);
            if(Object.keys(res?.brand_persona).length > 0){
                setPersona(res.brand_persona);
                setBpExist(true);
            }
            setLoading(false)
        }
    }

    function isUrlValid(str: string) {
        const pattern = new RegExp(
          '^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', // fragment locator
          'i'
        );
        return pattern.test(str);
    }

    const getPersona = async() => {
        setLoading(true);
        const res = getBrandPersona(userId);
        if(Object.keys(res).length > 0){
            setPersona({
                ...persona,
                ...res
            });
            setBpExist(true)
        }
        setLoading(false);
    }

    useEffect(() => {
        getPersona();
    }, [])


    return(
        <>
            {loading && 
                <div className="loadingPersona">
                    <h1>Loading Persona...</h1>
                </div>
            }
            { !loading && !bpExist &&
                <div className="personaTabsWrapper">
                    <div className="tabs-header">
                        <h1>Add content so that we can analyse your brand</h1>
                        <h3 className={`tabsHeading`}>Link Website</h3>
                        {/* <button className={`tabs-button`}>Paste Text</button>
                        <button className={`tabs-button`}>Upload Content</button> */}
                    </div>
                    <div className="tabs-body">
                        <form className="persona-tabs-form">
                            <label>Enter website URL to pull sample contents from</label>
                            <input 
                                type="url"
                                pattern="https://.*"
                                placeholder="Enter the URL of your brand's homepage" 
                                name="websiteUrl"
                                value={websiteUrl}
                                className="appInput"
                                onChange={(event) => setWebsiteURL(event.target.value)}
                                required
                            />
                            <button type="submit" onClick={createPersona} className={loading || !isUrlValid(websiteUrl) ? "appButton disabled" : "appButton"} disabled={loading}>{loading ? 'Generating Persona...' : 'Build Persona'}</button>
                        </form>
                    </div>
                </div>
            }
            {Object.keys(persona).length > 0 && 
                <div className="brandPeronaWrapper">
                    {persona?.purpose.length > 0 &&
                        <>
                            <h3>Purpose</h3>
                            <div className="personaItemListWrapper">
                                {persona.purpose.map((purpose: string, index: number)=> {
                                    return(
                                        <div className="personaItem" key={index}>{purpose}</div>
                                    )
                                })}
                            </div>
                        </>
                    }
                    {persona?.audience.length > 0 &&
                        <>
                            <h3>Audience Segmentation</h3>
                            <div className="personaItemListWrapper">
                                {persona.audience.map((audience: string, index: number)=> {
                                    return(
                                        <div className="personaItem" key={index}>{audience}</div>
                                    )
                                })}
                            </div>
                        </>
                    }
                    {persona?.tone.length > 0 &&
                        <>
                            <h3>Brand Tone</h3>
                            <div className="personaItemListWrapper">
                                {persona.tone.map((tone: string, index: number)=> {
                                    return(
                                        <div className="personaItem" key={index}>{tone}</div>
                                    )
                                })}
                            </div>
                        </>
                    }
                    {persona?.emotions.length > 0 &&
                        <>
                            <h3>Brand Emotions</h3>
                            <div className="personaItemListWrapper">
                                {persona.emotions.map((emotion: string, index: number)=> {
                                    return(
                                        <div className="personaItem" key={index}>{emotion}</div>
                                    )
                                })}
                            </div>
                        </>
                    }
                    {persona?.character.length > 0 &&
                        <>
                            <h3>Brand Characteristics</h3>
                            <div className="personaItemListWrapper">
                                {persona.character.map((character: string, index: number)=> {
                                    return(
                                        <div className="personaItem" key={index}>{character}</div>
                                    )
                                })}
                            </div>
                        </>
                    }
                    {persona?.language.length > 0 &&
                        <>
                            <h3>Language</h3>
                            <div className="personaItemListWrapper">
                                {persona.language.map((language: string, index: number)=> {
                                    return(
                                        <div className="personaItem" key={index}>{language}</div>
                                    )
                                })}
                            </div>
                        </>
                    }
                    {persona?.syntax.length > 0 &&
                        <>
                            <h3>Brand Writing Style</h3>
                            <div className="personaItemListWrapper">
                                {persona.syntax.map((syntax: string, index: number)=> {
                                    return(
                                        <div className="personaItem" key={index}>{syntax}</div>
                                    )
                                })}
                            </div>
                        </>
                    }
                </div>
            }
        </>
    )
}