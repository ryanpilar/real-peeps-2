import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

import type { AppProps } from "next/app";

import { AnimatePresence } from "framer-motion";

import { QueryClient, QueryClientProvider } from "react-query";

import { Hydrate } from "react-query/hydration";

import { ManagedUIContext } from "@contexts/ui.context";

/**
  ManagedModal is a similar component that provides a global state for managing the state of a 
  modal (i.e., a popup dialog that appears on top of the page content). It also uses the useContext 
  hook to access the UI context provided by ManagedUIContext. This allows it to retrieve the current 
  state of the modal and update it as necessary.
 */
import ManagedModal from "@components/common/modal/managed-modal";

/**
  ManagedDrawer enables the drawer to be opened and closed from anywhere in the application without the need 
  for prop drilling.
 */
import ManagedDrawer from "@components/common/drawer/managed-drawer";

import { ToastContainer } from "react-toastify";

// import { ReactQueryDevtools } from "react-query/devtools";

import { appWithTranslation } from "next-i18next";

import { DefaultSeo } from "@components/common/default-seo";

// Load Open Sans and satisfy typeface font
import "@fontsource/open-sans";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/satisfy";
// external
import "react-toastify/dist/ReactToastify.css";
// base css file
import "@styles/scrollbar.css";
import "@styles/swiper-carousel.css";
import "@styles/custom-plugins.css";
import "@styles/tailwind.css";
import "@styles/rc-drawer.css";
import "@styles/snipcart.css";
import "@styles/misc-styles.css";
// flippy-card
import "@styles/flippy-card.css";
// picture frames
import "@styles/picture-frames.css";

// checks whether the language of the locale is right-to-left (RTL) or not.
import { getDirection } from "@utils/get-direction";

// Scrolls to the top of the window if the window object is defined
function handleExitComplete() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0 });
  }
}
/**
  The purpose of the Noop function is to provide a default layout component that will be used 
  in case the individual pages of the application do not define their own layout component. 
  The function takes in a children prop which represents the children of the component, and 
  simply returns those children. The name "Noop" stands for "no operation", and reflects the 
  fact that this function does not actually do anything other than returning its children. 
	
  The React.PropsWithChildren<{}> type indicates that the function takes in props that may 
  include children, but does not require any other props to be passed in.
 */
function Noop({ children }: React.PropsWithChildren<{}>) {
  return <>{children}</>;
}

const CustomApp = ({ Component, pageProps }: AppProps) => {
  /**
  The useRef hook is used to create a mutable variable that can persist across component 
  renders. The queryClientRef variable is initially set to undefined.

  The if statement if (!queryClientRef.current) checks if the queryClientRef variable has 
  been assigned a value or not. If the queryClientRef variable is undefined, it creates a 
  new QueryClient instance and assigns it to the queryClientRef.current variable. This ensures 
  that only one QueryClient instance is created and used throughout the application.

  The QueryClientProvider component later provides the QueryClient instance to the React 
  component tree, enabling caching and management of remote data queries in the application, 
  and ensuring that any data fetched using useQuery or useMutation hooks is shared and 
  synchronized across components.
  */
  const queryClientRef = useRef<any>();

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  const router = useRouter();

  const dir = getDirection(router.locale);

  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);

  // The "Component" property refers to the page component that is being rendered,
  const Layout = (Component as any).Layout || Noop;

  return (
    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
      <QueryClientProvider client={queryClientRef.current}>
        {/* 
          pageProps.dehydratedState is a property that is passed to the Hydrate component in Next.js. 
          It is used for rehydrating the client-side state that was serialized and dehydrated on the 
          server.

          The dehydratedState object is generated during the server-side rendering process in Next.js. 
          When a page is rendered on the server, any data required for that page to be displayed is 
          collected and serialized. This serialized data is then passed as the dehydratedState property 
          to the Hydrate component when the page is sent to the client.

          On the client-side, the Hydrate component takes this dehydratedState and uses it to restore 
          the state of the page to what it was on the server, including any server-generated data. This 
          helps to ensure that the user sees the same content and page state as they did on the server, 
          leading to a smoother user experience. 
		  */}

        {/* @ts-ignore */}
        <Hydrate state={pageProps.dehydratedState}>
          {/* @ts-ignore */}
          <ManagedUIContext>
            <Layout pageProps={pageProps}>
              <DefaultSeo />

              <Component {...pageProps} key={router.route} />
              <ToastContainer />
            </Layout>
            <ManagedModal />
            <ManagedDrawer />
          </ManagedUIContext>
        </Hydrate>
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </AnimatePresence>
  );
};

export default appWithTranslation(CustomApp);
