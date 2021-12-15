import { GetStaticProps } from "next";
import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";
import PageList from "../../components/PageList";
import config from "../../lib/config";
import { countPages, listPageContent, PageContent } from "../../lib/pages";
import { listTags, TagContent } from "../../lib/tags";
import Head from "next/head";

type Props = {
  pages: PageContent[];
  tags: TagContent[];
  pagination: {
    current: number;
    pages: number;
  };
};
export default function Index({ pages, tags, pagination }: Props) {
  const url = "/pages";
  const title = "All pages";
  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <PageList pages={pages} tags={tags} pagination={pagination} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pages = listPageContent(1, config.pages_per_page);
  const tags = listTags();
  const pagination = {
    current: 1,
    pages: Math.ceil(countPages() / config.pages_per_page),
  };
  return {
    props: {
      pages,
      tags,
      pagination,
    },
  };
};
