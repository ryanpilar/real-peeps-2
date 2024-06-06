import BannerCard from "@components/common/banner-card";
import { ROUTES } from "@utils/routes";
import Image from "next/image";

interface BannerProps {
  data: any;
  className?: string;
}

const BigImagePanelReverse: React.FC<BannerProps> = ({
  data,
  className = "mt-2",
}) => {
  return (
    <div
      className={`self-center rounded-md relative ${className} sm:px-5 md:px-7 lg:px-10 xl:px-20 2xl:px-40 `}
    >
      <div className="flex flex-col ">
        {/* Box 1 and Box 2: Equal width */}
        <div className="flex flex-row h-2/3 gap-x-2">
          <div className="flex-1">
            <Image
              src={data.imageTwo.path}
              alt={data.imageTwo.alt}
              width={data.imageTwo.width}
              height={data.imageTwo.height}
            />
          </div>
          <div className="flex-1">
            <Image
              src={data.imageThree.path}
              alt={data.imageThree.alt}
              width={data.imageThree.width}
              height={data.imageThree.height}
            />
          </div>
        </div>
        {/* Box 2: Fills full width */}
        <div className="h-1/3">
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

export default BigImagePanelReverse;
