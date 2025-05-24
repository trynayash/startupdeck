
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

interface IdeaAnalyzerFormProps {
  onSubmit: (idea: string) => void;
  isAnalyzing?: boolean;
}

const IdeaAnalyzerForm: React.FC<IdeaAnalyzerFormProps> = ({ 
  onSubmit,
  isAnalyzing = false
}) => {
  const [ideaText, setIdeaText] = useState('');
  const maxLength = 200;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (ideaText.trim().length < 10) {
      return;
    }
    
    onSubmit(ideaText.trim());
  };
  
  const charsRemaining = maxLength - ideaText.length;
  const isValid = ideaText.trim().length >= 10;
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label 
          htmlFor="idea" 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Describe your business idea in a single sentence
        </label>
        <Textarea
          id="idea"
          placeholder="A mobile app that helps remote teams build stronger connections through daily micro-interactions"
          value={ideaText}
          onChange={(e) => setIdeaText(e.target.value.slice(0, maxLength))}
          rows={4}
          className="w-full resize-none"
          maxLength={maxLength}
          disabled={isAnalyzing}
        />
        <div className="flex justify-between items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
          <span>Be concise but descriptive</span>
          <span className={charsRemaining < 30 ? "text-amber-600 dark:text-amber-400" : ""}>
            {charsRemaining} characters remaining
          </span>
        </div>
      </div>
      
      <div className="pt-4">
        <Button 
          type="submit" 
          className="w-full" 
          disabled={!isValid || isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing your idea...
            </>
          ) : (
            'Analyze My Idea'
          )}
        </Button>
        
        <div className="text-center mt-4 text-xs text-gray-500 dark:text-gray-400">
          {isAnalyzing ? (
            <div className="space-y-2">
              <p>Our AI is carefully examining your idea. This may take a minute...</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-4 overflow-hidden">
                <div className="bg-primary h-1.5 rounded-full animate-pulse" style={{ width: '100%' }}></div>
              </div>
            </div>
          ) : (
            <p>Free tier users get 1 analysis per month. <a href="#" className="text-primary hover:underline">Upgrade</a> for unlimited analyses.</p>
          )}
        </div>
      </div>
    </form>
  );
};

export default IdeaAnalyzerForm;
