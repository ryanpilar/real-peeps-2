import BannerCard from "@components/common/banner-card";
import { ROUTES } from "@utils/routes";
import Image from "next/image";
import Link from "@components/ui/link";

interface BannerProps {
  data: any;
  className?: string;
}

const OriginalWorksBlock: React.FC<BannerProps> = ({
  data,
  className = "",
}) => {
  return (
    <div
      className={`self-center rounded-md relative ${className} sm:px-5 md:px-7 lg:px-10 xl:px-20 2xl:px-40 `}
    >
      <div className={`${className} flex flex-col max-w-[1920px] mx-auto`}>
        {/* <div className="flex line-break-gray mb-2"></div> */}

        {/* <h2
          className="bg-[#202124] text-white text-center pb-12 pt-12 font-light uppercase text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-8xl px-5 w-full"
          // className={`bg-[#202124] pb-2 sm:px-5 md:px-7 lg:px-10 lg:pb-5 xl:pb-10 2xl:px-40 text-heading text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-8xl`}
        > */}
        {/* {data.heading} */}
        {/* </h2> */}
        {/* <div className="flex line-break-gray mb-2"></div> */}
        <div className="text-center">
          <Image
            src={data.image.path}
            alt={data.image.alt}
            width={data.image.width}
            height={data.image.height}
            className="w-full h-auto "
          />
        </div>
        {/* <div className="relative text-center">
          <Image
            src={data.image2.path}
            alt={data.image2.alt}
            width={data.image2.width}
            height={data.image2.height}
            className="w-full h-auto"
          />

          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2">
            <Link
              href=""
              className={`bottom-3 inline-block bg-white shadow-product rounded-md text-heading text-sm py-2.5 transform transition duration-300 ease-in-out hover:bg-heading hover:text-white end-3 px-3 uppercase sm:bottom-5 sm:px-5 sm:end-5 sm:py-4 md:px-5 md:py-4 xl:px-6 xl:py-5 xl:text-xl xl:end-7 2xl:text-xl 2xl:px-8 2xl:py-7`}
            >
              Browse Art
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default OriginalWorksBlock;
