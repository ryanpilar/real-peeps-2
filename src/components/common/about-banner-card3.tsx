import Link from "@components/ui/link";
import Image from "next/image";
import { useWindowSize } from "@utils/use-window-size";
import cn from "classnames";
import { LinkProps } from "next/link";
import { useSsrCompatible } from "@utils/use-ssr-compatible";

interface BannerProps {
  banner: any;
  variant?: "rounded" | "default";
  effectActive?: boolean;
  className?: string;
  classNameInner?: string;
  href: LinkProps["href"];
  disableBorderRadius?: boolean;
}

function getImage(deviceWidth: number, imgObj: any) {
  return deviceWidth < 480 ? imgObj.mobile : imgObj.desktop;
}

export default function AboutBannerCard3({
  banner,
  className,
  variant = "rounded",
  effectActive = false,
  classNameInner,
  href,
  disableBorderRadius = false,
}: BannerProps) {
  const { width } = useSsrCompatible(useWindowSize(), { width: 0, height: 0 });
  const { title, image } = banner;
  const selectedImage = getImage(width, image);
  return (
    <section className="flex rounded-md" style={{ backgroundColor: "#526261" }}>
      <section className="w-1/2 ">
        <h1 className="text-3xl sm:text-4xl md:text-5xl  text-heading px-5 py-5 w-full">
          <strong>LEARN ABOUT</strong> - how we fuel organic creation.
        </h1>
        <p className="px-5 w-full text-2xl text-condensed-black">
          Put a bunch of stuff about stuf blah blah blah blah blah blah blah
          blah blah blah blah blah Put a bunch of stuff about stuf blah blah
          blah blah blah blah
        </p>
        <a
          href="#community-about"
          className={`bottom-3 inline-block bg-white shadow-product rounded-md text-heading text-sm transform transition duration-300 ease-in-out hover:bg-heading hover:text-white uppercase sm:bottom-5 end-3 sm:end-5 py-3 px-10 ml-5 my-10`}
          onClick={(e) => {
            e.preventDefault();
            const section = document.querySelector("#community-about");
            if (section) {
              section.scrollIntoView({
                behavior: "smooth",
              });
            } else {
              console.error("Element not found: #community-about");
            }
          }}
        >
          Learn More
        </a>
      </section>

      <section className="w-1/2 ">
        <h2 className="">put an image here</h2>
      </section>

      {/* <Link
        href={href}
        className={cn(
          'h-full group flex justify-center relative overflow-hidden',
          classNameInner
        )}
      >
        <Image
          src={selectedImage.url}
          width={selectedImage.width}
          height={selectedImage.height}
          alt={title}
          quality={100}
          className={cn('bg-gray-300 object-cover w-full', {
            'rounded-md': variant === 'rounded' && !disableBorderRadius,
          })}
        />
        {effectActive && (
          <div className="absolute top-0 ltr:-left-[100%] h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
        )}
      </Link> */}
    </section>
  );
}
