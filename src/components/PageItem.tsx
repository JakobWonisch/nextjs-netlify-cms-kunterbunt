import { PageContent } from "../lib/pages";
import Date from "./Date";
import Link from "next/link";
import { parseISO } from "date-fns";

type Props = {
  page: PageContent;
};
export default function PageItem({ page }: Props) {
  return (
    <Link href={"/pages/" + page.slug}>
      <a>
        <Date date={parseISO(page.date)} />
        <h2>{page.title}</h2>
        <style jsx>
          {`
            a {
              color: #222;
              display: inline-block;
            }
            h2 {
              margin: 0;
              font-weight: 500;
            }
          `}
        </style>
      </a>
    </Link>
  );
}
