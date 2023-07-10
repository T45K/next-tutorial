import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import { PathParam } from '../../lib/PathParam';
import { InferGetStaticPropsType } from 'next';

const Post = ({ postData }: PostProps) => (
  <Layout home={false}>
    <Head>
      <title>{postData.title}</title>
    </Head>
    <article>
      <h1 className={utilStyles.headingXl}> {postData.title}</h1>
      <br />
      <div className={utilStyles.lightText}>
        <Date dateString={postData.date}></Date>
      </div>
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  </Layout>
);

export default Post;

export const getStaticPaths = () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: PathParam) => {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
};

type PostProps = InferGetStaticPropsType<typeof getStaticProps>;
