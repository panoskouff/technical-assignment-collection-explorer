# Collection Explorer

This project is a collection explorer that provides a UI for data exploration and search functionality. The client makes requests to the server at `http://localhost:3000/api/mockdata/customers`, which then adapts the returned data to conform to the type `[{id: string} & Record<string, string>]`. Users can search for records based on any key present in the adapted data array.
<img width="990" alt="image" src="https://github.com/panoskouff/technical-assignment-collection-explorer/assets/107889674/b7aa8938-44b0-447f-bfb6-dd84a5aa1b16">

## Stack

- Backend: Express.js
- Frontend: Vue 3
- Monorepo Management: npm workspaces

## Getting Started

### Installation

To get started, you need to clone the repository and install the dependencies for both the client and the server:

```bash
git clone <repository-url>
cd collection-explorer
npm run install-all
```

## Development

The development servers for the client and server are available at:

- Server: [http://localhost:3000/](http://localhost:3000/)
- Client: [http://localhost:5173/](http://localhost:5173/)

To run both simultaneously, you can use the following command:

```bash
npm run dev
```

To run them separately:

- For the server:

  ```bash
  npm run dev:server
  ```

- For the client:

  ```bash
  npm run dev:client
  ```

## Testing

To run tests for both client and server, execute the following commands:

```bash
npm run test:client
npm run test:server
```

## Deployment

To deploy, first build the client and then start the server:

1. Build the client:

   ```bash
   npm run build:client
   ```

2. Start the server:

   ```bash
   npm run start:server
   ```

The build will be served at [http://localhost:3000/](http://localhost:3000/).
