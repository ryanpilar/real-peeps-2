import BannerCard from "@components/common/banner-card";
import { ROUTES } from "@utils/routes";
import Image from "next/image";

interface BannerProps {
  className?: string;
}

const data = {
  heading: "",
  backgroundColour: "",
  story: "",
  image: {
    // path: "/assets/images/tshirts/white-tshirt-female-charcoal-lavender.png",
    // path: "/assets/images/tshirts/white-tshirt-male-picasso-like.png",

    // path: "/assets/images/tshirts/white-tshirt-female-standing-beside-tree.png",
    // path: "/assets/images/tshirts/white-tshirt-female-male-shop-background-30s.png",
    // path: "/assets/images/tshirts/white-tshirt-male-charcoal-dark-figure.png",
    path: "/assets/images/tshirts/white-tshirt-female-zucchini-flowers.png",

    alt: "Young adults, store employees showcasing fashionable white printed t-shirts, within an aesthetically appealing boutique adorned with warm, inviting lighting.",
    width: 1920,
    height: 1920,
  },
  imageTwo: {
    // path: "/assets/images/tshirts/white-tshirt-female-male-shop-background-30s.png",
    // path: "/assets/images/tshirts/white-tshirt-male-charcoal-dark-figure.png",
    path: "/assets/images/tshirts/white-tshirt-male-female-shop-bg-plain-tees.png",

    alt: "Young adults, store employees showcasing fashionable white printed t-shirts, within an aesthetically appealing boutique adorned with warm, inviting lighting.",
    width: 960,
    height: 960,
  },
  imageThree: {
    path: "/assets/images/hero/logo-real-peeps-rusty-store-sign.png",
    alt: "Young adults, store employees showcasing fashionable white printed t-shirts, within an aesthetically appealing boutique adorned with warm, inviting lighting.",
    width: 960,
    height: 960,
  },
};
const artSections = [
  {
    // path: "/assets/images/wall-art/og-wall-art-1-of-9.png",
    path: "/assets/images/tshirts/white-tshirt-male-charcoal-trees.png",

    alt: "Young adults, store employees showcasing fashionable white printed t-shirts, within an aesthetically appealing boutique adorned with warm, inviting lighting.",
    width: 1920,
    height: 1920,
  },
  {
    path: "/assets/images/wall-art/og-wall-art-2-of-9.png",
    // path: "/assets/images/tshirts/white-tshirt-male-charcoal-trees.png",
    // path: "/assets/images/tshirts/white-tshirt-male-charcoal-dark-figure.png",

    alt: "Young adults, store employees showcasing fashionable white printed t-shirts, within an aesthetically appealing boutique adorned with warm, inviting lighting.",
    width: 1920,
    height: 1920,
    hasPictureFrame: true,
  },
  {
    // path: "/assets/images/wall-art/og-wall-art-3-of-9.png",

    path: "/assets/images/tshirts/white-tshirt-female-lake-background.png",
    alt: "Young adults, store employees showcasing fashionable white printed t-shirts, within an aesthetically appealing boutique adorned with warm, inviting lighting.",
    width: 1920,
    height: 1920,
  },
  {
    path: "/assets/images/wall-art/og-wall-art-4-of-9.png",
    // path: "/assets/images/tshirts/white-tshirt-female-lake-background.png",
    // path: "/assets/images/tshirts/white-tshirt-female-charcoal-flowers.png",

    alt: "Young adults, store employees showcasing fashionable white printed t-shirts, within an aesthetically appealing boutique adorned with warm, inviting lighting.",
    width: 1920,
    height: 1920,
    hasPictureFrame: true,
  },
  {
    // path: "/assets/images/wall-art/og-wall-art-5-of-9.png",
    path: "/assets/images/tshirts/white-tshirt-male-charcoal-dark-figure.png",

    // path: "/assets/images/tshirts/white-tshirt-male-female-shop-bg-plain-tees.png",
    alt: "Young adults, store employees showcasing fashionable white printed t-shirts, within an aesthetically appealing boutique adorned with warm, inviting lighting.",
    width: 1920,
    height: 1920,
  },
  {
    path: "/assets/images/wall-art/og-wall-art-6-of-9.png",
    // path: "/assets/images/tshirts/white-tshirt-female-lake-background.png",

    // path: "/assets/images/tshirts/white-tshirt-male-female-shop-bg-plain-tees.png",

    alt: "Young adults, store employees showcasing fashionable white printed t-shirts, within an aesthetically appealing boutique adorned with warm, inviting lighting.",
    width: 1920,
    height: 1920,
    hasPictureFrame: true,
  },
  {
    // path: "/assets/images/tshirts/white-tshirt-female-male-shop-background-30s.png",
    path: "/assets/images/tshirts/white-tshirt-male-female-simple-circle-logo.png",

    alt: "Young adults, store employees showcasing fashionable white printed t-shirts, within an aesthetically appealing boutique adorned with warm, inviting lighting.",
    width: 1920,
    height: 1920,
  },
  {
    path: "/assets/images/wall-art/og-wall-art-8-of-9.png",

    alt: "Young adults, store employees showcasing fashionable white printed t-shirts, within an aesthetically appealing boutique adorned with warm, inviting lighting.",
    width: 1920,
    height: 1920,
    hasPictureFrame: true,
  },
  {
    // path: "/assets/images/wall-art/og-wall-art-9-of-9.png",
    // path: "/assets/images/tshirts/white-tshirt-female-lavender-flowers.png",
    path: "/assets/images/tshirts/white-tshirt-male-charcoal-sage.png",

    alt: "Young adults, store employees showcasing fashionable white printed t-shirts, within an aesthetically appealing boutique adorned with warm, inviting lighting.",
    width: 1920,
    height: 1920,
  },
];

const BigThreeSectionBlockReverse: React.FC<BannerProps> = ({
  className = "mb-2",
}) => {
  return (
    <div
      className={`self-center rounded-md relative ${className} sm:px-5 md:px-7 lg:px-10 xl:px-20 2xl:px-40`}
    >
      <div className="flex flex-col">
        <section className="flex flex-row flex-wrap lg:flex-nowrap h-2/3 gap-x-1 my-1">
          <div className="w-full lg:w-1/2 h-full pb-1 lg:pb-0">
            <div className="grid grid-cols-3 gap-2 w-full  h-full bg-[#576977] p-4">
              {artSections.slice(0, 9).map((section, index) => (
                <div
                  key={index}
                  className=" w-full hover:z-10 hover:scale-150 hover:drop-shadow-2xl transition-transform duration-300 p-1"
                  style={
                    {
                      // filter: "saturate(150%) contrast(105%)",
                      // boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.35)",
                      // border: "1px solid black",
                      // backgroundColor: "rgba(255,255,255,0.50)",
                    }
                  }
                >
                  <div id="Frames">
                    <div
                      className={`${
                        section.hasPictureFrame ? "Frame" : "drop-shadow-lg"
                      } flex`}
                    >
                      <Image
                        src={section.path}
                        alt={section.alt}
                        width={section.width}
                        height={section.height}
                        // layout="responsive"
                        className="rounded-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block w-full lg:w-1/2 h-full">
            <Image
              src={data.imageTwo.path}
              alt={data.imageTwo.alt}
              width={data.imageTwo.width}
              height={data.imageTwo.height}
              layout="responsive"
            />
          </div>
        </section>

        {/* Box 1: Fills full width */}
        <section className="h-1/3">
          <Image
            src={data.image.path}
            alt={data.image.alt}
            width={data.image.width}
            height={data.image.height}
            layout="responsive"
          />
        </section>
      </div>
    </div>
  );
};

export default BigThreeSectionBlockReverse;
