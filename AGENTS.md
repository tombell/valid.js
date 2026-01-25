# Agents Guide

This repository is a small TypeScript validation helper library. Keep guidance simple and
consistent with current conventions in the codebase.

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
