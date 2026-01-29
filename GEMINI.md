# GEMINI Agent Rules

This file defines the global rules and behaviors for the GIIP Agent system. All agents (sub-sessions) must adhere to these guidelines.

## 📜 Core Principles
1.  **Strict Rule #1**: No raw SQL (`Invoke-Sqlcmd`). Use `mgmt/execSQLFile.ps1`.
2.  **Evidence First**: Always link technical evidence as markdown files.
3.  **Script Reuse**: Check `.agent/scripts/` and `giipdb/mgmt/scriptlist.md` before writing new scripts.

## 🏗️ React & Next.js Best Practices
Agents working on frontend code must follow the Vercel Engineering Best Practices defined in `.agent/rules/`.

- **Waterfalls**: Eliminate sequential awaits. Use `Promise.all` or `better-all`.
- **Bundle Size**: Avoid barrel file imports. Use dynamic imports for heavy components.
- **Server Actions**: Minimize serialization at RSC boundaries.
- **Data Fetching**: Use SWR for client-side caching and deduplication.
- **Rendering**: Optimize re-renders with proper composition and state management.

## 🚀 Core Development Rules
All agents must follow the defined development cycle and TDD methodology:
- **Development Cycle**: Follow the [Development Cycle](.agent/rules/development_cycle.md) (PRD -> Decomposition -> Demo -> Integration).
- **TDD & Tidy First**: Adhere to the [TDD Rules](.agent/rules/tdd.md) (Red-Green-Refactor and Tidy First).

See [.agent/rules/](.agent/rules/) for detailed guidelines.
