# Arpan's Portfolio Website

## Overview

This is a personal portfolio website for Arpan P. Nayak, showcasing his work as an AI Engineer and Business Strategist. The application is a full-stack React/Express project with an integrated Python FastAPI backend for an AI assistant named "Nami."

The portfolio includes sections for About, Skills, Certifications, Internships, Experience, Projects, Blog, and Contact information. It features a modern dark-themed UI with animated backgrounds, particle effects, and smooth transitions using Framer Motion. The AI assistant Nami serves as a conversational portfolio manager that can answer visitor questions about Arpan's work and experience.

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
client/              # React frontend application
  src/
    components/      # Reusable UI components (Header, Footer, AIAgent, etc.)
    pages/           # Route page components (Home, About, Skills, etc.)
    data/            # Static data files including nami_qa.json
server/              # Express backend
  python_agent/      # FastAPI AI service
shared/              # Shared types and database schema
attached_assets/     # Static assets and requirement documents
```

## External Dependencies

### Database
- **PostgreSQL**: Primary database via DATABASE_URL environment variable
- **Drizzle ORM**: Database abstraction and migrations

### AI/ML Services
- **ctransformers**: Local LLM inference for the Nami AI agent
- **sentence-transformers**: Text embedding generation
- **faiss-cpu**: Vector similarity search for knowledge retrieval
- **sklearn**: TF-IDF vectorization and cosine similarity

### Frontend Libraries
- **Radix UI**: Accessible component primitives (dialog, tooltip, accordion, etc.)
- **Framer Motion**: Animation library
- **Lucide React & React Icons**: Icon libraries

### Backend Libraries
- **Express**: Web server framework
- **Axios**: HTTP client for proxying to Python service
- **connect-pg-simple**: PostgreSQL session store

### Build Tools
- **Vite**: Frontend bundler with HMR
- **esbuild**: Server-side bundling for production
- **tsx**: TypeScript execution for development

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal**: Error overlay in development
- **@replit/vite-plugin-cartographer**: Development tooling
- **@replit/vite-plugin-dev-banner**: Development banner