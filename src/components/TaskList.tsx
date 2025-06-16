
import React from 'react';
import { Task } from '../types/workflow';
import { CheckCircle, Clock, AlertCircle, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TaskListProps {
  tasks: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-yellow-400 animate-pulse" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-600/20 text-green-300 border-green-400/30';
      case 'in_progress':
        return 'bg-yellow-600/20 text-yellow-300 border-yellow-400/30';
      case 'failed':
        return 'bg-red-600/20 text-red-300 border-red-400/30';
      default:
        return 'bg-gray-600/20 text-gray-300 border-gray-400/30';
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-purple-300">
        <Clock className="mx-auto h-12 w-12 mb-2 opacity-50" />
        <p>No tasks yet. Start a workflow to see tasks appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-96 overflow-y-auto">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white/5 rounded-lg p-3 border border-purple-300/20 hover:bg-white/10 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              {getStatusIcon(task.status)}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium mb-1">
                  {task.description}
                </p>
                <div className="flex items-center space-x-2">
                  <Badge className={`text-xs ${getStatusColor(task.status)}`}>
                    {task.status.replace('_', ' ')}
                  </Badge>
                  <span className="text-xs text-purple-300">
                    Priority: {task.priority}
                  </span>
                </div>
                {task.toolsUsed && task.toolsUsed.length > 0 && (
                  <div className="mt-1">
                    <p className="text-xs text-purple-400">
                      Tools: {task.toolsUsed.join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
