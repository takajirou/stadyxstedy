"use client";
import { useEffect, useState } from "react";
import History from "@/components/history/History";
import { supabase } from "@lib/supabaseClient";
import Header from "@/components/Header";
import styles from "@styles/appStyles/history/Page.module.scss";
import Link from "next/link";
import Loading from "@/components/Loading";

interface Schedule {
    id: number;
    object: string;
    studyTime: number;
    breakTime: number;
    breakCount: number;
    studyContent: string;
    date: string;
    state: string;
}

export default function HistoryPage() {
    const [history, setHistory] = useState<Schedule[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchHistory = async () => {
            const { data, error } = await supabase
                .from("Schedule")
                .select("*")
                .eq("state", "finished");
            if (error) {
                console.error("Error fetching history:", error.message);
            } else {
                setHistory(data);
            }
            setLoading(false);
        };

        fetchHistory();
    }, []);

    return (
        <main>
            <Header />
            <h1 className={styles.title}>勉強の履歴</h1>
            {loading ? (
                <Loading />
            ) : history.length > 0 ? (
                history.map((schedule) => (
                    <Link href={`/history/${schedule.id}`} key={schedule.id}>
                        <div className={styles.History}>
                            <History id={schedule.id} />
                        </div>
                    </Link>
                ))
            ) : (
                <p>履歴がありません</p>
            )}
        </main>
    );
}
