import { useState } from 'react';
import { Search, Plus, MoreVertical, Edit2, Trash2 } from 'lucide-react';

const User = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Zero Platform', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Admin', status: 'Active' },
    { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'User', status: 'Active' },
  ]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button className="bg-whatsapp hover:bg-whatsapp-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={16} />
          <span>Add User</span>
        </button>
      </div>
      
      <div className="bg-white dark:bg-whatsapp-dark-sidebar-bg rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-whatsapp-dark-secondary focus:outline-none focus:ring-1 focus:ring-whatsapp"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <div className="ml-4">
            <select className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-whatsapp-dark-secondary focus:outline-none focus:ring-1 focus:ring-whatsapp">
              <option value="">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>
          <div className="ml-4">
            <select className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-whatsapp-dark-secondary focus:outline-none focus:ring-1 focus:ring-whatsapp">
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-whatsapp-dark-secondary text-sm">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-whatsapp-dark-secondary/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.role === 'Admin'
                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
                        : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.status === 'Active'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-whatsapp-dark-secondary">
                        <Edit2 size={16} className="text-gray-500 dark:text-gray-400" />
                      </button>
                      <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-whatsapp-dark-secondary">
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                      <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-whatsapp-dark-secondary">
                        <MoreVertical size={16} className="text-gray-500 dark:text-gray-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">5</span> results
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-whatsapp-dark-secondary text-gray-600 dark:text-gray-300 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-whatsapp-dark-secondary text-gray-600 dark:text-gray-300 disabled:opacity-50" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;