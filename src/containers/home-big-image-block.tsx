import BannerCard from "@components/common/banner-card";
import { ROUTES } from "@utils/routes";
import Image from "next/image";

interface BannerProps {
  data: any;
  className?: string;
}

const BigImageBlock: React.FC<BannerProps> = ({ data, className = "" }) => {
  return (
    <div
      className={`self-center rounded-md relative ${className} sm:px-5 md:px-7 lg:px-10 xl:px-20 2xl:px-40 `}
    >
      <div className={`${className} flex flex-col max-w-[1920px] mx-auto `}>
        {/* <h2
          className={`pb-2 sm:px-5 md:px-7 lg:px-10 lg:pb-5 xl:pb-10 2xl:px-40 text-heading text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-8xl`}
        >
          {data.heading}
        </h2>
        <div className="flex line-break-gray mb-2"></div> */}
        <div className="text-center w-full h-auto">
          <Image
            src={data.image.path}
            alt={data.image.alt}
            width={data.image.width}
            height={data.image.height}
          />
        </div>
      </div>
    </div>
  );
};

export default BigImageBlock;
