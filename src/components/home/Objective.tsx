"use client";
import { useEffect, useState } from "react";
import { LuPencil } from "react-icons/lu";
// import { HiPlusSm } from "react-icons/hi";
import clsx from "clsx";
import styles from "@styles/componentStyles/home/Objective.module.scss";
import Link from "next/link";
interface GrandObjective {
    id: number;
    grandObject: string;
}

interface WeekObjective {
    id: number;
    weekObject: string;
}

type ObjectiveProps = {
    Objective: string;
};

export default function ObjectivesPage({ Objective }: ObjectiveProps) {
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

    return (
        <main>
            {error ? (
                <div style={{ color: "red", fontWeight: "bold" }}>Error: {error}</div>
            ) : (
                <>
                    {Objective === "grand" ? (
                        <div
                            className={clsx(
                                styles.ObjectiveWrap,
                                grandObjectives.length === 0 && styles.ObjectiveWrapEmpty
                            )}
                        >
                            <div className={styles.ObjectiveHeader}>
                                <h2>大目標</h2>
                                <Link href="/edit" className={styles.ObjectiveButton}>
                                    <LuPencil color="#898989" />
                                    {/* <HiPlusSm size="30px" /> */}
                                </Link>
                            </div>
                            {grandObjectives.length > 0 ? (
                                grandObjectives.map((objective) => (
                                    <div key={objective.id}>
                                        <p>{objective.grandObject}</p>
                                    </div>
                                ))
                            ) : (
                                <button className={styles.ObjectiveEmptyButton}>
                                    新しく目標を設定
                                </button>
                            )}
                        </div>
                    ) : (
                        <div
                            className={clsx(
                                styles.ObjectiveWrap,
                                grandObjectives.length === 0 && styles.ObjectiveWrapEmpty
                            )}
                        >
                            <div className={styles.ObjectiveHeader}>
                                <h2>週目標</h2>
                                <Link href="/edit" className={styles.ObjectiveButton}>
                                    <LuPencil color="#898989" />
                                    {/* <HiPlusSm size="30px" /> */}
                                </Link>
                            </div>
                            {weekObjectives.length > 0 ? (
                                weekObjectives.map((objective) => (
                                    <div key={objective.id} className={styles.Objective}>
                                        <p>{objective.weekObject}</p>
                                    </div>
                                ))
                            ) : (
                                <button className={styles.ObjectiveEmptyButton}>
                                    新しく目標を設定
                                </button>
                            )}
                        </div>
                    )}
                </>
            )}
        </main>
    );
}
