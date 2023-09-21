# SPA with vite

## Table of Contents

- [SPA with vite](#spa-with-vite)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Development](#development)
  - [Build](#build)
  - [Testing](#testing)
  - [Project Structure](#project-structure)

## Installation

To install all the required dependencies, run:

```bash
npm install
```

## Development

To start the development server, run:

```bash
npm run dev
```

This will start the Vite development server. Navigate to `http://localhost:5173/` to view the app.

## Build

To create a production build, run:

```bash
npm run build
```

The build artifacts will be stored in the `dist` directory.

## Testing

To run the tests, execute:

```bash
npm test
```

You can also type check the project with:

```bash
npm run typecheck
```

## Project Structure

```
├── src/                  # Application source code
│   ├── atoms/            # Unopinionated UI components
│   ├── components/       # Opinionated UI components
│   ├── composables/      # Vue Composables
│   ├── queries/          # Query functions and adapters
│   ├── styles/           # Global styles and variables
│   ├── types/            # Type definitions
│   ├── utils/            # Utility functions
│   └── main.ts           # Entry point for the application
├── public/               # Public static assets
├── jest.config.js        # Jest configuration file
└── vite.config.ts        # Vite configuration file
```
