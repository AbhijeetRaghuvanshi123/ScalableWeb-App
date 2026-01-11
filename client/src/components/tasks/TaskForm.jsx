import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { taskSchema } from '../../utils/validators';
import { STATUS } from '../../utils/constants';
import Input from '../common/Input';
import Button from '../common/Button';

const TaskForm = ({ defaultValues, onSubmit, isLoading, onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(taskSchema),
    defaultValues: defaultValues || { status: STATUS.TODO },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Title"
        placeholder="Enter task title"
        error={errors.title}
        {...register('title')}
      />
      
      <div className="flex flex-col gap-1 text-left">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          rows={3}
          {...register('description')}
        />
        {errors.description && <span className="text-xs text-red-500">{errors.description.message}</span>}
      </div>

      <div className="flex flex-col gap-1 text-left">
        <label className="text-sm font-medium text-gray-700">Status</label>
        <select
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          {...register('status')}
        >
          <option value={STATUS.TODO}>To Do</option>
          <option value={STATUS.IN_PROGRESS}>In Progress</option>
          <option value={STATUS.DONE}>Done</option>
        </select>
        {errors.status && <span className="text-xs text-red-500">{errors.status.message}</span>}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>}
        <Button type="submit" isLoading={isLoading} variant="primary">
          {defaultValues ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
};
export default TaskForm;
