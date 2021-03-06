import fs from "fs";
import matter from "gray-matter";
import path from "path";
import yaml from "js-yaml";

const pagesDirectory = path.join(process.cwd(), "content/pages");

export type PageContent = {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly fullPath: string;
};

let pageCache: PageContent[];

export function fetchPageContent(): PageContent[] {
  if (pageCache) {
    return pageCache;
  }
  // Get file names under /pages
  const fileNames = fs.readdirSync(pagesDirectory);
  const allPagesData = fileNames
    .filter((it) => it.endsWith(".mdx"))
    .map((fileName) => {
      // Read markdown file as string
      const fullPath = path.join(pagesDirectory, fileName);
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
        summary: string;
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

  return allPagesData;
}

export function countPages(tag?: string): number {
  return fetchPageContent().length;
}

export function listPageContent(
  page: number,
  limit: number,
  tag?: string
): PageContent[] {
  return fetchPageContent().slice((page - 1) * limit, page * limit);
}
