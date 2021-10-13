import React from 'react'
import {Avatar , useChatContext} from 'stream-chat-react';
const TeamChannelPreview = (props) => {
    const {channel , type} = props;
    const {channel : activeChannel , client} = useChatContext();

    const ChannelPreview = ()=> (
        <p className="channel-preview__item">
            # {channel?.data?.name || channel?.data?.id}
        </p>
    )

    // {
    //     "123":{}
    //     "123":{}
    //     "123":{}
    //     "123":{}
    //     "123":{}
    //     "123":{}
    // }  we use  the object.vaues to return the array inteam of object 

    const DirectPreview = ()=>{
        const members = Object.values(channel.state.members).filter(({user})=> user.id !== client.userID);
        return(
            <div className= "channel-preview__item single">
                <Avatar
                    image={members[0]?.user?.image}
                    name={members[0]?.user?.fullName}
                    size={24}
                />
                <p>{members[0]?.user?.fullname}</p>
            </div>
        )          
    }

    return (
        <div className={channel?.id === activeChannel?.id ? 'channel-preview__wrapper__selected' : 'channel-preview__wrapper'} onClick = {()=>{console.log(channel)}}>  
        {/* we use that to know if the current chat is selected or not */}
            {type === 'team' ? <ChannelPreview/> : <DirectPreview/>}
        </div>
    )
}

export default TeamChannelPreview
