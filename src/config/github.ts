export const GITHUB_CONFIG = {
  clientId: import.meta.env.VITE_GITHUB_CLIENT_ID || '',
  redirectUri: `${window.location.origin}/github-callback`,
  scope: 'repo read:user',
  apiUrl: 'https://api.github.com',
  authUrl: 'https://github.com/login/oauth/authorize',
  tokenUrl: 'https://github.com/login/oauth/access_token'
};

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  name: string;
  email: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  private: boolean;
  html_url: string;
  clone_url: string;
  default_branch: string;
} 