import Head from "next/head";
import {useRouter} from "next/router";
import useSWR from "swr";
import styles from '../../styles/Home.module.css';
import Link from "next/link";

const fetcher = async (url) => {
    const res = await fetch(url);
    return await res.json();
}

export default function ClientNews () {
    const router = useRouter();
    const { newsId } = router.query;
    const { data, error } = useSWR(`http://localhost:4017/news/${newsId}`, fetcher);

    if(!data) return <h1>Loading...</h1>

    return (
        <>
            <Head>
                <title>News #{newsId}</title>
            </Head>
            <div className={styles.banner} >
                <h1>{data.headlines}</h1>
            </div>
            <div className={styles.container} >
                <p>{data.description}</p>
            </div>
            <br/>
            <Link href='/client' >
                <a className={styles.card}>Back</a>
            </Link>
        </>
    )
}