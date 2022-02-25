import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home({ users, articleRes }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Yt Demo</title>
        <meta name="description" content="Next.js Sandbox" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Hello <a href="https://nextjs.org">Next.js! 😎</a>
        </h1>

        <p className={styles.description}>Next.js is a beast!</p>

        <h3>Our Users!</h3>
        <p>Statically Generated</p>
        <div className={styles.grid}>
          {users.map((user) => (
            <Link key={user.id} href={`/users/${user.id}`}>
              <a className={styles.card}>{user.name}</a>
            </Link>
          ))}
        </div>
        <p>Incremental Static Regeneration - ISR</p>
        <div className={styles.grid}>
          {articleRes.map((article) => (
            <Link key={article.id} href={`/articles/${article.id}`}>
              <a className={styles.card}>{article.title}</a>
            </Link>
          ))}
        </div>
        <p>Server Side Rendering</p>
        <div className={styles.grid}>
          <Link href="/news">
            <a className={styles.card}>News Page</a>
          </Link>
        </div>
        <p>Client Side Rendering</p>
        <div className={styles.grid} >
          <Link href='/client' >
            <a className={styles.card} >Client Side</a>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <span className={styles.logo}>Kikolito</span>
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const users = await fetch("https://jsonplaceholder.typicode.com/users");
  const articles = await fetch("http://localhost:4017/posts");
  const results = await users.json();
  const articleRes = await articles.json();

  return {
    props: {
      users: results,
      articleRes,
    },
    revalidate: 10,
  };
}
