#!/bin/bash

# --- Script to move frontend-related files and folders into the 'frontend/' directory ---

echo "Starting frontend file organization..."

# Define the target frontend directory
FRONTEND_DIR="frontend"

# Ensure the frontend directory exists
mkdir -p "$FRONTEND_DIR"

# List of files and folders to move into frontend/
# Adjusted based on your screenshot and typical Next.js structure
FRONTEND_ITEMS=(
    "app"
    "components"
    "contexts"
    "hooks"
    "lib"
    "public"
    "services"
    "styles"
    ".gitignore"         # Assuming this is the frontend .gitignore
    "components.json"
    "next.config.mjs"
    "package.json"       # Assuming this is the frontend package.json
    "pnpm-lock.yaml"     # Assuming this is the frontend pnpm-lock file
    "postcss.config.mjs"
    "tailwind.config.ts"
    "tsconfig.json"
)

# Loop through the items and move them
for item in "${FRONTEND_ITEMS[@]}"; do
    if [ -e "$item" ]; then # Check if the item exists at the root
        echo "Moving $item to $FRONTEND_DIR/..."
        mv "$item" "$FRONTEND_DIR/"
    else
        echo "Warning: $item not found at root, skipping."
    fi
done

echo "Frontend file organization complete."
echo "Please ensure the correct .gitignore and package.json files are in their respective frontend/ and backend/ directories."
echo "You might need to adjust your main .gitignore (at the repo root) and package.json files for a clean monorepo setup."

