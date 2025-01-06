"use client";
import { useEffect, useState } from "react";
import { LuPencil } from "react-icons/lu";
import { HiPlusSm } from "react-icons/hi";
import styles from "@styles/componentStyles/home/Objective.module.scss";
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
                <div className={styles.ObjectiveWrap}>
                    {Objective === "grand" ? (
                        <>
                            <div className={styles.ObjectiveHeader}>
                                <h2>大目標</h2>
                                <div className={styles.ObjectiveButton}>
                                    <LuPencil />
                                    <HiPlusSm size="20px" />
                                </div>
                            </div>
                            {grandObjectives.length > 0 ? (
                                grandObjectives.map((objective) => (
                                    <div key={objective.id}>{objective.grandObject}</div>
                                ))
                            ) : (
                                <p>目標がまだ設定されていません。新しい目標を追加してください。</p>
                            )}
                        </>
                    ) : (
                        <>
                            <div className={styles.ObjectiveHeader}>
                                <h2>週目標</h2>
                                <div className={styles.ObjectiveButton}>
                                    <LuPencil />
                                    <HiPlusSm size="20px" />
                                </div>
                            </div>
                            {weekObjectives.length > 0 ? (
                                weekObjectives.map((objective) => (
                                    <div key={objective.id}>{objective.weekObject}</div>
                                ))
                            ) : (
                                <p>
                                    週目標がまだ設定されていません。新しい目標を追加してください。
                                </p>
                            )}
                        </>
                    )}
                </div>
            )}
        </main>
    );
}
