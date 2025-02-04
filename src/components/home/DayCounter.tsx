"use client";

import styles from "@styles/componentStyles/home/DayCounter.module.scss";
import { useEffect, useState } from "react";
import { supabase } from "@lib/supabaseClient";

interface DayCounterData {
    id: number;
    Count: number;
}

export default function DayCounter() {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        const fetchCounter = async () => {
            const { data, error } = await supabase
                .from("DayCounter")
                .select("*")
                .eq("id", 1)
                .single<DayCounterData>();

            if (error) {
                console.error(error);
                return;
            }

            if (data) {
                setCount(data.Count);
            }
        };

        fetchCounter();
    }, []);

    return count === null || count === 0 || count === 1 ? (
        ""
    ) : (
        <div className={styles.DayCounterWrap}>
            <h1>{count !== null ? `${count}日連続学習中！` : "loading..."}</h1>
        </div>
    );
}
