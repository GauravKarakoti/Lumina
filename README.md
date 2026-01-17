# Lumina - Knowledge Evolved

![Lumina Logo](/public/Logo.PNG)

**Lumina** is a next-generation learning platform designed to evolve the way students access knowledge. Built with a modern tech stack, it features a responsive dashboard, course management, PDF note viewing, forums, leaderboards, and real-time notifications.

## 🚀 Tech Stack

### Frontend
- **Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn/UI](https://ui.shadcn.com/) (Radix UI)
- **State/Data Fetching:** Tanstack Query
- **Routing:** React Router DOM
- **Utilities:** Lucide React (Icons), date-fns, Zod (Validation)

### Backend (`/server`)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL (via Prisma ORM)
- **Authentication:** JWT, Google OAuth, Twilio (Phone Auth)
- **Storage:** AWS S3
- **Notifications:** Nodemailer (Email), Baileys (WhatsApp)

## 🛠️ Prerequisites

Before you begin, ensure you have met the following requirements:
- **Node.js** (v18 or higher recommended)
- **npm** or **bun**
- **PostgreSQL** database instance

## 📥 Installation

### 1. Clone the Repository
```bash
git clone [https://github.com/gauravkarakoti/lumina.git](https://github.com/gauravkarakoti/lumina.git)
cd lumina
```

### 2. Frontend Setup
Install dependencies and start the client:
```Bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env
# (Update .env with your specific configuration)

# Start the development server
npm run dev
```

### 3. Backend Setup
Open a new terminal and navigate to the server directory:
```Bash
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# (Update .env with your Database URL, AWS keys, etc.)

# Generate Prisma Client
npx prisma generate

# Run Database Migrations
npx prisma migrate dev

# Start the backend server
npm run dev
```

## 📜 Scripts

### Root (Frontend)
- `npm run dev`: Start the frontend development server.
- `npm run build`: Build the frontend for production.
- `npm run lint`: Lint the codebase using ESLint.
- `npm run preview`: Preview the production build locally.

### Server
- `npm run dev`: Start the backend in development mode (with nodemon).
- `npm run build`: Compile TypeScript and generate Prisma client.
- `npm start`: Start the production server.

## 📂 Project Structure
```text
lumina/
├── public/              # Static assets (Manifest, Logos)
├── server/              # Backend Express application
│   ├── prisma/          # Database schema and migrations
│   └── src/             # Backend source code (Routes, Controllers)
├── src/                 # Frontend React application
│   ├── components/      # Reusable UI components
│   ├── pages/           # Application pages/routes
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utilities and helpers
└── package.json         # Project configuration
```