# Replit.md

## Overview

This is an educational cryptography application that teaches three encryption methods: Caesar cipher, Vigenère cipher, and RSA asymmetric encryption. The app is built as a French-language interactive tool for learning mathematical cryptography concepts, featuring a modern React frontend with Express backend architecture.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS v4 with shadcn/ui component library (New York style)
- **State Management**: TanStack React Query for server state
- **Animations**: Framer Motion for UI animations
- **Build Tool**: Vite with custom plugins for Replit integration

The frontend is organized under `client/src/` with:
- `pages/` - Route components (Home.tsx contains the main cryptography interface)
- `components/ui/` - Reusable shadcn/ui components
- `lib/` - Utility functions including cipher implementations (caesar.ts, rsa.ts)
- `hooks/` - Custom React hooks

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Server**: HTTP server with development/production modes
- **Development**: Vite dev server integration with HMR
- **Production**: Static file serving from built assets

The backend structure under `server/`:
- `index.ts` - Main server entry point with middleware setup
- `routes.ts` - API route registration (currently minimal)
- `storage.ts` - In-memory storage implementation with interface for future database integration
- `static.ts` - Production static file serving
- `vite.ts` - Development server with Vite HMR

### Data Storage Solutions
- **Current**: In-memory storage (MemStorage class) for user data
- **Schema**: Drizzle ORM with PostgreSQL schema defined in `shared/schema.ts`
- **Database Ready**: Drizzle configuration exists for PostgreSQL when DATABASE_URL is provided
- **Session Storage**: connect-pg-simple available for session management

### Shared Code
The `shared/` directory contains code used by both frontend and backend:
- `schema.ts` - Drizzle ORM table definitions and Zod validation schemas

### Build System
- **Development**: `npm run dev` starts Express server with Vite middleware
- **Production Build**: `npm run build` uses esbuild for server bundling and Vite for client
- **Database Migrations**: `npm run db:push` for Drizzle schema synchronization

## External Dependencies

### Core Technologies
- **React Query**: Server state management and caching
- **Drizzle ORM**: Type-safe database ORM (PostgreSQL dialect configured)
- **Zod**: Runtime validation with drizzle-zod integration
- **Express**: HTTP server framework

### UI Framework
- **shadcn/ui**: Component library using Radix UI primitives
- **Tailwind CSS v4**: Utility-first CSS framework
- **Lucide React**: Icon library

### Cryptography Libraries
- Custom implementations in `client/src/lib/`:
  - `caesar.ts`: Caesar and Vigenère cipher algorithms
  - `rsa.ts`: Educational RSA implementation with prime checking and modular arithmetic

### Fonts
- Google Fonts: Outfit (primary), JetBrains Mono (monospace), Cairo (Arabic support)

### Replit-Specific Plugins
- `@replit/vite-plugin-runtime-error-modal`: Error overlay for development
- `@replit/vite-plugin-cartographer`: Development tooling
- `@replit/vite-plugin-dev-banner`: Development environment indicator
- Custom `vite-plugin-meta-images`: OpenGraph image URL management