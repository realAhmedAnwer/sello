# Sello

## Scope 🌐

Sello is a modern e-commerce web application built with Angular and styled with Tailwind CSS. It delivers a smooth shopping experience where users can browse products, explore brands and categories, manage their cart and wishlist, and complete orders through an integrated checkout flow.

## ✨ Features

### Authenticated Experience

Secure Authentication: Fully integrated register and login system connected to the API using token-based authentication.

Protected Shopping Actions: Authenticated users can access private routes such as cart, wishlist, checkout, and orders.

Account Access Flow: Includes login, registration, and forgot password screens for a complete user entry experience.

### Shopping Experience

Product Discovery: Browse products from the shop page with clean product cards and detailed product pages.

Category and Brand Browsing: Explore the catalog through dedicated categories and brands views.

Responsive Storefront: Built to provide a polished experience across desktop and mobile layouts.

### Cart, Wishlist, and Orders

Cart Management: Add products to cart, update item quantities, remove specific items, and clear the cart.

Wishlist Support: Save products to a personal wishlist for later review.

Checkout Flow: Place orders through a dedicated checkout page with support for cash and card payment flows.

Orders Page: View submitted orders from a protected account area.

### UI and User Feedback

Live Cart Feedback: Cart count is reflected in the navigation for a smoother shopping flow.

Toast Notifications: User actions and API responses are surfaced clearly with toast messages.

Loading States: The app uses loading feedback to improve perceived responsiveness during async operations.

## 🛠️ Technology Stack

Framework: Angular 21 with modern standalone components and Angular SSR support.

Language: TypeScript.

Styling: Tailwind CSS 4 for responsive and utility-first UI styling.

Routing: Angular Router with guarded authenticated routes and route resolvers.

Forms: Reactive Forms for robust validation and form handling.

State Handling: Angular Signals for lightweight local reactive state such as authentication and cart count.

HTTP & Async: Angular HttpClient with RxJS for API integration and reactive flows.

Icons: Font Awesome.

UI Libraries: Flowbite, ngx-toastr, ngx-spinner, ngx-pagination, and Swiper.

Server Runtime: Express for SSR serving.

Architecture: TypeScript path aliases such as `@core/`, `@shared/`, and `@env/` for cleaner imports.

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

Clone the repository and navigate to the project root.

```bash
git clone <repository-url>
cd sello
```

Install the application dependencies:

```bash
npm install
```

### Development Server

To start the local development server, run:

```bash
npm start
# OR
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

To build the project for production, run:

```bash
npm run build
```

This will compile the application and store the optimized build artifacts in the `dist/` directory.

### Test

To run the test suite, use:

```bash
npm test
```