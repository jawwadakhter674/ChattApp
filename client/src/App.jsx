import React from 'react'
import {StreamChat} from 'stream-chat'
import {Chat} from 'stream-chat-react'
import Cookies from 'universal-cookie';
import {ChanellListContainer, ChannelContainer , Auth} from './components';
import './App.css'

const apiKey = 'rybud6mqjvyb';
const client = StreamChat.getInstance(apiKey);

const authToken = true;


const App = () => {
    if(authToken) return <Auth/>
    return (
        <div className="app__wrapper">

            <Chat client={client} theme="team light">
                <ChanellListContainer/>
                <ChannelContainer/>
            </Chat>
        </div>
    )
}

export default App
