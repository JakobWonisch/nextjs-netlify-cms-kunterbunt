import { GetStaticProps, GetStaticPaths } from "next";
import renderToString from "next-mdx-remote/render-to-string";
import { MdxRemote } from "next-mdx-remote/types";
import hydrate from "next-mdx-remote/hydrate";
import matter from "gray-matter";
import { fetchPageContent } from "../lib/pages";
import fs from "fs";
import yaml from "js-yaml";
import { parseISO } from 'date-fns';
import PageLayout from "../components/PageLayout";

import InstagramEmbed from "react-instagram-embed";
import YouTube from "react-youtube";
import { TwitterTweetEmbed } from "react-twitter-embed";

export type Props = {
  slug: string;
  summary: string;
  source: MdxRemote.Source;
};

const components = { InstagramEmbed, YouTube, TwitterTweetEmbed };
const slugToPageContent = (pageContents => {
  let hash = {}
  pageContents.forEach(it => hash[it.slug] = it)
  return hash;
})(fetchPageContent());

export default function Page({
  slug,
  summary,
  source,
}: Props) {
  const content = hydrate(source, { components })
  return (
    <PageLayout
      slug={slug}
      summary={summary}
    >
      {content}
    </PageLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fetchPageContent().map(it => "/" + it.slug);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.page as string;
  const source = fs.readFileSync(slugToPageContent[slug].fullPath, "utf8");
  const { content, data } = matter(source, {
    engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object }
  });
  const mdxSource = await renderToString(content, { components, scope: data });
  return {
    props: {
      slug: data.slug,
      summary: data.summary,
      source: mdxSource
    },
  };
};
