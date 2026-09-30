# Ember & Crust

A responsive restaurant food-ordering application built with **Next.js, TypeScript, Tailwind CSS, Prisma, PostgreSQL, and Zustand**.

The application provides a customer-facing restaurant menu, persistent shopping cart, checkout and order creation flow, along with a protected admin order-management area.

## Features

### Customer

* Restaurant menu with categories
* Search menu items by name
* Filter menu items by category
* Responsive design for desktop and mobile
* Add items to cart
* Increase/decrease item quantity
* Remove items from cart
* Cart persists after page refresh
* Subtotal, tax, and delivery fee calculation
* Checkout form with client-side validation
* Place orders through an API
* Order success confirmation with order number
* Loading, error, and empty states

### Admin

* Admin login
* Protected admin orders page
* View received orders
* Filter orders by status
* View customer and order details
* Update order status
* Admin logout

Supported order statuses:

* Pending
* Accepted
* Preparing
* Completed
* Cancelled

## Tech Stack

* **Next.js 16** with App Router
* **TypeScript**
* **Tailwind CSS**
* **Prisma ORM**
* **PostgreSQL**
* **Zustand**
* **Next.js Route Handlers**

## Project Structure

```text
food-ordering/
│
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
│
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── login/
│   │   │   ├── menu/
│   │   │   └── orders/
│   │   ├── api/
│   │   │   ├── admin/
│   │   │   ├── categories/
│   │   │   ├── menu/
│   │   │   └── orders/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── order-success/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   ├── generated/
│   │   └── prisma/
│   ├── lib/
│   │   └── prisma.ts
│   └── store/
│       └── cart-store.ts
│
├── .env
├── package.json
├── prisma7.config.ts
└── README.md
```

## Architecture

The application uses the **Next.js App Router**.

### Frontend

Customer and admin pages are implemented under:

```text
src/app/
```

Reusable UI components are kept under:

```text
src/components/
```

### API

Backend functionality is implemented using Next.js Route Handlers:

```text
src/app/api/
```

The API handles:

* Menu retrieval
* Category retrieval
* Order creation
* Admin order retrieval
* Order status updates
* Admin login/logout

### Database

**Prisma ORM** is used for database access.

**PostgreSQL** stores:

* Restaurants
* Categories
* Menu items
* Orders
* Order items
* Users
* Favorites

Menu data is stored in PostgreSQL and retrieved through the API rather than being hardcoded directly into the UI.

### Cart State

Zustand is used to manage the shopping cart.

The cart uses persistent storage so cart items remain available after a browser refresh.

### Admin Authentication

Admin authentication uses credentials configured through environment variables.

After successful login, an HTTP-only session cookie is created.

Protected admin pages and API routes verify this session before allowing access.

## Environment Variables

Create a `.env` file in the project root.

```env
DATABASE_URL=your_postgresql_connection_string
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

### Required Variables

| Variable         | Purpose                               |
| ---------------- | ------------------------------------- |
| `DATABASE_URL`   | PostgreSQL database connection string |
| `ADMIN_EMAIL`    | Email used for admin login            |
| `ADMIN_PASSWORD` | Password used for admin login         |

Do not commit `.env` or real credentials to GitHub.

For deployment, configure the same variables in the hosting provider's environment-variable settings.

## Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/ankit-mahapatra/Food-Ordering.git
cd Food-Ordering
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL=your_postgresql_connection_string
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Create/update the database schema

```bash
npx prisma db push
```

### 6. Seed the database

```bash
npm run db:seed
```

The seed script creates the restaurant, categories, and menu data required by the application.

### 7. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Production Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Admin

Open:

```text
http://localhost:3000/admin
```

The admin credentials are configured through:

```env
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

## API Endpoints

### Customer APIs

```text
GET  /api/menu
GET  /api/categories
POST /api/orders
```

### Admin APIs

```text
POST /api/admin/login
POST /api/admin/logout
GET  /api/admin/orders
PATCH /api/admin/orders/[id]
```

Protected admin endpoints require an authenticated admin session.

## Data Flow

### Menu

```text
PostgreSQL
    ↓
Prisma
    ↓
Next.js API Route
    ↓
Customer UI
```

### Order

```text
Customer
    ↓
Checkout Form
    ↓
POST /api/orders
    ↓
Prisma
    ↓
PostgreSQL
    ↓
Order Success Page
```

### Admin Order Management

```text
Admin Login
    ↓
HTTP-only Session Cookie
    ↓
Protected Admin Page
    ↓
Admin Orders API
    ↓
PostgreSQL
```

## Assumptions

* Menu and order data are stored in PostgreSQL through Prisma.
* Menu items are fetched through API routes.
* Order prices are calculated using the current database menu prices.
* Tax and delivery fee calculations are handled on the server when an order is created.
* The admin area is intended for the assessment and uses environment-based admin credentials.
* The application assumes the PostgreSQL database is available to the deployed application.
* The seed script is intended for setting up the initial restaurant and menu data.

## Incomplete Features

All core features specified in the assessment have been implemented.

Optional features outside the core assessment requirements were not implemented.

## Deployment

The application is deployed using Vercel.

The deployment environment requires:

```text
DATABASE_URL
ADMIN_EMAIL
ADMIN_PASSWORD
```

The PostgreSQL database must be accessible from the deployed application.

## Assessment

Developed for the **Tenacious Techies Private Limited** technical assessment.

## License

This project was created as part of a technical assessment.

```

### One correction before you commit the README

Your current README says:

> A `.env.example` file is provided

**Only keep that statement if you actually have `.env.example` in the repository.** Otherwise remove it, as I did above.

Also, your current Git status has `prisma/seed.ts` and `src/app/api/categories/route.ts` modified. **Commit those first**, then add this README and commit it separately. That keeps your Git history clean.
```
