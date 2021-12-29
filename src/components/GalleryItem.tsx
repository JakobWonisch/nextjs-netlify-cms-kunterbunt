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
        <img src={gallery.thumbnail} className="gallery-item-thumbnail"/>
        <h2>{gallery.title}</h2>
        <style jsx>
          {`
            a {
              color: black;
              display: block;
              position: relative;
              min-height: 7rem;
              margin: 1rem;
            }

            a:hover {
              opacity: 0.8;
            }

            h2 {
              margin: 0;
              font-weight: 500;
              position: absolute;
              background: rgba(255,255,255,0.8);
              border-radius: 1rem;
              padding: 0.3rem 1rem;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
            }

            .gallery-item-thumbnail {
              position: absolute;
              width: 100%;
              height: 100%;
              object-fit: cover;
            }

            @media (min-width: 769px) {
              a {
                width: calc(33% - 2rem);
                box-sizing: border-box;
              }
            }
          `}
        </style>
      </a>
    </Link>
  );
}
