import Text from "@components/ui/text";
import Input from "@components/ui/input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

interface Props {
  className?: string;
  disableBorderRadius?: boolean;
}

type FormValues = { subscription_email: string }

const defaultValues = { subscription_email: "" };

/* ------------------------------------|| Subscribe To Newsletter - FORM ||------------------------------------ */

const SubscribeToNewsletter: React.FC<Props> = ({ className = "px-5 sm:px-8 md:px-16 2xl:px-24", disableBorderRadius = false }) => {

  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ defaultValues });

  async function sendDataToBrevo(input: FormValues) {

    setIsLoading(true); // Start loading

    try {
      const { data } = await axios.post("/api/subscribe", {
        email: input.subscription_email,
      });

      toast.success(data.message || "You've successfully subscribed to the newsletter!")
      reset()

    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Failed to subscribe to the newsletter.";
      console.error("Subscription failed:", errorMessage);
      toast.error(errorMessage);

    } finally {
      setIsLoading(false); // Stop loading regardless of the outcome
    }
  }

  const styles = {

    spinner: `
      animate-spin
      rounded-full
      h-5 w-5
      border-t-2 border-b-2
      border-white
    `,
  };

  return (
    <div className={`
      ml-2 mr-2 mt-10
      flex flex-col xl:flex-row
      justify-center xl:justify-between
      items-center gap-x-3
      rounded-lg bg-gray-200
      py-10 md:py-14 lg:py-
      ${className}
    `}
    >
      <div className={` lg:-mt-2 xl:-mt-0.5 text-center xl:text-start mb-7 md:mb-8 lg:mb-9 xl:mb-0 xl:w-3/5`}>
        <Text variant="mediumHeading" className="sm:mb-0 md:mb-2.5 lg:mb-3 xl:mb-3.5" >
          Be The First In Line
        </Text>
        <p className="text-body text-xs md:text-sm leading-6 md:leading-7">
          Subscribe, and be the first to know when we come out with new designs.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(sendDataToBrevo)}
        className="w-full flex flex-col md:flex-row xl:flex-col justify-center gap-y-2 sm:gap-x-2 xl:w-2/5"
        noValidate
      >
        <div className={`w-full md:w-3/5 lg:w-1/2 xl:w-full`}>
          <Input
            disableBorderRadius={disableBorderRadius}
            placeholder="Your email here"
            type="email"
            variant="outline"
            className="w-full text-center sm:text-start"
            inputClassName="h-14"
            {...register("subscription_email", {
              required: "Email is required",
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Email is not valid",
              },
            })}
            errorKey={errors.subscription_email?.message}
          />
        </div>

        <div className="flex flex-row justify-start items-center">
          <Button
            type="submit"
            disableBorderRadius={disableBorderRadius}
            className={`w-full items-start disabled:opacity-50 h-14`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className={styles.spinner}></div>
              </div>
            ) : (
              "Subscribe"
            )}
          </Button>

        </div>
      </form>
    </div>
  );
};

export default SubscribeToNewsletter