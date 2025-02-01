"use client";
import { useEffect, useState } from "react";
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

interface HistoryProps {
    id: number;
}

export default function HistoryPage({ id }: HistoryProps) {
    const [history, setHistory] = useState<Schedule | null>(null);
    useEffect(() => {
        const fetchHistory = async () => {
            const { data, error } = await supabase
                .from("Schedule")
                .select("*")
                .eq("state", "finished")
                .eq("id", id)
                .single();
            if (error) {
                console.error("Error fetching history:", error.message);
            } else {
                setHistory(data);
            }
        };

        fetchHistory();
    });

    return (
        <main>
            <h1>history</h1>
            <div>{history?.studyContent}</div>
        </main>
    );
}
