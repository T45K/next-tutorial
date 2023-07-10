import utilStyles from '../styles/utils.module.css';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';
import { PostData } from '../lib/PostData';
import { InferGetStaticPropsType, NextPage } from 'next';

const Home: NextPage<HomeProps> = ({ allPostsData }: HomeProps) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>ほげふがぴよ</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }: PostData) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date.toString()} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default Home;

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const allPostsData: PostData[] = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
