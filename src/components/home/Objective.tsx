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
    const [grandObjective, setGrandObjective] = useState<Objectives[]>([]);
    const [weekObjective, setWeekObjective] = useState<Objectives[]>([]);

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
    return (
        <main>
            <>
                {Objective === "grand" ? (
                    <div
                        className={clsx(
                            styles.ObjectiveWrap,
                            grandObjective.length === 0 && styles.ObjectiveWrapEmpty
                        )}
                    >
                        <div className={styles.ObjectiveHeader}>
                            <h2>大目標</h2>
                            <Link href="/edit" className={styles.ObjectiveButton}>
                                <LuPencil color="#898989" />
                            </Link>
                        </div>
                        {grandObjective.length > 0 ? (
                            grandObjective.map((objective) => (
                                <div key={objective.id}>
                                    <p>{objective.Objective}</p>
                                </div>
                            ))
                        ) : (
                            <Button variant="contained" className={styles.ObjectiveEmptyButton}>
                                新しく目標を設定
                            </Button>
                        )}
                    </div>
                ) : (
                    <div
                        className={clsx(
                            styles.ObjectiveWrap,
                            weekObjective.length === 0 && styles.ObjectiveWrapEmpty
                        )}
                    >
                        <div className={styles.ObjectiveHeader}>
                            <h2>週目標</h2>
                            <Link href="/edit" className={styles.ObjectiveButton}>
                                <LuPencil color="#898989" />
                            </Link>
                        </div>
                        {weekObjective.length > 0 ? (
                            weekObjective.map((objective) => (
                                <div key={objective.id} className={styles.Objective}>
                                    <p>{objective.Objective}</p>
                                </div>
                            ))
                        ) : (
                            <Button variant="contained" className={styles.ObjectiveEmptyButton}>
                                新しく目標を設定
                            </Button>
                        )}
                    </div>
                )}
            </>
        </main>
    );
}
