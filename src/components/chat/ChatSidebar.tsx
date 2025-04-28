import { useState } from 'react';
import { Search, MoreVertical, Filter } from 'lucide-react';
import { Contact, Message, MessageStatus } from '../../types';
import ContactItem from './ContactItem';
import ProfileAvatar from '../common/ProfileAvatar';

interface ChatSidebarProps {
  contacts: Contact[];
  activeContact: Contact | null;
  setActiveContact: (contact: Contact) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  messages: Message[];
}

const ChatSidebar = ({
  contacts,
  activeContact,
  setActiveContact,
  searchQuery,
  setSearchQuery,
  messages
}: ChatSidebarProps) => {
  const [showSearchInput, setShowSearchInput] = useState(false);

  // Get the last message for each contact
  const getLastMessage = (contactId: string) => {
    const contactMessages = messages.filter(
      m => m.contactId === contactId || m.senderId === contactId
    );
    
    if (contactMessages.length === 0) return null;
    return contactMessages[contactMessages.length - 1];
  };

  // Count unread messages per contact
  const getUnreadCount = (contactId: string) => {
    return messages.filter(
      m => m.contactId === contactId && 
      m.senderId !== 'me' && 
      m.status !== MessageStatus.READ
    ).length;
  };

  return (
    <div className="w-[350px] border-r border-gray-200 dark:border-gray-800 flex flex-col h-full bg-white dark:bg-whatsapp-dark-sidebar-bg">
      {/* Header */}
      <div className="p-3 flex items-center justify-between bg-gray-50 dark:bg-whatsapp-dark-secondary">
        <div className="flex items-center">
          <ProfileAvatar src="https://i.pravatar.cc/150?img=3" alt="Profile" />
          <span className="ml-2 font-medium">Chats</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowSearchInput(!showSearchInput)}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-whatsapp-dark-sidebar-bg"
          >
            <Search size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
          <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-whatsapp-dark-sidebar-bg">
            <MoreVertical size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>
      
      {/* Search */}
      <div className={`px-3 py-2 bg-white dark:bg-whatsapp-dark-sidebar-bg ${showSearchInput ? 'block' : 'hidden'}`}>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search or start new chat"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-whatsapp-dark-secondary focus:outline-none focus:ring-1 focus:ring-whatsapp"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>
      
      {/* Contact List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {contacts.length === 0 ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            No contacts found
          </div>
        ) : (
          <div>
            {contacts.map((contact) => (
              <ContactItem
                key={contact.id}
                contact={contact}
                isActive={activeContact?.id === contact.id}
                onClick={() => setActiveContact(contact)}
                lastMessage={getLastMessage(contact.id)}
                unreadCount={getUnreadCount(contact.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;