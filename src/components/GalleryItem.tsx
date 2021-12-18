import { GalleryContent } from "../lib/galleries";
import Date from "./Date";
import Link from "next/link";
import { parseISO } from "date-fns";

type Props = {
  gallery: GalleryContent;
};
export default function GalleryItem({ gallery }: Props) {
  return (
    <Link href={"/galleries/" + gallery.slug}>
      <a>
        <h2>{gallery.title}</h2>
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
