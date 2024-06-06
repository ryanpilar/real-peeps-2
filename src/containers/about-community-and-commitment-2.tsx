import Image from "next/image";
import { useRouter } from "next/router";
import { getDirection } from "@utils/get-direction";
import Link from "@components/ui/link";
import Text from "@components/ui/text";
import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";

interface Props {
  data: any;
  className?: string;
  disableBorderRadius?: boolean;
}

type FormValues = {
  subscription_email: string;
};

const defaultValues = {
  subscription_email: "",
};

const styles = {
  container: `
    self-center relative 
    md:pb-20 md:pt-15 
    bg-[#8b7b6a] 
    mb-1 pb-5 
    sm:px-5 md:px-7 lg:px-10 xl:px-20 2xl:px-40 
    sm:mx-5 md:mx-7 lg:mx-10 xl:mx-20 2xl:mx-40 
    rounded-bl-lg rounded-br-lg
  `,
  title: `
    text-white 
    text-3xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-8xl 2xl:text-8xl 
    px-5 pt-10 md:pt-28 pb-10 
    w-full
  `,
  paragraph: `
    px-5 lg:px-3.5 lg:py-2 
    w-full 
    text-xl md:text-3xl lg:text-4xl xl:text-4xl 
    text-condensed-white
  `,
  link: `
    bottom-3 inline-block 
    bg-white shadow-product rounded-md 
    text-heading text-sm py-2.5 
    transform transition duration-300 ease-in-out 
    hover:bg-heading hover:text-white 
    end-3 px-3 uppercase 
    sm:bottom-5 sm:px-5 sm:end-5 sm:py-4 
    md:px-5 md:py-4 xl:px-6 xl:py-5 xl:text-xl xl:end-7 
    2xl:text-xl 2xl:px-8 2xl:py-7
  `,
  subscriptionSection: `
    flex flex-col xl:flex-row 2xl:flex-col 3xl:flex-row 
    justify-center xl:justify-between 2xl:justify-center 3xl:justify-between 
    items-center rounded-lg bg-gray-200 
    ml-2 mr-2  md:mt-10 py-10 md:py-14 lg:py-16
  `,
  subscriptionText: `
    lg:-mt-2 xl:-mt-0.5 text-center xl:text-start 
    mb-7 md:mb-8 lg:mb-9 xl:mb-0 2xl:mb-7
  `,
  form: `
    flex-shrink-0 
    w-full sm:w-96 md:w-[545px]
  `,
  inputSection: `
    flex flex-col sm:flex-row 3xl:flex-col 
    items-start justify-end
  `,
  input: `
    w-full px-4 lg:px-7 h-12 lg:h-14 
    text-center sm:text-start bg-white
  `,
  button: `
    w-full sm:w-auto sm:ms-2 md:h-full flex-shrink-0
    mt-3 sm:mt-0 xl:m-0 2xl:mx-7 3xl:mx-0
  `,
};

const CommunityAndCommitment2: React.FC<Props> = ({
  data,
  className = "px-5 sm:px-8 md:px-16 2xl:px-24",
  disableBorderRadius = false,
}) => {
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const {
    query: { slug },
  } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });

  async function onSubmit(input: FormValues) {
    console.log(input, "data");
  }

  // Dynamically add background color from data to the container style
  const containerStyle = `${styles.container} ${data.backgroundColour}`;

  return (
    <div id="community-about" className={containerStyle}>
      <h1 className={styles.title}>
        A Community <br />
        That Cares
        <br />
        About
        <br />
        You
      </h1>

      <p className={styles.paragraph}>
        We're committed to fueling the organic creation of mesmerizing pieces of
        art.
      </p>
      <p className={styles.paragraph}>
        Each piece you take home is a testament to our shared journey. Whether
        it's a replica canvas, a captured photo print, a statement t-shirt, or a
        travel tumbler, you're not just making a purchase, you're backing a
        community that values genuine, organic creation.
      </p>
      <p className={styles.paragraph} style={{ paddingBottom: "40px" }}>
        In the age of fleeting digital moments, we invite you to pause, to
        experience, and perhaps, become a part of our story.
      </p>
      <div className={`${styles.subscriptionSection} ${className}`}>
        <div className={styles.subscriptionText}>
          <Text
            variant="mediumHeading"
            className="sm:mb-0 md:mb-2.5 lg:mb-3 xl:mb-3.5"
          >
            Be The First In Line
          </Text>
          <p className="text-body text-xs md:text-sm leading-6 md:leading-7">
            Subscribe, and be the first to know when we come out with new
            designs.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
          noValidate
        >
          <div className={styles.inputSection}>
            <Input
              disableBorderRadius={disableBorderRadius}
              placeholderKey="forms:placeholder-email-subscribe"
              type="email"
              variant="solid"
              className={styles.input}
              {...register("subscription_email", {
                required: "forms:email-required",
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "forms:email-error",
                },
              })}
              errorKey={errors.subscription_email?.message}
            />
            <Button
              disableBorderRadius={disableBorderRadius}
              className={styles.button}
            >
              <span className="lg:py-0.5">Subscribe</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommunityAndCommitment2;
