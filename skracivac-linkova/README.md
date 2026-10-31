This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Mini Skraćivač Linkova (Next.js App Router)

Full-stack aplikacija za skraćivanje linkova napravljena u Next.js-u sa lokalnom JSON perzistencijom podataka, pretragom sa *debounce*-om i praćenjem broja klikova.

---

### ⚠️ Važna napomena o Vercel-u i čuvanju u JSON fajl

Ova aplikacija koristi Node.js `fs` modul za čuvanje podataka u lokalni fajl (`data/links.json`). 

**Zašto ovo ne radi na Vercel-u?**
* **Immutabilan (nepromenljiv) fajl sistem:** Vercel koristi *serverless* arhitekturu. Kada se aplikacija pokrene na Vercel-u, fajl sistem je **read-only** (samo za čitanje) ili se kontejneri stalno gase i pale na novim serverima.
* **Gubljenje podataka:** Svaka promena (kreiranje novog linka ili brisanje) koja pokuša da upiše podatke u `links.json` na Vercel-u biće privremena ili će vratiti grešku, jer serverless okruženje ne dozvoljava trajno upisivanje fajlova na disk.

**Rešenje za produkciju:**
Za pravu produkcionu aplikaciju na Vercel-u, umesto lokalnog JSON fajla obavezno treba koristiti pravu bazu podataka (kao što su **PostgreSQL**, **MongoDB**, **Supabase** ili **Prisma**).