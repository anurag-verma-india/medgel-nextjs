# Production Deployment: Medgel Next.js

## Deployment Strategy

Medgel Next.js can be deployed using several methods depending on your infrastructure requirements:

### 1. Managed Hosting (Recommended)

The easiest way to deploy is using platforms optimized for Next.js:

- **[Vercel](https://vercel.com/)**: The creators of Next.js, providing seamless integration, automatic SSL, and global CDN.
- **[Netlify](https://www.netlify.com/)**: Excellent support for Next.js with easy CI/CD integration.

### 2. Self-Hosted VPS (Node.js)

For hosting on a private Virtual Private Server (e.g., AWS EC2, DigitalOcean, Linode):

- Use **Nginx** or **Apache** as a reverse proxy to handle incoming traffic and SSL termination.

### 3. Containerization (Docker)

For consistent environments across different platforms:

- Build a **Docker** image containing the Next.js application.
- Deploy using **Docker Compose**, **Kubernetes**, or managed container services like **AWS ECS** or **Google Cloud Run**.

## Build and Start

1. **Build for Production**:

   ```bash
   npm run build
   ```

   This generates an optimized build in the `.next` folder.

2. **Start the Production Server**:
   ```bash
   npm run start
   ```

## Production Checklist

### 1. Database Configuration

- Use a dedicated [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster for production.
- Ensure the connection URI is set correctly in your production environment variables.
- Whitelist the IP address of your production server in MongoDB Atlas.

### 2. Environment Variables

Ensure all variables from `.env.sample` are added to your hosting platform's environment settings.

- **Important**: Use a secure, complex string for any secret keys (e.g., JWT secrets).
- Ensure `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_SITE_URL` point to the live domain.

### 3. File Storage

- For larger-scale deployments, consider moving `public/uploads` to a cloud storage provider (e.g., AWS S3, Cloudinary).
- Ensure file permissions are correctly set if hosting on a custom VPS.

### 4. Security

- **HTTPS**: Use SSL certificates (e.g., Let's Encrypt) to ensure all traffic is encrypted.
- **JWT Secret**: Ensure a unique and secure secret is used for authentication tokens.
- **Rate Limiting**: Implement basic rate limiting for API endpoints like `/api/contactus` to prevent spam.

## Performance Optimization

- **Image Optimization**: Use the Next.js `<Image />` component for automatic optimization of assets in `public/`.
- **Static Generation**: Use Static Generation (SSG) for pages that don't change frequently (About, Facilities).
- **Server-Side Rendering (SSR)**: Use SSR for pages that require real-time data from MongoDB (Products, News).

## Monitoring and Logs

- **Error Monitoring**: Consider integrating tools like [Sentry](https://sentry.io/) or [LogRocket](https://logrocket.com/).
- **Vercel Logs**: If using Vercel, monitor real-time logs in the "Logs" tab of your deployment dashboard.
