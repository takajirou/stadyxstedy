"use client";

import styles from "@styles/componentStyles/home/DayCounter.module.scss";
import { useEffect, useState } from "react";
import { supabase } from "@lib/supabaseClient";

interface Counter {
    id: number;
    Count: number;
}

export default function DayCounter() {
    const [count, setCount] = useState<Counter | null>(null);

    useEffect(() => {
        const fetchCounter = async () => {
            const { data, error } = await supabase.from("DayCounter").select("Count").single();
            if (error) {
                console.error("Failed to fetch counter", error);
            } else {
                setCount(data?.Count || null);
            }
        };

        fetchCounter();
    }, []);

    return (
        <div className={styles.DayCounterWrap}>
            <h1>{count !== null ? `${count}日連続学習中！` : "loading..."}</h1>
        </div>
    );
}
