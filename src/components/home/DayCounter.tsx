"use client";

import styles from "@styles/componentStyles/home/DayCounter.module.scss";
import { useEffect, useState } from "react";

interface Counter {
    count: number;
}

export default function DayCounter() {
    const [counter, setCounter] = useState<Counter | null>(null);

    useEffect(() => {
        const fetchCounter = async () => {
            const response = await fetch("/dayCounter.json");

            if (!response.ok) {
                throw new Error(`Error fetching counter.json: ${response.status}`);
            }

            const data = await response.json();

            setCounter(data);
        };

        fetchCounter();
    }, []);

    return (
        <div className={styles.DayCounterWrap}>
            <h1>{counter ? `${counter.count}日連続学習中！` : "loading..."}</h1>
        </div>
    );
}
