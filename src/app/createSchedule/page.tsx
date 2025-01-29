"use client";

import styles from "@styles/appStyles/createSchedule/Page.module.scss";
import Header from "@/components/Header";
import CreateField from "@/components/createSchedule/CreateField";
import { useState } from "react";
import StudyTransition from "@/components/createSchedule/StudyTransition";

export default function Page() {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const handleScheduleCreation = (date: string) => {
        setSelectedDate(date);
    };
    return (
        <>
            <Header />
            {!selectedDate ? (
                <StudyTransition onScheduleCreate={handleScheduleCreation} />
            ) : (
                <div className={styles.CreateScheduleWrap}>
                    <h1>
                        {selectedDate === "today"
                            ? "今日の勉強スケジュール作成"
                            : "明日の勉強スケジュール作成"}
                    </h1>
                    <CreateField date={selectedDate} />
                </div>
            )}
        </>
    );
}
