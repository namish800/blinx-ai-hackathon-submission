"use client"
/***
 *
 * @file components/FBAdViews
 * @description Generate Fb Ad for a brand.
 * @author Satyam Mahajan
 * @organization KreativX
 * @since 21 Sep 2024
 *
 */




import { generateFbAd, newFbAd } from "@/services";
import { useState } from "react";
import FbCard from "../FbCard";

const FBAdViews = () => {
    const [progress, setProgress] = useState(0);
    const [adDetails, setAdDetails] = useState("");
    const [adObjective, setAdObjective] = useState("");
    const [loading, setLoading] = useState(false);
    const [campaignPlan, setCampaignPlan] = useState<any>({});
    const [feedback, setFeedback] = useState("");
    const [finalLoading, setFinalLoading] = useState(false);
    const [sessionId, setSessionId] = useState("");
    const [adCopies, setAdCopies] = useState([]);

    const generateAd = async() => {
        setLoading(true);
        const res = await newFbAd(adObjective, adDetails, "", 123, "");
        setSessionId(res.session_id);
        localStorage.setItem("fb_ad_session_id", res.session_id);
        if(Object.keys(res?.step_output?.state?.campaign_plan).length > 0){
            setCampaignPlan({
                ...campaignPlan,
                ...res?.step_output?.state?.campaign_plan
            });
            setProgress(progress+1)
        }
        setLoading(false);
    }

    const submitFeedback = async() => {
        setLoading(true);
        setCampaignPlan({});
        const res = await newFbAd(adObjective, adDetails, feedback, 124, sessionId);
        if(Object.keys(res?.step_output?.state?.campaign_plan).length > 0){
            setCampaignPlan({
                ...campaignPlan,
                ...res?.step_output?.state?.campaign_plan
            });
            // setProgress(progress+1)
        }
        setLoading(false);
    }

    const finaliseAd = async() => {
        setFinalLoading(true);
        const res = await generateFbAd(adObjective, adDetails, sessionId);
        if(res?.step_output?.state?.ad_copies?.length > 0){
            setAdCopies(res?.step_output?.state?.ad_copies);
            setProgress(progress + 1);
        }
        setFinalLoading(false)
    }

    return(
        <div className="fbAdStarter">
            {
                progress === 0 && <div className="fbAdView">
                    <h1>Fb Ad Generator</h1>
                    <p>Describe the kind of ad you want to build</p>
                    <input type="text" className="appInput" placeholder="Enter Ad Details" value={adDetails} onChange={(event) => setAdDetails(event?.target?.value)} name="adDetails" />
                    <div className="formObjectiveForm">
                        <p>Ad Objective</p>
                        <input type="text" className="appInput" placeholder="Eg. I want to make a promotional Ad" value={adObjective} onChange={(event) => setAdObjective(event?.target?.value)} name="adObjective" />
                        <button onClick={generateAd} className={loading ? "appButton disabled" : "appButton"} disabled={loading}>{ loading ? "Generating..." : "Generate Ad"}</button>
                    </div>
                </div>
            }
            {
                progress===1 && (Object.keys(campaignPlan).length > 0 ? <div className="fbAdView campaignPlan">
                    <h1>Review Ad Generation Rules</h1>
                    <h2>Ad Strategy</h2>
                    <div className="adGeneratorSection">
                        <h3>Objective:</h3>
                        <p>{campaignPlan?.strategy?.objective}</p>
                        <ul>
                            {campaignPlan?.strategy?.approach.length > 0 && campaignPlan?.strategy?.approach.map((app: string, index: number) => {
                                return(
                                    <li key={index}>{app}</li>
                                )
                            })}
                        </ul>
                    </div>
                    <h2>Target Audience</h2>
                    <div className="adGeneratorSection">
                        <h3>Primary Segment</h3>
                        <div className="strategyItemList">
                            {campaignPlan?.target_audience?.primary_segment.length > 0 && campaignPlan?.target_audience?.primary_segment.map((segment: string, index: number) => {
                                return(
                                    <p className="strategyItem" key={index}>{segment}</p>
                                )
                            })}
                        </div>
                    </div>
                    <div className="adGeneratorSection">
                        <h3>Targeting Criteria</h3>
                        <div className="adGeneratorSubSection">
                            <h5>Interests</h5>
                            <div className="strategyItemList">
                                {campaignPlan?.target_audience?.targeting_criteria?.interests.length > 0 && campaignPlan?.target_audience?.targeting_criteria?.interests.map((criteria: string, index: number) => {
                                    return(
                                        <p className="strategyItem" key={index}>{criteria}</p>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="adGeneratorSubSection">
                            <h5>Behavior</h5>
                            <div className="strategyItemList">
                                {campaignPlan?.target_audience?.targeting_criteria?.behavior.length > 0 && campaignPlan?.target_audience?.targeting_criteria?.behavior.map((criteria: string, index: number) => {
                                    return(
                                        <p className="strategyItem" key={index}>{criteria}</p>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <h3>Messaging Themes</h3>
                    <div className="adGeneratorSection">
                        <h5>Key Messages</h5>
                        <div className="strategyItemList">
                            {campaignPlan?.messaging_themes?.key_messages.length > 0 && campaignPlan?.messaging_themes?.key_messages.map((message: string, index: number) => {
                                return(
                                    <p className="strategyItem" key={index}>{message}</p>
                                )
                            })}
                        </div>
                    </div>
                    <div className="adGeneratorSection">
                        <h5>Content Themes</h5>
                        <div className="strategyItemList">
                            {campaignPlan?.messaging_themes?.content_themes.length > 0 && campaignPlan?.messaging_themes?.content_themes.map((theme: string, index: number) => {
                                return(
                                    <p className="strategyItem" key={index}>{theme}</p>
                                )
                            })}
                        </div>
                    </div>
                    <div className="fbAdActionWrapper">
                        <label><b>Suggestions</b></label>
                        <input type="text" className="appInput" name="feedback" value={feedback} onChange={(event) => setFeedback(event.target.value)} placeholder="Enter Feedback" />
                        <div>
                            <button onClick={submitFeedback} className={feedback.length < 5 || loading || finalLoading ? 'appButton disabled' : 'appButton'} disabled={feedback.length < 5 || loading || finalLoading}>Submit Feedback</button>
                            <button onClick={finaliseAd} className={loading || finalLoading ? 'appButton disabled' : 'appButton'} disabled={loading || finalLoading}>{finalLoading ? 'Generating Ads...' : 'Generate Ads'}</button>
                        </div>
                    </div>
                    {/* <pre>{JSON.stringify(campaignPlan, null, 2)}</pre> */}
                </div>
                :
                <p>Loading New Strategy...</p>)
            }
            {
                progress===2 && adCopies.length > 0 && <div className="adCopiesWrapper">
                    <h1>Final Ad Copies</h1>
                    <div className="adCopiesList">
                        {adCopies?.length > 0 && adCopies.map((ad: any, index: number) => {
                            return(
                                <FbCard key={index} image={ad?.background_image_url} primary={ad?.content?.primary_text} desc={ad?.content?.description} headline={ad?.content?.headline} cta={ad?.content?.call_to_action} />
                            )
                        })}
                        {/* <pre>{JSON.stringify(adCopies, null, 2)}</pre> */}
                    </div>
                </div>
            }
        </div>
    )
}



export default FBAdViews;