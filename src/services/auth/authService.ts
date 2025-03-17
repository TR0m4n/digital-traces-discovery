import { Octokit } from '@octokit/rest';

interface AuthResponse {
  success: boolean;
  user?: any;
  error?: string;
}

class AuthService {
  private octokit: Octokit | null = null;

  // Authentification GitHub
  async loginWithGitHub(code: string): Promise<AuthResponse> {
    try {
      // Note: Vous devrez remplacer ces valeurs par vos propres identifiants GitHub OAuth
      const clientId = process.env.GITHUB_CLIENT_ID;
      const clientSecret = process.env.GITHUB_CLIENT_SECRET;

      const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
        }),
      });

      const data = await response.json();
      
      if (data.access_token) {
        this.octokit = new Octokit({
          auth: data.access_token,
        });

        const userResponse = await this.octokit.users.getAuthenticated();
        return {
          success: true,
          user: userResponse.data,
        };
      }

      return {
        success: false,
        error: 'Failed to get access token',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  // Authentification SwitchEdu ID
  async loginWithSwitchEdu(username: string, password: string): Promise<AuthResponse> {
    try {
      // Note: Remplacer l'URL par l'endpoint réel de SwitchEdu
      const response = await fetch('https://api.switchedu.ch/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          user: data.user,
        };
      }

      return {
        success: false,
        error: data.message || 'Authentication failed',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  // Déconnexion
  async logout(): Promise<void> {
    this.octokit = null;
    // Ajoutez ici la logique de déconnexion pour SwitchEdu si nécessaire
  }
}

export const authService = new AuthService(); 