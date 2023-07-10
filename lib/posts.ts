import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { PostData } from './PostData';
import { ParsedMatterFile } from './ParsedMatterFile';
import { PathParam } from './PathParam';

const postsDirectory = path.join(process.cwd(), 'posts');

export const getSortedPostsData = (): PostData[] =>
  fs
    .readdirSync(postsDirectory)
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const matterResult = parseMatterFile(id);
      return {
        id: id,
        title: matterResult.title,
        date: matterResult.date,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));

export const getAllPostIds = (): PathParam[] =>
  fs.readdirSync(postsDirectory).map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });

export const getPostData = async (id: string): Promise<PostData> => {
  const matterFile = parseMatterFile(id);

  // @ts-ignore
  // "No overload matches this call." happens on `use(html)`.
  // Seems library issue.
  // ref. https://github.com/vercel/next.js/discussions/52369
  const processedContent = await remark().use(html).process(matterFile.content);
  const contentHtml = processedContent.toString();

  return {
    id: id,
    contentHtml: contentHtml,
    title: matterFile.title,
    date: matterFile.date,
  };
};

const parseMatterFile = (id: string): ParsedMatterFile => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterFile = matter(fileContents);

  return {
    title: matterFile.data['title'],
    date: matterFile.data['date'],
    content: matterFile.content,
  };
};
