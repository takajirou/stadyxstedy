"use client";
import { useEffect, useState } from "react";
import { LuPencil } from "react-icons/lu";
import clsx from "clsx";
import styles from "@styles/componentStyles/home/Objective.module.scss";
import Link from "next/link";
import { Button } from "@mui/material";
import { supabase } from "@lib/supabaseClient";
import { GoTrash } from "react-icons/go";
interface Objectives {
    id: number;
    Objective: string;
    Size: string;
}
type ObjectiveProps = {
    Objective: string;
};

export default function ObjectivesPage({ Objective }: ObjectiveProps) {
    const [grandObjective, setGrandObjective] = useState<Objectives | null>(null);
    const [weekObjective, setWeekObjective] = useState<Objectives | null>(null);

    const fetchGrandObjectives = async () => {
        const { data } = await supabase.from("Objectives").select("*").eq("Size", "grand").single();
        return data;
    };

    const fetchWeekObjectives = async () => {
        const { data } = await supabase.from("Objectives").select("*").eq("Size", "week").single();
        return data;
    };

    const fetchObjectives = async () => {
        const [grandData, weekData] = await Promise.all([
            fetchGrandObjectives(),
            fetchWeekObjectives(),
        ]);

        if (grandData) setGrandObjective(grandData);
        if (weekData) setWeekObjective(weekData);
    };

    useEffect(() => {
        fetchObjectives();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deleteObjective = async (size: string) => {
        const { error } = await supabase
            .from("Objectives")
            .update({ Objective: "" })
            .eq("Size", size);
        if (error) {
            console.log("目標なし");
        } else {
            fetchObjectives();
        }
    };

    return (
        <main>
            <>
                {Objective === "grand" ? (
                    <div
                        className={clsx(
                            styles.ObjectiveWrap,
                            grandObjective?.Objective ? "" : styles.ObjectiveWrapEmpty
                        )}
                    >
                        <div className={styles.ObjectiveHeader}>
                            <h2>大目標</h2>
                            <div className={styles.icons}>
                                <button onClick={() => deleteObjective("grand")}>
                                    <GoTrash size="16px" color="#e75f5f" />
                                </button>
                                <Link href="/edit" className={styles.ObjectiveButton}>
                                    <LuPencil color="#898989" />
                                </Link>
                            </div>
                        </div>
                        {grandObjective?.Objective ? (
                            <div key={grandObjective.id}>
                                <p>{grandObjective.Objective}</p>
                            </div>
                        ) : (
                            <Button
                                variant="contained"
                                href="/edit"
                                className={styles.ObjectiveEmptyButton}
                            >
                                新しく目標を設定
                            </Button>
                        )}
                    </div>
                ) : (
                    <div
                        className={clsx(
                            styles.ObjectiveWrap,
                            weekObjective?.Objective ? "" : styles.ObjectiveWrapEmpty
                        )}
                    >
                        <div className={styles.ObjectiveHeader}>
                            <h2>週目標</h2>
                            <div className={styles.icons}>
                                <button onClick={() => deleteObjective("week")}>
                                    <GoTrash size="16px" color="#e75f5f" />
                                </button>
                                <Link href="/edit" className={styles.ObjectiveButton}>
                                    <LuPencil color="#898989" />
                                </Link>
                            </div>
                        </div>
                        {weekObjective?.Objective ? (
                            <div key={weekObjective.id} className={styles.Objective}>
                                <p>{weekObjective.Objective}</p>
                            </div>
                        ) : (
                            <Button
                                variant="contained"
                                href="/edit"
                                className={styles.ObjectiveEmptyButton}
                            >
                                新しく目標を設定
                            </Button>
                        )}
                    </div>
                )}
            </>
        </main>
    );
}
