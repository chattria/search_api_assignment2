export interface IItem {
  displayLink: string;
  formattedUrl: string;
  htmlFormattedUrl: string;
  htmlSnippet: string;
  htmlTitle: string;
  kind: string;
  link: string;
  pagemap: {
    cse_thumbnail?: IItemThumbnail[];
  };
  snippet: string;
  title: string;
}

interface IItemThumbnail {
  height: string;
  src: string;
  width: string;
}
