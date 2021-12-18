import { GetStaticProps, GetStaticPaths } from "next";
import renderToString from "next-mdx-remote/render-to-string";
import { MdxRemote } from "next-mdx-remote/types";
import hydrate from "next-mdx-remote/hydrate";
import matter from "gray-matter";
import { fetchGalleryContent } from "../../lib/galleries";
import fs from "fs";
import yaml from "js-yaml";
import { parseISO } from 'date-fns';
import PageLayout from "../../components/PageLayout";

import InstagramEmbed from "react-instagram-embed";
import YouTube from "react-youtube";
import { TwitterTweetEmbed } from "react-twitter-embed";

import React from 'react';
import { render } from 'react-dom';
// import ResponsiveGallery from 'react-responsive-gallery';

import path from "path";
import dynamic from 'next/dynamic'

export type ImageProps = {
  src: string
};
export type Props = {
  title: string;
  slug: string;
  description: string;
  photos: ImageProps[];
  footerSource: MdxRemote.Source;
  footerSourceAddress: MdxRemote.Source;
  source: MdxRemote.Source;
};

const components = { InstagramEmbed, YouTube, TwitterTweetEmbed };
const slugToGalleryContent = (galleryContents => {
  let hash = {}
  galleryContents.forEach(it => hash[it.slug] = it)
  return hash;
})(fetchGalleryContent());


const DynamicComponentWithNoSSR = dynamic(
  () => import('react-responsive-gallery'),
  { ssr: false }
)

export default function GalleryPage({
  title,
  slug,
  description,
  photos,
  footerSource,
  footerSourceAddress,
  source,
}: Props) {
  const content = hydrate(source, { components })
  const footerContent = hydrate(footerSource, { components })
  const footerContentAddress = hydrate(footerSourceAddress, { components })
  const numPerRow = {xs: 1,s: 2,m: 3,l: 3,xl: 3, xxl:3};
  return (
    <PageLayout
      slug={slug}
      summary={description}
      footer={footerContent}
      footerAddress={footerContentAddress}
    >
      <h1>{title}</h1>
      {content}
      <DynamicComponentWithNoSSR images={photos} useLightBox={true} numOfImagesPerRow={numPerRow}/>
    </PageLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fetchGalleryContent().map(it => "/galleries/" + it.slug);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.gallery as string;

  // render page
  const source = fs.readFileSync(slugToGalleryContent[slug].fullPath, "utf8");
  const { content, data } = matter(source, {
    engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object }
  });
  const mdxSource = await renderToString(content, { components, scope: data });

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

  const photoset = data.photos.map(it => { return { src: it.photo }});

// console.log(photoset);
  return {
    props: {
      title: data.title,
      slug: data.slug,
      description: data.description,
      photos: photoset,
      footerSource: mdxFooterSource,
      footerSourceAddress: mdxFooterAddressSource,
      source: mdxSource
    },
  };
};
