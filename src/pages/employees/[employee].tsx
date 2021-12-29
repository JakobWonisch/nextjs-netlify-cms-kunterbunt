import { GetStaticProps, GetStaticPaths } from "next";
import renderToString from "next-mdx-remote/render-to-string";
import { MdxRemote } from "next-mdx-remote/types";
import hydrate from "next-mdx-remote/hydrate";
import matter from "gray-matter";
import { fetchEmployeeContent } from "../../lib/employees";
import fs from "fs";
import yaml from "js-yaml";
import { parseISO } from 'date-fns';
import PageLayout from "../../components/PageLayout";

import path from "path";

export type Props = {
  slug: string;
  name: string;
  portrait: string;
  footerSource: MdxRemote.Source;
  footerSourceAddress: MdxRemote.Source;
  source: MdxRemote.Source;
};

const slugToEmployeeContent = (employeeContents => {
  let hash = {}
  employeeContents.forEach(it => hash[it.slug] = it)
  return hash;
})(fetchEmployeeContent());


export default function EmployeePage({
  slug,
  name,
  portrait,
  footerSource,
  footerSourceAddress,
  source,
}: Props) {
  const content = hydrate(source, { })
  const footerContent = hydrate(footerSource, { })
  const footerContentAddress = hydrate(footerSourceAddress, { })

  return (
    <PageLayout
      slug={slug}
      summary={name}
      footer={footerContent}
      footerAddress={footerContentAddress}
    >
      <h1>{name}</h1>
      <img className="portrait" src={portrait}/>
      {content}
      <style jsx>
        {`
            h1 {
              margin-bottom: 3rem;
            }

            .portrait {
              float: left;
              width: 10rem;
              max-width: 50%;
              margin: 0 1rem 1rem 0;
            }
          `}
      </style>
    </PageLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fetchEmployeeContent().map(it => "/employees/" + it.slug);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.employee as string;

  // render page
  const source = fs.readFileSync(slugToEmployeeContent[slug].fullPath, "utf8");
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

  return {
    props: {
      name: data.name,
      slug: data.slug,
      portrait: data.portrait,
      footerSource: mdxFooterSource,
      footerSourceAddress: mdxFooterAddressSource,
      source: mdxSource
    },
  };
};
