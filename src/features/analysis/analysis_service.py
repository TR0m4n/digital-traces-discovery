from typing import Dict, Any, List
from .analysis import Analysis, AnalysisError

class AnalysisService:
    @classmethod
    def get_analysis_metadata(cls, analysis_id: str) -> Dict[str, Any]:
        """Récupère les métadonnées d'une analyse."""
        return Analysis._get_analysis_metadata(analysis_id)

    @classmethod
    def get_file_metadata(cls, file_id: str) -> Dict[str, Any]:
        """Récupère les métadonnées d'un fichier."""
        return Analysis._get_file_metadata(file_id)

    @classmethod
    def get_analysis_files(cls, analysis_id: str) -> List[Dict[str, Any]]:
        """Récupère la liste des fichiers d'une analyse."""
        return Analysis._get_analysis_files(analysis_id)

    @staticmethod
    def analyze_files(files: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Analyse une liste de fichiers et retourne les résultats."""
        try:
            return Analysis.analyze_files(files)
        except AnalysisError as e:
            # Log l'erreur et la propage
            raise
        except Exception as e:
            # Log l'erreur inattendue et la propage
            raise AnalysisError(f"Erreur inattendue: {str(e)}") 