"use client";

import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { supabase } from "@lib/supabaseClient";
import { useRouter } from "next/navigation";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styles from "@styles/componentStyles/createSchedule/CreateField.module.scss";
import Button from "@mui/material/Button";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";

const array = [0, 10, 20, 30, 40, 50];
const breakArray = [0, 5, 10, 15, 20, 25, 30];
const breakCountArray = [0, 1, 2, 3, 4, 5];

interface Props {
    date: string;
    selectDate: (date?: string) => void;
}

export default function CreateField({ date, selectDate }: Props) {
    const router = useRouter();
    const [objective, setObjective] = useState("");
    const [studyContent, setStudyContent] = useState("");
    const [studyHours, setStudyHours] = useState(0);
    const [studyMinutes, setStudyMinutes] = useState(0);
    const [studyTime, setStudyTime] = useState(0);
    const [breakTime, setBreakTime] = useState(0);
    const [breakCount, setBreakCount] = useState(0);
    const [open, setOpen] = useState(false);
    const [objectiveOpen, setObjectiveOpen] = useState(false);
    let CreateDate;

    if (date === "today") {
        CreateDate = new Date().toISOString().split("T")[0];
    } else {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        CreateDate = tomorrow.toISOString().split("T")[0];
    }

    useEffect(() => {
        setStudyTime((prev) => {
            const newTime = studyHours * 60 + studyMinutes;
            return prev !== newTime ? newTime : prev;
        });
    }, [studyHours, studyMinutes]);

    const CreateSchedule = async () => {
        try {
            const { error } = await supabase.from("Schedule").insert([
                {
                    date: CreateDate,
                    studyTime: studyTime,
                    breakTime: breakTime,
                    breakCount: breakCount,
                    object: objective,
                    studyContent: studyContent,
                    state: "unfinished",
                },
            ]);

            if (error) {
                console.error("データ挿入エラー:", error);
                alert("データ挿入エラー: " + error.message);
            } else {
                // console.log("スケジュールが正常に作成されました");
                // alert("スケジュールが正常に作成されました");
                router.push("/home");
            }
        } catch (err) {
            const errorMessage = (err as Error).message;
            console.error("予期しないエラー:", errorMessage);
            alert("予期しないエラー: " + errorMessage);
        }
    };

    const handleSubmit = async (objective: string) => {
        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: objective }),
            });
            const data = await res.json();
            console.log("Chat APIの応答:", data);

            if (data.result === "はい") {
                CreateSchedule();
            } else {
                setObjectiveOpen(true);
            }
        } catch (err) {
            const errorMessage = (err as Error).message;
            console.error("handleSubmit内のエラー:", errorMessage);
            alert("handleSubmit内のエラー: " + errorMessage);
        }
    };

    const CheckFields = () => {
        if (
            objective === "" ||
            studyContent === "" ||
            studyTime === 0 ||
            breakTime === 0 ||
            breakCount === 0
        ) {
            setOpen(true);
        } else {
            HandleEvent();
        }
    };

    const HandleClose = () => {
        setOpen(false);
    };

    const HandleObjectiveClose = () => {
        setObjectiveOpen(false);
    };

    const HandleEvent = () => {
        handleSubmit(objective);
    };

    return (
        <>
            <Dialog open={objectiveOpen} onClose={HandleObjectiveClose}>
                <DialogTitle>もっと具体的な目標をつけよう！</DialogTitle>
                <DialogActions>
                    <Button onClick={HandleObjectiveClose}>閉じる</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={open} onClose={HandleClose}>
                <DialogTitle>入力していないフィールドがあります</DialogTitle>
                <DialogActions>
                    <Button onClick={HandleClose}>閉じる</Button>
                </DialogActions>
            </Dialog>
            <div className={styles.FieldsWrap}>
                <div className={styles.Fields}>
                    <h2>勉強時間</h2>
                    <div>
                        <Select
                            onChange={(e) => setStudyHours(Number(e.target.value))}
                            defaultValue={0}
                            sx={{
                                fontSize: "1.5rem",
                                backgroundColor: "white",
                                "& .MuiSelect-select": {
                                    padding: "10px",
                                },
                            }}
                        >
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                        </Select>
                        <p>時間</p>
                        <Select
                            onChange={(e) => setStudyMinutes(Number(e.target.value))}
                            defaultValue={0}
                            sx={{
                                fontSize: "1.5rem",
                                backgroundColor: "white",
                                "& .MuiSelect-select": {
                                    padding: "10px",
                                },
                            }}
                        >
                            {array.map((num) => (
                                <MenuItem key={num} value={num}>
                                    {num}
                                </MenuItem>
                            ))}
                        </Select>
                        <p>分</p>
                    </div>
                </div>
                <div className={styles.Fields}>
                    <h2>休憩</h2>
                    <div>
                        <Select
                            onChange={(e) => setBreakTime(Number(e.target.value))}
                            defaultValue={0}
                            sx={{
                                fontSize: "1.5rem",
                                backgroundColor: "white",
                                "& .MuiSelect-select": {
                                    padding: "10px",
                                },
                            }}
                        >
                            {breakArray.map((num) => (
                                <MenuItem key={num} value={num}>
                                    {num}
                                </MenuItem>
                            ))}
                        </Select>
                        <p>分</p>
                        <Select
                            onChange={(e) => setBreakCount(Number(e.target.value))}
                            defaultValue={0}
                            sx={{
                                fontSize: "1.5rem",
                                backgroundColor: "white",
                                "& .MuiSelect-select": {
                                    padding: "10px",
                                },
                            }}
                        >
                            {breakCountArray.map((num) => (
                                <MenuItem key={num} value={num}>
                                    {num}
                                </MenuItem>
                            ))}
                        </Select>
                        <p>回</p>
                    </div>
                </div>
                <div className={styles.TextFields}>
                    <h2>目標</h2>
                    <TextField
                        fullWidth
                        onChange={(e) => setObjective(e.target.value)}
                        variant="outlined"
                        placeholder="例）英語過去問で80点以上取れるようにする"
                        helperText="最大20文字"
                        InputLabelProps={{ shrink: true }}
                        inputProps={{
                            maxLength: 20,
                            style: { fontSize: "1.5rem" },
                        }}
                        sx={{
                            "& .MuiInputBase-input": {
                                padding: "10px",
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
                </div>
                <div className={styles.TextFields}>
                    <h2>勉強内容</h2>
                    <TextField
                        fullWidth
                        multiline
                        onChange={(e) => setStudyContent(e.target.value)}
                        variant="outlined"
                        placeholder="例）リスニング過去問を何度も解く"
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
                </div>

                <div className={styles.BtnWrap}>
                    <Button
                        variant="outlined"
                        sx={{ fontSize: "1.4rem" }}
                        onClick={() => selectDate()}
                    >
                        戻る
                    </Button>
                    <Button variant="contained" sx={{ fontSize: "1.4rem" }} onClick={CheckFields}>
                        スケジュールを登録する
                    </Button>
                </div>
            </div>
        </>
    );
}
