"use client";

import styles from "@styles/componentStyles/edit/EditField.module.scss";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Link from "next/link";

interface GrandObjective {
    id: number;
    grandObject: string;
}

interface WeekObjective {
    id: number;
    weekObject: string;
}
export default function EditFeld() {
    const [grandObjectives, setGrandObjectives] = useState<GrandObjective[]>([]);
    const [weekObjectives, setWeekObjectives] = useState<WeekObjective[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchObjectives = async () => {
            try {
                const [grandResponse, weekResponse] = await Promise.all([
                    fetch("/grandObjective.json"),
                    fetch("/weekObjective.json"),
                ]);

                if (!grandResponse.ok) {
                    throw new Error(`Error fetching grandObjective.json: ${grandResponse.status}`);
                }
                if (!weekResponse.ok) {
                    throw new Error(`Error fetching weekObjective.json: ${weekResponse.status}`);
                }

                const [grandData, weekData]: [GrandObjective[], WeekObjective[]] =
                    await Promise.all([grandResponse.json(), weekResponse.json()]);

                setGrandObjectives(grandData);
                setWeekObjectives(weekData);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An unexpected error occurred");
            }
        };

        fetchObjectives();
    }, []);

    if (error) {
        return <div>{`Error: ${error}`}</div>;
    }

    return (
        <>
            <div className={styles.EditFieldWrap}>
                <div className={styles.EditObjective}>
                    <TextField
                        fullWidth
                        label="大目標"
                        placeholder={
                            grandObjectives.length > 0 ? grandObjectives[0].grandObject : ""
                        }
                        helperText="最大50文字"
                        InputLabelProps={{ shrink: true }}
                        inputProps={{
                            maxLength: 50,
                            style: { fontSize: "1.5rem" },
                        }}
                        sx={{
                            "& label": {
                                fontSize: "1.5rem",
                            },
                            "& .MuiFormHelperText-root": {
                                fontSize: "1.2rem",
                            },
                        }}
                    />
                </div>
                <div className={styles.EditObjective}>
                    <TextField
                        fullWidth
                        label="週目標"
                        placeholder={weekObjectives.length > 0 ? weekObjectives[0].weekObject : ""}
                        helperText="最大50文字"
                        InputLabelProps={{ shrink: true }}
                        inputProps={{
                            maxLength: 50,
                            style: { fontSize: "1.5rem" },
                        }}
                        sx={{
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
            <div className={styles.EditButton}>
                <Link href="/home">
                    <Button variant="outlined">戻る</Button>
                </Link>
                <Link href="/home">
                    <Button variant="contained">編集を終わる</Button>
                </Link>
            </div>
        </>
    );
}
