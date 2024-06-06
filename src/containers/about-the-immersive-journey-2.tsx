import Image from "next/image";
import { useRouter } from "next/router";
import { getDirection } from "@utils/get-direction";
import Link from "@components/ui/link";

interface BannerProps {
  data: any;
  className?: string;
}

const TheImmersiveJourney2: React.FC<BannerProps> = ({
  data,
  className = "mb-1",
}) => {
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const {
    query: { slug },
  } = useRouter();

  const categoryTitle = slug?.toString().split("-").join("");

  const styles = {
    container: `
      self-center relative 
      bg-[#202124] ${data.backgroundColour} ${className}
      px-1 sm:px-5 md:px-7 lg:px-10 xl:px-20 2xl:px-40
      pb-5 lg:pb-20
      sm:mx-5 md:mx-7 lg:mx-10 xl:mx-20 2xl:mx-40
    `,
    title: `
      text-white 
      text-3xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-8xl 2xl:text-8xl
      px-5 
      pt-10 md:pt-20 lg:pt-20 xl:pt-40 
      pb-10 
      w-full
    `,
    paragraph: `
      px-5 
      lg:py-3.5 
      w-full 
      text-xl md:text-3xl lg:text-4xl xl:text-4xl
      text-condensed-white
    `,
    link: `
      inline-block 
      bottom-3 sm:bottom-5 end-3 sm:end-5 xl:end-7
      bg-white 
      shadow-product 
      rounded-md 
      text-heading text-sm xl:text-xl 2xl:text-xl
      px-2.5 sm:px-5 md:px-5 xl:px-6 2xl:px-8
      py-2 sm:py-4 md:py-4 xl:py-5 2xl:py-7
      transform transition duration-300 ease-in-out 
      hover:bg-heading hover:text-white
      uppercase
    `,
    linksContainer: `
      flex flex-row 
      justify-center text-center 
      gap-y-5 
      ml-2 mr-2 py-10 md:py-16 lg:py-20 
      gap-x-2 sm:gap-x-3 md:gap-x-6
    `,
  };

  return (
    <div id="immersive-about" className={styles.container}>
      <h1 className={styles.title}>
        The <br />
        Immersive
        <br />
        Journey
      </h1>

      <p className={styles.paragraph}>
        Experience art that’s not just to be seen, but felt. Our larger works
        spanning 4x4, 4x6 and 4x8, pull you into a world of stories, characters,
        and imagery.
      </p>
      <p className={styles.paragraph}>
        Standing in front of our pieces, an instinct to search takes over. You
        might not know what for, but the urge is there.
      </p>
      <p className={styles.paragraph}>
        It's thrilling, mysterious, immersive, and oddly validating. The longer
        you look, the more you find — hidden treasures waiting to be discovered.
      </p>
      <div className={styles.linksContainer}>
        <Link href="" className={styles.link}>
          Rare Prints
        </Link>
        <Link href="" className={styles.link}>
          Original Works
        </Link>
        <Link href="" className={styles.link}>
          Limited Tees
        </Link>
      </div>
    </div>
  );
};

export default TheImmersiveJourney2;
