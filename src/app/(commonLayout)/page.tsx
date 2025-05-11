import Banner from "@/components/modules/Banner/Banner";
import EventCategories from "@/components/modules/Categories/Categories";
import HomeAllEvents from "@/components/modules/Events/HomeAllEvents";
import FAQ from "@/components/modules/FAQ/FAQ";
import OurAdvantagesSection from "@/components/modules/OurAdvantage/OurAdvantage";
import OurFeaturesSection from "@/components/modules/OurServices/OurService";
import WhoWeAreSection from "@/components/modules/WhoWeAre/WhoRWe";
import PremiumEventCard from "@/components/shared/premium-event-card";

export default function Home() {
  return (
    <div className="">
      <Banner></Banner>
      <WhoWeAreSection></WhoWeAreSection>
      <HomeAllEvents></HomeAllEvents>
      <EventCategories></EventCategories>
      <OurFeaturesSection />
      <OurAdvantagesSection />
      <FAQ />
      <PremiumEventCard />
    </div>
  );
}
