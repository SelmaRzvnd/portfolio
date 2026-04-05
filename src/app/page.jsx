import StarField from "@/components/StarField";

export default function Home() {
  return (
    <main className="relative h-screen overflow-hidden bg-[#050816] text-white selection:bg-blue-500/30">
      <StarField />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 pt-20">
        <section className="max-w-3xl text-center">
        </section>
      </div>
    </main>
  );
}