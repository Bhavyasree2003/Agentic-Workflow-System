
export interface Task {
  id: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  priority: number;
  dependencies?: string[];
  result?: any;
  toolsUsed?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkflowState {
  status: 'idle' | 'planning' | 'executing' | 'refining' | 'completed' | 'error';
  currentStep: string | null;
  tasks: Task[];
  results: any[];
  isProcessing: boolean;
  query?: string;
  feedback?: string;
  iterationCount?: number;
}

export interface Agent {
  name: string;
  type: 'planner' | 'tool' | 'reflector';
  status: 'idle' | 'active' | 'waiting';
  currentTask?: string;
}

export interface ToolResult {
  toolName: string;
  input: any;
  output: any;
  success: boolean;
  executionTime: number;
}
