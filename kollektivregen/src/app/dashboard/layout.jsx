import "../../app/globals.css";
import Link from "next/link";

export default function DashLayout({ children }) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
