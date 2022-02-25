import Head from "next/head";
import styles from "../../styles/Home.module.css";

export default function Article({ article }) {
  return (
    <>
      <Head>
        <title>Articles</title>
      </Head>
      <div className={styles.banner}>
        <h1>Article Id: {article.id}</h1>
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const singlArticle = await fetch(
    `http://localhost:4017/posts/${params.articleId}`
  );
  const resArticle = await singlArticle.json();

  return {
    props: {
      article: resArticle,
    },
  };
}

export async function getStaticPaths() {
  const articleLists = await fetch("http://localhost:4017/posts");
  const results = await articleLists.json();

  const arrMap = results.map((article) => ({
    params: {
      articleId: `${article.id}`,
    },
  }));
  console.log(arrMap);
  return {
    paths: arrMap,
    fallback: "blocking",
  };
}
