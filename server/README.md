# Backend Services project

## Description

This project is a server-side application built using TypeScript and Express. For now it only contains 1 service, but is built in such a way that is very easy to add more services and clients.

## Getting Started

### Installing Dependencies

Run the following command to install the required dependencies:

```bash
npm install
```

### Development

To start the development server, run:

```bash
npm run dev
```

### Testing

Run tests once:

```bash
npm run test:once
```

Run tests in watch mode:

```bash
npm run test
```

## Directory Structure

```
src/
├── ServerMemoryContext.ts
├── clients/
├── config/
├── controllers/
├── routes/
├── server.ts
├── types/
└── utils/
```

- `ServerMemoryContext.ts`: Contains context-related logic for the server.
- `clients/`: Client-side implementations and static files.
- `config/`: Application-wide configurations.
- `controllers/`: Route controllers. New controllers can be added here.
- `routes/`: API and client routes.
- `server.ts`: Entry point for the server.
- `types/`: TypeScript type definitions.
- `utils/`: Utility functions and logic.

### Other features include

- configured logging
- add environment variables to `.env`

### Adding New Controllers

1. Create a new TypeScript file in the `controllers` directory. For example, `newFeature.ts`.
2. Implement your controller logic in this new file.
3. Import and use this controller in the appropriate route files in the `routes/` directory.

Here is an example of what a new controller could look like:

```typescript
// controllers/newFeature.ts

import { Request, Response } from 'express'

export const newFeatureController = (req: Request, res: Response) => {
  // Your logic here
}
```

And then in your route:

```typescript
// routes/api/newFeature.ts

import { newFeatureController } from '../controllers/newFeature'

router.get('/new-feature', newFeatureController)
```

This project's structure allows for seamless integration of new controllers into the existing ecosystem.
