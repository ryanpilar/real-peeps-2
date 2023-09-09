import Container from "@components/ui/container";
import WidgetLink from "@components/widgets/widget-link";
import cn from "classnames";

interface WidgetsProps {
  widgets: {
    id: number;
    widgetTitle?: string;
    lists: any;
    isCompanyIntroduction?: boolean;
    logo?: any;
  }[];

  variant?: "contemporary";
}

const Widgets: React.FC<WidgetsProps> = ({ widgets, variant }) => {
  return (
    <Container>
      <div
        // className="self-center relative pb-20 bg-[#8b7b6a] mb-1 sm:px-5 md:px-7 lg:px-10 xl:px-20 2xl:px-40 sm:mx-5 md:mx-7 lg:mx-10 xl:mx-20 2xl:mx-40"
        className={cn(
          "self-center grid grid-cols-2 justify-content: justify-center md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-9 xl:gap-5  pb-9 md:pb-14 lg:pb-16 2xl:pb-20 3xl:pb-24 lg:mb-0.5 2xl:mb-0 3xl:-mb-1  sm:px-5 md:px-7 lg:px-10 xl:px-20 2xl:px-40 sm:mx-5 md:mx-7 lg:mx-10 xl:mx-20 2xl:mx-40"
          // {
          //   "xl:grid-cols-6": variant !== "contemporary",
          //   "xl:grid-cols-7": variant === "contemporary",
          // }
        )}
      >
        {widgets?.map((widget) => (
          <WidgetLink
            key={`footer-widget--key${widget.id}`}
            data={widget}
            className="pb-3 md:pb-0"
            variant="contemporary"
          />
        ))}
      </div>
    </Container>
  );
};

export default Widgets;
