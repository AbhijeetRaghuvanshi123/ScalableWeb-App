import { useState } from 'react';
import TaskCard from './TaskCard';
import Input from '../common/Input';
import { STATUS } from '../../utils/constants';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'ALL' || task.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="w-full sm:w-64">
           <Input 
             placeholder="Search tasks..." 
             value={search} 
             onChange={(e) => setSearch(e.target.value)} 
           />
        </div>
        <select
          className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="ALL">All Status</option>
          <option value={STATUS.TODO}>To Do</option>
          <option value={STATUS.IN_PROGRESS}>In Progress</option>
          <option value={STATUS.DONE}>Done</option>
        </select>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          No tasks found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map(task => (
            <TaskCard key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
};
export default TaskList;
