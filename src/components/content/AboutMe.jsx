export default function AboutMe() {
  return (
    <div className="space-y-6">

      {/* Bio */}
      <div className="bg-white/5 p-5 rounded-xl border border-white/10">
        <p className="text-xl font-semibold mb-3">
          Combining a love for physics and computer science to ask big questions 
          and build the tools to answer them. Driven by curiosity, guided by logic, 
          and always looking for the next problem worth solving.
        </p>
      </div>

      {/* Contact */}
      <div className="bg-white/5 p-4 rounded-xl border border-white/10">
        <h3 className="text-lg font-bold mb-3">Contact</h3>

        <div className="flex items-center gap-8 text-sm">

          <a 
            href="mailto:selmarzv@student.ubc.ca"
            className="hover:text-blue-300 transition-colors font-medium"
          >
            Email
          </a>

          <a 
            href="https://github.com/SelmaRzvnd"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300 transition-colors font-medium"
          >
            GitHub
          </a>

          <a 
            href="https://www.linkedin.com/in/selma-rezavand/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300 transition-colors font-medium"
          >
            LinkedIn
          </a>

        </div>
      </div>

    </div>
  );
}
