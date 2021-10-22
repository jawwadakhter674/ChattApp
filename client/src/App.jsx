import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { ChanellListContainer, ChannelContainer, Auth } from './components';
import './App.css';

const apiKey = 'rybud6mqjvyb';
const client = StreamChat.getInstance(apiKey);

const cookies = new Cookies();
const authToken = cookies.get('token');

if (authToken) {
  client.connectUser(
    {
      name: cookies.get('username'),
      fullName: cookies.get('fullName'),
      phoneNumber: cookies.get('phoneNumber'),
      hashedPassword: cookies.get('hashedPassword'),
      image: cookies.get('avatarURL'),
      id: cookies.get('userId'),
    },
    authToken
  );
}

const App = () => {
  if (!authToken) return <Auth />;
  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChanellListContainer />
        <ChannelContainer />
      </Chat>
    </div>
  );
};

export default App;
