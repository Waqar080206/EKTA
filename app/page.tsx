import { Navbar } from "@/components/Navbar";
import { RevealController } from "@/components/RevealController";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { HowItWorks } from "@/components/HowItWorks";
import { Capabilities } from "@/components/Capabilities";
import { ProductPreview } from "@/components/ProductPreview";
import { Traceability } from "@/components/Traceability";
import { Impact } from "@/components/Impact";
import { Sectors } from "@/components/Sectors";
import { Governance } from "@/components/Governance";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <RevealController />
      <main id="main">
        <Hero />
        <Problem />
        <HowItWorks />
        <Capabilities />
        <ProductPreview />
        <Traceability />
        <Impact />
        <Sectors />
        <Governance />
      </main>
      <Footer />
    </>
  );
}
