"use client";

import { useEffect, useState, use } from "react";
import { supabase } from "@lib/supabaseClient";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import Loading from "@/components/Loading";
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
    studyReview: string;
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
    }, [id]);

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
            {!history ? (
                <Loading />
            ) : (
                <div className={styles.Content}>
                    <div>
                        <h3>目標</h3>
                        <p>{history?.object}</p>
                    </div>
                    <div>
                        <h3>目標の達成状況</h3>
                        <p>{history?.Achievement === "NoAchieved" ? "未達成" : "達成"}</p>
                    </div>
                    <div>
                        <h3>学習予定時間</h3>
                        <p>
                            {history.studyTime < 60
                                ? `${history.studyTime}分`
                                : `${Math.floor(history.studyTime / 60)}時間 ${
                                      history.studyTime % 60 === 0
                                          ? ""
                                          : ` ${history.studyTime % 60}分`
                                  }`}
                        </p>
                    </div>
                    <div>
                        <h3>学習時間</h3>
                        <p>
                            {history.studyMinutes < 60
                                ? `${history.studyMinutes}分`
                                : `${Math.floor(history.studyMinutes / 60)}時間 ${
                                      history.studyMinutes % 60 === 0
                                          ? ""
                                          : ` ${history.studyMinutes % 60}分`
                                  }`}
                        </p>
                    </div>
                    <div>
                        <h3>学習内容</h3>
                        <p>{history.studyContent}</p>
                    </div>
                    <div className={styles.summary}>
                        <h3>学習のまとめ</h3>
                        <p>{history.studyReview === "" ? "未入力" : history.studyReview}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
