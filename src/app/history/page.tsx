"use client";
import { useEffect, useState } from "react";
import History from "@/components/history/History";
import { supabase } from "@lib/supabaseClient";

interface Schedule {
    id: number;
    object: string;
    studyTime: number;
    breakTime: number;
    breakCount: number;
    studyContent: string;
    date: string;
    state: string;
}

export default function HistoryPage() {
    const [history, setHistory] = useState<Schedule[]>([]);
    useEffect(() => {
        const fetchHistory = async () => {
            const { data, error } = await supabase
                .from("Schedule")
                .select("*")
                .eq("state", "finished");
            if (error) {
                console.error("Error fetching history:", error.message);
            } else {
                setHistory(data);
            }
        };

        fetchHistory();
    }, []);

    return (
        <main>
            <div>
                {history.map((schedule) => (
                    <History key={schedule.id} id={schedule.id} />
                ))}
            </div>
        </main>
    );
}
