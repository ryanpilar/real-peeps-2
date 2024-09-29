import SubscribeToNewsletter from "@components/forms/subscribe-to-newsletter"

interface Props {
  data: any
  className?: string
  disableBorderRadius?: boolean
}

/* ------------------------------------|| Story Panel Three ||------------------------------------ */


const StoryPanelThree: React.FC<Props> = ({ data }) => {

  const styles = {
    paragraph: `p-7 w-full text-xl md:text-3xl lg:text-4xl xl:text-4xl text-condensed-white`,
  };

  return (
    <div className={`
      self-center relative pb-20 pt-20 bg-[#8b7b6a] mb-1 ${data.backgroundColour}
      sm:px-5 md:px-7 lg:px-10 xl:px-20 2xl:px-40 
      sm:mx-5 md:mx-7 lg:mx-10 xl:mx-20 2xl:mx-40
    `}>
      <h1 className={`
        text-white text-3xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-8xl 2xl:text-8xl
        px-5 pt-20 pb-10 w-full
      `}
      >
        A Community <br />
        That Cares
        <br />
        About
        <br />
        You
      </h1>

      <p className={styles.paragraph}>
        Our brand is a community, a space where creativity meets collaboration.
        Here, every purchase is a step into a collective journey, shaping the
        art we create and the stories we share.
      </p>
      <p className={styles.paragraph}>
        Our brand is a community, a space where creativity meets collaboration.
        Here, every purchase is a step into a collective journey, shaping the
        art we create and the stories we share.
      </p>

      <SubscribeToNewsletter />

    </div>
  )
}

export default StoryPanelThree