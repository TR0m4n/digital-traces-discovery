import React from 'react';
import { AnalysisResult } from '../config/constants';
import '../styles/analysis.css';

interface AnalysisResultsProps {
  results: AnalysisResult;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ results }) => {
  return (
    <div className="analysis-results">
      <h2>Résultats de l'analyse</h2>
      
      <div className="summary-section">
        <h3>Résumé global</h3>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="label">Total des lignes</span>
            <span className="value">{results.summary.total_lines}</span>
          </div>
          <div className="summary-item">
            <span className="label">Total des mots</span>
            <span className="value">{results.summary.total_words}</span>
          </div>
          <div className="summary-item">
            <span className="label">Total des caractères</span>
            <span className="value">{results.summary.total_chars}</span>
          </div>
          <div className="summary-item">
            <span className="label">Lignes vides</span>
            <span className="value">{results.summary.total_empty_lines}</span>
          </div>
          <div className="summary-item">
            <span className="label">Longueur moyenne des lignes</span>
            <span className="value">{results.summary.avg_line_length.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="files-section">
        <h3>Détails par fichier</h3>
        <div className="files-grid">
          {results.files.map((file, index) => (
            <div key={index} className="file-card">
              <h4>{file.filename}</h4>
              <div className="file-stats">
                <div className="stat-item">
                  <span className="label">Lignes</span>
                  <span className="value">{file.line_count}</span>
                </div>
                <div className="stat-item">
                  <span className="label">Mots</span>
                  <span className="value">{file.word_count}</span>
                </div>
                <div className="stat-item">
                  <span className="label">Caractères</span>
                  <span className="value">{file.char_count}</span>
                </div>
                <div className="stat-item">
                  <span className="label">Lignes vides</span>
                  <span className="value">{file.empty_lines}</span>
                </div>
                <div className="stat-item">
                  <span className="label">Longueur moyenne</span>
                  <span className="value">{file.avg_line_length.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 