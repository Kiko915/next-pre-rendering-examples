import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Home.module.css";

export default function UserData({ user }) {
  return (
    <>
      <Head>
        <title>{user.name}</title>
      </Head>
      <div className={styles.banner}>
        <h1>User Id: {user.id}</h1>
      </div>
      <main className={styles.userDetails}>
        <h3>Name: {user.name}</h3>
        <h3>Username: {user.username}</h3>
        <h3>Email: {user.email}</h3>
        <br />
        <Link href="/">
          <a>Home</a>
        </Link>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const userRoutes = await fetch("https://jsonplaceholder.typicode.com/users");
  const userRes = await userRoutes.json();

  return {
    paths: userRes.map((user) => ({ params: { userId: String(user.id) } })),
    fallback: false,
    // false - will result to any page that is not returned by getStaticPaths will result to a 404 error,
    // true - will result to no 404 but it will try to load and get the data that is requested and will serve a fallback page instead,
    // blocking -  new paths not returned by getStaticPaths will wait for the HTML to be generated, identical to SSR (hence why blocking), and then be cached for future requests so it only happens once per path.
  };
}

export async function getStaticProps({ params }) {
  const userDetails = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.userId}`
  );
  const userRes = await userDetails.json();

  return {
    props: {
      user: userRes,
    },
  };
}
