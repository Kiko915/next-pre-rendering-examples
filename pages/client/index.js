import styles from '../../styles/Home.module.css'
import Head from "next/head";
import useSWR from 'swr';
import Link from 'next/link'

const fetcher = async (url) => {
    const res = await fetch(url);
    return await res.json();
}

export default function ClientSide() {
    const { data, error } = useSWR('http://localhost:4017/news', fetcher);

    return (
        <>
            <Head>
                <title>Client Side</title>
            </Head>
            <div className={styles.banner}>
                <h1>Client Side</h1>
            </div>
            <div className={styles.container} >
                <p>This is a demo using client-side data fetching. Client side data fetching is reliable if it comes to an always changing data but it is not optimized for SEO</p>
                {!data ? <h3 className={styles.title} >Loading...</h3> : <ul className={styles.grid}>
                    {data.map(news => (
                        <Link key={news.id} href={`/client/${news.id}`} ><a className={styles.card}>{news.headlines}</a></Link>
                    ))}
                </ul>}
            </div>
            <br/>
            <Link href='/' >
                <a className={styles.card} >Home</a>
            </Link>
        </>
    )
}