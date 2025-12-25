- **Display a list of cryptocurrencies** with details: Price, Change (1h / 24h / 7d), Market Cap, 7-day Volume, Circulating Supply.
- **Pagination**: Navigate between pages and select the number of items per page.
- **Load More**: Load data in batches of 50 items using a Show more button.
- **IndexedDB**: Local caching for faster performance and fewer API requests.
- **Auto Refresh**: Data refreshes automatically every 30 seconds.
- **FadeLoader**: Animated loader while fetching data.
- Fully **responsive** and **center-aligned layout** using Tailwind CSS.

# Install dependencies

npm install

# or

yarn install

# Run the development server

npm run dev

# or

yarn dev

- **React 19 + Next.js 15**
- **TypeScript** for type safety
- **Tailwind CSS** for fast and responsive styling
- **IndexedDB** for local caching
- **React Query / Custom Hooks** for fetching data

src/
├─ components/
│ ├─ ui-kit/
│ │ ├─ table/
│ │ │ └─ Table.tsx
│ │ ├─ Button.tsx
│ │ └─ Pagination.tsx
│ └─ page/
│ └─ column.ts
├─ hooks/
│ └─ api/
│ └─ useGetMainList.ts
├─ utils/
│ ├─ indexedDB.ts
│ └─ type.ts
├─ app/
│ └─ page.tsx (Home page)
