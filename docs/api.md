# API Documentation: Medgel Next.js

The Medgel Next.js application uses Next.js Route Handlers for its backend functionality. Most API endpoints are located in `src/app/api/`.

## Authentication & Users

### 1. User Signup / Verification Request

- **Endpoint**: `/api/users/signup`
- **Method**: `POST`
- **Body**: `{ "email": "user@example.com" }`
- **Description**: Initiates the signup process by sending a verification email to the user. Creates a user record if one doesn't exist.

### 2. Verify Email

- **Endpoint**: `/api/users/verifyemail`
- **Method**: `POST`
- **Body**: `{ "token": "verification_token" }`
- **Description**: Verifies the user's email using the token sent via email.

---

## Product Management

### 1. Get Product Details

- **Endpoint**: `/api/product`
- **Method**: `GET`
- **Query Params**: `product_id`
- **Description**: Retrieves detailed information about a specific product.

### 2. Add New Product (Admin Only)

- **Endpoint**: `/api/product`
- **Method**: `POST`
- **Body**: Product object (name, description, category, etc.)
- **Description**: Adds a new product to the database.

### 3. Update Product (Admin Only)

- **Endpoint**: `/api/product`
- **Method**: `PUT`
- **Body**: `{ "product_id": "...", "product": "...", ... }`
- **Description**: Updates an existing product's details.

### 4. Delete Product (Admin Only)

- **Endpoint**: `/api/product`
- **Method**: `DELETE`
- **Query Params**: `product_id`, `listId`
- **Description**: Removes a product from the database and updates associated product lists.

### 5. Get All Products

- **Endpoint**: `/api/get_all_products`
- **Method**: `GET`
- **Description**: Returns a list of all products in the database.

---

## Content Management (CMS)

### 1. Page Content

- **Endpoint**: `/api/page`
- **Method**: `GET`, `POST`
- **Description**: Used by the inline editor to fetch and update section-specific content (e.g., slider text, home page cards).

---

## Inquiries & Applications

### 1. Contact Us

- **Endpoint**: `/api/contactus`
- **Method**: `POST`
- **Body**: `{ "name": "...", "email": "...", "message": "..." }`
- **Description**: Saves a contact inquiry and sends an email notification to the administrator.

### 2. Job Applications

- **Endpoint**: `/api/applies`
- **Method**: `POST`
- **Description**: Handles job application submissions, including resume metadata.

### 3. Resume Upload

- **Endpoint**: `/api/applies_resume`
- **Method**: `POST`
- **Description**: Handles file uploads for resumes using `formidable` or `multer`.

---

## Investor Relations

### 1. Annual Reports

- **Endpoint**: `/api/annualReport`
- **Method**: `GET`, `POST`, `DELETE`
- **Description**: Manages metadata and links for annual report PDFs.

### 2. Corporate Policies

- **Endpoint**: `/api/policyReport`
- **Method**: `GET`, `POST`, `DELETE`
- **Description**: Manages corporate policy documents.

---

## Notes

- **Admin Endpoints**: Endpoints marked as "Admin Only" require a valid admin session/cookie.
- **Error Handling**: All API responses follow a consistent format, typically including a `success` boolean and a `message` or `error` string.
