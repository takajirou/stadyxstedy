"use client";

import styles from "@styles/componentStyles/edit/EditField.module.scss";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Link from "next/link";
import { supabase } from "@lib/supabaseClient";

interface Objectives {
    id: number;
    Objective: string;
    Size: string;
}
export default function EditFeld() {
    const [grandObjective, setGrandObjective] = useState<Objectives[]>([]);
    const [weekObjective, setWeekObjective] = useState<Objectives[]>([]);
    const [grandObjectiveValue, setGrandObjectiveValue] = useState<string | undefined>(undefined);
    const [weekObjectiveValue, setWeekObjectiveValue] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchGrandObjectives = async () => {
            try {
                const { data, error } = await supabase
                    .from("Objectives")
                    .select("*")
                    .eq("Size", "grand");

                if (error) {
                    console.error("Error fetching grand objectives:", error.message);
                    return null;
                }
                return data;
            } catch (err) {
                console.error("Unexpected error fetching grand objectives:", err);
                return null;
            }
        };

        const fetchWeekObjectives = async () => {
            try {
                const { data, error } = await supabase
                    .from("Objectives")
                    .select("*")
                    .eq("Size", "week");

                if (error) {
                    console.error("Error fetching week objectives:", error.message);
                    return null;
                }
                return data;
            } catch (err) {
                console.error("Unexpected error fetching week objectives:", err);
                return null;
            }
        };

        const fetchObjectives = async () => {
            const [grandData, weekData] = await Promise.all([
                fetchGrandObjectives(),
                fetchWeekObjectives(),
            ]);

            if (grandData) setGrandObjective(grandData);
            if (weekData) setWeekObjective(weekData);
        };

        fetchObjectives();
    }, []);

    const UpdateObjective = () => {
        if (grandObjectiveValue && weekObjectiveValue) {
            async function updateGrandObjective() {
                const { data, error } = await supabase
                    .from("Objectives")
                    .update({ Objective: grandObjectiveValue })
                    .eq("Size", "grand");

                if (error) {
                    console.error("Error updating grand objective:", error.message);
                    return;
                }
                console.log(data);
            }
            updateGrandObjective();
        } else if (grandObjectiveValue) {
            async function updateGrandObjective() {
                const { data, error } = await supabase
                    .from("Objectives")
                    .update({ Objective: grandObjectiveValue })
                    .eq("Size", "grand");
                if (error) {
                    console.error("Error updating grand objective:", error.message);
                    return;
                }
                console.log(data);
            }
            updateGrandObjective();
            console.log("大目標のみ入力されました:", grandObjectiveValue);
        } else if (weekObjectiveValue) {
            async function updateWeekObjective() {
                const { data, error } = await supabase
                    .from("Objectives")
                    .update({ Objective: weekObjectiveValue })
                    .eq("Size", "week");

                if (error) {
                    console.error("Error updating week objective:", error.message);
                    return;
                }
                console.log(data);
            }
            updateWeekObjective();
            console.log("週目標のみ入力されました:", weekObjectiveValue);
        } else {
            console.log("何も入力されていません。");
        }
    };

    return (
        <>
            <div className={styles.EditFieldWrap}>
                <div className={styles.EditObjective}>
                    <TextField
                        fullWidth
                        label="大目標"
                        placeholder={grandObjective.length > 0 ? grandObjective[0].Objective : ""}
                        helperText="最大50文字"
                        onChange={(e) => setGrandObjectiveValue(e.target.value)}
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
                        placeholder={weekObjective.length > 0 ? weekObjective[0].Objective : ""}
                        helperText="最大50文字"
                        onChange={(e) => setWeekObjectiveValue(e.target.value)}
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
                    <Button variant="contained" onClick={UpdateObjective}>
                        編集を終わる
                    </Button>
                </Link>
            </div>
        </>
    );
}
