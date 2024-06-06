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

  const styles = {
    container: `
      self-center rounded-md relative ${className}
      sm:px-5 md:px-7 lg:px-10 xl:px-20 2xl:px-40 sm:py-10
    `,
    title: `
      text-heading text-3xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-8xl 2xl:text-8xl
      px-5 py-5 w-full
    `,
    paragraph: `
      p-7 w-full text-xl md:text-3xl lg:text-4xl xl:text-4xl
      text-condensed-black
    `,
    link: `
      inline-block bottom-3 sm:bottom-5 end-3 sm:end-5 xl:end-7
      bg-white shadow-product rounded-md text-heading text-sm
      py-2.5 sm:py-4 md:py-5 xl:py-7 2xl:py-7
      px-3 sm:px-8 md:px-12 xl:px-20 2xl:px-20
      transform transition duration-300 ease-in-out hover:bg-heading hover:text-white
      uppercase
    `,
    linksContainer: `
      flex flex-row justify-center
      gap-x-3 gap-y-5 py-5 sm:py-10
    `,
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Art <br />
        Apparel & <br />
        Community Threads
      </h1>

      <p className={styles.paragraph}>
        Diving deep into the essence of real natural charcoal, we transform raw
        emotion into living experiences that you will eagerly display on your
        favorite walls and proudly wear down your local streets. Beyond just
        crafting bespoke works of art, we are creating a vibrant, living,
        moving, community canvas.
      </p>

      <div className={styles.linksContainer}>
        <Link href="/products" className={styles.link}>
          Shop Art
        </Link>
        <Link href="" className={styles.link}>
          Shop Apparel
        </Link>
        <Link href="" className={styles.link}>
          Our Story
        </Link>
      </div>
    </div>
  );
};

export default StoryPanel;
