export interface ExecutionRecord {
  id: string;
  timestamp: string;
  input1: string;
  input2: string;
  num1: number;
  num2: number;
  status: 'success' | 'invalid_input' | 'division_by_zero';
  resultText: string;
  quotient?: number;
  remainder?: number;
}

export type ActiveTab = 'simulator' | 'stepper' | 'math' | 'editor' | 'quiz';

export interface CodeStep {
  lineNumber: number;
  code: string;
  description: string;
  variables: Record<string, string | number | boolean | null>;
  highlightCondition?: string;
  outcome?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
