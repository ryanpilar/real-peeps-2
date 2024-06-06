import BannerCard from "@components/common/banner-card";
import { ROUTES } from "@utils/routes";
import Image from "next/image";

interface BannerProps {
  data: any;
  className?: string;
}

const BigImage: React.FC<BannerProps> = ({ data, className = "mt-2" }) => {
  return (
    <div
      className={`self-center rounded-md relative ${className} sm:px-5 md:px-7 lg:px-10 xl:px-20 2xl:px-40 `}
    >
      <div className="flex flex-col ">
        {/* Box 1: Fills full width */}
        <div className="">
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

export default BigImage;
