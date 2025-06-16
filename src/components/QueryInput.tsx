
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Send, Sparkles } from 'lucide-react';

interface QueryInputProps {
  onSubmit: (query: string) => void;
}

export const QueryInput: React.FC<QueryInputProps> = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      onSubmit(query.trim());
    } finally {
      setIsSubmitting(false);
    }
  };

  const exampleQueries = [
    "Research the latest developments in quantum computing and create a summary report",
    "Plan a marketing campaign for a new AI-powered productivity app",
    "Analyze customer feedback data and provide actionable insights"
  ];

  return (
    <Card className="p-6 glass-morphism card-3d">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="query" className="block text-sm font-medium text-purple-200 mb-2">
            Enter your complex query or task
          </label>
          <Textarea
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe what you'd like the AI agents to accomplish..."
            className="min-h-[100px] bg-white/5 border-purple-300/30 text-white placeholder-purple-300/50 focus:border-purple-400 backdrop-blur-sm"
            disabled={isSubmitting}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-purple-300">
            {query.length}/500 characters
          </div>
          <Button
            type="submit"
            disabled={!query.trim() || isSubmitting}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {isSubmitting ? (
              <>
                <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Start Workflow
              </>
            )}
          </Button>
        </div>
      </form>

      <div className="mt-6">
        <p className="text-sm text-purple-300 mb-3">Example queries:</p>
        <div className="grid gap-2">
          {exampleQueries.map((example, index) => (
            <button
              key={index}
              onClick={() => setQuery(example)}
              className="text-left text-sm text-purple-200 hover:text-white bg-white/5 hover:bg-white/10 p-3 rounded-lg transition-all duration-200 border border-purple-300/20 hover:border-purple-300/40 transform hover:scale-[1.02] hover:shadow-md"
              disabled={isSubmitting}
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
};
