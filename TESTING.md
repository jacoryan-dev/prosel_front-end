# 🧪 Guia de Testes - Prosel

Este documento explica como executar e manter os testes do projeto Prosel.

## 📋 Estrutura de Testes

```
src/
├── **/__tests__/           # Testes unitários e de componente
├── test/
│   ├── setup.ts           # Configuração global dos testes
│   └── mocks/             # Mocks para APIs e serviços
│       ├── handlers.ts    # Handlers do MSW
│       └── server.ts      # Servidor de mock
e2e/                       # Testes end-to-end com Playwright
├── login.spec.ts         # Testes de login E2E
└── auth-flow.spec.ts     # Testes de fluxo de autenticação
```

## 🏃‍♂️ Executando Testes

### Testes Unitários e de Integração

```bash
# Executar todos os testes
npm run test

# Executar em modo watch
npm run test:watch

# Executar apenas uma vez
npm run test:run

# Executar com interface gráfica
npm run test:ui

# Gerar relatório de cobertura
npm run test:coverage
```

### Testes E2E

```bash
# Executar testes E2E
npm run test:e2e

# Executar com interface gráfica
npm run test:e2e:ui

# Executar em navegador específico
npx playwright test --project=chromium
```

## 📊 Cobertura de Testes

O projeto mantém as seguintes metas de cobertura:

- **Statements**: > 90%
- **Branches**: > 85%
- **Functions**: > 90%
- **Lines**: > 90%

### Visualizando Relatório de Cobertura

```bash
npm run test:coverage
# Abrir coverage/index.html no navegador
```

## 🔧 Configuração de Testes

### Vitest (Testes Unitários)

- **Arquivo**: `vitest.config.ts`
- **Setup**: `src/test/setup.ts`
- **Environment**: jsdom
- **Globals**: Habilitados

### Playwright (Testes E2E)

- **Arquivo**: `playwright.config.ts`
- **Browsers**: Chrome, Firefox, Safari, Mobile Chrome
- **Base URL**: http://localhost:5173

## 🎭 Mock Service Worker (MSW)

O MSW é usado para mockar requisições HTTP nos testes:

```typescript
// src/test/mocks/handlers.ts
export const handlers = [
  http.post("*/auth/login/", () => {
    return HttpResponse.json({
      /* mock data */
    });
  }),
];
```

## ✅ Tipos de Testes

### 1. Testes Unitários

Testam funções e hooks isoladamente:

```typescript
// src/utils/__tests__/storage.test.ts
describe("Storage Utility", () => {
  it("should save tokens to localStorage", () => {
    const tokens = { access: "token123" };
    storage.saveTokens(tokens);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "access_token",
      "token123"
    );
  });
});
```

### 2. Testes de Componente

Testam componentes React com renderização:

```typescript
// src/components/__tests__/Login.test.tsx
describe("Login Component", () => {
  it("should render login form", () => {
    render(<Login />);
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });
});
```

### 3. Testes de Integração

Testam interação entre componentes e serviços:

```typescript
// src/auth/__tests__/useAuth.test.tsx
describe("useAuth Hook", () => {
  it("should throw error when used outside provider", () => {
    expect(() => {
      renderHook(() => useAuth());
    }).toThrow("useAuth deve ser usado dentro de <AuthProvider>");
  });
});
```

### 4. Testes E2E

Testam fluxos completos da aplicação:

```typescript
// e2e/login.spec.ts
test("should handle successful login flow", async ({ page }) => {
  await page.goto("/login");
  await page.fill('[name="email"]', "test@example.com");
  await page.fill('[name="password"]', "password123");
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL("/");
});
```

## 🚀 Melhores Práticas

### 1. Nomenclatura

- Arquivos de teste: `*.test.ts` ou `*.spec.ts`
- Describes: Use o nome do componente/função
- Tests: Use frases descritivas com "should"

### 2. Organização

```typescript
describe("ComponentName", () => {
  beforeEach(() => {
    // Setup compartilhado
  });

  describe("when condition X", () => {
    it("should do Y", () => {
      // Teste específico
    });
  });
});
```

### 3. Mocks

```typescript
// Mock completo de módulo
vi.mock("../api/service", () => ({
  apiCall: vi.fn(),
}));

// Mock parcial
vi.mock("../utils", async () => {
  const actual = await vi.importActual("../utils");
  return {
    ...actual,
    specificFunction: vi.fn(),
  };
});
```

### 4. Testing Library

```typescript
// Prefira queries por role/label
screen.getByRole("button", { name: /submit/i });
screen.getByLabelText(/email/i);

// Use waitFor para async
await waitFor(() => {
  expect(screen.getByText("Success")).toBeInTheDocument();
});
```

## 🐛 Debugging

### Testes Unitários

```typescript
// Debug com screen.debug()
render(<Component />);
screen.debug(); // Imprime HTML atual

// Debug queries
screen.logTestingPlaygroundURL(); // Gera URL para playground
```

### Testes E2E

```typescript
// Debug com Playwright
await page.pause(); // Pausa execução para debugging
await page.screenshot({ path: "debug.png" }); // Screenshot
```

## 📈 CI/CD

Os testes são executados automaticamente no GitHub Actions:

- **Unit Tests**: Em Node.js 18.x e 20.x
- **E2E Tests**: Em múltiplos navegadores
- **Coverage**: Enviado para Codecov
- **Lighthouse**: Auditoria de performance

## 🎯 Coverage Targets

| Categoria  | Meta | Atual |
| ---------- | ---- | ----- |
| Statements | 90%  | -     |
| Branches   | 85%  | -     |
| Functions  | 90%  | -     |
| Lines      | 90%  | -     |

## 📚 Recursos Úteis

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Playwright Documentation](https://playwright.dev/)
- [MSW Documentation](https://mswjs.io/)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)

---

Para dúvidas ou contribuições nos testes, consulte a [documentação principal](./README.md) ou abra uma issue.
