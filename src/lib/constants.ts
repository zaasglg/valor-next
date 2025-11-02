// Countries list for registration
export const COUNTRIES = [
  { value: "Argentina", label: "Argentina" },
  { value: "Bolivia", label: "Bolivia" },
  { value: "Brazil", label: "Brasil" },
  { value: "Chile", label: "Chile" },
  { value: "Colombia", label: "Colombia" },
  { value: "Costa Rica", label: "Costa Rica" },
  { value: "Cuba", label: "Cuba" },
  { value: "Dominican Republic", label: "República Dominicana" },
  { value: "Ecuador", label: "Ecuador" },
  { value: "El Salvador", label: "El Salvador" },
  { value: "Guatemala", label: "Guatemala" },
  { value: "Haiti", label: "Haïti" },
  { value: "Honduras", label: "Honduras" },
  { value: "Mexico", label: "México" },
  { value: "Nicaragua", label: "Nicaragua" },
  { value: "Panama", label: "Panamá" },
  { value: "Paraguay", label: "Paraguay" },
  { value: "Peru", label: "Perú" },
  { value: "Puerto Rico", label: "Puerto Rico" },
  { value: "Uruguay", label: "Uruguay" },
  { value: "Venezuela", label: "Venezuela" }
] as const

// Form validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED_FIELDS: 'Todos los campos son obligatorios',
  LOGIN_ERROR: 'Error al iniciar sesión',
  REGISTER_ERROR: 'Error al registrarse',
  INVALID_EMAIL: 'Email inválido',
  PASSWORD_MIN_LENGTH: 'La contraseña debe tener al menos 6 caracteres'
} as const

// API endpoints
export const API_ENDPOINTS = {
  LOGIN: '/api/login',
  REGISTER: '/api/register',
  REFRESH_TOKEN: '/api/refresh-token',
  LOGOUT: '/api/logout'
} as const