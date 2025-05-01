import Image from "next/image";
import img from '../assets/images/banner1.png'
import Banner from "@/components/modules/Banner/Banner";
import WhoWeAreSection from "@/components/modules/WhoWeAre/WhoRWe";
import OurFeaturesSection from "@/components/modules/OurServices/page";
import OurAdvantagesSection from "@/components/modules/OurAdvantage/OurAdvantage";


export default function Home() {
  return (
    <div className="">

      <Banner></Banner>
      <WhoWeAreSection></WhoWeAreSection>
      <OurFeaturesSection />
      <OurAdvantagesSection/>
    </div>
  );
}
