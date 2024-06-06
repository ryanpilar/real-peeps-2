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

export default function AboutBannerCard2({
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
    <section
      className="flex h-full rounded-md"
      style={{ backgroundColor: "#80572c" }}
    >
      <section className="w-1/2 ">
        <h1 className="text-3xl sm:text-4xl md:text-5xl   text-white px-5 py-5 w-full">
          <strong>ABOUT</strong> - Our Immersive Experience.
        </h1>
        <p className="px-5 w-full text-2xl text-condensed-white">
          Put a bunch of stuff about stuf blah blah blah blah blah blah blah
          blah blah blah blah blah Put a bunch of stuff about stuf blah blah
          blah blah blah blah
        </p>
        <a
          href="#immersive-about"
          className={`bottom-3 inline-block bg-white shadow-product rounded-md text-heading text-sm transform transition duration-300 ease-in-out hover:bg-heading hover:text-white uppercase sm:bottom-5 end-3 sm:end-5 py-3 px-10 ml-5 my-10`}
          onClick={(e) => {
            e.preventDefault();
            const section = document.querySelector("#immersive-about");
            if (section) {
              section.scrollIntoView({
                behavior: "smooth",
              });
            } else {
              console.error("Element not found: #immersive-about");
            }
          }}
        >
          Learn More
        </a>
      </section>

      <section className="w-1/2 h-full flex flex-wrap justify-end items-center gap-y-2 my-3">
        <img
          src="https://picsum.photos/id/669/300/300"
          alt="the back of random person"
          className="h-1/4 img-hover"
        />
        <img
          src="https://picsum.photos/id/669/300/300"
          alt="the back of random person"
          className="h-1/4 img-hover"
        />
        <img
          src="https://picsum.photos/id/669/300/300"
          alt="the back of random person"
          className="h-1/4 img-hover"
        />
        <img
          src="https://picsum.photos/id/669/300/300"
          alt="the back of random person"
          className="h-1/4 img-hover"
        />
        <img
          src="https://picsum.photos/id/669/300/300"
          alt="the back of random person"
          className="h-1/4 img-hover"
        />
        <img
          src="https://picsum.photos/id/669/300/300"
          alt="the back of random person"
          className="h-1/4 img-hover"
        />
        <img
          src="https://picsum.photos/id/669/300/300"
          alt="the back of random person"
          className="h-1/4 img-hover"
        />
        <img
          src="https://picsum.photos/id/669/300/300"
          alt="the back of random person"
          className="h-1/4 img-hover"
        />
        <img
          src="https://picsum.photos/id/669/300/300"
          alt="the back of random person"
          className="h-1/4 img-hover"
        />
        <img
          src="https://picsum.photos/id/669/300/300"
          alt="the back of random person"
          className="h-1/4 img-hover"
        />
        <img
          src="https://picsum.photos/id/669/300/300"
          alt="the back of random person"
          className="h-1/4 img-hover"
        />
        <img
          src="https://picsum.photos/id/669/300/300"
          alt="the back of random person"
          className="h-1/4 img-hover"
        />
        <img
          src="https://picsum.photos/id/669/300/300"
          alt="the back of random person"
          className="h-1/4 img-hover"
        />
        <img
          src="https://picsum.photos/id/669/300/300"
          alt="the back of random person"
          className="h-1/4 img-hover"
        />
        <img
          src="https://picsum.photos/id/669/300/300"
          alt="the back of random person"
          className="h-1/4 img-hover"
        />
        <img
          src="https://picsum.photos/id/669/300/300"
          alt="the back of random person"
          className="h-1/4 img-hover"
        />
      </section>
    </section>
  );
}
