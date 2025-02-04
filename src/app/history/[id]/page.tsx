"use client";

import { useEffect, useState, use } from "react";
import { supabase } from "@lib/supabaseClient";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import styles from "@styles/appStyles/history/HistoryPage.module.scss";

interface HistoryDetailProps {
    params: Promise<{ id: string }>;
}

interface Schedule {
    id: number;
    object: string;
    studyTime: number;
    breakTime: number;
    breakCount: number;
    studyContent: string;
    studyMinutes: number;
    Achievement: string;
    date: string;
    state: string;
}

export default function HistoryDetail({ params }: HistoryDetailProps) {
    const [history, setHistory] = useState<Schedule | null>(null);
    const [weekday, setWeekday] = useState<string | null>(null);
    const { id } = use(params);
    useEffect(() => {
        const fetchHistory = async () => {
            const { data, error } = await supabase
                .from("Schedule")
                .select("*")
                .eq("state", "finished")
                .eq("id", id)
                .single();
            if (error) {
                console.error("Error fetching history:", error.message);
            } else {
                setHistory(data);
            }
        };

        fetchHistory();
    });

    function getWeekday(dateString?: string) {
        if (!dateString) return;
        const days = ["日", "月", "火", "水", "木", "金", "土"];
        const date = new Date(dateString);
        setWeekday(days[date.getDay()]);
    }
    useEffect(() => {
        getWeekday(history?.date);
    }, [history]);

    return (
        <div>
            <header className={styles.Header}>
                <Link href="/history">
                    <IoIosArrowBack size="30px" color="#fff" />
                </Link>
                <h1>
                    {history?.date}({weekday})
                </h1>
            </header>

            <p></p>
        </div>
    );
}
