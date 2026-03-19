# Technical Architecture: Medgel Next.js

## Technology Stack

### Frontend

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router & Server Components)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**:
  - [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS for responsive design.
  - [Styled Components](https://styled-components.com/): Scoped styling for specific components.
- **UI Components**:
  - [Ant Design (antd)](https://ant.design/): High-quality UI components for the CMS and dashboard elements.
  - [Lucide React](https://lucide.dev/): Consistent iconography.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for smooth transitions and interactive elements.
- **Carousels**: [React Slick](https://react-slick.neostack.com/) for sliders.

### Backend

- **Platform**: Next.js [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) (API routes).
- **Database**: [MongoDB](https://www.mongodb.com/) using [Mongoose](https://mongoosejs.com/) for ODM.
- **Authentication**: [JWT (JSON Web Tokens)](https://jwt.io/) for session management and [bcryptjs](https://github.com/dcodeIO/bcrypt.js) for password hashing.
- **Email**: [Nodemailer](https://nodemailer.com/) for handling automated emails.
- **File Uploads**: [Multer](https://github.com/expressjs/multer) and [Formidable](https://github.com/node-formidable/formidable) for handling multipart/form-data.

## Directory Structure

```text
├── public/                 # Static assets (images, PDFs, logos)
│   ├── images/             # Product and news images
│   ├── annual_Report/      # PDF reports
│   └── policy_Report/      # Corporate policy PDFs
├── src/
│   ├── app/                # Main Application logic (Next.js App Router)
│   │   ├── api/            # Modern Route Handlers (GET, POST, etc.)
│   │   ├── _common_component/ # Shared UI (Header, Footer, Modals)
│   │   └── (routes)/       # Each folder represents a page or feature
│   ├── contexts/           # React Context for global state (e.g., EmailPopup, ProductCategories)
│   ├── helpers/            # Reusable utility and server-side logic
│   ├── lib/                # Config files (e.g., dbConnect.ts)
│   ├── models/             # Mongoose Schemas (User, News, Product, etc.)
│   └── types.ts            # Global TypeScript interface definitions
├── pages/                  # Legacy API Routes (Pages Router)
```

## Data Models (MongoDB)

| Model               | Description                                                         |
| ------------------- | ------------------------------------------------------------------- |
| **User**            | Store admin and user credentials (username, email, password, role). |
| **Product**         | Core product information (name, description, category, features).   |
| **ProductCategory** | Organizational structure for products.                              |
| **News**            | Company news articles and updates.                                  |
| **JobOpenings**     | Vacancies with description and requirements.                        |
| **Apply**           | Stores applications and candidate information.                      |
| **ContactUs**       | Leads and inquiries from the contact form.                          |
| **Page**            | Dynamic content storage for inline CMS editing.                     |
| **Award**           | Information about company achievements.                             |
| **AnnualReport**    | Metadata for annual reports and PDF links.                          |
| **Policy**          | Corporate policy details and PDF links.                             |

## Workflow

1. **Client Request**: User accesses a page (e.g., `/products`).
2. **Server Component**: Next.js fetches data from MongoDB via Mongoose in a Server Component.
3. **Rendering**: The page is rendered on the server for SEO and performance.
4. **Interactive Actions**: Client-side components handle user interaction (e.g., submitting an application).
5. **API Calls**: The frontend communicates with Route Handlers (`src/app/api/...`) for data mutations (POST, PUT, DELETE).
6. **Persistence**: Changes are stored back in MongoDB.
