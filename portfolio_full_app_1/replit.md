# Arpan's Portfolio Website

## Overview

This is a personal portfolio website for Arpan P. Nayak, showcasing his work as an AI Engineer and Business Strategist. The application is a full-stack React/Express project with an integrated Python AI chatbot agent called "Nami" that provides conversational assistance about Arpan's background, skills, and projects.

The portfolio includes sections for About, Skills, Certifications, Internships, Experience, Projects, Blog, and Contact information. It features a modern dark-themed UI with animated backgrounds, particle effects, and smooth transitions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: React Router DOM for single-page application navigation
- **Styling**: Tailwind CSS with custom theme configuration extending slate/cyan/blue color palette
- **UI Components**: Shadcn/ui component library (new-york style) with Radix UI primitives
- **Animations**: Framer Motion for page transitions and interactive elements
- **State Management**: React Query (@tanstack/react-query) for server state, local React state for UI
- **Build Tool**: Vite with custom configuration for path aliases (@/, @shared/, @assets/)

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript compiled with tsx
- **API Structure**: RESTful endpoints prefixed with /api
- **Static Serving**: Express serves built frontend assets in production
- **Development**: Vite middleware integration for hot module replacement

### Python AI Agent
- **Framework**: FastAPI running on port 8000
- **Purpose**: Conversational AI agent ("Nami") that answers questions about Arpan's portfolio
- **Integration**: Express proxies /api/chat requests to the Python service
- **Knowledge Base**: Hardcoded data about projects, experience, education, certifications, and skills
- **Dependencies**: sentence-transformers, faiss-cpu, ctransformers for local AI inference

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: shared/schema.ts defines database tables
- **Current Tables**: Users table with id, username, password fields
- **Migrations**: Drizzle Kit for schema migrations (output to ./migrations)
- **Development Storage**: MemStorage class provides in-memory storage fallback

### Project Structure
```
client/           # React frontend application
  src/
    components/   # Reusable UI components
    pages/        # Route page components
    data/         # Static data (projects, blogs)
    types/        # TypeScript type definitions
server/           # Express backend
  python_agent/   # FastAPI AI chatbot service
shared/           # Shared code (database schema)
```

## External Dependencies

### Database
- PostgreSQL via DATABASE_URL environment variable
- connect-pg-simple for session storage
- Drizzle ORM for type-safe database queries

### Frontend Libraries
- Radix UI component primitives for accessible UI
- Lucide React and React Icons for iconography
- Framer Motion for animations
- Axios for HTTP requests

### Backend Services
- Express with session management
- Multer for file uploads (if needed)
- Nodemailer for email functionality (if needed)

### AI/ML Stack (Python)
- FastAPI for REST API
- sentence-transformers for embeddings
- faiss-cpu for vector similarity search
- ctransformers for local LLM inference
- huggingface_hub for model downloads

### Development Tools
- Vite with React plugin
- Replit-specific plugins (runtime-error-modal, cartographer, dev-banner)
- Concurrently for running Express and Python services together
- ESBuild for production server bundling