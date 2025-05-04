<<<<<<< HEAD
=======

>>>>>>> c733f63f1c26200be0658209a842caa6b9985d93
import Banner from "@/components/modules/Banner/Banner";
import WhoWeAreSection from "@/components/modules/WhoWeAre/WhoRWe";
import OurFeaturesSection from "@/components/modules/OurServices/OurService";
import OurAdvantagesSection from "@/components/modules/OurAdvantage/OurAdvantage";
<<<<<<< HEAD
// import EventCategoriesAndFAQ from "@/components/modules/Categories/Categories";
=======
>>>>>>> c733f63f1c26200be0658209a842caa6b9985d93
import EventCategories from "@/components/modules/Categories/Categories";
import FAQ from "@/components/modules/FAQ/FAQ";



export default function Home() {
  return (
    <div className="">

      <Banner></Banner>
      <WhoWeAreSection></WhoWeAreSection>
      <EventCategories></EventCategories>
      <OurFeaturesSection />
      <OurAdvantagesSection />
      <FAQ />
    </div>
  );
}
