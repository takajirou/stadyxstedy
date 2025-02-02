"use client";

import { useEffect, useState } from "react";
import styles from "@styles/componentStyles/studySummary/SummaryField.module.scss";
import { supabase } from "@lib/supabaseClient";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Loading from "@/components/Loading";
import { TextField } from "@mui/material";

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
        const today = new Date();
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

    const UpdateScheduleData = async (value: string) => {
        const { error } = await supabase
            .from("Schedule")
            .update({ Achievement: achievement, studyReview: review })
            .eq("id", scheduleData?.id)
            .single();
        if (error) {
            console.error("Error fetching schedule data:", error);
        }
        if (value === "home") {
            router.push("/home");
        } else if (value === "tommorow") {
            router.push("/createSchedule");
        }
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
                            <ToggleButton
                                value="Achieved"
                                sx={{
                                    backgroundColor: "white",
                                }}
                            >
                                達成できた
                            </ToggleButton>
                            <ToggleButton
                                value="NoAchieved"
                                sx={{
                                    backgroundColor: "white",
                                }}
                            >
                                達成できなかった
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>

                    <h2>学習した内容のまとめ</h2>
                    <TextField
                        fullWidth
                        multiline
                        onChange={ReviewChange}
                        variant="outlined"
                        placeholder="学習した内容のまとめを入力"
                        helperText="最大50文字"
                        InputLabelProps={{ shrink: true }}
                        inputProps={{
                            maxLength: 50,
                            style: { fontSize: "1.5rem" },
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: "white",
                            },
                            "& .MuiInputBase-input": {
                                backgroundColor: "white",
                            },
                            "& label": {
                                fontSize: "1.5rem",
                            },
                            "& .MuiFormHelperText-root": {
                                fontSize: "1.2rem",
                            },
                        }}
                    />
                    <div className={styles.ButtonWrap}>
                        <Button
                            variant="outlined"
                            value="home"
                            onClick={() => UpdateScheduleData("home")}
                        >
                            ホームに戻る
                        </Button>
                        <Button
                            variant="contained"
                            value="tommorow"
                            onClick={() => UpdateScheduleData("tommorow")}
                        >
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
