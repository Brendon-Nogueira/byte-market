# ByteMarket - E-commerce de Tecnologia

Este é um projeto desenvolvido com foco em estudos, para entender e aplicar conceitos de **Arquitetura Limpa (Clean Architecture)**. Utilizando **Next.js 15 (App Router)** e **React 19**, simulamos o backend inicialmente com um arquivo JSON para agilizar o desenvolvimento do front-end.

## 1. Arquitetura e Padrões de Projeto

### Repository Pattern
É uma camada que isola a forma como os dados são armazenados de como eles são usados pela aplicação.
*   Criamos uma interface `ProductRepository` (o contrato) e uma implementação `JsonProductRepository`.
*   **Vantagem:** Hoje usamos um arquivo JSON. Se amanhã quisermos trocar por um banco de dados SQL ou uma API externa, mudamos apenas a implementação do repositório, e o restante do site nem perceberá a mudança.

### DIP (Princípio de Inversão de Dependência)
A `page.tsx` não depende de um arquivo JSON diretamente; ela depende da interface do repositório. Isso mantém o código desacoplado e fácil de testar.

## 2. Estrutura de Pastas

*   `src/models/`: Contém as "entidades" (nossas interfaces TypeScript). Até o momento, temos o `ProductModel`.
*   `src/repositories/`: Onde fica a lógica de acesso a dados (Leitura/Escrita do JSON).
*   `src/providers/`: Componentes que fornecem "contexto" ou funcionalidades globais (como o sistema de temas).
*   `src/components/`: Componentes visuais reutilizáveis e desacoplados.
*   `src/app/`: Onde ficam as rotas, páginas e o layout global (App Router).
*   `src/db/seed/`: Nossa "base de dados" temporária em formato JSON.

## 3. Design System com Tailwind CSS 4

*   **Variáveis CSS Dinâmicas:** No `globals.css`, definimos que `--background` e `--foreground` mudam de valor dependendo da presença da classe `.dark`.
*   **Mapeamento no @theme:** Avisamos ao Tailwind que o `bg-background` deve usar a variável CSS `--background`.
*   **Estilo Glassmorphism:** Uso de desfoque de fundo (`backdrop-blur`) para um visual moderno e premium.
*   **Micro-animações:** Transições suaves no hover dos cards (`hover-scale`).

## 4. Conceitos Aplicados (React e Next.js)

*   **Server vs Client Components:**
    *   **Server Components (Padrão):** Como `layout.tsx` e `page.tsx`. Eles rodam no servidor, são rápidos, ótimos para SEO e buscam dados diretamente do repositório.
    *   **Client Components:** Como `ThemeToggle` e `ProductCard`. Usamos `"use client"` quando precisamos de interatividade (botões, estados e hooks como `useState` e `useEffect`).
*   **Hydration:** Utilizamos o `suppressHydrationWarning` no `layout.tsx` para evitar conflitos visuais entre o servidor e o cliente ao injetar o tema, garantindo que ambos utilizem a mesma classe e estilo.
*   **Composição de Componentes:** O uso do `children` no `Container` e no `layout.tsx` permite criar "molduras" (layouts) que aceitam qualquer conteúdo, mantendo a consistência visual em todo o projeto.
