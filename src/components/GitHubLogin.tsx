import React from 'react';
import { GITHUB_CONFIG } from '../config/github';
import '../styles/github.css';

interface GitHubLoginProps {
  onLogin: (token: string) => Promise<void>;
}

export const GitHubLogin: React.FC<GitHubLoginProps> = ({ onLogin }) => {
  const handleLogin = () => {
    const authUrl = `${GITHUB_CONFIG.authUrl}?client_id=${GITHUB_CONFIG.clientId}&redirect_uri=${GITHUB_CONFIG.redirectUri}&scope=${GITHUB_CONFIG.scope}`;
    window.location.href = authUrl;
  };

  return (
    <button onClick={handleLogin} className="github-login-button">
      <span className="github-icon">🐙</span>
      Se connecter avec GitHub
    </button>
  );
}; 