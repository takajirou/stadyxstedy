"use client";

import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
// import { supabase } from "@lib/supabaseClient";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styles from "@styles/componentStyles/createSchedule/CreateField.module.scss";

const array = [0, 10, 20, 30, 40, 50];
const breakArray = [0, 5, 10, 15, 20, 25, 30];
const breakCountArray = [0, 1, 2, 3, 4, 5];

export default function CreateField() {
    const [studyHours, setStudyHours] = useState(0);
    const [studyMinutes, setStudyMinutes] = useState(0);
    const [studyTime, setStudyTime] = useState(0);
    const [breakTime, setBreakTime] = useState(0);
    const [breadkCount, setBreakCount] = useState(0);

    useEffect(() => {
        setStudyTime(studyHours * 60 + studyMinutes);
    }, [studyHours, studyMinutes]);

    return (
        <div className={styles.FieldsWrap}>
            <div className={styles.Fields}>
                <h2>勉強時間</h2>
                <div>
                    <Select
                        onChange={(e) => setStudyHours(Number(e.target.value))}
                        defaultValue={0}
                        sx={{
                            fontSize: "1.5rem",
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
                <h2>休憩時間</h2>
                <div>
                    <Select
                        onChange={(e) => setBreakTime(Number(e.target.value))}
                        defaultValue={0}
                        sx={{
                            fontSize: "1.5rem",
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
                </div>
            </div>
            <div className={styles.Fields}>
                <h2>休憩回数</h2>
                <div>
                    <Select
                        onChange={(e) => setBreakCount(Number(e.target.value))}
                        defaultValue={0}
                        sx={{
                            fontSize: "1.5rem",
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
                    onChange={(e) => console.log(e.target.value)}
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
                            padding: "15px",
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
                    variant="outlined"
                    placeholder="例）リスニング過去問を何度も解く"
                    helperText="最大50文字"
                    InputLabelProps={{ shrink: true }}
                    inputProps={{
                        maxLength: 50,
                        style: { fontSize: "1.5rem" },
                    }}
                    sx={{
                        "& .MuiInputBase-input": {
                            padding: "5px",
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
        </div>
    );
}
