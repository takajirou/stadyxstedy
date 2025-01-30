"use client";

import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { supabase } from "@lib/supabaseClient";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import Loading from "@/components/Loading";
import styles from "@styles/componentStyles/createSchedule/StudyTransition.module.scss";

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

interface StudyTransitionProps {
    onScheduleCreate: (date: string) => void;
}

export default function StudyTransition({ onScheduleCreate }: StudyTransitionProps) {
    const today = new Date().toISOString().split("T")[0];
    const [todaySchedule, setTodaySchedule] = useState<Schedule | null>(null);
    const [tomorrowSchedule, setTomorrowSchedule] = useState<Schedule | null>(null);
    const [todayOpen, setTodayOpen] = useState(false);
    const [tomorrowOpen, setTomorrowOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const { data: todayData } = await supabase
                .from("Schedule")
                .select("*")
                .eq("date", today)
                .single();
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowDate = tomorrow.toISOString().split("T")[0];
            const { data: tomorrowData } = await supabase
                .from("Schedule")
                .select("*")
                .eq("date", tomorrowDate)
                .single();

            setTodaySchedule(todayData);
            setTomorrowSchedule(tomorrowData);
        };

        setLoading(false);
        fetchData();
    }, [today]);

    const todayHandleClick = (value: string) => {
        if (value === "today" && todaySchedule) {
            setTodayOpen(true);
        } else {
            onScheduleCreate("today");
        }
    };

    const tomorrowHandleClick = (value: string) => {
        if (value === "tomorrow" && tomorrowSchedule) {
            setTomorrowOpen(true);
        } else {
            onScheduleCreate("tomorrow");
        }
    };

    const todayHandleClose = () => {
        setTodayOpen(false);
    };

    const tomorrowHandleClose = () => {
        setTomorrowOpen(false);
    };

    return (
        <>
            {!loading ? (
                <>
                    <Dialog open={todayOpen} onClose={todayHandleClose}>
                        <DialogTitle>今日のスケジュールは既に設定されています</DialogTitle>
                        <DialogActions>
                            <Button onClick={todayHandleClose}>閉じる</Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog open={tomorrowOpen} onClose={tomorrowHandleClose}>
                        <DialogTitle>明日のスケジュールは既に設定されています</DialogTitle>
                        <DialogActions>
                            <Button onClick={tomorrowHandleClose}>閉じる</Button>
                        </DialogActions>
                    </Dialog>
                    <div className={styles.PageWrap}>
                        <div className={styles.ButtonWrap}>
                            <Button
                                value="today"
                                onClick={() => todayHandleClick("today")}
                                sx={{
                                    border: "1px solid #000",
                                    borderRadius: "10px",
                                    margin: "50px",
                                    padding: "10px 20px",
                                    fontSize: "1.5rem",
                                    backgroundColor: "#fff",
                                }}
                            >
                                今日のスケジュールを作成する
                            </Button>
                            <Button
                                value="tomorrow"
                                onClick={() => tomorrowHandleClick("tomorrow")}
                                sx={{
                                    border: "1px solid #000",
                                    borderRadius: "10px",
                                    margin: "50px",
                                    padding: "10px 20px",
                                    fontSize: "1.5rem",
                                    backgroundColor: "#fff",
                                }}
                            >
                                明日のスケジュールを作成する
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                <Loading />
            )}
        </>
    );
}
