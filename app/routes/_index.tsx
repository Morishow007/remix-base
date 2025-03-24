import { title } from "@/config.shared";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: title() },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function HomePage() {
  return (
    <main className="container prose py-8">
      <h1>Homepage</h1>
      <Link className="no-underline" to="/about">
        About
      </Link>
    </main>
  );
}
