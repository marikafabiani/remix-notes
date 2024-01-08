import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import styles from "./styles/main.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export const ErrorBoundary = () => {
  const routeError = useRouteError();
  console.log(routeError);
  const message = routeError.message || "Oops! Something went wrong.";

  if (isRouteErrorResponse(routeError)) {
    return (
      <html lang="it">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <Meta />
          <Links />
          <title>{routeError.statusText}</title>
        </head>
        <body>
          <header></header>
          <main className="error">
            <h1>{routeError.statusText}</h1>
            <p>{routeError.data?.message || "Qualcosa è andato storto!"}</p>
            <p>
              Back to <Link to="/">home</Link>!
            </p>
          </main>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }

  return (
    <html lang="it">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <title>An error occurred!</title>
      </head>
      <body>
        <main className="error">
          <h1>An error occurred!</h1>
          <p>{message}</p>
          <p>
            Back <Link to="/">home</Link>!
          </p>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};
