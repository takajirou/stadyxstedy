"use client";

import styles from "@styles/componentStyles/home/WrapSchedule.module.scss";
import Schedules from "@/components/home/Schedules";

import clsx from "clsx";
import { useRef, useState, useEffect } from "react";

export default function Schedule() {
    const containerRef = useRef<HTMLDivElement>(null);
    const todayRef = useRef<HTMLDivElement>(null);
    const tomorrowRef = useRef<HTMLDivElement>(null);
    const [todayScale, setTodayScale] = useState(1);
    const [tomorrowScale, setTomorrowScale] = useState(0.8);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current || !todayRef.current || !tomorrowRef.current) return;

            const todayRect = todayRef.current.getBoundingClientRect();
            const tomorrowRect = tomorrowRef.current.getBoundingClientRect();

            const screenLeft = 0;
            const screenRight = window.innerWidth;

            if (todayRect.left > screenLeft) {
                setTodayScale(1);
            } else {
                const overflowLeft = screenLeft - todayRect.left;
                const maxOverflow = todayRect.width;
                const newScale = Math.max(0.8, 1 - (overflowLeft / maxOverflow) * 0.2);
                setTodayScale(newScale);
            }

            if (tomorrowRect.right < screenRight) {
                setTomorrowScale(1);
            } else {
                const overflowRight = tomorrowRect.right - screenRight;
                const maxOverflow = tomorrowRect.width;
                const newScale = Math.max(0.8, 1 - (overflowRight / maxOverflow) * 0.2);
                setTomorrowScale(newScale);
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (container) {
                container.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    return (
        <div className={styles.ScheduleWrap}>
            <div className={styles.ScheduleHeader}>
                <h2>今日のスケジュール</h2>
            </div>

            <div className={styles.ScheduleContainer} ref={containerRef}>
                <div
                    className={clsx(styles.TodaySchedule, styles.Schedules)}
                    ref={todayRef}
                    style={{ transform: `scale(${todayScale})` }}
                >
                    <Schedules fetchDate="today" />
                </div>

                <div
                    className={clsx(styles.TomorrowSchedule, styles.Schedules)}
                    ref={tomorrowRef}
                    style={{ transform: `scale(${tomorrowScale})` }}
                >
                    <Schedules fetchDate="tomorrow" />
                </div>
            </div>
        </div>
    );
}
