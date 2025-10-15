export interface AuthState {
  user: null | { user_id: string; email: string };
  isAuthenticated: boolean;
}

class AuthService {
  private state: AuthState = {
    user: null,
    isAuthenticated: false
  };
  private listeners: ((state: AuthState) => void)[] = [];

  getState(): AuthState {
    return this.state;
  }

  subscribe(listener: (state: AuthState) => void) {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_id');
    this.state = { user: null, isAuthenticated: false };
    this.notify();
    window.dispatchEvent(new Event('storage'));
  }

  async register(email: string, password: string, country: string) {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        country,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error en el registro');
    }

    const data = await response.json();

    // Сохраняем токены
    if (data.access) {
      localStorage.setItem('access_token', data.access);
    }
    if (data.refresh) {
      localStorage.setItem('refresh_token', data.refresh);
    }
    if (data.user_id) {
      localStorage.setItem('user_id', data.user_id);
    }

    this.state = { user: data, isAuthenticated: true };
    this.notify();
    window.dispatchEvent(new Event('storage'));

    return data;
  }

  async login(email: string, password: string) {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al iniciar sesión');
    }

    const data = await response.json();

    // Сохраняем токены
    if (data.access) {
      localStorage.setItem('access_token', data.access);
    }
    if (data.refresh) {
      localStorage.setItem('refresh_token', data.refresh);
    }
    if (data.user_id) {
      localStorage.setItem('user_id', data.user_id);
    }

    this.state = { user: data, isAuthenticated: true };
    this.notify();
    window.dispatchEvent(new Event('storage'));

    return data;
  }

  async refreshToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch('/api/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error refreshing token');
    }

    const data = await response.json();

    // Обновляем токены
    if (data.access) {
      localStorage.setItem('access_token', data.access);
    }
    if (data.refresh) {
      localStorage.setItem('refresh_token', data.refresh);
    }

    window.dispatchEvent(new Event('storage'));
    return data;
  }
}

export const authService = new AuthService();