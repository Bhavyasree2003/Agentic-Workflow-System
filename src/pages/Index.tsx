
import React, { useState } from 'react';
import { WorkflowDashboard } from '../components/WorkflowDashboard';
import { QueryInput } from '../components/QueryInput';
import { WorkflowState } from '../types/workflow';

const Index = () => {
  const [workflowState, setWorkflowState] = useState<WorkflowState>({
    status: 'idle',
    currentStep: null,
    tasks: [],
    results: [],
    isProcessing: false
  });

  const handleQuerySubmit = (query: string) => {
    console.log('Starting workflow with query:', query);
    setWorkflowState(prev => ({
      ...prev,
      status: 'planning',
      isProcessing: true,
      query
    }));
  };

  return (
    <div className="min-h-screen background-3d relative">
      {/* 3D Floating Shapes */}
      <div className="floating-shapes">
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-2xl">
            Agentic Workflow System
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto drop-shadow-lg">
            Advanced AI agent pipeline with iterative refinement and tool integration using Langgraph
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto space-y-8">
          <QueryInput onSubmit={handleQuerySubmit} />
          <WorkflowDashboard 
            workflowState={workflowState}
            setWorkflowState={setWorkflowState}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
