import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

/**
	This type definition is used to define the props for the custom _app.js component.
	The AppProps type definition contains two properties, "Component" 
	and "pageProps", which are destructured in the function signature of the "CustomApp" 
	function. 
	
	The "Component" property refers to the page component that is being rendered, 
	and "pageProps" refers to the props for that page component.

	By importing the AppProps type definition, the TypeScript compiler is able to check that 
	the props passed to the "CustomApp" component are of the correct type. This helps to catch 
	type errors and ensure type safety in the application.
 */
import type { AppProps } from "next/app";

/**
	AnimatePresence animates components as they enter and exit the DOM.  
	it is passed a mode prop of "wait", which means that it will wait for the animation 
	to complete before removing the exiting component from the DOM. It is also passed an 
	onExitComplete prop, which is a function that will be called once the exiting component 
	has finished its exit animation.

	AnimatePresence wraps the entire application, and its purpose is to provide a container 
	for animating the transitions between different pages of the application.
*/
import { AnimatePresence } from "framer-motion";

/* 	Provides a QueryClient instance to the React component tree. This enables caching and 
	management of remote data queries in the application, and ensures that any data fetched using 
	useQuery or useMutation hooks is shared and synchronized across components. The QueryClient 
	is created using the useRef hook, so that it is only created once, even when the component is 
	re-rendered. 

	When you wrap your application with QueryClientProvider, you can access the QueryClient 
	instance using the useQueryClient hook, and then use it to perform various operations, such 
	as fetching data and updating the cache.
*/
import { QueryClient, QueryClientProvider } from "react-query";

/* 	
	The purpose of <Hydrate state={pageProps.dehydratedState}> in the provided code is to 
	hydrate the React Query cache on the client-side with the data that was serialized on the 
	server-side during server-side rendering.

	The Hydrate component is provided by the react-query/hydration package, and it is used to 
	restore the state of the QueryClient on the client-side. The state prop passed to it is an 
	object containing the serialized state of the QueryClient. This state is generated on the 
	server-side during server-side rendering, and it includes any data that was fetched using 
	the useQuery hook.

	By using the Hydrate component, the client-side QueryClient instance is initialized with the 
	same state as the server-side instance, which ensures that any data fetched during server-side 
	rendering is available immediately on the client-side, without the need to re-fetch it. This 
	can help improve the performance of the application and provide a better user experience. 
*/
import { Hydrate } from "react-query/hydration";

/**
    ManagedUIContext defines a React context object for managing the UI state of an application. 

    It starts by:
        1.  importing necessary dependencies and custom hooks, 
        2.  defining the shape of the state object, 
        3.  initializing the state object with default values, 
        4.  defining the available action types. 
        5.  define the available modal views and drawer views, 
        6.  define the type of the toast message text. 
        7.  The UIContext is then created with the default values, 
        8.  a reducer function is defined to accept a state and action and return a new state.

    The UIProvider is defined as a React functional component that sets up a state using 
    the useReducer hook with the uiReducer function and the initialState object, and returns 
    a CartProvider component wrapped around the UIContext.Provider component, which provides 
    the UI state object and dispatch function to all child components in the application.

    Overall, this code creates a context object for managing the UI state of an application, 
    which can be used to control various aspects of the UI such as the display of modals, 
    sidebars, and cart.

    URGENT ADD WISHLIST!
 */
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

/**
	This component provides a container for displaying toast notifications
 */
import { ToastContainer } from "react-toastify";

// import { ReactQueryDevtools } from "react-query/devtools";

/**
	By wrapping the CustomApp component with appWithTranslation, it allows the application to use 
	translation functions, such as useTranslation and Trans, which are provided by the next-i18next 
	library. These functions allow the application to support multiple languages, and to dynamically 
	switch between languages based on user preferences.
 */
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

// The "Component" property refers to the page component that is being rendered,
// and "pageProps" refers to the props for that page component.
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
