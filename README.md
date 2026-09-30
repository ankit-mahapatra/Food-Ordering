# Ember & Crust

A responsive restaurant food-ordering application built with **Next.js, TypeScript, Tailwind CSS, Prisma and PostgreSQL**.

## Features

### Customer

* Restaurant menu with categories
* Search menu items by name
* Filter menu items by category
* Responsive design for desktop and mobile
* Add items to cart
* Increase/decrease quantity
* Remove items from cart
* Cart persists after refresh
* Subtotal, tax and delivery fee calculation
* Checkout form with validation
* Place order
* Order success confirmation with order number

### Admin

* Admin login
* Protected admin orders page
* View received orders
* Filter orders by status
* View customer and order details
* Update order status
* Admin logout

## Tech Stack

* Next.js 16
* TypeScript
* Tailwind CSS
* Prisma ORM
* PostgreSQL
* Zustand
* Next.js App Router

## Project Structure

```text
src/
├── app/
│   ├── admin/
│   │   ├── login/
│   │   ├── menu/
│   │   └── orders/
│   ├── api/
│   │   ├── admin/
│   │   ├── categories/
│   │   ├── menu/
│   │   └── orders/
│   ├── cart/
│   ├── checkout/
│   ├── order-success/
│   └── page.tsx
│
├── components/
├── lib/
└── store/

prisma/
└── schema.prisma
```

## Architecture

The application uses the **Next.js App Router**.

* Customer pages are located under `src/app`.
* API endpoints are implemented using Next.js Route Handlers under `src/app/api`.
* Prisma is used for database access.
* PostgreSQL stores menu, category and order data.
* Zustand is used for persistent client-side cart state.
* Admin authentication uses environment-based credentials and an HTTP-only session cookie.
* Protected admin API routes verify the admin session before allowing access or updating orders.

## Environment Variables

Create a `.env` file in the project root.

```text
DATABASE_URL=your_postgresql_connection_string
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

Do not commit the `.env` file to GitHub.

A `.env.example` file is provided to show the required environment variables without exposing real credentials.

## Run Locally

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd food-ordering
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file and add:

```text
DATABASE_URL=your_postgresql_connection_string
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Start the development server

```bash
npm run dev
```

Open:

http://localhost:3000

## Production Build

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Admin

Open:

http://localhost:3000/admin

Admin credentials are configured through `ADMIN_EMAIL` and `ADMIN_PASSWORD` environment variables.

## Assumptions

* Menu and order data are stored in PostgreSQL through Prisma.
* Order calculations are handled by the order API.
* Delivery fee and tax are calculated on the server when an order is created.
* Admin authentication is implemented for the assessment admin area.

## Incomplete Features

All core features specified in the assessment have been completed.

The optional bonus features were not implemented unless mentioned above.

## Deployment

The application can be deployed to Vercel or another Next.js-compatible hosting platform.

The following environment variables must be configured in the deployment environment:

* `DATABASE_URL`
* `ADMIN_EMAIL`
* `ADMIN_PASSWORD`

The PostgreSQL database must be accessible from the deployed application.

## Assessment

Developed for the **Tenacious Techies Private Limited** technical assessment.
