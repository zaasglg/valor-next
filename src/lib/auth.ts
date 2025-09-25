interface User {
  id: string;
  email: string;
  country: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

class AuthService {
  private state: AuthState = {
    user: null,
    isAuthenticated: false
  };

  private listeners: ((state: AuthState) => void)[] = [];

  register(email: string, password: string, country: string): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.getUserByEmail(email)) {
          reject(new Error('El usuario ya existe'));
          return;
        }

        const user: User = {
          id: Date.now().toString(),
          email,
          country
        };

        this.saveUser(user, password);
        this.state = { user, isAuthenticated: true };
        this.notifyListeners();
        resolve(user);
      }, 1000);
    });
  }

  login(email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.getUserByEmail(email);
        const savedPassword = localStorage.getItem(`password_${email}`);
        
        if (!user || savedPassword !== password) {
          reject(new Error('Credenciales inválidas'));
          return;
        }

        this.state = { user, isAuthenticated: true };
        this.notifyListeners();
        resolve(user);
      }, 1000);
    });
  }

  logout() {
    this.state = { user: null, isAuthenticated: false };
    this.notifyListeners();
  }

  getState(): AuthState {
    return this.state;
  }

  subscribe(listener: (state: AuthState) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private saveUser(user: User, password: string) {
    localStorage.setItem(`user_${user.email}`, JSON.stringify(user));
    localStorage.setItem(`password_${user.email}`, password);
  }

  private getUserByEmail(email: string): User | null {
    const userData = localStorage.getItem(`user_${email}`);
    return userData ? JSON.parse(userData) : null;
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }
}

export const authService = new AuthService();
export type { User, AuthState };