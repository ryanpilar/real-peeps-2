import Image from "next/image";
import { useRouter } from "next/router";
import { getDirection } from "@utils/get-direction";
import Link from "@components/ui/link";

interface CategoryBannerProps {
  className?: string;
}

const TheBeginning = ({ className = "mb-3 sm:mb-7" }) => {
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const {
    query: { slug },
  } = useRouter();

  const categoryTitle = slug?.toString().split("-").join("");

  const styles = {
    container: `
      self-center relative rounded-md ${className}
      py-10 px-1 sm:px-5 md:px-7 lg:px-10 xl:px-20 2xl:px-40
    `,
    title: `
      text-heading mb-10 w-full
      text-3xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-8xl 2xl:text-8xl
    `,
    paragraph: `
      lg:px-7 w-full 
      text-xl md:text-3xl lg:text-4xl xl:text-4xl 
      text-condensed-black
    `,
    link: `
      inline-block bottom-3 sm:bottom-5 end-3 sm:end-5 xl:end-7
      bg-white shadow-product rounded-md 
      text-heading text-sm xl:text-xl 2xl:text-xl
      py-3 sm:py-4 md:py-5 xl:py-7 2xl:py-7
      px-3 sm:px-8 md:px-12 xl:px-20 2xl:px-20
      transform transition duration-300 ease-in-out 
      hover:bg-heading hover:text-white 
      uppercase
    `,
    linksContainer: `
      flex flex-row justify-center 
      gap-x-5 gap-y-5 pt-10
    `,
  };

  return (
    <div id="beginning-about" className={styles.container}>
      <h1 className={styles.title}>
        <strong>The Story</strong> On <br />
        How Our Accidental <br />
        Artistry Began
        <br />
      </h1>

      <p className={styles.paragraph}>
        Our story began with an unanticipated mix of impatience and creativity,
        alongside the comical discovery that charcoal, in fact, doesn’t totally
        erase.
      </p>
      <p className={styles.paragraph}>
        An everyday kitchen chalkboard was transformed that day into an
        extraordinary canvas of expression. That 'ruined' chalkboard didn't meet
        its end with a fresh coat of paint. We took that mistake and continued
        to add sketch after sketch. The result? A canvas that is now pulsating
        with shared charcoal memories.
      </p>
      <p className={styles.paragraph}>
        Then we made another, and then another, and now we are here where we are
        today, so grateful that something like this could exist and evolve to
        where it has.
      </p>

      <div className={styles.linksContainer}>
        <Link href="/products" className={styles.link}>
          Shop Art
        </Link>

        <Link href="" className={styles.link}>
          Shop Apparel
        </Link>
      </div>
    </div>
  );
};

export default TheBeginning;
