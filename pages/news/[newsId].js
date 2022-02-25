import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Home.module.css";

export default function NewsPost({ singleNews }) {
  return (
    <>
      <Head>
        <title>News #{singleNews.id}</title>
      </Head>
      <div className={styles.banner}>
        <Link href="/news" passHref>
          <h1>{singleNews.headlines}</h1>
        </Link>
      </div>
      <main className={styles.container}>
        <p>{singleNews.description}</p>
        <hr />
        <small>
          Published on {new Date(singleNews.publishedAt).toDateString()}
        </small>
      </main>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { newsId } = params;
  const singlePost = await fetch(`http://localhost:4017/news/${newsId}`);
  const singleRes = await singlePost.json();

  return {
    props: {
      singleNews: singleRes,
    },
  };
}
