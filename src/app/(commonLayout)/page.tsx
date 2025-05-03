import Banner from "@/components/modules/Banner/Banner";
import OurFeaturesSection from "@/components/modules/OurServices/page";
import WhoWeAreSection from "@/components/modules/WhoWeAre/WhoRWe";

export default function Home() {
  return (
    <div className="">
      <Banner></Banner>
      <WhoWeAreSection></WhoWeAreSection>

      <OurFeaturesSection />
    </div>
  );
}
