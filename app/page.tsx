import { getAccordions } from "@/lib/contentful";
import FAQ from "@/components/FAQ";

export default async function Home() {
  const accordionEntries = await getAccordions();

  return (
    <div className="min-h-screen bg-[#0D5D9A] font-sans">
      <main className="min-h-screen w-full max-w-4xl mx-auto py-16 px-8 sm:px-16">
        <div className="w-full">
          <h1 className="mb-12 text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-[#fff7ca]">
            FAQ
          </h1>
          {accordionEntries.length > 0 ? (
            <div className="space-y-6">
              {accordionEntries.map((accordion, index) => (
                <FAQ
                  key={accordion.id + "_" + index}
                  title={accordion.title}
                  content={accordion.accordionItems}
                />
              ))}
            </div>
          ) : (
            <p className="text-white/80">No accordion entries found.</p>
          )}
        </div>
      </main>
    </div>
  );
}
