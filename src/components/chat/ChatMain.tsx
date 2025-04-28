import { RefObject } from 'react';
import { format } from 'date-fns';
import { ArrowLeft, MoreVertical, Paperclip, Smile, Mic, Send } from 'lucide-react';
import { Contact, Message, MessageStatus } from '../../types';
import MessageBubble from './MessageBubble';
import ProfileAvatar from '../common/ProfileAvatar';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

interface ChatMainProps {
  activeContact: Contact | null;
  messages: Message[];
  inputMessage: string;
  setInputMessage: (message: string) => void;
  handleSendMessage: () => void;
  messagesEndRef: RefObject<HTMLDivElement>;
}

const ChatMain = ({
  activeContact,
  messages,
  inputMessage,
  setInputMessage,
  handleSendMessage,
  messagesEndRef
}: ChatMainProps) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setInputMessage(prevInput => prevInput + emojiData.emoji);
  };

  // Group messages by date
  const groupMessagesByDate = () => {
    const groups: { [key: string]: Message[] } = {};
    
    messages.forEach(message => {
      const date = format(new Date(message.timestamp), 'yyyy-MM-dd');
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    
    return groups;
  };
  
  const getDateLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return format(date, 'MMMM d, yyyy');
    }
  };
  
  const groupedMessages = groupMessagesByDate();

  if (!activeContact) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-whatsapp-dark-chat-bg">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-200 dark:bg-whatsapp-dark-secondary rounded-full">
            <MessageCircle size={32} className="text-gray-400 dark:text-gray-600" />
          </div>
          <h3 className="text-xl font-medium mb-1">WhatsApp Web</h3>
          <p className="max-w-md">Select a contact to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-whatsapp-dark-secondary border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center">
          <div className="lg:hidden mr-2">
            <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-whatsapp-dark-sidebar-bg">
              <ArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>
          <ProfileAvatar src={activeContact.avatar} alt={activeContact.name} />
          <div className="ml-3">
            <h2 className="font-medium">{activeContact.name}</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {activeContact.isOnline ? 'Online' : 'Last seen recently'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-whatsapp-dark-sidebar-bg">
            <Search size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
          <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-whatsapp-dark-sidebar-bg">
            <MoreVertical size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>
      
      {/* Messages */}
      <div 
        className="flex-1 p-4 overflow-y-auto scrollbar-thin bg-whatsapp-chat-bg dark:bg-whatsapp-dark-chat-bg"
        style={{ backgroundImage: 'url("https://web.whatsapp.com/img/bg-chat-tile-dark_a4be512e7195b6b733d9110b408f075d.png")' }}
      >
        {Object.keys(groupedMessages).length === 0 ? (
          <div className="h-full flex flex-col justify-center items-center text-center text-gray-500 dark:text-gray-400 p-4">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-200 dark:bg-whatsapp-dark-secondary rounded-full">
              <MessageCircle size={32} className="text-gray-400 dark:text-gray-600" />
            </div>
            <p className="mb-2">No messages yet</p>
            <p>Send a message to start the conversation</p>
          </div>
        ) : (
          Object.entries(groupedMessages).map(([date, dateMessages]) => (
            <div key={date}>
              <div className="flex justify-center my-3">
                <span className="px-3 py-1 bg-white dark:bg-whatsapp-dark-secondary rounded-lg text-xs text-gray-500 dark:text-gray-400 shadow-sm">
                  {getDateLabel(date)}
                </span>
              </div>
              
              {dateMessages.map((message) => (
                <MessageBubble 
                  key={message.id} 
                  message={message} 
                  isSender={message.senderId === 'me'} 
                />
              ))}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Area */}
      <div className="bg-gray-50 dark:bg-whatsapp-dark-secondary p-2 relative">
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <button 
              onClick={() => setShowEmojiPicker(!showEmojiPicker)} 
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-whatsapp-dark-sidebar-bg"
            >
              <Smile size={22} className="text-gray-600 dark:text-gray-300" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-whatsapp-dark-sidebar-bg">
              <Paperclip size={22} className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>
          
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Type a message"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleInputKeyPress}
              className="w-full py-2 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-whatsapp-dark-sidebar-bg focus:outline-none focus:ring-1 focus:ring-whatsapp"
            />
          </div>
          
          <button
            onClick={handleSendMessage}
            disabled={inputMessage.trim() === ''}
            className={`p-2 rounded-full ${
              inputMessage.trim() === '' 
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500' 
                : 'bg-whatsapp text-white'
            }`}
          >
            {inputMessage.trim() === '' ? (
              <Mic size={22} />
            ) : (
              <Send size={22} />
            )}
          </button>
        </div>
        
        {showEmojiPicker && (
          <div className="emoji-picker-container">
            <EmojiPicker onEmojiClick={handleEmojiClick} width={320} height={350} />
          </div>
        )}
      </div>
    </div>
  );
};

// Import inside the component to avoid circular dependencies
import { useState } from 'react';
import { MessageCircle, Search } from 'lucide-react';

export default ChatMain;