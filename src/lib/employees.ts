import fs from "fs";
import matter from "gray-matter";
import path from "path";
import yaml from "js-yaml";

const employeesDirectory = path.join(process.cwd(), "content/employees");

export type EmployeeContent = {
  readonly slug: string;
  readonly name: string;
  readonly portrait: string;
  readonly fullPath: string;
};

let galleryCache: EmployeeContent[];

export function fetchEmployeeContent(): EmployeeContent[] {
  if (galleryCache) {
    return galleryCache;
  }
  // Get file names under /pages
  const fileNames = fs.readdirSync(employeesDirectory);
  const allEmployeesData = fileNames
    .filter((it) => it.endsWith(".mdx"))
    .map((fileName) => {
      // Read markdown file as string
      const fullPath = path.join(employeesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the page metadata section
      const matterResult = matter(fileContents, {
        engines: {
          yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
        },
      });
      const matterData = matterResult.data as {
        slug: string;
        name: string;
        portrait: string;
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

  return allEmployeesData;
}

export function countEmployees(tag?: string): number {
  return fetchEmployeeContent().length;
}

export function listEmployeeContent(
  employee: number,
  limit: number,
  tag?: string
): EmployeeContent[] {
  return fetchEmployeeContent().slice((employee - 1) * limit, employee * limit);
}
