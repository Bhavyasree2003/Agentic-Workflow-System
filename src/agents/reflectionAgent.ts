import { Task } from '../types/workflow';

interface ReflectionResult {
  needsRefinement: boolean;
  feedback: string;
  suggestions: string[];
  qualityScore: number;
}

class ReflectionAgent {
  async analyzeResults(tasks: Task[]): Promise<ReflectionResult> {
    console.log('ReflectionAgent: Analyzing task results');
    
    // Simulate reflection process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const completedTasks = tasks.filter(t => t.status === 'completed');
    const failedTasks = tasks.filter(t => t.status === 'failed');
    
    const successRate = completedTasks.length / tasks.length;
    const qualityScore = Math.round(successRate * 100);
    
    const needsRefinement = successRate < 0.8 || failedTasks.length > 0;
    
    let feedback = '';
    const suggestions: string[] = [];
    
    if (failedTasks.length > 0) {
      feedback += `${failedTasks.length} tasks failed and need retry. `;
      suggestions.push('Retry failed tasks with alternative approaches');
    }
    
    if (successRate < 0.6) {
      feedback += 'Low success rate detected. Consider breaking down complex tasks further. ';
      suggestions.push('Split complex tasks into smaller subtasks');
    }
    
    if (successRate >= 0.8) {
      feedback += 'Good task completion rate. Results appear satisfactory.';
      suggestions.push('Consider optimizing successful task patterns');
    }
    
    const result: ReflectionResult = {
      needsRefinement,
      feedback: feedback || 'Task execution completed successfully',
      suggestions,
      qualityScore
    };
    
    console.log('ReflectionAgent: Analysis complete', result);
    return result;
  }

  async refineTasks(tasks: Task[], feedback: string): Promise<Task[]> {
    console.log('ReflectionAgent: Refining tasks based on feedback');
    
    // Simulate refinement process
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const refinedTasks: Task[] = [];
    
    for (const task of tasks) {
      if (task.status === 'failed') {
        // Retry failed tasks with modifications
        const refinedTask: Task = {
          ...task,
          id: `${task.id}-retry`,
          description: `[RETRY] ${task.description}`,
          status: 'pending',
          priority: task.priority + 1, // Increase priority for retries
          updatedAt: new Date()
        };
        refinedTasks.push(refinedTask);
      } else if (task.status === 'completed') {
        // Keep successful tasks but potentially add follow-up tasks
        refinedTasks.push(task);
      } else {
        // Modify pending tasks based on learnings
        refinedTasks.push({
          ...task,
          description: `[OPTIMIZED] ${task.description}`,
          updatedAt: new Date()
        });
      }
    }
    
    // Add improvement tasks if needed
    if (feedback.includes('Low success rate')) {
      refinedTasks.push({
        id: `improvement-${Date.now()}`,
        description: 'Validate and improve task execution strategy',
        status: 'pending',
        priority: 0, // High priority
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    
    console.log(`ReflectionAgent: Refined ${refinedTasks.length} tasks`);
    return refinedTasks;
  }
}

export const reflectionAgent = new ReflectionAgent();
