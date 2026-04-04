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

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
            This sky is built from astronomical coordinates and rendered as a living map.
            The stars are not just decoration. They represent the logic, curiosity, and
            structure behind how I build things.
          </p>

          <p className="mx-auto mt-12 max-w-xl text-lg leading-7 text-white/60">
            Scroll to see more content — the stars stay fixed above Vancouver.
          </p>
        </section>
      </div>
    </main>
  );
}