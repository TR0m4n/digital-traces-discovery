import React, { useCallback } from 'react';
import { MAX_FILE_SIZE, MAX_FILES } from '../config/constants';
import { ALLOWED_MIME_TYPES } from '../config/mime';
import '../styles/file-upload.css';

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  isAnalyzing: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFilesSelected, isAnalyzing }) => {
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    // Vérification du nombre de fichiers
    if (files.length > MAX_FILES) {
      alert(`Vous ne pouvez pas sélectionner plus de ${MAX_FILES} fichiers à la fois.`);
      return;
    }

    // Vérification de la taille et du type de chaque fichier
    const validFiles = files.filter(file => {
      if (file.size > MAX_FILE_SIZE) {
        alert(`Le fichier ${file.name} dépasse la taille maximale autorisée de ${MAX_FILE_SIZE / (1024 * 1024)}MB.`);
        return false;
      }
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        alert(`Le type de fichier ${file.name} n'est pas supporté.`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  }, [onFilesSelected]);

  return (
    <div className="file-upload">
      <div className="upload-area">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          disabled={isAnalyzing}
          accept={ALLOWED_MIME_TYPES.join(',')}
          className="file-input"
          id="file-input"
        />
        <label htmlFor="file-input" className="upload-label">
          <div className="upload-content">
            <span className="upload-icon">📁</span>
            <span className="upload-text">
              {isAnalyzing ? 'Analyse en cours...' : 'Sélectionnez vos fichiers'}
            </span>
            <span className="upload-hint">
              Types acceptés : txt, csv, log, json, xml
              <br />
              Taille maximale : {MAX_FILE_SIZE / (1024 * 1024)}MB
            </span>
          </div>
        </label>
      </div>
    </div>
  );
}; 