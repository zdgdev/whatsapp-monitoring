import { useState } from 'react';
import { Smartphone, RefreshCw, PlusCircle, Trash, Wifi, WifiOff } from 'lucide-react';

const Device = () => {
  const [devices, setDevices] = useState([
    { id: 1, name: 'iPhone 13 Pro', status: 'Online', lastActive: '2 minutes ago', battery: 78 },
    { id: 2, name: 'Samsung Galaxy S22', status: 'Offline', lastActive: '3 hours ago', battery: 45 },
    { id: 3, name: 'Google Pixel 6', status: 'Online', lastActive: 'Just now', battery: 92 },
    { id: 4, name: 'OnePlus 10 Pro', status: 'Online', lastActive: '15 minutes ago', battery: 63 }
  ]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Device Management</h1>
        <button className="bg-whatsapp hover:bg-whatsapp-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <PlusCircle size={16} />
          <span>Add Device</span>
        </button>
      </div>
      
      <div className="bg-white dark:bg-whatsapp-dark-sidebar-bg rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <h2 className="text-lg font-medium">Connected Devices</h2>
          <button className="text-whatsapp hover:text-whatsapp-dark flex items-center gap-1 transition-colors">
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
        </div>
        
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {devices.map((device) => (
            <div
              key={device.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-whatsapp-dark-secondary flex items-center justify-center">
                    <Smartphone size={20} className="text-gray-600 dark:text-gray-300" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">{device.name}</h3>
                    <div className="flex items-center text-xs">
                      {device.status === 'Online' ? (
                        <>
                          <Wifi size={12} className="text-green-500 mr-1" />
                          <span className="text-green-500">Online</span>
                        </>
                      ) : (
                        <>
                          <WifiOff size={12} className="text-red-500 mr-1" />
                          <span className="text-red-500">Offline</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="ml-auto">
                  <button className="text-red-500 hover:text-red-700 transition-colors">
                    <Trash size={16} />
                  </button>
                </div>
              </div>
              
              <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700 text-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-500 dark:text-gray-400">Battery</span>
                  <span className={`font-medium ${
                    device.battery > 20 ? 'text-green-500' : 'text-red-500'
                  }`}>{device.battery}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      device.battery > 60 ? 'bg-green-500' :
                      device.battery > 20 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${device.battery}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Last active: {device.lastActive}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white dark:bg-whatsapp-dark-sidebar-bg rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-medium">Device Settings</h2>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Auto-logout inactive devices</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Automatically log out devices after period of inactivity</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" checked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-whatsapp/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-whatsapp"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Multi-device login</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Allow users to be logged in on multiple devices</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-whatsapp/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-whatsapp"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Device verification</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Require verification when logging in from a new device</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" checked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-whatsapp/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-whatsapp"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Device;