import {Client} from '@notionhq/client';
import {QueryDatabaseResponse} from '@notionhq/client/build/src/api-endpoints';

const notion = new Client({auth: process.env.NOTION_ACCESS_TOKEN});

export const getDatabase = async (databaseId: string) => {
  return notion.databases.query({
    database_id: databaseId,
    sorts: [{timestamp: 'created_time', direction: 'descending'}],
  });
};

export const getPageObjectProperty = (
  pageObject: QueryDatabaseResponse['results'][0],
  propertyName: string,
) => {
  if (!('properties' in pageObject)) return '';
  const target = pageObject.properties[propertyName];
  if (!target) return '';
  if (target.type === 'title') {
    return target.title[0]?.plain_text || '';
  } else if (target.type === 'rich_text') {
    return target.rich_text[0]?.plain_text || '';
  } else if (target.type === 'multi_select') {
    return target.multi_select.map(m => m.name);
  } else if (target.type === 'date') {
    return [target.date?.start || '', target.date?.end || ''];
  } else {
    return '';
  }
};
