# Accordion Novacare

A Next.js FAQ accordion application that fetches content from Contentful CMS using GraphQL.

## Features

### Accordion Component

- **Multiple open mode**: By default, multiple accordion items can be open simultaneously
- **Single open mode**: Toggle to allow only one accordion item open at a time
- **Smooth animations**: Rotating chevron icon and content transitions
- **Accessible**: Proper ARIA attributes for screen readers
- **Styling**: Matches Novacare's brand colors (dark blue background, light blue accordions)

### Data Fetching

- Fetches accordion data from Contentful using GraphQL
- Optimized queries that only fetch required fields
- Server-side rendering for better performance and SEO

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:
   Create a `.env` file in the root directory:

```
ACCESS_TOKEN=your_contentful_access_token
SPACE=your_contentful_space_id
ENVIRONMENT=master
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests in watch mode
- `npm run test:ui` - Run tests with visual UI
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:run` - Run tests once (useful for CI/CD)

## Project Structure

```
├── app/              # Next.js app directory
├── components/       # React components
│   ├── Accordion.tsx    # Individual accordion item
│   ├── FAQ.tsx          # FAQ container with multiple accordions
│   └── ChevronDown.tsx  # Chevron icon component
├── lib/              # Utility functions
│   └── contentful.ts    # Contentful GraphQL client
├── types/            # TypeScript type definitions
└── public/           # Static assets

```

## Technologies

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Contentful** - Headless CMS
- **GraphQL** - Data fetching
- **Vitest** - Testing framework
- **React Testing Library** - Component testing
