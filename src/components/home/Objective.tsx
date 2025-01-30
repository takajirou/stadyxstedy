"use client";
import { useEffect, useState } from "react";
import { LuPencil } from "react-icons/lu";
import clsx from "clsx";
import styles from "@styles/componentStyles/home/Objective.module.scss";
import Link from "next/link";
import { Button } from "@mui/material";
import { supabase } from "@lib/supabaseClient";
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

    useEffect(() => {
        const fetchGrandObjectives = async () => {
            try {
                const { data, error } = await supabase
                    .from("Objectives")
                    .select("*")
                    .eq("Size", "grand")
                    .single();

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
                    .eq("Size", "week")
                    .single();

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
                            <Link href="/edit" className={styles.ObjectiveButton}>
                                <LuPencil color="#898989" />
                            </Link>
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
                            <Link href="/edit" className={styles.ObjectiveButton}>
                                <LuPencil color="#898989" />
                            </Link>
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
