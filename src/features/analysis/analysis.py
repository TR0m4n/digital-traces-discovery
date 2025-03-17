from typing import Dict, Any, List
import logging
import re
from pathlib import Path

logger = logging.getLogger(__name__)

# Constantes
MAX_CONTENT_SIZE = 10 * 1024 * 1024  # 10MB
ALLOWED_EXTENSIONS = {'.txt', '.log', '.csv', '.json', '.xml'}
MAX_LINE_LENGTH = 10000

class AnalysisError(Exception):
    """Exception personnalisée pour les erreurs d'analyse."""
    pass

class Analysis:
    @staticmethod
    def validate_file(file_info: Dict[str, Any]) -> None:
        """Valide un fichier avant l'analyse."""
        try:
            # Vérification du nom de fichier
            filename = file_info.get('name', '')
            if not filename:
                raise AnalysisError("Le nom du fichier est requis")
            
            # Vérification de l'extension
            extension = Path(filename).suffix.lower()
            if extension not in ALLOWED_EXTENSIONS:
                raise AnalysisError(f"Extension non supportée: {extension}")
            
            # Vérification de la taille
            content = file_info.get('content', '')
            if len(content) > MAX_CONTENT_SIZE:
                raise AnalysisError(f"Le fichier est trop volumineux (max {MAX_CONTENT_SIZE / 1024 / 1024}MB)")
            
            # Vérification du contenu
            if not isinstance(content, str):
                raise AnalysisError("Le contenu doit être une chaîne de caractères")
            
            # Vérification des lignes trop longues
            for i, line in enumerate(content.split('\n'), 1):
                if len(line) > MAX_LINE_LENGTH:
                    raise AnalysisError(f"Ligne {i} trop longue (max {MAX_LINE_LENGTH} caractères)")
                
        except Exception as e:
            logger.error(f"Erreur de validation du fichier {file_info.get('name', 'unknown')}: {str(e)}")
            raise AnalysisError(f"Erreur de validation: {str(e)}")

    @staticmethod
    def analyze_file(file_info: Dict[str, Any]) -> Dict[str, Any]:
        """Analyse le contenu d'un fichier et retourne les résultats."""
        try:
            # Validation du fichier
            Analysis.validate_file(file_info)
            
            # Gestion de l'encodage
            content = file_info['content'].encode('utf-8', errors='ignore').decode('utf-8')
            
            # Analyse du contenu
            lines = content.split('\n')
            word_count = sum(len(line.split()) for line in lines)
            char_count = sum(len(line) for line in lines)
            empty_lines = sum(1 for line in lines if not line.strip())
            
            # Calcul des statistiques
            stats = {
                'line_count': len(lines),
                'word_count': word_count,
                'char_count': char_count,
                'empty_lines': empty_lines,
                'avg_line_length': char_count / len(lines) if lines else 0
            }
            
            # Ajout des métadonnées
            stats['filename'] = file_info['name']
            stats['extension'] = Path(file_info['name']).suffix.lower()
            
            return stats
            
        except Exception as e:
            logger.error(f"Erreur lors de l'analyse du fichier {file_info.get('name', 'unknown')}: {str(e)}")
            raise AnalysisError(f"Erreur d'analyse: {str(e)}")

    @staticmethod
    def analyze_files(files: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Analyse une liste de fichiers et retourne les résultats agrégés."""
        try:
            if not files:
                raise AnalysisError("Aucun fichier à analyser")
            
            # Analyse de chaque fichier
            results = []
            for file in files:
                try:
                    file_result = Analysis.analyze_file(file)
                    results.append(file_result)
                except AnalysisError as e:
                    logger.warning(f"Fichier ignoré: {str(e)}")
                    continue
            
            if not results:
                raise AnalysisError("Aucun fichier valide à analyser")
            
            # Calcul des statistiques globales
            total_lines = sum(r['line_count'] for r in results)
            total_words = sum(r['word_count'] for r in results)
            total_chars = sum(r['char_count'] for r in results)
            
            return {
                'files': results,
                'summary': {
                    'total_files': len(results),
                    'total_lines': total_lines,
                    'total_words': total_words,
                    'total_chars': total_chars,
                    'avg_lines_per_file': total_lines / len(results)
                }
            }
            
        except Exception as e:
            logger.error(f"Erreur lors de l'analyse des fichiers: {str(e)}")
            raise AnalysisError(f"Erreur d'analyse globale: {str(e)}") 