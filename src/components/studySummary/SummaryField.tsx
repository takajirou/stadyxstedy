"use client";

import { useEffect, useState } from "react";
import styles from "@styles/componentStyles/studySummary/SummaryField.module.scss";
import { supabase } from "@lib/supabaseClient";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
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
    studyMinutes: number;
}

export default function SummaryField() {
    const router = useRouter();
    const [scheduleData, setScheduleData] = useState<Schedule>();
    const [achievement, setAchievement] = useState("Achieved");
    const [review, setReview] = useState("振り返りなし");
    useEffect(() => {
        const today = new Date("2025-01-01");
        const fetchScheduleData = async () => {
            const { data, error } = await supabase
                .from("Schedule")
                .select("*")
                .eq("date", today.toISOString().split("T")[0])
                .single();
            if (error) {
                console.error("Error fetching schedule data:", error);
            } else {
                setScheduleData(data);
            }
        };
        fetchScheduleData();
    }, []);

    const handleChange = (event: React.MouseEvent<HTMLElement>, newAchievement: string) => {
        if (newAchievement !== null) {
            setAchievement(newAchievement);
        }
    };

    const ReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReview(e.target.value);
    };

    const UpdateScheduleData = async () => {
        const { error } = await supabase
            .from("Schedule")
            .update({ Achivement: achievement, studyReview: review })
            .eq("id", scheduleData?.id)
            .single();
        if (error) {
            console.error("Error fetching schedule data:", error);
        }
        router.push("/home");
    };

    return (
        <div>
            {scheduleData ? (
                <div className={styles.FieldsWrap}>
                    <h1>学習リワード</h1>
                    <div className={styles.Fields}>
                        <h2>学習時間</h2>
                        <p>
                            {scheduleData.studyMinutes < 60
                                ? `${scheduleData.studyMinutes}分`
                                : `${Math.floor(scheduleData.studyMinutes / 60)}時間 ${
                                      scheduleData.studyMinutes % 60 === 0
                                          ? ""
                                          : ` ${scheduleData.studyMinutes % 60}分`
                                  }`}
                        </p>
                    </div>
                    <div className={styles.Fields}>
                        <h2>目標</h2>
                        <p>{scheduleData.object}</p>
                    </div>

                    <div className={styles.Fields}>
                        <h2>目標達成</h2>
                        <ToggleButtonGroup
                            color="primary"
                            value={achievement}
                            onChange={handleChange}
                            exclusive
                        >
                            <ToggleButton value="Achieved">達成できた</ToggleButton>
                            <ToggleButton value="NoAchieved">達成できなかった</ToggleButton>
                        </ToggleButtonGroup>
                    </div>

                    <h2>学習した内容のまとめ</h2>
                    <textarea onChange={ReviewChange}></textarea>
                    <div className={styles.ButtonWrap}>
                        <Button variant="outlined" value="home" onClick={UpdateScheduleData}>
                            ホームに戻る
                        </Button>
                        <Button variant="contained" value="tommorow" onClick={UpdateScheduleData}>
                            明日のスケジュールを作成する
                        </Button>
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
}
