"use client";

import { Background } from "@/components/background";
import Privacy from "./privacy.mdx";

const Page = () => {
  return (
    <Background>
      <section className="mx-auto max-w-2xl px-4 py-28 lg:pt-44 lg:pb-32">
        <article className="prose prose-lg dark:prose-invert">
          <Privacy />
        </article>
      </section>
    </Background>
  );
};

export default Page;
