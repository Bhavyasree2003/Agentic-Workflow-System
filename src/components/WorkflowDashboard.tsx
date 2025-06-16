
import React, { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { WorkflowVisualization } from './WorkflowVisualization';
import { TaskList } from './TaskList';
import { AgentStatus } from './AgentStatus';
import { ResultsDisplay } from './ResultsDisplay';
import { WorkflowState } from '../types/workflow';
import { useWorkflowEngine } from '../hooks/useWorkflowEngine';

interface WorkflowDashboardProps {
  workflowState: WorkflowState;
  setWorkflowState: React.Dispatch<React.SetStateAction<WorkflowState>>;
}

export const WorkflowDashboard: React.FC<WorkflowDashboardProps> = ({
  workflowState,
  setWorkflowState
}) => {
  const { processWorkflow } = useWorkflowEngine();

  useEffect(() => {
    if (workflowState.status === 'planning' && workflowState.query) {
      processWorkflow(workflowState.query, setWorkflowState);
    }
  }, [workflowState.status, workflowState.query, processWorkflow, setWorkflowState]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workflow Visualization */}
        <div className="lg:col-span-2">
          <Card className="p-6 glass-morphism card-3d h-fit">
            <h2 className="text-xl font-semibold text-white mb-4">Workflow Visualization</h2>
            <WorkflowVisualization workflowState={workflowState} />
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Agent Status */}
          <Card className="p-4 glass-morphism card-3d">
            <h3 className="text-lg font-semibold text-white mb-3">Agent Status</h3>
            <AgentStatus workflowState={workflowState} />
          </Card>

          {/* Task List */}
          <Card className="p-4 glass-morphism card-3d">
            <h3 className="text-lg font-semibold text-white mb-3">Tasks</h3>
            <TaskList tasks={workflowState.tasks} />
          </Card>
        </div>
      </div>
      
      {/* Results Display - Only shown when workflow is completed */}
      <ResultsDisplay workflowState={workflowState} />
    </div>
  );
};
