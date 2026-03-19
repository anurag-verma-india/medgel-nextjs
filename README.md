# Medgel Pvt. Ltd. - Web Platform

Medgel is a state-of-the-art facility for the manufacturing of Soft Gel Capsules, uniquely featuring In-line Drying Technology, one of its kind in Asia. This repository contains the modern web application and Content Management System (CMS) built for Medgel Pvt. Ltd.

## 📄 Documentation

We have comprehensive documentation available in the `docs/` folder:

- **[Project Overview](docs/overview.md)**: What the project does, core features, and target audience.
- **[Technical Architecture](docs/architecture.md)**: Technologies used, directory structure, and database models.
- **[Development Setup](docs/development.md)**: How to set up and run the project locally.
- **[API Documentation](docs/api.md)**: Detailed information about the available API endpoints.
- **[Production Deployment](docs/production.md)**: Guidelines for deploying the application to a production environment.

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v20+)
- MongoDB

### Installation

1. Clone the repo: `git clone <repo-url>`
2. Install dependencies: `npm install`
3. Configure environment: `cp .env.sample .env` (and update the values)
4. Run development server: `npm run dev`

### Production

1. Build: `npm run build`
2. Start: `npm run start`

## 🛠 Tech Stack Highlights

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19, Tailwind CSS, Ant Design
- **Database**: MongoDB with Mongoose
- **Auth**: JWT-based authentication
- **Mailing**: Nodemailer for automated notifications

For more details on the tech stack, see [Technical Architecture](docs/architecture.md).

## 📂 Key Directories

- `src/app`: Application routes and API handlers.
- `src/models`: Mongoose database schemas.
- `src/contexts`: Global React state management.
- `public`: Static assets (images, PDFs).

---
