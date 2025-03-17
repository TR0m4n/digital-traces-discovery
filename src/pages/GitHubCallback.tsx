import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { githubService } from '../services/github';

export function GitHubCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const savedState = localStorage.getItem('github_state');

        if (!code || !state || state !== savedState) {
          throw new Error('Paramètres invalides');
        }

        await githubService.handleCallback(code);
        localStorage.removeItem('github_state');
        navigate('/');
      } catch (error) {
        console.error('Erreur lors du callback GitHub:', error);
        navigate('/login?error=github_auth_failed');
      }
    };

    handleCallback();
  }, [navigate, searchParams]);

  return (
    <div className="github-callback">
      <h2>Authentification GitHub en cours...</h2>
      <div className="loading-spinner" />
    </div>
  );
} 