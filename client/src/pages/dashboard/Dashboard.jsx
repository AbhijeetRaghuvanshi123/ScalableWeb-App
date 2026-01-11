import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { getTasks, createTask, updateTask, deleteTask } from '../../api/task.api';
import useAuth from '../../hooks/useAuth';
import TaskList from '../../components/tasks/TaskList';
import TaskForm from '../../components/tasks/TaskForm';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { FaPlus } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getTasks();
      // Ensure data is an array
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to fetch tasks');
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreate = async (data) => {
    setIsSaving(true);
    try {
      await createTask(data);
      toast.success('Task created successfully');
      setIsFormOpen(false);
      fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdate = async (data) => {
    if (!editingTask) return;
    setIsSaving(true);
    try {
      await updateTask(editingTask._id, data);
      toast.success('Task updated successfully');
      setEditingTask(null);
      setIsFormOpen(false);
      fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update task');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await deleteTask(id);
      toast.success('Task deleted');
      fetchTasks();
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const openCreateForm = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const openEditForm = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-gray-600 text-sm">Welcome back, {user?.name}</p>
        </div>
        <Button onClick={openCreateForm} className="flex items-center gap-2">
          <FaPlus /> New Task
        </Button>
      </div>

      {isFormOpen && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingTask ? 'Edit Task' : 'Create New Task'}
          </h3>
          <TaskForm
            defaultValues={editingTask}
            onSubmit={editingTask ? handleUpdate : handleCreate}
            isLoading={isSaving}
            onCancel={() => setIsFormOpen(false)}
          />
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader className="w-8 h-8 text-blue-600" />
        </div>
      ) : (
        <TaskList tasks={tasks} onEdit={openEditForm} onDelete={handleDelete} />
      )}
    </div>
  );
};
export default Dashboard;
