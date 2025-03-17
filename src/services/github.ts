import { GITHUB_CONFIG, GitHubUser, GitHubRepository } from '../config/github';

class GitHubService {
  private static instance: GitHubService;
  private accessToken: string | null = null;

  private constructor() {
    this.accessToken = localStorage.getItem('github_token');
  }

  public static getInstance(): GitHubService {
    if (!GitHubService.instance) {
      GitHubService.instance = new GitHubService();
    }
    return GitHubService.instance;
  }

  public getAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: GITHUB_CONFIG.clientId,
      redirect_uri: GITHUB_CONFIG.redirectUri,
      scope: GITHUB_CONFIG.scope,
      state: this.generateState()
    });
    return `${GITHUB_CONFIG.authUrl}?${params.toString()}`;
  }

  public async handleCallback(code: string): Promise<void> {
    try {
      const response = await fetch('/api/github/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'authentification');
      }

      const { access_token } = await response.json();
      this.accessToken = access_token;
      localStorage.setItem('github_token', access_token);
    } catch (error) {
      console.error('Erreur lors de l\'authentification GitHub:', error);
      throw error;
    }
  }

  public async getUser(): Promise<GitHubUser> {
    if (!this.accessToken) {
      throw new Error('Non authentifié');
    }

    const response = await fetch(`${GITHUB_CONFIG.apiUrl}/user`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des informations utilisateur');
    }

    return response.json();
  }

  public async getRepositories(): Promise<GitHubRepository[]> {
    if (!this.accessToken) {
      throw new Error('Non authentifié');
    }

    const response = await fetch(`${GITHUB_CONFIG.apiUrl}/user/repos`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des repositories');
    }

    return response.json();
  }

  public async getRepositoryContent(repo: string, path: string): Promise<string> {
    if (!this.accessToken) {
      throw new Error('Non authentifié');
    }

    const response = await fetch(
      `${GITHUB_CONFIG.apiUrl}/repos/${repo}/contents/${path}`,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du contenu');
    }

    const data = await response.json();
    return atob(data.content);
  }

  public isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  public logout(): void {
    this.accessToken = null;
    localStorage.removeItem('github_token');
  }

  private generateState(): string {
    const state = Math.random().toString(36).substring(7);
    localStorage.setItem('github_state', state);
    return state;
  }
}

export const githubService = GitHubService.getInstance(); 