
import React from 'react';
import { Card } from '@/components/ui/card';
import { WorkflowState } from '../types/workflow';
import { FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface ResultsDisplayProps {
  workflowState: WorkflowState;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  workflowState
}) => {
  if (workflowState.status !== 'completed' || workflowState.results.length === 0) {
    return null;
  }

  return (
    <Card className="p-6 glass-morphism card-3d">
      <div className="flex items-center mb-4">
        <FileText className="h-6 w-6 text-green-400 mr-2" />
        <h2 className="text-xl font-semibold text-white">Summary Report</h2>
      </div>
      
      <div className="space-y-4">
        {workflowState.results.map((result, index) => (
          <div key={index} className="bg-white/10 rounded-lg p-4 border border-purple-300/20">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-medium text-white">{result.summary}</h3>
              <div className="flex items-center text-green-400">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span className="text-xs">Completed</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
              <div className="text-center">
                <p className="text-xs text-purple-300">Processing Time</p>
                <p className="text-sm font-semibold text-white">{result.data.processingTime}ms</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-purple-300">Confidence</p>
                <p className="text-sm font-semibold text-white">{result.data.confidence}%</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-purple-300">Sources</p>
                <p className="text-sm font-semibold text-white">{result.data.sources}</p>
              </div>
            </div>
            
            {result.toolsUsed && result.toolsUsed.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-purple-300 mb-1">Tools Used:</p>
                <div className="flex flex-wrap gap-1">
                  {result.toolsUsed.map((tool: string, toolIndex: number) => (
                    <span
                      key={toolIndex}
                      className="px-2 py-1 bg-purple-600/30 text-purple-200 text-xs rounded-md"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-3 text-xs text-purple-400">
              Completed at: {new Date(result.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
        
        <div className="bg-green-600/20 border border-green-400/30 rounded-lg p-4 mt-4">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
            <h4 className="font-semibold text-green-300">Workflow Completed Successfully</h4>
          </div>
          <p className="text-green-200 text-sm mt-1">
            All tasks have been executed and the summary report has been generated.
          </p>
        </div>
      </div>
    </Card>
  );
};
