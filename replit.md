# HITSTER AI

## Overview

HITSTER AI is a real-time multiplayer music timeline game where players compete to correctly place songs on a chronological timeline. The game features AI-driven music selection and commentary, with a master device controlling gameplay and multiple player devices joining via QR code. Players listen to songs and must correctly guess where they belong on their personal timeline, racing to be first to 10 correct placements.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool

**UI Component Strategy**: The application uses shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling. The design system follows a "New York" style variant with a custom gaming-focused aesthetic featuring bold typography (Poppins for headings, JetBrains Mono for scores/years) and energetic visual hierarchy.

**Routing**: Wouter for lightweight client-side routing with three main routes:
- `/` - Home page for role selection (master vs player)
- `/master` - Game master control interface
- `/player` - Player device interface with optional `/join/:gameCode` variant

**State Management**: 
- Zustand referenced in stack but React's built-in useState/useEffect primarily used
- TanStack Query (React Query) for server state management
- Socket.io client for real-time game state synchronization

**Device-Specific Views**:
- **Master Device**: Full-screen controls with AI chat interface, QR code display for player joining, game state management, and Spotify playback control
- **Player Devices**: Mobile-first single-column layout showing personal timeline, score display, and card placement interface

### Backend Architecture

**Server Framework**: Express.js with Node.js

**Real-time Communication**: Socket.io WebSocket server handling:
- Game creation and lobby management
- Player join/leave events
- Game state synchronization across all connected clients
- Round progression and result revelation

**Game Logic**: 
- Centralized `GameManager` singleton tracking all active games and socket-to-game mappings
- `Game` class managing individual game instances with phases: setup → lobby → playing → reveal → finished
- Player state tracking (timeline, score, ready status)

**Session Management**: The codebase includes session infrastructure (connect-pg-simple) but core game flow uses socket-based state management

### Data Storage

**Database**: PostgreSQL via Neon serverless (@neondatabase/serverless)

**ORM**: Drizzle ORM with schema definitions in `/shared/schema.ts`

**Current Schema**: Basic user authentication table (users with id, username, password). Game state is managed in-memory via the GameManager rather than persisted to database.

**Migration Strategy**: Drizzle Kit for schema migrations with files output to `./migrations/`

### External Dependencies

**Music Services**:
- **Spotify Web API**: Song search and metadata retrieval
- **Spotify Web Playback SDK**: Actual audio playback on master device
- Note: Preview URLs may be used as fallback for non-premium accounts

**AI Services**:
- **OpenRouter API**: LLM for generating music preferences from user chat and creating game commentary
- **ElevenLabs API**: Text-to-speech for AI voice commentary during gameplay

**Utility Libraries**:
- **Howler.js**: Audio playback management and control
- **QRCode.react**: QR code generation for player joining
- **Socket.io**: Real-time bidirectional event-based communication
- **date-fns**: Date manipulation utilities
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Pre-built accessible component library

**Development Tools**:
- **TypeScript**: Type safety across full stack
- **Vite**: Fast development server and build tool
- **ESBuild**: Server-side bundling for production

### Key Architectural Decisions

**Monorepo Structure**: Client and server code in single repository with shared types in `/shared/` directory for type safety across boundaries.

**Real-time Sync Pattern**: Game state lives on server and broadcasts to all clients via Socket.io. Clients emit actions, server validates and updates state, then broadcasts new state to all participants. This ensures consistency and prevents cheating.

**Phase-Based Game Flow**: Game progresses through explicit phases (setup, lobby, playing, reveal, finished) controlled by master device, with all players synchronized to same phase.

**Stateless Player Reconnection**: Current architecture doesn't persist game state to database, so disconnections lose context. Future enhancement would add database persistence for reconnection support.

**Swedish Language First**: All UI text, AI prompts, and user-facing content designed for Swedish language as primary interface.

**Component-Driven UI**: Extensive component library in `/client/src/components/` with example files demonstrating usage patterns for AI-based development assistance.