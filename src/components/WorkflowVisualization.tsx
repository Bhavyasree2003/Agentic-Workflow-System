
import React from 'react';
import { WorkflowState } from '../types/workflow';
import { Brain, Search, Cog, CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface WorkflowVisualizationProps {
  workflowState: WorkflowState;
}

export const WorkflowVisualization: React.FC<WorkflowVisualizationProps> = ({
  workflowState
}) => {
  const getStepStatus = (step: string) => {
    if (workflowState.currentStep === step) return 'active';
    if (workflowState.status === 'completed') return 'completed';
    if (['planning', 'executing', 'refining'].includes(workflowState.status)) {
      const steps = ['planning', 'executing', 'refining', 'completed'];
      const currentIndex = steps.indexOf(workflowState.status);
      const stepIndex = steps.indexOf(step);
      return stepIndex < currentIndex ? 'completed' : 'pending';
    }
    return 'pending';
  };

  const steps = [
    {
      id: 'planning',
      name: 'Plan Agent',
      description: 'Split query into sub-tasks',
      icon: Brain,
    },
    {
      id: 'executing',
      name: 'Tool Agent',
      description: 'Execute tasks with tools',
      icon: Cog,
    },
    {
      id: 'refining',
      name: 'Reflection',
      description: 'Iterative refinement',
      icon: Search,
    },
    {
      id: 'completed',
      name: 'Complete',
      description: 'All tasks finished',
      icon: CheckCircle,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Main Workflow Steps */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          const Icon = step.icon;
          
          return (
            <div
              key={step.id}
              className={`
                relative p-4 rounded-lg border-2 transition-all duration-300
                ${status === 'active' 
                  ? 'bg-purple-600/30 border-purple-400 scale-105' 
                  : status === 'completed'
                  ? 'bg-green-600/20 border-green-400'
                  : 'bg-white/5 border-purple-300/30'
                }
              `}
            >
              <div className="text-center space-y-2">
                <div className={`
                  mx-auto w-12 h-12 rounded-full flex items-center justify-center
                  ${status === 'active' ? 'bg-purple-500' : status === 'completed' ? 'bg-green-500' : 'bg-gray-600'}
                `}>
                  {status === 'active' ? (
                    <Clock className="h-6 w-6 text-white animate-pulse" />
                  ) : (
                    <Icon className="h-6 w-6 text-white" />
                  )}
                </div>
                <h4 className="font-semibold text-white text-sm">{step.name}</h4>
                <p className="text-xs text-purple-200">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                  <div className={`
                    w-4 h-0.5 
                    ${status === 'completed' ? 'bg-green-400' : 'bg-purple-300/30'}
                  `} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Current Status */}
      <div className="bg-white/5 rounded-lg p-4 border border-purple-300/20">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-white">Current Status</h4>
            <p className="text-purple-200 capitalize">{workflowState.status.replace('_', ' ')}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-purple-300">Tasks Completed</p>
            <p className="text-2xl font-bold text-white">
              {workflowState.tasks.filter(t => t.status === 'completed').length}
              <span className="text-lg text-purple-300">/{workflowState.tasks.length}</span>
            </p>
          </div>
        </div>
        
        {workflowState.isProcessing && (
          <div className="mt-3">
            <div className="w-full bg-purple-900/30 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full animate-pulse" style={{width: '60%'}} />
            </div>
          </div>
        )}
      </div>

      {/* Query Display */}
      {workflowState.query && (
        <div className="bg-white/5 rounded-lg p-4 border border-purple-300/20">
          <h4 className="font-semibold text-white mb-2">Current Query</h4>
          <p className="text-purple-200 text-sm">{workflowState.query}</p>
        </div>
      )}
    </div>
  );
};
