import React, { useState } from 'react'
import { FileUpload } from './components/FileUpload'
import { AnalysisResults } from './components/AnalysisResults'
import { apiService } from './services/api'
import { AnalysisResult } from './config/constants'
import './App.css'

const App: React.FC = () => {
  const [files, setFiles] = useState<File[]>([])
  const [results, setResults] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles)
    setError(null)
  }

  const handleAnalyze = async () => {
    if (files.length === 0) {
      setError('Veuillez sélectionner au moins un fichier à analyser.')
      return
    }

    setIsAnalyzing(true)
    setError(null)

    try {
      const analysisResults = await apiService.analyzeFiles(files)
      setResults(analysisResults)
    } catch (err) {
      setError('Une erreur est survenue lors de l\'analyse des fichiers.')
      console.error('Erreur d\'analyse:', err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Analyseur de Traces Numériques</h1>
      </header>

      <main className="app-main">
        <FileUpload
          onFilesSelected={handleFilesSelected}
          isAnalyzing={isAnalyzing}
        />

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {files.length > 0 && !isAnalyzing && (
          <button
            onClick={handleAnalyze}
            className="analyze-button"
            disabled={isAnalyzing}
          >
            Analyser les fichiers
          </button>
        )}

        {results && (
          <AnalysisResults results={results} />
        )}
      </main>
    </div>
  )
}

export default App
