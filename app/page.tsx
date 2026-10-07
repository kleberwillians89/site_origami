import Intro from "@/components/Intro";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LifePatrimonyScene from "@/components/LifePatrimonyScene";
import FoldingTomorrowScene from "@/components/FoldingTomorrowScene";
import VideoFeatureScene from "@/components/VideoFeatureScene";
import TeamScene from "@/components/TeamScene";
import DiagnosticCallout from "@/components/DiagnosticCallout";
import MonthlyLetterScene from "@/components/MonthlyLetterScene";
import Footer from "@/components/Footer";
import HomeScrollCoordinator from "@/components/HomeScrollCoordinator";

export default function Home() {
  return (
    <>
      <Intro />
      <Header />
      <main>
        <Hero />
        <LifePatrimonyScene />
        <FoldingTomorrowScene />
        <VideoFeatureScene />
        <TeamScene />
        <MonthlyLetterScene />
        <DiagnosticCallout />
      </main>
      <Footer />
      <HomeScrollCoordinator />
    </>
  );
}
