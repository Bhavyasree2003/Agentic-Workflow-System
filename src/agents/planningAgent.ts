
import { Task } from '../types/workflow';

class PlanningAgent {
  async splitQuery(query: string): Promise<Task[]> {
    // Simulate AI planning process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('PlanAgent: Analyzing query and creating task breakdown');
    
    // Simple query analysis and task generation
    const keywords = query.toLowerCase().split(' ');
    const tasks: Task[] = [];
    
    let taskId = 1;
    
    // Research-related tasks
    if (keywords.some(word => ['research', 'analyze', 'study', 'investigate'].includes(word))) {
      tasks.push({
        id: `task-${taskId++}`,
        description: 'Conduct preliminary research on the topic',
        status: 'pending',
        priority: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      tasks.push({
        id: `task-${taskId++}`,
        description: 'Gather and validate information from multiple sources',
        status: 'pending',
        priority: 2,
        dependencies: [`task-${taskId - 2}`],
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    
    // Analysis-related tasks
    if (keywords.some(word => ['analyze', 'summary', 'report', 'insights'].includes(word))) {
      tasks.push({
        id: `task-${taskId++}`,
        description: 'Analyze collected data and identify patterns',
        status: 'pending',
        priority: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      tasks.push({
        id: `task-${taskId++}`,
        description: 'Generate summary report with key findings',
        status: 'pending',
        priority: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    
    // Planning-related tasks
    if (keywords.some(word => ['plan', 'strategy', 'campaign', 'roadmap'].includes(word))) {
      tasks.push({
        id: `task-${taskId++}`,
        description: 'Define objectives and success metrics',
        status: 'pending',
        priority: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      tasks.push({
        id: `task-${taskId++}`,
        description: 'Create detailed action plan with timelines',
        status: 'pending',
        priority: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    
    // Default fallback tasks if no specific keywords found
    if (tasks.length === 0) {
      tasks.push(
        {
          id: `task-${taskId++}`,
          description: 'Break down the main query into smaller components',
          status: 'pending',
          priority: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: `task-${taskId++}`,
          description: 'Process each component systematically',
          status: 'pending',
          priority: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: `task-${taskId++}`,
          description: 'Synthesize results into comprehensive output',
          status: 'pending',
          priority: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      );
    }
    
    console.log(`PlanAgent: Generated ${tasks.length} tasks`);
    return tasks;
  }
}

export const planningAgent = new PlanningAgent();
