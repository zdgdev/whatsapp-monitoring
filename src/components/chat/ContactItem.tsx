import { format } from 'date-fns';
import { Message, MessageStatus } from '../../types';
import ProfileAvatar from '../common/ProfileAvatar';
import { Contact } from '../../types';
import { Check, CheckCheck } from 'lucide-react';

interface ContactItemProps {
  contact: Contact;
  isActive: boolean;
  onClick: () => void;
  lastMessage: Message | null;
  unreadCount: number;
}

const ContactItem = ({ contact, isActive, onClick, lastMessage, unreadCount }: ContactItemProps) => {
  const formatMessageTime = (timestamp: Date) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    
    // Same day
    if (
      messageDate.getDate() === now.getDate() &&
      messageDate.getMonth() === now.getMonth() &&
      messageDate.getFullYear() === now.getFullYear()
    ) {
      return format(messageDate, 'HH:mm');
    }
    
    // This week
    const diffDays = Math.floor((now.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 7) {
      return format(messageDate, 'EEE');
    }
    
    return format(messageDate, 'dd/MM/yyyy');
  };
  
  const getStatusIcon = (status: MessageStatus) => {
    switch (status) {
      case MessageStatus.SENT:
        return <Check size={16} className="text-gray-400" />;
      case MessageStatus.DELIVERED:
        return <CheckCheck size={16} className="text-gray-400" />;
      case MessageStatus.READ:
        return <CheckCheck size={16} className="text-blue-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div
      onClick={onClick}
      className={`px-3 py-3 flex items-start hover:bg-gray-100 dark:hover:bg-whatsapp-dark-secondary/50 cursor-pointer ${
        isActive ? 'bg-gray-100 dark:bg-whatsapp-dark-secondary/50' : ''
      }`}
    >
      <div className="relative">
        <ProfileAvatar src={contact.avatar} alt={contact.name} />
        {contact.isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-whatsapp-dark-sidebar-bg rounded-full"></span>
        )}
      </div>
      
      <div className="ml-3 flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <span className="font-medium truncate">{contact.name}</span>
          {lastMessage && (
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {formatMessageTime(lastMessage.timestamp)}
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-1">
          <div className="flex items-center max-w-[230px] truncate text-sm text-gray-500 dark:text-gray-400">
            {lastMessage && lastMessage.senderId === 'me' && (
              <span className="mr-1">{getStatusIcon(lastMessage.status)}</span>
            )}
            <span className="truncate">
              {lastMessage ? lastMessage.text : 'Start a conversation'}
            </span>
          </div>
          
          {unreadCount > 0 && (
            <span className="bg-whatsapp text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
              {unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactItem;