import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Home.module.css";

export default function News({ news }) {
  return (
    <>
      <Head>
        <title>News!</title>
      </Head>
      <div className={styles.banner}>
        <h1>News Page</h1>
      </div>
      <main className={styles.container}>
        <div className={styles.grid}>
          {news.map((item) => (
            <Link key={item.id} href={`/news/${item.id}`}>
              <a className={styles.card}>{item.headlines}</a>
            </Link>
          ))}
        </div>
          <br/>
        <div>
            <Link href='/' >
                <a className={styles.card} >Go Back</a>
            </Link>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const newsList = await fetch("http://localhost:4017/news");
  const newsRes = await newsList.json();

  return {
    props: {
      news: newsRes,
    },
  };
}
