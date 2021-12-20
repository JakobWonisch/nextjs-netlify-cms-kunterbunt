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

import path from "path";
import { GalleryContent } from "../lib/galleries";

const galleriesDirectory = path.join(process.cwd(), "content/galleries");

export type Props = {
  slug: string;
  summary: string;
  galleries: GalleryContent[];
  footerSource: MdxRemote.Source;
  footerSourceAddress: MdxRemote.Source;
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
  galleries,
  footerSource,
  footerSourceAddress,
  source,
}: Props) {
  const content = hydrate(source, { components })
  const footerContent = hydrate(footerSource, { components })
  const footerContentAddress = hydrate(footerSourceAddress, { components })

  // generate prints
  let prints = [];
  const printMin = 1, printMax = 8,
    stepMin = 200, stepMax = 300;

  for(let i = 0; i < 10; i++) {
    let name = "/images/handprint_" + ((Math.floor(Math.random() * (printMax - printMin)) + printMin) + "").padStart(2, "0") + ".JPEG",
      step = Math.random() * (stepMin - stepMin) + stepMin,
      style ={
        top: (step + stepMin * (i - 1)) + "px",
        transform: "rotate(" + (Math.random() * 6.28) + "rad)",
      };
    prints.push(<img src={name} style={style}></img>);
  }

  return (
    <PageLayout
      slug={slug}
      summary={summary}
      galleries={galleries}
      footer={footerContent}
      footerAddress={footerContentAddress}
    >
      <div id="print-bg">
        <div class="overlay"></div>
        {prints}
      </div>
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

  // render page
  const source = fs.readFileSync(slugToPageContent[slug].fullPath, "utf8");
  const { content, data } = matter(source, {
    engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object }
  });
  const mdxSource = await renderToString(content, { components, scope: data });

  // load galleries
  data.galleries = data.galleries ? data.galleries.map(it => {
        const fullPath = path.join(galleriesDirectory, it + ".mdx");
        const fileContents = fs.readFileSync(fullPath, "utf8");

        // Use gray-matter to parse the page metadata section
        const matterResult = matter(fileContents, {
          engines: {
            yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
          },
        });
        const matterData = matterResult.data as {
          slug: string;
          summary: string;
          fullPath: string,
        };
        matterData.fullPath = fullPath;

        // Validate slug string
        if (matterData.slug !== it) {
          throw new Error(
            "slug field not match with the path of its content source"
          );
        }

        return matterData;
  }) : [];

  // render footer
  const footerPathSpots = path.join(process.cwd(), "footer/spots.yml");
  const footerSource = fs.readFileSync(footerPathSpots, "utf8");
  const footerYaml = yaml.load(footerSource, { schema: yaml.JSON_SCHEMA }) as object;
  const mdxFooterSource = await renderToString(footerYaml["body"], { components, scope: data });

  const footerPathAddress = path.join(process.cwd(), "footer/address.yml");
  const footerSourceAddress = fs.readFileSync(footerPathAddress, "utf8");
  const footerYamlAddress = yaml.load(footerSourceAddress, { schema: yaml.JSON_SCHEMA }) as object;
  const mdxFooterAddressSource = await renderToString(footerYamlAddress["body"], { components, scope: data });

  // console.log(footerYaml);
  // console.log(mdxFooterSource);

  return {
    props: {
      slug: data.slug,
      summary: data.summary,
      galleries: data.galleries,
      footerSource: mdxFooterSource,
      footerSourceAddress: mdxFooterAddressSource,
      source: mdxSource
    },
  };
};
