#!/bin/bash
# Enable corepack for pnpm support
corepack enable
corepack prepare pnpm@latest --activate

# Install dependencies
pnpm i

# Start dev server in background
pnpm run dev-webpack &
