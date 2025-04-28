import { useState, useEffect, useRef } from 'react';
import ChatSidebar from '../components/chat/ChatSidebar';
import ChatMain from '../components/chat/ChatMain';
import { Contact, Message, MessageStatus } from '../types';
import { mockContacts, mockMessages } from '../mockData';

const WhatsAppWeb = () => {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeContact, setActiveContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputMessage, setInputMessage] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeContact) {
      // Mark messages as read when viewing a conversation
      const updatedMessages = messages.map(message => {
        if (message.contactId === activeContact.id && message.senderId !== 'me' && message.status !== MessageStatus.READ) {
          return { ...message, status: MessageStatus.READ };
        }
        return message;
      });
      
      setMessages(updatedMessages);
    }
  }, [activeContact]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeContactMessages = messages.filter(
    message => activeContact && (message.contactId === activeContact.id || message.senderId === activeContact.id)
  );

  const handleSendMessage = () => {
    if (inputMessage.trim() === '' || !activeContact) return;
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      text: inputMessage,
      timestamp: new Date(),
      senderId: 'me',
      contactId: activeContact.id,
      status: MessageStatus.SENT,
    };
    
    setMessages([...messages, newMessage]);
    setInputMessage('');
    
    // Simulate message status updates
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: MessageStatus.DELIVERED } : msg
        )
      );
    }, 1000);
    
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: MessageStatus.READ } : msg
        )
      );
    }, 2000);
    
    // Simulate a reply
    if (Math.random() > 0.5) {
      setTimeout(() => {
        const reply: Message = {
          id: `msg-${Date.now()}`,
          text: getRandomReply(),
          timestamp: new Date(),
          senderId: activeContact.id,
          contactId: 'me',
          status: MessageStatus.DELIVERED,
        };
        setMessages(prev => [...prev, reply]);
      }, 3000);
    }
  };
  
  // Mock replies
  const getRandomReply = () => {
    const replies = [
      "Ok, I'll check that!",
      "Thanks for the message",
      "Got it, no problem",
      "I'll get back to you soon",
      "Perfect, will do",
      "Let me see what I can do",
      "Great, thanks for letting me know"
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  return (
    <div className="flex h-full">
      <ChatSidebar 
        contacts={filteredContacts}
        activeContact={activeContact}
        setActiveContact={setActiveContact}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        messages={messages}
      />
      
      <ChatMain 
        activeContact={activeContact}
        messages={activeContactMessages}
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSendMessage={handleSendMessage}
        messagesEndRef={messagesEndRef}
      />
    </div>
  );
};

export default WhatsAppWeb;