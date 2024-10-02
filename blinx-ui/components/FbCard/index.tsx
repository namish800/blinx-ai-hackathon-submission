import Image from "next/image";
import User from "@/app/assets/images/adUser.png"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ReplyIcon from '@mui/icons-material/Reply';

const FbCard = (props: any) => {
    return(
        <div className="FbCard">
            <div className="fbCardHeader">
                <Image 
                    src={User}
                    alt="user placeholder"
                    width={80}
                    height={80}
                    className="fbAdUser"
                />
                <div>
                    <p className="fbUser">Blinxai.in</p>
                    <p>Sponsored</p>
                </div>
            </div>
            <p className="fbPrimary">{props?.primary}</p>
            <div className="adBoxWrapper">
                <Image
                    alt="post copy"
                    src={props?.image}
                    height={400}
                    width={400}
                />
                <div className="adBoxInfo">
                    <div className="adBoxInfoLeft">
                        <p className="fbHeadline">{props?.headline}</p>
                        <p className="fbDesc">{props?.desc}</p>
                    </div>
                    <div className="adBoxInfoRight">
                        <button className="fbCta">{props?.cta}</button>
                    </div>
                </div>
                <div className="adCTA">
                    <div>
                        <ThumbUpIcon />
                        <p>Like</p>
                    </div>
                    <div>
                        <ChatBubbleIcon />
                        <p>Comment</p>
                    </div>
                    <div>
                        <ReplyIcon />
                        <p>Share</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default FbCard;