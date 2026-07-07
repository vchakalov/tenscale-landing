import { Header } from "@/components/agentica/Header";
import { Hero } from "@/components/agentica/Hero";
import { ProofBar } from "@/components/agentica/ProofBar";
import { HowItWorks } from "@/components/agentica/HowItWorks";
import { Features } from "@/components/agentica/Features";
import { Results } from "@/components/agentica/Results";
import { HowWeStart } from "@/components/agentica/HowWeStart";
import { Comparison } from "@/components/agentica/Comparison";
import { Trust } from "@/components/agentica/Trust";
import { Faq } from "@/components/agentica/Faq";
import { FooterCta } from "@/components/agentica/FooterCta";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProofBar />
        <HowItWorks />
        <Features />
        <Results />
        <HowWeStart />
        <Comparison />
        <Trust />
        <Faq />
      </main>
      <FooterCta />
    </>
  );
}
