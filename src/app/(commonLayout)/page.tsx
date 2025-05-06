import Banner from "@/components/modules/Banner/Banner";
import WhoWeAreSection from "@/components/modules/WhoWeAre/WhoRWe";
import OurFeaturesSection from "@/components/modules/OurServices/OurService";
import OurAdvantagesSection from "@/components/modules/OurAdvantage/OurAdvantage";
import EventCategories from "@/components/modules/Categories/Categories";
import FAQ from "@/components/modules/FAQ/FAQ";
import AllEvents from "@/components/modules/Events/AllEvents";



export default function Home() {
  return (
    <div className="">

      <Banner></Banner>
      <WhoWeAreSection></WhoWeAreSection>
      <AllEvents></AllEvents>
      <EventCategories></EventCategories>
      <OurFeaturesSection />
      <OurAdvantagesSection />
      <FAQ />
    </div>
  );
}
