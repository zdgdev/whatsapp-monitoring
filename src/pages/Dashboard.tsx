import { BarChart, Users, MessageSquare, Check, Clock } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { 
      id: 1, 
      title: 'Total Messages', 
      value: '12,345', 
      change: '+15%', 
      icon: <MessageSquare size={24} className="text-blue-500" /> 
    },
    { 
      id: 2, 
      title: 'Active Users', 
      value: '1,234', 
      change: '+8%', 
      icon: <Users size={24} className="text-green-500" /> 
    },
    { 
      id: 3, 
      title: 'Delivered Rate', 
      value: '98.7%', 
      change: '+0.5%', 
      icon: <Check size={24} className="text-indigo-500" /> 
    },
    { 
      id: 4, 
      title: 'Avg. Response Time', 
      value: '2.3m', 
      change: '-8%', 
      icon: <Clock size={24} className="text-yellow-500" /> 
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div 
            key={stat.id} 
            className="bg-white dark:bg-whatsapp-dark-sidebar-bg p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              <div className="rounded-full p-2 bg-gray-50 dark:bg-whatsapp-dark-secondary">
                {stat.icon}
              </div>
            </div>
            <div className="mt-2 text-xs text-green-500">
              {stat.change} from last month
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-whatsapp-dark-sidebar-bg p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium">Message Activity</h2>
            <select className="text-sm bg-gray-50 dark:bg-whatsapp-dark-secondary border border-gray-200 dark:border-gray-700 rounded py-1 px-2">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="flex items-center justify-center h-64">
            <BarChart size={120} className="text-gray-300 dark:text-gray-700" />
            <p className="text-gray-500 dark:text-gray-400 text-sm">Activity chart (placeholder)</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-whatsapp-dark-sidebar-bg p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium">Recent Activities</h2>
            <button className="text-whatsapp text-sm">View All</button>
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3 pb-3 border-b border-gray-100 dark:border-gray-800">
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <Users size={16} className="text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New user registered</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">User ID: 3840283</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;