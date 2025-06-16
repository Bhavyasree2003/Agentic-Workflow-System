
import React from 'react';
import { WorkflowState, Agent } from '../types/workflow';
import { Brain, Wrench, Search, Activity } from 'lucide-react';

interface AgentStatusProps {
  workflowState: WorkflowState;
}

export const AgentStatus: React.FC<AgentStatusProps> = ({ workflowState }) => {
  // Mock agents based on workflow state
  const agents: Agent[] = [
    {
      name: 'PlanAgent',
      type: 'planner',
      status: workflowState.status === 'planning' ? 'active' : 
              workflowState.status === 'idle' ? 'idle' : 'waiting',
      currentTask: workflowState.status === 'planning' ? 'Analyzing query and creating task breakdown' : undefined
    },
    {
      name: 'ToolAgent',
      type: 'tool',
      status: workflowState.status === 'executing' ? 'active' : 
              ['planning', 'refining'].includes(workflowState.status) ? 'waiting' : 'idle',
      currentTask: workflowState.status === 'executing' ? 'Executing tasks with available tools' : undefined
    },
    {
      name: 'ReflectionAgent',
      type: 'reflector',
      status: workflowState.status === 'refining' ? 'active' : 
              workflowState.status === 'completed' ? 'idle' : 'waiting',
      currentTask: workflowState.status === 'refining' ? 'Analyzing results and providing feedback' : undefined
    }
  ];

  const getAgentIcon = (type: Agent['type']) => {
    switch (type) {
      case 'planner':
        return Brain;
      case 'tool':
        return Wrench;
      case 'reflector':
        return Search;
      default:
        return Activity;
    }
  };

  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'active':
        return 'text-green-400';
      case 'waiting':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusBg = (status: Agent['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-600/20 border-green-400/30';
      case 'waiting':
        return 'bg-yellow-600/20 border-yellow-400/30';
      default:
        return 'bg-gray-600/20 border-gray-400/30';
    }
  };

  return (
    <div className="space-y-3">
      {agents.map((agent) => {
        const Icon = getAgentIcon(agent.type);
        
        return (
          <div
            key={agent.name}
            className={`p-3 rounded-lg border transition-all duration-300 ${getStatusBg(agent.status)}`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full bg-white/10`}>
                <Icon className={`h-4 w-4 ${getStatusColor(agent.status)} ${agent.status === 'active' ? 'animate-pulse' : ''}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-white text-sm">{agent.name}</h4>
                  <span className={`text-xs capitalize ${getStatusColor(agent.status)}`}>
                    {agent.status}
                  </span>
                </div>
                {agent.currentTask && (
                  <p className="text-xs text-purple-200 mt-1 truncate">
                    {agent.currentTask}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
