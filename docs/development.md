# Development Setup: Medgel Next.js

## Prerequisites

Before setting up the project locally, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v20 or higher recommended)
- [npm](https://www.npmjs.com/) (included with Node.js)
- [MongoDB](https://www.mongodb.com/) (Local installation or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- [Git](https://git-scm.com/)

## Initial Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd medgel-nextjs
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Copy the sample environment file and update the values:
   ```bash
   cp .env.sample .env
   ```

### Required Environment Variables (`.env`)

- **`MONGODB_URI`**: Your MongoDB connection string.
- **`NEXT_PUBLIC_API_URL`**: Base URL for API requests (usually `http://localhost:3000/api`).
- **`NEXT_PUBLIC_SITE_URL`**: Base URL for the site (usually `http://localhost:3000`).
- **`MAIL_HOST`**: SMTP server (e.g., `smtp.gmail.com`).
- **`MAIL_PORT`**: SMTP port (e.g., `587`).
- **`MAIL_USERNAME`**: Your email address for sending notifications.
- **`MAIL_PASSWORD`**: Your email password or app-specific password.
- **`MAIL_FROM_NAME`**: Display name for sent emails (e.g., `Medgel Pvt. Ltd`).

## Running the Application

### Development Mode

Start the development server with Hot Module Replacement (HMR) and Turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Linting

To check for code quality and potential errors:

```bash
npm run lint
```

## Development Workflow

1. **Database Connection**: Ensure your MongoDB instance is running and the URI in `.env` is correct.
2. **Schema Changes**: If you update any Mongoose models in `src/models`, ensure you check for any breaking changes in the API handlers.
3. **Static Assets**: When adding new images or PDFs, place them in the appropriate subfolder in `public/`.
4. **Context Management**: Global state like user session info or product categories should be handled in `src/contexts/`.

## Common Issues

- **MongoDB Connection Error**: Ensure the URI is correct and your IP address is whitelisted in MongoDB Atlas.
- **Nodemailer Failure**: If using Gmail, make sure to use an "App Password" instead of your primary password.
- **TypeScript Errors**: Run `npx tsc --noEmit` to verify type safety before committing changes.
