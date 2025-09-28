export const authService = {
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

    // Trigger storage event for header update
    window.dispatchEvent(new Event('storage'));

    return data;
  },

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

    // Trigger storage event for header update
    window.dispatchEvent(new Event('storage'));

    return data;
  },
};