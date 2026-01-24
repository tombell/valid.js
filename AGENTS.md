# AGENTS.md

This file contains guidelines for agentic coding agents working in this TypeScript validation library repository.

## Development Commands

### Package Management

- Use `bun` as the primary package manager
- Use `bunx` for running CLI tools (ESLint, Prettier, etc.)
- Dependencies managed via `package.json` with `bun.lock` lock file

### Testing

```bash
# Run all tests
bun test

# Run single test file
bun test src/filename.test.ts

# Run tests with coverage
bun test --coverage
```

### Code Quality

```bash
# Lint code
bun lint

# Auto-fix linting issues
bun lint:fix

# Check formatting only
bun check

# Format code
bun format
```

### Building

```bash
# Build both ESM and CommonJS outputs
bun run build
```
