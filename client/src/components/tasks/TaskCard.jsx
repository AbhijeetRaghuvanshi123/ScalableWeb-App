import { STATUS } from '../../utils/constants';
import Button from '../common/Button';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const statusColor = {
    [STATUS.TODO]: 'bg-yellow-100 text-yellow-800',
    [STATUS.IN_PROGRESS]: 'bg-blue-100 text-blue-800',
    [STATUS.DONE]: 'bg-green-100 text-green-800',
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 transition-all hover:shadow-md">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800 text-lg truncate pr-2">{task.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase whitespace-nowrap ${statusColor[task.status]}`}>
          {task.status}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">{task.description}</p>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => onEdit(task)} className="text-xs px-3 py-1 h-8">
          Edit
        </Button>
        <Button variant="danger" onClick={() => onDelete(task._id)} className="text-xs px-3 py-1 h-8">
          Delete
        </Button>
      </div>
    </div>
  );
};
export default TaskCard;
