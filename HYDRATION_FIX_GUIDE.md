# 🔧 Руководство по исправлению ошибок гидратации

## ✅ Исправленные проблемы

### 1. **localStorage в SSR**
- Добавлены проверки `typeof window !== 'undefined'` во всех местах использования localStorage
- Исправлены файлы:
  - `src/lib/auth.ts`
  - `src/hooks/useBalance.ts`
  - `src/contexts/LanguageContext.tsx`

### 2. **Браузерные расширения**
- Добавлен `suppressHydrationWarning={true}` к body элементу
- Это предотвращает ошибки от расширений, которые модифицируют HTML

### 3. **Компонент ClientOnly**
- Создан универсальный компонент для предотвращения SSR проблем
- Можно использовать для обертывания проблемных компонентов

## 🛠️ Примененные исправления

### authService (src/lib/auth.ts)
```typescript
// Было
localStorage.setItem('access_token', data.access);

// Стало
if (typeof window !== 'undefined') {
  localStorage.setItem('access_token', data.access);
}
```

### useBalance (src/hooks/useBalance.ts)
```typescript
// Было
useEffect(() => {
  const cachedBalance = localStorage.getItem('cached_balance');
  // ...
}, []);

// Стало
useEffect(() => {
  if (typeof window === 'undefined') return;
  const cachedBalance = localStorage.getItem('cached_balance');
  // ...
}, []);
```

### LanguageProvider (src/contexts/LanguageContext.tsx)
```typescript
// Было
useEffect(() => {
  const savedLanguage = localStorage.getItem('language');
  // ...
}, []);

// Стало
useEffect(() => {
  if (typeof window !== 'undefined') {
    const savedLanguage = localStorage.getItem('language');
    // ...
  }
}, []);
```

### Layout (src/app/layout.tsx)
```tsx
// Добавлено suppressHydrationWarning
<body
  className="..."
  suppressHydrationWarning={true}
>
```

## 🚀 Дополнительные рекомендации

### 1. **Использование ClientOnly компонента**
```tsx
import { ClientOnly } from '@/components/ClientOnly'

function MyComponent() {
  return (
    <ClientOnly fallback={<div>Loading...</div>}>
      <ComponentThatUsesLocalStorage />
    </ClientOnly>
  )
}
```

### 2. **Проверка window объекта**
```typescript
// Всегда проверяйте перед использованием browser APIs
if (typeof window !== 'undefined') {
  // Безопасно использовать localStorage, sessionStorage, window.location и т.д.
  localStorage.setItem('key', 'value');
}
```

### 3. **Использование useEffect для клиентского кода**
```typescript
useEffect(() => {
  // Код здесь выполняется только на клиенте
  const data = localStorage.getItem('key');
  // ...
}, []);
```

### 4. **Динамические импорты для проблемных компонентов**
```typescript
import dynamic from 'next/dynamic'

const ProblematicComponent = dynamic(
  () => import('./ProblematicComponent'),
  { ssr: false }
)
```

## 🔍 Как диагностировать проблемы гидратации

### 1. **Включить подробные ошибки**
```typescript
// next.config.ts
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    logging: {
      level: 'verbose'
    }
  }
}
```

### 2. **Использовать React DevTools**
- Включить "Highlight updates when components render"
- Проверить компоненты, которые ререндерятся без причины

### 3. **Проверить консоль браузера**
- Ошибки гидратации всегда показываются в консоли
- Ищите "Text content does not match" или "Prop mismatch"

## ⚠️ Частые причины ошибок гидратации

### 1. **localStorage/sessionStorage**
```typescript
// ❌ Неправильно
const [user, setUser] = useState(localStorage.getItem('user'));

// ✅ Правильно
const [user, setUser] = useState(null);
useEffect(() => {
  if (typeof window !== 'undefined') {
    setUser(localStorage.getItem('user'));
  }
}, []);
```

### 2. **Date.now() или Math.random()**
```typescript
// ❌ Неправильно
const [id] = useState(Math.random());

// ✅ Правильно
const [id, setId] = useState(null);
useEffect(() => {
  setId(Math.random());
}, []);
```

### 3. **Условный рендеринг на основе window**
```typescript
// ❌ Неправильно
return (
  <div>
    {typeof window !== 'undefined' && <ClientComponent />}
  </div>
);

// ✅ Правильно
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);

return (
  <div>
    {mounted && <ClientComponent />}
  </div>
);
```

## 🎯 Проверочный список

- [ ] Все использования localStorage обернуты в проверку `typeof window !== 'undefined'`
- [ ] Все использования sessionStorage обернуты в проверку
- [ ] Нет прямого использования `window` объекта в рендере
- [ ] Нет `Date.now()` или `Math.random()` в начальном состоянии
- [ ] Добавлен `suppressHydrationWarning` где необходимо
- [ ] Проблемные компоненты обернуты в `ClientOnly` или используют `dynamic` импорт

## 🔧 Команды для тестирования

```bash
# Сборка и проверка на ошибки гидратации
npm run build
npm run start

# Разработка с подробным логированием
npm run dev
```

Следуя этому руководству, вы сможете избежать большинства проблем с гидратацией в Next.js приложениях.