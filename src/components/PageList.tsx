import React from "react";
import { PageContent } from "../lib/pages";
import PageItem from "./PageItem";
import TagLink from "./TagLink";
import Pagination from "./Pagination";
import { TagContent } from "../lib/tags";

type Props = {
  pages: PageContent[];
  tags: TagContent[];
  pagination: {
    current: number;
    pages: number;
  };
};
export default function PageList({ pages, tags, pagination }: Props) {
  return (
    <div className={"container"}>
      <div className={"pages"}>
        <ul className={"page-list"}>
          {pages.map((it, i) => (
            <li key={i}>
              <PageItem page={it} />
            </li>
          ))}
        </ul>
        <Pagination
          current={pagination.current}
          pages={pagination.pages}
          link={{
            href: (page) => (page === 1 ? "/pages" : "/pages/page/[page]"),
            as: (page) => (page === 1 ? null : "/pages/page/" + page),
          }}
        />
      </div>
      <ul className={"categories"}>
        {tags.map((it, i) => (
          <li key={i}>
            <TagLink tag={it} />
          </li>
        ))}
      </ul>
      <style jsx>{`
        .container {
          display: flex;
          margin: 0 auto;
          max-width: 1200px;
          width: 100%;
          padding: 0 1.5rem;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        li {
          list-style: none;
        }
        .pages {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
        }
        .pages li {
          margin-bottom: 1.5rem;
        }
        .page-list {
          flex: 1 0 auto;
        }
        .categories {
          display: none;
        }
        .categories li {
          margin-bottom: 0.75em;
        }

        @media (min-width: 769px) {
          .categories {
            display: block;
          }
        }
      `}</style>
    </div>
  );
}
