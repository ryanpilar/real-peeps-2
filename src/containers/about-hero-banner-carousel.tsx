import BannerCard from "@components/common/banner-card";
import Carousel from "@components/ui/carousel/carousel";
// import { homeOneHeroBanner as banners } from '@framework/static/banner';
import { useWindowSize } from "@utils/use-window-size";
import { ROUTES } from "@utils/routes";
import { SwiperSlide } from "swiper/react";
import { useSsrCompatible } from "@utils/use-ssr-compatible";
import AboutBannerCard from "@components/common/about-banner-card";
import AboutBannerCard2 from "@components/common/about-banner-card2";
import AboutBannerCard3 from "@components/common/about-banner-card3";

export const homeOneBanner = {
  id: 1,
  title: "Holiday Offers",
  slug: "holiday-offers",
  image: {
    mobile: {
      url: "/assets/images/banner/banner-mobile-1.jpg",
      width: 450,
      height: 120,
    },
    desktop: {
      url: "/assets/images/banner/banner-1.jpg",
      width: 1800,
      height: 270,
    },
  },
};

export const banners = [
  {
    id: 1,
    title: "winter collection",
    slug: "winter-collection",
    image: {
      mobile: {
        url: "/assets/images/hero/banner-mobile-1.jpg",
        width: 480,
        height: 275,
      },
      desktop: {
        url: "/assets/images/hero/banner-1.jpg",
        width: 1800,
        height: 800,
      },
    },
  },
  {
    id: 2,
    title: "gift collection",
    slug: "gift-collection",
    image: {
      mobile: {
        url: "/assets/images/hero/banner-mobile-2.jpg",
        width: 480,
        height: 275,
      },
      desktop: {
        url: "/assets/images/hero/banner-2.jpg",
        width: 1800,
        height: 800,
      },
    },
  },
  {
    id: 3,
    title: "party collection",
    slug: "party-collection",
    image: {
      mobile: {
        url: "/assets/images/hero/banner-mobile-3.jpg",
        width: 480,
        height: 275,
      },
      desktop: {
        url: "/assets/images/hero/banner-3.jpg",
        width: 1800,
        height: 800,
      },
    },
  },
];

const breakpoints = {
  "1500": {
    slidesPerView: 2,
  },
  "0": {
    slidesPerView: 1,
  },
};

const HeroBannerCarousel: React.FC = () => {
  const { width } = useSsrCompatible(useWindowSize(), { width: 0, height: 0 });
  return (
    <div className="heroBannerOne relative max-w-[1920px] mb-5 md:mb-12 lg:mb-14 2xl:mb-16 mx-auto overflow-hidden px-4 md:px-8 2xl:px-0">
      <Carousel
        loop={true}
        breakpoints={breakpoints}
        centeredSlides={width < 1500 ? false : true}
        autoplay={{
          delay: 5000,
        }}
        className="mx-0"
        buttonGroupClassName="hidden"
        pagination={{
          clickable: true,
        }}
      >
        {/* {banners?.map((banner: any) => (
          <SwiperSlide
            className="carouselItem px-0 2xl:px-3.5"
            key={`banner--key-${banner?.id}`}
          >
            <AboutBannerCard
              banner={banner}
              href={`${ROUTES.COLLECTIONS}/${banner.slug}`}
            />
          </SwiperSlide>
        ))} */}
        <SwiperSlide
          className="carouselItem px-0 2xl:px-3.5"
          key={`banner--key-${banners[0]?.id}`}
        >
          <AboutBannerCard
            banner={banners[0]}
            href={`${ROUTES.COLLECTIONS}/${banners[0].slug}`}
          />
        </SwiperSlide>
        <SwiperSlide
          className="carouselItem px-0 2xl:px-3.5"
          key={`banner--key-${banners[1]?.id}`}
        >
          <AboutBannerCard2
            banner={banners[1]}
            href={`${ROUTES.COLLECTIONS}/${banners[1].slug}`}
          />
        </SwiperSlide>
        <SwiperSlide
          className="carouselItem px-0 2xl:px-3.5"
          key={`banner--key-${banners[2]?.id}`}
        >
          <AboutBannerCard3
            banner={banners[2]}
            href={`${ROUTES.COLLECTIONS}/${banners[2].slug}`}
          />
        </SwiperSlide>
      </Carousel>
    </div>
  );
};

export default HeroBannerCarousel;
