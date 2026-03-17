# Medgel Pvt. Ltd.

Medgel is a state-of-the-art facility for the manufacturing of Soft Gel Capsules, uniquely featuring In-line Drying Technology, one of its kind in Asia. This project is a modern web application built for Medgel Pvt. Ltd. using the latest web technologies and development practices.

## 🚀 Technologies Used

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Styled Components](https://styled-components.com/)
- **UI Components**: [Ant Design (antd)](https://ant.design/) & [Lucide React](https://lucide.dev/) (Icons)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: [Nodemailer](https://nodemailer.com/)
- **Form Handling**: [Formidable](https://github.com/node-formidable/formidable) & [Multer](https://github.com/expressjs/multer) (for file uploads)

## 🛠 Modern Development Practices

- **App Router**: Leverages the latest Next.js App Router for optimized routing and layout management.
- **Server Components**: Extensive use of React Server Components (RSC) for improved performance and SEO.
- **Type Safety**: Full TypeScript integration for robust and maintainable code.
- **API Routes**: Next.js 15 Route Handlers for efficient backend logic.
- **Responsive Design**: Mobile-first approach using Tailwind CSS.
- **Clean Architecture**: Separation of concerns between models, components, contexts, and helper functions.

## 📂 Project Structure

```text
├── public/                 # Static assets (images, PDFs, logos)
├── src/
│   ├── app/                # Next.js App Router (Pages, API Routes, Layouts)
│   │   ├── _common_component/ # Shared components (Header, Footer, Modals)
│   │   ├── api/            # API Route Handlers (Modern)
│   │   └── ...             # Page-specific routes (about, products, etc.)
│   ├── contexts/           # React Context Providers for global state
│   ├── helpers/            # Utility functions and server-side helpers
│   ├── lib/                # Library configurations (e.g., dbConnect)
│   ├── models/             # Mongoose schemas and models
│   └── types.ts            # Global TypeScript types
├── pages/                  # Legacy API routes (Pages Router)
├── .env.sample             # Sample environment variables
├── package.json            # Project dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

## 📡 API Structure

The project primarily uses Next.js 15 Route Handlers located in `src/app/api/`. Each directory within `src/app/api/` contains a `route.ts` file defining the supported HTTP methods (GET, POST, etc.).

Key API Endpoints:
- `/api/users`: User management and authentication.
- `/api/product`: Product-related operations.
- `/api/annualReport`: Annual report management.
- `/api/contactus`: Handling contact form submissions.

## 🏃 How to Run

### Prerequisites

- Node.js (v20 or higher)
- MongoDB instance

### Steps

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd medgel-nextjs
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and copy the contents from `.env.sample`. Update the values as needed.
   ```bash
   cp .env.sample .env
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

5. **Build for production:**
   ```bash
   npm run build
   npm run start
   ```

## 📜 Scripts

- `npm run dev`: Starts the development server with Turbopack.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality issues.


