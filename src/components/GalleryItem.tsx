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
              border-radius: 0 1rem 1rem 0;
              padding: 0.3rem 1rem;
              left: 0;
              top: 50%;
              transform: translate(0, -50%);
              background-image: url("/images/watercolor.jpg");
              // background-color: rgba(255, 255, 255, 1);
              background-blend-mode: multiply;
              margin-right: 1rem;
            }

            .gallery-item-thumbnail {
              position: absolute;
              width: 100%;
              height: 100%;
              object-fit: cover;
            }

            @media (min-width: 769px) {
              a {
                width: calc(50% - 2rem);
                box-sizing: border-box;
              }
            }
          `}
        </style>
      </a>
    </Link>
  );
}
