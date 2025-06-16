
import { Task } from '../types/workflow';

class ToolAgent {
  private availableTools = [
    'web_search',
    'calculator',
    'data_analyzer',
    'report_generator',
    'content_creator',
    'validator'
  ];

  async executeTasks(
    tasks: Task[], 
    onTaskUpdate: (task: Task) => void
  ): Promise<Task[]> {
    console.log('ToolAgent: Starting task execution');
    
    const updatedTasks: Task[] = [];
    
    for (const task of tasks) {
      // Update task to in_progress
      const inProgressTask = {
        ...task,
        status: 'in_progress' as const,
        updatedAt: new Date()
      };
      onTaskUpdate(inProgressTask);
      
      // Simulate tool selection and execution
      const selectedTools = this.selectToolsForTask(task);
      console.log(`ToolAgent: Executing task "${task.description}" with tools:`, selectedTools);
      
      // Simulate execution time
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000));
      
      // Simulate task completion with results
      const completedTask = {
        ...inProgressTask,
        status: Math.random() > 0.1 ? 'completed' as const : 'failed' as const,
        toolsUsed: selectedTools,
        result: this.generateMockResult(task, selectedTools),
        updatedAt: new Date()
      };
      
      onTaskUpdate(completedTask);
      updatedTasks.push(completedTask);
      
      console.log(`ToolAgent: Task "${task.description}" ${completedTask.status}`);
    }
    
    return updatedTasks;
  }

  private selectToolsForTask(task: Task): string[] {
    const description = task.description.toLowerCase();
    const selectedTools: string[] = [];
    
    if (description.includes('research') || description.includes('gather')) {
      selectedTools.push('web_search');
    }
    
    if (description.includes('analyze') || description.includes('patterns')) {
      selectedTools.push('data_analyzer');
    }
    
    if (description.includes('calculate') || description.includes('metrics')) {
      selectedTools.push('calculator');
    }
    
    if (description.includes('report') || description.includes('summary')) {
      selectedTools.push('report_generator');
    }
    
    if (description.includes('create') || description.includes('plan')) {
      selectedTools.push('content_creator');
    }
    
    // Always add validator for quality assurance
    selectedTools.push('validator');
    
    return selectedTools.length > 0 ? selectedTools : ['web_search', 'validator'];
  }

  private generateMockResult(task: Task, tools: string[]): any {
    return {
      taskId: task.id,
      summary: `Completed: ${task.description}`,
      toolsUsed: tools,
      data: {
        processingTime: Math.round(Math.random() * 3000) + 1000,
        confidence: Math.round((0.7 + Math.random() * 0.3) * 100),
        sources: Math.floor(Math.random() * 5) + 2
      },
      timestamp: new Date().toISOString()
    };
  }
}

export const toolAgent = new ToolAgent();
