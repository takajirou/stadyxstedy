"use client";

import styles from "@styles/componentStyles/home/DayCounter.module.scss";
import { useEffect, useState } from "react";

export default function DayCounter() {
    const [counter, setCounter] = useState({ count: 0 });

    useEffect(() => {
        const fetchCounter = async () => {
            const response = await fetch("/DayCounter.json");

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
            <h1>{counter.count}日連続学習中！</h1>
        </div>
    );
}
