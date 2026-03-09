// ============================================
// Question/Problem Types
// LeetCode problems ki structure
// ============================================

export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type Status = 'Not Started' | 'Attempted' | 'Solved';
export type Language = 'python' | 'javascript' | 'typescript' | 'java' | 'cpp';

export interface QuestionExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface Question {
  id: number;
  title: string;
  slug: string;
  difficulty: Difficulty;
  patternId: string;
  patternName: string;
  tags: string[];
  description: string;
  examples: QuestionExample[];
  constraints: string[];
  hints: string[];
  approach: string;         // High level approach
  timeComplexity: string;
  spaceComplexity: string;
  leetcodeUrl: string;
  leetcodeNumber: number;
  starterCode: Partial<Record<Language, string>>;
  solution?: Partial<Record<Language, string>>;
  isClassic: boolean;       // Must-solve problem?
  frequency: number;        // 1-10, interview mein kitni baar aaya
}

export interface QuestionProgress {
  questionId: number;
  status: Status;
  language: Language;
  code?: string;
  solvedAt?: string;
  timeSpent?: number;    // seconds mein
  attempts: number;
  notes?: string;        // User ke apne notes
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  actualOutput?: string;
  passed?: boolean;
  executionTime?: number;
}