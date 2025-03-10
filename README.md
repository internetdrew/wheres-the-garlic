# Where's the Garlic?!

A status-based home grocery inventory app that helps you track what's in your kitchen at a glance—full, halfway, almost done, or out.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Where to get these values:

1. **Supabase Variables**

   - Go to your Supabase project dashboard
   - Navigate to Project Settings > API
   - Copy the "Project URL" for `NEXT_PUBLIC_SUPABASE_URL`
   - Copy the "anon public" key for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
