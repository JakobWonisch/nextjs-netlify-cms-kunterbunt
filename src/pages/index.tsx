import PageLayout from "../components/PageLayout";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import { GetStaticProps } from "next";
import renderToString from "next-mdx-remote/render-to-string";
import { MdxRemote } from "next-mdx-remote/types";
import hydrate from "next-mdx-remote/hydrate";
import matter from "gray-matter";
import fs from "fs";
import yaml from "js-yaml";
import path from "path";
import { useState } from "react";

export type Props = {
  footerSource: MdxRemote.Source;
  footerSourceAddress: MdxRemote.Source;
  source: MdxRemote.Source;
};

export default function Index({
  footerSource,
  footerSourceAddress,
  source
}: Props) {
  const content = hydrate(source, {})
  const [printsSaved, setPrintsSaved] = useState(undefined);
  const footerContent = hydrate(footerSource, {})
  const footerContentAddress = hydrate(footerSourceAddress, {})

  // generate prints
  let prints = [];
  const printMin = 2, printMax = 8,
    stepMin = 17, stepMax = 22;

  if(!printsSaved) {
    let newPrints = [];
    for(let i = 0; i < 40; i++) {
      let name = "/images/handprint_" + ((Math.floor(Math.random() * (printMax - printMin)) + printMin) + "").padStart(2, "0") + ".JPEG",
      step = Math.random() * (stepMin - stepMin) + stepMin,
      style ={
        top: (step + stepMin * (i - 1)) + "em",
        transform: "rotate(" + (Math.random() * 6.28) + "rad)",
      };
      newPrints.push(<img src={name} style={style} key={i}></img>);
    }

    setPrintsSaved(newPrints);
  }

  prints = printsSaved;

  return (
    <PageLayout
      slug=""
      summary=""
      footer={footerContent}
      footerAddress={footerContentAddress}>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
      <div id="print-bg">
        <div className="overlay"></div>
        {prints}
      </div>
      <img id="logo" src="/images/logo.jpg"></img>
      {content}

      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1 1 auto;
          padding: 0 1.5rem;
        }
        h1 {
          font-size: 2.5rem;
          margin: 0;
          font-weight: 500;
        }
        h2 {
          font-size: 1.75rem;
          font-weight: 400;
          line-height: 1.25;
        }
        .fancy {
          color: #15847d;
        }
        .handle {
          display: inline-block;
          margin-top: 0.275em;
          color: #9b9b9b;
          letter-spacing: 0.05em;
        }

        @media (min-width: 769px) {
          h1 {
            font-size: 3rem;
          }
          h2 {
            font-size: 2.25rem;
          }
        }
      `}</style>
    </PageLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // render page
  const sourcePath = path.join(process.cwd(), "content/pages/home.mdx");
  const source = fs.readFileSync(sourcePath, "utf8");
  const { content, data } = matter(source, {
    engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object }
  });
  const mdxSource = await renderToString(content, { scope: data });

  // render footer
  const footerPathSpots = path.join(process.cwd(), "footer/spots.yml");
  const footerSource = fs.readFileSync(footerPathSpots, "utf8");
  const footerYaml = yaml.load(footerSource, { schema: yaml.JSON_SCHEMA }) as object;
  const mdxFooterSource = await renderToString(footerYaml["body"], { scope: data });

  const footerPathAddress = path.join(process.cwd(), "footer/address.yml");
  const footerSourceAddress = fs.readFileSync(footerPathAddress, "utf8");
  const footerYamlAddress = yaml.load(footerSourceAddress, { schema: yaml.JSON_SCHEMA }) as object;
  const mdxFooterAddressSource = await renderToString(footerYamlAddress["body"], { scope: data });

  // console.log(footerYaml);
  // console.log(mdxFooterSource);

  return {
    props: {
      footerSource: mdxFooterSource,
      footerSourceAddress: mdxFooterAddressSource,
      source: mdxSource
    },
  };
};
