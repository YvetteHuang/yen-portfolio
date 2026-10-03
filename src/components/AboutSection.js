import { dsFonts } from "@/lib/designSystem";

const paragraphs = [
  "I came to design through architecture — a field that taught me to think in systems, read how space shapes behavior, and care about the experience of being somewhere, not just how it looks.",
  "I'm curious by nature. I ask why before I ask how. I've been reading The Most Human Human lately — a book about what makes us distinctly human in an age of AI. Which feels fitting, given that I spend my days designing AI products. I think about this tension a lot.",
  "(And yes, I'm aware of the irony of trying to sound human here, while you reading it. How am I doing?)",
  "I'm drawn to work where design has real leverage — where the decisions I make today shape how the product grows tomorrow.",
  "Open to conversations, wherever that might be.",
];

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-28 mt-10 md:mt-12"
    >
      <div className="flex flex-col items-start gap-8 md:gap-12 lg:flex-row lg:gap-[7.5rem]">
        <h2
          id="about-heading"
          className={`${dsFonts.display.className} shrink-0 text-[clamp(2.5rem,6vw,4rem)] min-[1024px]:text-[4rem] font-semibold leading-normal text-white`}
        >
          About me
        </h2>

        <div className="min-w-0 flex-1 space-y-6 text-base font-light leading-relaxed text-white/90 md:text-lg">
          {paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
