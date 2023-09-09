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

const StoryPanelThree: React.FC<Props> = ({
  data,
  className = "px-5 sm:px-8 md:px-16 2xl:px-24",
  disableBorderRadius = false,
}) => {
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const {
    query: { slug },
  } = useRouter();

  const categoryTitle = slug?.toString().split("-").join("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });
  const { t } = useTranslation();
  const { title, description, buttonText } = data;
  async function onSubmit(input: FormValues) {
    console.log(input, "data");
  }

  return (
    <div
      className={`self-center relative pb-20 pt-20 bg-[#8b7b6a] mb-1 ${data.backgroundColour}  sm:px-5 md:px-7 lg:px-10 xl:px-20 2xl:px-40 sm:mx-5 md:mx-7 lg:mx-10 xl:mx-20 2xl:mx-40`}
    >
      <h1 className="text-white text-3xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-8xl 2xl:text-8xl px-5 pt-20 pb-10 w-full">
        A Community <br></br>
        That Cares<br></br>
        About<br></br>
        You
      </h1>

      <p className="p-7 w-full text-xl md:text-3xl lg:text-4xl xl:text-4xl text-condensed-white">
        {data.story}
      </p>

      {/* <div className="flex flex-row justify-center gap-x-5 gap-y-5 py-10">
        <Link
          href=""
          className={`bottom-3 inline-block bg-white shadow-product rounded-md text-heading text-sm py-2.5 transform transition duration-300 ease-in-out hover:bg-heading hover:text-white end-3 px-3 uppercase sm:bottom-5 sm:px-5 sm:end-5 sm:py-4 md:px-5 md:py-4 xl:px-6 xl:py-5 xl:text-xl xl:end-7 2xl:text-xl 2xl:px-8 2xl:py-7`}
        >
          Sign-Up
        </Link>

        <Link
          href=""
          className={`bottom-3 inline-block bg-white shadow-product rounded-md text-heading text-sm py-2.5 transform transition duration-300 ease-in-out hover:bg-heading hover:text-white end-3 px-3 uppercase sm:bottom-5 sm:px-5 sm:end-5 sm:py-4 md:px-5 md:py-4 xl:px-6 xl:py-5 xl:text-xl xl:end-7 2xl:text-xl 2xl:px-8 2xl:py-7`}
        >
          About Us
        </Link>
        <Link
          href=""
          className={`bottom-3 inline-block bg-white shadow-product rounded-md text-heading text-sm py-2.5 transform transition duration-300 ease-in-out hover:bg-heading hover:text-white end-3 px-3 uppercase sm:bottom-5 sm:px-5 sm:end-5 sm:py-4 md:px-5 md:py-4 xl:px-6 xl:py-5 xl:text-xl xl:end-7 2xl:text-xl 2xl:px-8 2xl:py-7`}
        >
          The Store
        </Link>
      </div> */}

      <div
        className={`${className} ml-2 mr-2 mt-10 flex flex-col xl:flex-row justify-center xl:justify-between items-center rounded-lg bg-gray-200 py-10 md:py-14 lg:py-16`}
      >
        <div className="lg:-mt-2 xl:-mt-0.5 text-center xl:text-start mb-7 md:mb-8 lg:mb-9 xl:mb-0">
          <Text
            variant="mediumHeading"
            // className='mb-2 md:mb-2.5 lg:mb-3 xl:mb-3.5'
            className="sm:mb-0 md:mb-2.5 lg:mb-3 xl:mb-3.5"
          >
            {t(`${title}`)}
          </Text>
          <p className="text-body text-xs md:text-sm leading-6 md:leading-7">
            {t(`${description}`)}
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-shrink-0 w-full sm:w-96 md:w-[545px]"
          noValidate
        >
          <div className="flex flex-col sm:flex-row items-start justify-end">
            <Input
              disableBorderRadius={disableBorderRadius}
              placeholderKey="forms:placeholder-email-subscribe"
              type="email"
              variant="solid"
              className="w-full"
              inputClassName="px-4 lg:px-7 h-12 lg:h-14 text-center sm:text-start bg-white"
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
              className="mt-3 sm:mt-0 w-full sm:w-auto sm:ms-2 md:h-full flex-shrink-0"
            >
              <span className="lg:py-0.5">{t(`${buttonText}`)}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoryPanelThree;
