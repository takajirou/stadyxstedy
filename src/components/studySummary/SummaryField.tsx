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
    studyMinutes: number;
}

export default function SummaryField() {
    const [scheduleData, setScheduleData] = useState<Schedule>();
    const today = new Date("2025-01-01");
    useEffect(() => {
        const fetchScheduleData = async () => {
            const { data, error } = await supabase
                .from("Schedule")
                .select("*")
                .eq("date", today.toISOString().split("T")[0])
                .single();
            if (error) {
                console.error("Error fetching schedule data:", error);
            } else {
                setScheduleData(data);
            }
        };
        fetchScheduleData();
    });

    return (
        <div>
            {scheduleData ? (
                <div>
                    <h1>学習リワード</h1>
                    <h2>学習時間</h2>
                    <p>{scheduleData.studyMinutes}</p>
                    <h2>目標</h2>
                    <p>{scheduleData.object}</p>
                    <h2>目標達成</h2>

                    <h2>学習内容のまとめ</h2>
                    <textarea></textarea>
                </div>
            ) : (
                <p>loading...</p>
            )}
        </div>
    );
}
