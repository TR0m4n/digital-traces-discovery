export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const MAX_FILES = 10;
export const API_TIMEOUT = 30000; // 30 seconds
export const ALLOWED_MIME_TYPES = [
  'text/plain',
  'text/csv',
  'text/log',
  'application/json',
  'application/xml'
];

export interface FileAnalysis {
  filename: string;
  line_count: number;
  word_count: number;
  char_count: number;
  empty_lines: number;
  avg_line_length: number;
}

export interface AnalysisSummary {
  total_lines: number;
  total_words: number;
  total_chars: number;
  total_empty_lines: number;
  avg_line_length: number;
}

export interface AnalysisResult {
  files: FileAnalysis[];
  summary: AnalysisSummary;
} 