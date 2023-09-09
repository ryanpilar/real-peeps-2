import Image from "next/image";
import { useRouter } from "next/router";
import { getDirection } from "@utils/get-direction";
import Link from "@components/ui/link";

interface CategoryBannerProps {
  className?: string;
}

const StoryPanel = ({ className = "mb-7" }) => {
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const {
    query: { slug },
  } = useRouter();

  const categoryTitle = slug?.toString().split("-").join("");

  return (
    <div
      className={`self-center rounded-md relative ${className} sm:px-5 md:px-7 lg:px-10 xl:px-20 2xl:px-40 py-10`}
    >
      <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-8xl 2xl:text-8xl text-heading px-5 py-5 w-full">
        Art <br></br>
        Apparel & <br></br>
        Community Threads
      </h1>

      <p className="p-7 w-full text-xl md:text-3xl lg:text-4xl xl:text-4xl text-condensed-black">
        Diving deep into the essence of real natural charcoal, we transform raw
        emotion into living experiences that you will eagerly display on your
        favorite walls and proudly wear down your local streets. Beyond just
        crafting bespoke works of art, we are creating a vibrant, living,
        moving, community canvas.
      </p>

      <div className="flex flex-row justify-center gap-x-5 gap-y-5 py-10">
        <Link
          href="/products"
          className={`bottom-3 inline-block bg-white shadow-product rounded-md text-heading text-sm py-2.5 transform transition duration-300 ease-in-out hover:bg-heading hover:text-white end-3 px-3 uppercase sm:bottom-5 sm:px-8 sm:end-5 sm:py-4 md:px-12 md:py-5 xl:px-20 xl:py-7 xl:text-xl xl:end-7 2xl:text-xl 2xl:px-20 2xl:py-7`}
        >
          Shop Art
        </Link>

        <Link
          href=""
          className={`bottom-3 inline-block bg-white shadow-product rounded-md text-heading text-sm py-2.5 transform transition duration-300 ease-in-out hover:bg-heading hover:text-white end-3 px-3 uppercase sm:bottom-5 sm:px-8 sm:end-5 sm:py-4 md:px-12 md:py-5 xl:px-20 xl:py-7 xl:text-xl xl:end-7 2xl:text-xl 2xl:px-20 2xl:py-7`}
        >
          Shop Apparel
        </Link>

        <Link
          href=""
          className={`bottom-3 inline-block bg-white shadow-product rounded-md text-heading text-sm py-2.5 transform transition duration-300 ease-in-out hover:bg-heading hover:text-white end-3 px-3 uppercase sm:bottom-5 sm:px-8 sm:end-5 sm:py-4 md:px-12 md:py-5 xl:px-20 xl:py-7 xl:text-xl xl:end-7 2xl:text-xl 2xl:px-20 2xl:py-7`}
        >
          Our Story
        </Link>
      </div>
    </div>
  );
};

export default StoryPanel;
