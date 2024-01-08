import { Outlet } from "@remix-run/react";
import Navigation from "~/components/Navigation";

function NotesLayout() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default NotesLayout;
