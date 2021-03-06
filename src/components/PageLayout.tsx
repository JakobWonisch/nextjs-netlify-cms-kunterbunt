import React from "react";
import styles from "../../public/styles/content.module.css";
import Copyright from "./Copyright";
import Layout from "./Layout";
import BasicMeta from "./meta/BasicMeta";
import JsonLdMeta from "./meta/JsonLdMeta";
import OpenGraphMeta from "./meta/OpenGraphMeta";
import TwitterCardMeta from "./meta/TwitterCardMeta";
import GalleryItem from "./GalleryItem";
import { GalleryContent } from "../lib/galleries";
import EmployeeItem from "./EmployeeItem";
import { EmployeeContent } from "../lib/employees";

type Props = {
  slug: string;
  title?: string;
  summary: string;
  employees?: EmployeeContent[];
  galleries?: GalleryContent[];
  footerDate: string;
  footer: React.ReactNode;
  footerAddress: React.ReactNode;
  children: React.ReactNode;
};
export default function PageLayout({
  slug,
  title,
  summary,
  employees,
  galleries,
  footerDate,
  footer,
  footerAddress,
  children,
}: Props) {
  return (
    <Layout>
      <BasicMeta
        url={`/${slug}`}
        title={title}
      />
      <TwitterCardMeta
        url={`/${slug}`}
        title={title}
      />
      <div className={"container"}>
        <article>
          <div className={styles.content}>{children}</div>
        </article>
        { (galleries && galleries.length != 0) ?
        (<div className={"gallery-list"}>
          {galleries.map((it, i) => (
            <GalleryItem gallery={it} />
          ))}
        </div>) : "" }
        { (employees && employees.length != 0) ?
        (<div className={"employee-list"}>
          {employees.map((it, i) => (
            <EmployeeItem employee={it} key={i}/>
          ))}
        </div>) : "" }
        <footer>
          <div className={styles.spots}>
            {footer}
            <span className={"date"}>Stand: {footerDate}</span>
          </div>
          <div className={styles.address}>{footerAddress}</div>
          <Copyright />
        </footer>
      </div>
      <style jsx>
        {`
            .container {
              display: block;
              max-width: 36rem;
              width: 100%;
              margin: 0 auto;
              padding: 0 1.5rem;
              box-sizing: border-box;
              z-index: 0;
            }
            .metadata div {
              display: inline-block;
              margin-right: 0.5rem;
            }
            article {
              position: relative;
              flex: 0 0 auto;
            }
            h1 {
              margin: 0 0 0.5rem;
              font-size: 2.25rem;
            }
            .tag-list {
              list-style: none;
              text-align: right;
              margin: 1.75rem 0 0 0;
              padding: 0;
            }
            .tag-list li {
              display: inline-block;
              margin-left: 0.5rem;
            }
            .social-list {
              margin-top: 3rem;
              text-align: center;
            }

            .gallery-list,
            .employee-list {
              display: flex;
              flex-direction: column;
              margin-top: 3rem;
            }

            .date {
              font-style: italic;
            }

            @media (min-width: 769px) {
              .container {
                display: flex;
                flex-direction: column;
              }

              .gallery-list,
              .employee-list {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: space-between;
              }
            }
          `}
      </style>
      <style global jsx>
        {`
            /* Syntax highlighting */
            .token.comment,
            .token.prolog,
            .token.doctype,
            .token.cdata,
            .token.plain-text {
              color: #6a737d;
            }

            .token.atrule,
            .token.attr-value,
            .token.keyword,
            .token.operator {
              color: #d73a49;
            }

            .token.property,
            .token.tag,
            .token.boolean,
            .token.number,
            .token.constant,
            .token.symbol,
            .token.deleted {
              color: #22863a;
            }

            .token.selector,
            .token.attr-name,
            .token.string,
            .token.char,
            .token.builtin,
            .token.inserted {
              color: #032f62;
            }

            .token.function,
            .token.class-name {
              color: #6f42c1;
            }

            /* language-specific */

            /* JSX */
            .language-jsx .token.punctuation,
            .language-jsx .token.tag .token.punctuation,
            .language-jsx .token.tag .token.script,
            .language-jsx .token.plain-text {
              color: #24292e;
            }

            .language-jsx .token.tag .token.attr-name {
              color: #6f42c1;
            }

            .language-jsx .token.tag .token.class-name {
              color: #005cc5;
            }

            .language-jsx .token.tag .token.script-punctuation,
            .language-jsx .token.attr-value .token.punctuation:first-child {
              color: #d73a49;
            }

            .language-jsx .token.attr-value {
              color: #032f62;
            }

            .language-jsx span[class="comment"] {
              color: pink;
            }

            /* HTML */
            .language-html .token.tag .token.punctuation {
              color: #24292e;
            }

            .language-html .token.tag .token.attr-name {
              color: #6f42c1;
            }

            .language-html .token.tag .token.attr-value,
            .language-html
              .token.tag
              .token.attr-value
              .token.punctuation:not(:first-child) {
              color: #032f62;
            }

            /* CSS */
            .language-css .token.selector {
              color: #6f42c1;
            }

            .language-css .token.property {
              color: #005cc5;
            }
          `}
      </style>
    </Layout>
  );
}
