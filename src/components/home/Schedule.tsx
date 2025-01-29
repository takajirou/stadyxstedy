"use client";

import styles from "@styles/componentStyles/home/Schedule.module.scss";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { Button, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { supabase } from "@lib/supabaseClient";

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
    const [filteredSchedules, setFilteredSchedules] = useState<Schedule | null>(null);
    const [selectedSchedule, setSelectedSchedule] = useState("today");
    const [studyHours, setStudyHours] = useState<number>();
    const [studyMinutes, setStudyMinutes] = useState<number>();

    useEffect(() => {
        const fetchSchedules = async () => {
            const today = new Date();

            const targetDate =
                selectedSchedule === "tomorrow"
                    ? new Date(today.getTime() + 24 * 60 * 60 * 1000)
                    : today;

            const targetDateString = targetDate.toISOString().split("T")[0];

            const { data, error } = await supabase
                .from("Schedule")
                .select("*")
                .eq("date", targetDateString)
                .eq("state", "unfinished")
                .single();

            if (error) {
                throw new Error(error.message);
            }

            setFilteredSchedules(data || null);
        };

        fetchSchedules();
    }, [selectedSchedule]);

    useEffect(() => {
        if (filteredSchedules) {
            setStudyMinutes(filteredSchedules.studyTime % 60);
            setStudyHours(Math.floor(filteredSchedules.studyTime / 60));
        }
    }, [filteredSchedules]);

    return (
        <div className={styles.ScheduleWrap}>
            <ToggleButtonGroup
                value={selectedSchedule}
                exclusive
                onChange={(e, value) => {
                    if (value) setSelectedSchedule(value);
                }}
            >
                <ToggleButton
                    className={clsx(
                        styles.ScheduleHeader,
                        selectedSchedule === "today" && styles.SelectedBtn
                    )}
                    value="today"
                >
                    今日のスケジュール
                </ToggleButton>
                <ToggleButton
                    className={clsx(
                        styles.ScheduleHeader,
                        selectedSchedule === "tomorrow" && styles.SelectedBtn
                    )}
                    value="tomorrow"
                >
                    明日のスケジュール
                </ToggleButton>
            </ToggleButtonGroup>

            <>
                <div className={clsx(styles.ScheduleContents, !filteredSchedules && styles.Empty)}>
                    {!filteredSchedules ? (
                        <Button
                            variant="contained"
                            className={styles.EmptyButton}
                            href="/createSchedule"
                        >
                            <p>スケジュールを作成</p>
                        </Button>
                    ) : (
                        ""
                    )}
                    <div className={styles.ScheduleTarget}>
                        <h2>目標</h2>
                        <p>{filteredSchedules ? filteredSchedules.object : ""}</p>
                    </div>
                    <div className={styles.StudyTime}>
                        <h2>勉強時間</h2>
                        <p>
                            {filteredSchedules
                                ? `${studyHours}時間 ${
                                      studyMinutes === 0 ? "" : ` ${studyMinutes}分`
                                  }`
                                : ""}
                        </p>
                    </div>
                    <div className={styles.BreakTime}>
                        <h2>休憩時間</h2>
                        <p>
                            {filteredSchedules ? ` ${filteredSchedules.breakTime}分 x ` : ""}
                            {filteredSchedules ? `${filteredSchedules.breakCount}回` : ""}
                        </p>
                    </div>
                    <div className={styles.StudyContent}>
                        <h2>勉強内容</h2>
                        <textarea
                            value={filteredSchedules ? filteredSchedules.studyContent : ""}
                            readOnly
                            className={styles.StudyContent}
                        ></textarea>
                    </div>
                </div>
            </>
        </div>
    );
}
