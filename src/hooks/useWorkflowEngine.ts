
import { useCallback } from 'react';
import { WorkflowState, Task } from '../types/workflow';
import { planningAgent } from '../agents/planningAgent';
import { toolAgent } from '../agents/toolAgent';
import { reflectionAgent } from '../agents/reflectionAgent';

export const useWorkflowEngine = () => {
  const processWorkflow = useCallback(async (
    query: string,
    setWorkflowState: React.Dispatch<React.SetStateAction<WorkflowState>>
  ) => {
    try {
      console.log('Starting workflow processing for query:', query);
      
      // Phase 1: Planning
      setWorkflowState(prev => ({
        ...prev,
        status: 'planning',
        currentStep: 'planning'
      }));

      const tasks = await planningAgent.splitQuery(query);
      console.log('Generated tasks:', tasks);

      setWorkflowState(prev => ({
        ...prev,
        tasks,
        status: 'executing',
        currentStep: 'executing'
      }));

      // Phase 2: Execution
      const updatedTasks = await toolAgent.executeTasks(tasks, (updatedTask) => {
        setWorkflowState(prev => ({
          ...prev,
          tasks: prev.tasks.map(t => t.id === updatedTask.id ? updatedTask : t)
        }));
      });

      // Phase 3: Reflection and Refinement
      setWorkflowState(prev => ({
        ...prev,
        status: 'refining',
        currentStep: 'refining',
        tasks: updatedTasks
      }));

      const reflection = await reflectionAgent.analyzeResults(updatedTasks);
      console.log('Reflection results:', reflection);

      // Check if refinement is needed
      if (reflection.needsRefinement) {
        const refinedTasks = await reflectionAgent.refineTasks(updatedTasks, reflection.feedback);
        console.log('Refined tasks:', refinedTasks);
        
        setWorkflowState(prev => ({
          ...prev,
          tasks: refinedTasks,
          feedback: reflection.feedback,
          iterationCount: (prev.iterationCount || 0) + 1
        }));

        // Re-execute refined tasks
        await toolAgent.executeTasks(refinedTasks, (updatedTask) => {
          setWorkflowState(prev => ({
            ...prev,
            tasks: prev.tasks.map(t => t.id === updatedTask.id ? updatedTask : t)
          }));
        });
      }

      // Phase 4: Completion
      setWorkflowState(prev => ({
        ...prev,
        status: 'completed',
        currentStep: 'completed',
        isProcessing: false,
        results: prev.tasks.filter(t => t.status === 'completed').map(t => t.result)
      }));

      console.log('Workflow completed successfully');

    } catch (error) {
      console.error('Workflow processing error:', error);
      setWorkflowState(prev => ({
        ...prev,
        status: 'error',
        isProcessing: false
      }));
    }
  }, []);

  return { processWorkflow };
};
