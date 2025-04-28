import { format } from 'date-fns';
import { Check, CheckCheck } from 'lucide-react';
import { Message, MessageStatus } from '../../types';

interface MessageBubbleProps {
  message: Message;
  isSender: boolean;
}

const MessageBubble = ({ message, isSender }: MessageBubbleProps) => {
  const formatTime = (timestamp: Date) => {
    return format(new Date(timestamp), 'HH:mm');
  };

  const getStatusIcon = () => {
    switch (message.status) {
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

  // Detect if message contains URL and format it
  const formatMessageText = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    if (urlRegex.test(text)) {
      return text.split(urlRegex).map((part, i) => {
        if (part.match(urlRegex)) {
          return (
            <a 
              key={i} 
              href={part} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 dark:text-blue-400 underline"
            >
              {part}
            </a>
          );
        }
        return part;
      });
    }
    return text;
  };

  return (
    <div className={`flex mb-2 ${isSender ? 'justify-end' : 'justify-start'}`}>
      <div className={`animate-fade-in animate-slide-in ${isSender ? 'message-bubble-out' : 'message-bubble-in'}`}>
        <div>{formatMessageText(message.text)}</div>
        <div className="flex justify-end items-center mt-1 text-[10px] text-gray-500">
          <span>{formatTime(message.timestamp)}</span>
          {isSender && <span className="ml-1">{getStatusIcon()}</span>}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;