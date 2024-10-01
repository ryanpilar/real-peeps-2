import { NextSeo } from "next-seo"
import Header from "@components/layout/header/header"
import Footer from "@components/layout/footer/footer"
import MobileNavigation from "@components/layout/mobile-navigation/mobile-navigation"

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (

    <div className="flex flex-col min-h-screen">
      <NextSeo
        additionalMetaTags={[{
          name: "viewport",
          content: "width=device-width, initial-scale=1.0",
        },
        ]}
        title="Real Peeps - Creative collaborative art, clothing and accessories that will rock your socks and make you the envy of all your cool friends"
        description="Unique creative creations, limited run clothing & accessories that will rock your socks and make you the envy of all your cool friends"
        canonical="https://real-peeps-2.netlify.app/"
        openGraph={{
          url: "https://real-peeps-2.netlify.app/",
          title: "Real Peeps - Creative collaborative art, clothing and accessories that will rock your socks and make you the envy of all your cool friends",
          description: "Unique creative creations, limited run clothing & accessories that will rock your socks and make you the envy of all your cool friends",
          images: [
            {
              url: "/assets/images/og-image-01.png",
              width: 800,
              height: 600,
              alt: "Og Image Alt",
            },
            {
              url: "/assets/images/og-image-02.png",
              width: 900,
              height: 800,
              alt: "Og Image Alt Second",
            },
          ],
        }}
      />

      <Header />

      <main
        className="relative flex-grow"
        style={{
          minHeight: "-webkit-fill-available",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
      </main>

      <Footer />
      <MobileNavigation />



    </div>
  )
}
