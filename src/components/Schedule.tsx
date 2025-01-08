"use client";

import styles from "@styles/componentStyles/home/Schedule.module.scss";
import { useState, useEffect } from "react";

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

export default function Schedule() {
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const response = await fetch("/schedule.json");
                if (!response.ok) {
                    throw new Error(`Failed to fetch schedule: ${response.status}`);
                }

                const data: Schedule[] = await response.json();

                setSchedules(data);

                // 絞り込み処理: 今日の日付 & stateがactiveのもの
                // const today = new Date().toISOString().split("T")[0]; // 今日の日付を取得

                const today = "2025-01-01"; // テスト用の日付
                const filtered = data.filter(
                    (schedule) => schedule.date === today && schedule.state === "unfinished"
                );

                setFilteredSchedules(filtered);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            }
        };

        fetchSchedules();
    }, []);

    if (error) {
        return <div className={styles.Error}>エラーが発生しました: {error}</div>;
    }

    if (schedules.length === 0) {
        return <div className={styles.Loading}>データを読み込み中...</div>;
    }

    return (
        <div className={styles.ScheduleWrap}>
            <h2>今日の勉強スケジュール</h2>
            {filteredSchedules.map((schedule) => (
                <div key={schedule.id} className={styles.ScheduleContents}>
                    <div className={styles.ScheduleTarget}>
                        <h2>目標</h2>
                        <p>{schedule.object}</p>
                    </div>
                    <div className={styles.StudyTime}>
                        <h2>勉強時間</h2>
                        <p>{schedule.studyTime}時間</p>
                    </div>
                    <div className={styles.BreakTime}>
                        <h2>休憩時間</h2>
                        <p>
                            {schedule.breakTime}分 x {schedule.breakCount}回
                        </p>
                    </div>
                    <div className={styles.StudyContent}>
                        <h2>勉強内容</h2>
                        <textarea
                            value={schedule.studyContent}
                            readOnly
                            className={styles.StudyContent}
                        ></textarea>
                    </div>
                    <button>
                        <p>勉強開始</p>
                    </button>
                </div>
            ))}
        </div>
    );
}
