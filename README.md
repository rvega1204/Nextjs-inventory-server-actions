# Inventory Management System

A modern Inventory Management System built with **Next.js 15**, **React 19**, and **MongoDB**. This project demonstrates the use of **Next.js Server Actions** for handling form submissions and data mutations directly from the server, eliminating the need for separate API routes.

## 🚀 Features

- **Server Actions**: Perform CRUD operations (Create, Read, Update, Delete) directly on the server.
- **MongoDB Integration**: Data persistence using **Mongoose** for schema definition and database interaction.
- **Responsive Design**: Built with **Tailwind CSS v4** for a clean and mobile-friendly user interface.
- **Unit Testing**: Integrated **Jest** and **React Testing Library** for verifying Server Actions and components.
- **Optimized Performance**: server-side rendering and efficient database connection caching.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **ORM**: [Mongoose](https://mongoosejs.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Testing**: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- A [MongoDB](https://www.mongodb.com/) database (local or Atlas)

## 🏁 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rvega1204/Nextjs-inventory-server-actions.git
cd inventory-server-actions
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add your MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/inventory-db
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 🧪 Running Tests

This project includes a test suite configured with **Jest**. The tests cover critical Server Actions to ensure data integrity and logic correctness.

To run the tests:

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch
```

## 📂 Project Structure

```
├── app/                  # App Router pages and layouts
│   ├── inventory/        # Inventory implementation (add/edit pages)
│   ├── page.js           # Home page (List view)
│   └── ...
├── components/           # Reusable UI components
├── models/               # Mongoose schemas (InventoryItem)
├── utils/                # Utility functions and Server Actions
│   ├── actions.js        # Server Actions (CRUD logic)
│   └── connectDB.js      # Database connection helper
├── __tests__/            # Unit and integration tests
├── public/               # Static assets
└── ...
```

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm start`: Starts the production server.
- `npm test`: Runs the Jest test suite.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📝 Author

- **[Ricardo Vega](https://github.com/rvega1204)**
