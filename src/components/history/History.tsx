"use client";
import { useEffect, useState } from "react";
import { supabase } from "@lib/supabaseClient";
import styles from "@styles/componentStyles/history/History.module.scss";
import { MdOutlineArrowForwardIos } from "react-icons/md";

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

interface HistoryProps {
    id: number;
}

export default function HistoryPage({ id }: HistoryProps) {
    const [history, setHistory] = useState<Schedule | null>(null);
    const [weekday, setWeekday] = useState<string | null>(null);
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
        <main>
            {history ? (
                <>
                    <div className={styles.Content}>
                        <div>
                            <h2>
                                {history.date}({weekday})
                            </h2>
                            <p>
                                <span>目標:</span>
                                {history.object}
                            </p>
                            <p>
                                <span>学習時間:</span>
                                {history.studyMinutes < 60
                                    ? `${history.studyMinutes}分`
                                    : `${Math.floor(history.studyMinutes / 60)}時間 ${
                                          history.studyMinutes % 60 === 0
                                              ? ""
                                              : ` ${history.studyMinutes % 60}分`
                                      }`}
                            </p>
                            <p>
                                <span>目標:</span>
                                {history.Achievement === "Achieved" ? "達成" : "未達成"}
                            </p>
                        </div>
                        <MdOutlineArrowForwardIos size="25px" color="blue" />
                    </div>
                </>
            ) : (
                ""
            )}
        </main>
    );
}
