import StarField from "@/components/StarField";

export default function Home() {
  return (
    <main className="relative min-h-[200vh] bg-[#050816] text-white selection:bg-blue-500/30">
      <StarField />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 pt-20">
        <section className="max-w-3xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Selma Rezavand
          </h1>
        </section>
      </div>
    </main>
  );
}