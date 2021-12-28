import fs from "fs";
import matter from "gray-matter";
import path from "path";
import yaml from "js-yaml";

const galleriesDirectory = path.join(process.cwd(), "content/galleries");

export type GalleryContent = {
  readonly slug: string;
  readonly title: string;
  readonly thumbnail: string;
  readonly description: string;
  readonly fullPath: string;
};

let galleryCache: GalleryContent[];

export function fetchGalleryContent(): GalleryContent[] {
  if (galleryCache) {
    return galleryCache;
  }
  // Get file names under /pages
  const fileNames = fs.readdirSync(galleriesDirectory);
  const allGalleriesData = fileNames
    .filter((it) => it.endsWith(".mdx"))
    .map((fileName) => {
      // Read markdown file as string
      const fullPath = path.join(galleriesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the page metadata section
      const matterResult = matter(fileContents, {
        engines: {
          yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
        },
      });
      const matterData = matterResult.data as {
        slug: string;
        title: string;
        description: string;
        fullPath: string,
      };
      matterData.fullPath = fullPath;

      const slug = fileName.replace(/\.mdx$/, "");

      // Validate slug string
      if (matterData.slug !== slug) {
        throw new Error(
          "slug field not match with the path of its content source"
        );
      }

      return matterData;
    });

  return allGalleriesData;
}

export function countGalleries(tag?: string): number {
  return fetchGalleryContent().length;
}

export function listGalleryContent(
  gallery: number,
  limit: number,
  tag?: string
): GalleryContent[] {
  return fetchGalleryContent().slice((gallery - 1) * limit, gallery * limit);
}
