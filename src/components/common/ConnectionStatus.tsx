interface ConnectionStatusProps {
  isConnected: boolean;
}

const ConnectionStatus = ({ isConnected }: ConnectionStatusProps) => {
  return (
    <div className={`text-center text-xs py-1 transition-colors ${
      isConnected 
        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
    }`}>
      {isConnected ? 'Connected' : 'Disconnected'}
    </div>
  );
};

export default ConnectionStatus;