import Image from "next/image";
import { useRouter } from "next/router";
import { getDirection } from "@utils/get-direction";
import Link from "@components/ui/link";

interface BannerProps {
  data: any;
  className?: string;
}

const StoryPanelTwo: React.FC<BannerProps> = ({ data, className = "mb-1" }) => {
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const {
    query: { slug },
  } = useRouter();

  const categoryTitle = slug?.toString().split("-").join("");

  return (
    <div
      className={`self-center relative  pb-20 bg-[#202124] ${data.backgroundColour} ${className} sm:px-5 md:px-7 lg:px-10 xl:px-20 2xl:px-40 sm:mx-5 md:mx-7 lg:mx-10 xl:mx-20 2xl:mx-40`}
    >
      <h1 className="text-white pt-10 text-3xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-8xl 2xl:text-8xl md:pt-20 lg:pt-20 xl:pt-40  px-5 pb-10 w-full">
        Rare, <br></br>
        Limited Run<br></br>
        Products
      </h1>

      <p className="p-7 w-full text-xl md:text-3xl lg:text-4xl xl:text-4xl text-condensed-white">
        We craft art and apparel that are limited in run, unique and rare to
        this world.
      </p>
      <p className="p-7 w-full text-xl md:text-3xl lg:text-4xl xl:text-4xl text-condensed-white">
        You will also see other locals work here too. :)
      </p>

      <div className="flex flex-row justify-center text-center gap-y-5 ml-1 mr-1 py-10 gap-x-1 md:gap-x-5 ">
        <Link
          href=""
          className={`bottom-3 inline-block bg-white shadow-product rounded-md text-heading text-sm py-2.5 transform transition duration-300 ease-in-out hover:bg-heading hover:text-white end-3 px-3 uppercase sm:bottom-5 sm:px-5 sm:end-5 sm:py-4 md:px-5 md:py-4 xl:px-6 xl:py-5 xl:text-xl xl:end-7 2xl:text-xl 2xl:px-8 2xl:py-7`}
        >
          Tee Shirts
        </Link>

        <Link
          href=""
          className={`bottom-3 inline-block bg-white shadow-product rounded-md text-heading text-sm py-2.5 transform transition duration-300 ease-in-out hover:bg-heading hover:text-white end-3 px-3 uppercase sm:bottom-5 sm:px-5 sm:end-5 sm:py-4 md:px-5 md:py-4 xl:px-6 xl:py-5 xl:text-xl xl:end-7 2xl:text-xl 2xl:px-8 2xl:py-7`}
        >
          Rare Prints
        </Link>
        <Link
          href=""
          className={`bottom-3 inline-block bg-white shadow-product rounded-md text-heading text-sm py-2.5 transform transition duration-300 ease-in-out hover:bg-heading hover:text-white end-3 px-3 uppercase sm:bottom-5 sm:px-5 sm:end-5 sm:py-4 md:px-5 md:py-4 xl:px-6 xl:py-5 xl:text-xl xl:end-7 2xl:text-xl 2xl:px-8 2xl:py-7`}
        >
          Bags, Totes & Packs
        </Link>
      </div>
    </div>
  );
};

export default StoryPanelTwo;
