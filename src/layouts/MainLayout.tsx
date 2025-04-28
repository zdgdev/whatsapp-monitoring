import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import ConnectionStatus from '../components/common/ConnectionStatus';
import { useEffect, useState } from 'react';
import { socketService } from '../services/socket';

const MainLayout = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    socketService.on('connect', handleConnect);
    socketService.on('disconnect', handleDisconnect);
    
    setIsConnected(socketService.isConnected());

    return () => {
      socketService.off('connect', handleConnect);
      socketService.off('disconnect', handleDisconnect);
    };
  }, []);

  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="flex-1 overflow-hidden flex flex-col">
        <ConnectionStatus isConnected={isConnected} />
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;