import { getAccordions } from "@/lib/contentful";
import FAQ from "@/components/FAQ";

export default async function Home() {
  // Fetch accordion data from Contentful (Server Component)
  const accordionEntries = await getAccordions();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="w-full">
          <h1 className="mb-8 text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            FAQ
          </h1>
          {accordionEntries.length > 0 ? (
            <div className="space-y-4">
              {accordionEntries.map((accordion) => (
                <FAQ
                  key={accordion.id}
                  title={accordion.title}
                  content={accordion.accordionItems}
                />
              ))}
            </div>
          ) : (
            <p className="text-zinc-600 dark:text-zinc-400">
              No accordion entries found.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
