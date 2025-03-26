import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";

import { GlobalPendingIndicator } from "@/components/global-pending-indicator";
import { Header } from "@/components/header";
import { ThemeSwitcherSafeHTML } from "@/components/theme-switcher";

import { Toaster } from "./components/ui/toaster";
import { CartProvider } from "./context/CartContext";
import "./globals.css";

function App({ children }: { children: React.ReactNode }) {
  return (
    <ThemeSwitcherSafeHTML lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <GlobalPendingIndicator />
        <header className="w-full border-b border-black">
          <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8">
            <Header />
          </div>
        </header>
        <main className="flex-grow">
          <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </ThemeSwitcherSafeHTML>
  );
}

export default function Root() {
  return (
    <CartProvider>
      <App>
        <Toaster />
        <Outlet />
      </App>
    </CartProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let status = 500;
  let message = "An unexpected error occurred.";
  if (isRouteErrorResponse(error)) {
    status = error.status;
    switch (error.status) {
      case 404:
        message = "Page Not Found";
        break;
    }
  } else {
    console.error(error);
  }

  return (
    <App>
      <div className="container prose py-8">
        <h1>{status}</h1>
        <p>{message}</p>
      </div>
    </App>
  );
}
