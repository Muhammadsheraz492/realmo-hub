#!/bin/bash

# Example setup script
echo "Setting up project..."

# Creating directories
mkdir -p knowledge-checks/scripts
mkdir -p knowledge-checks/styles
mkdir -p images

# Downloading an example background image
curl -o images/background.jpg https://example.com/path/to/your/background.jpg

# Copying initial files
echo "Copying initial HTML, CSS, and JS files..."
cp index.html knowledge-checks/autopay.html knowledge-checks/scripts/scripts.js knowledge-checks/styles/styles.css ./destination_path/

echo "Setup complete!"
