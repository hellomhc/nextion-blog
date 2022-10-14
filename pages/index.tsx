import {PageObjectResponse} from '@notionhq/client/build/src/api-endpoints';
import Text from 'components/Text';
import {getDatabase} from 'lib/notion';
import type {NextPage} from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export const getStaticProps = async () => {
  const database = await getDatabase(process.env.NOTION_DATABASE_ID);
  return {props: {posts: database.results}, revalidate: 1};
};

const Home: NextPage<{posts: PageObjectResponse[]}> = ({posts}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nextion blog</title>
        <meta
          name='description'
          content='Blog powered by Next.js and Notion API'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header className={styles.header}>
        <h1>Myeonghwan Cho</h1>
        <p>
          Hey, I'm a Senior Software Engineer at Company. I enjoy working with
          Next.js and crafting beautiful front-end experiences. This portfolio
          is built with Next.js and Notion API. It allows you to write Markdown
          and focus on the content of your portfolio. Deploy your own in a few
          minutes.
        </p>
      </header>

      <main>
        <h2 className={styles.heading}>Tech</h2>
        <ol className={styles.posts}>
          {posts.map(post => {
            const date = new Date(post.last_edited_time).toLocaleString(
              'en-US',
              {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
              },
            );
            return (
              <li key={post.id} className={styles.post}>
                <h3 className={styles.postTitle}>
                  <Link href={`/${post.id}`}>
                    <a>{post.properties.Name?.title[0].plain_text}</a>
                  </Link>
                </h3>
                {post.properties.Description?.rich_text.map(text => (
                  <Text>{text}</Text>
                ))}
                <p className={styles.postDescription}>{date}</p>
              </li>
            );
          })}
        </ol>
      </main>
    </div>
  );
};

export default Home;
