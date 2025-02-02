"use client";

import styles from "@styles/componentStyles/home/WrapSchedule.module.scss";
import Schedules from "@/components/home/Schedules";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import clsx from "clsx";
import { useRef, useState, useEffect } from "react";

export default function Schedule() {
    const containerRef = useRef<HTMLDivElement>(null);
    const todayRef = useRef<HTMLDivElement>(null);
    const tomorrowRef = useRef<HTMLDivElement>(null);
    const [todayScale, setTodayScale] = useState(1);
    const [tomorrowScale, setTomorrowScale] = useState(0.8);
    const [currentSchedule, setCurrentSchedule] = useState<"today" | "tomorrow">("today");

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current || !todayRef.current || !tomorrowRef.current) return;

            const container = containerRef.current;
            const todayRect = todayRef.current.getBoundingClientRect();
            const tomorrowRect = tomorrowRef.current.getBoundingClientRect();

            const containerRect = container.getBoundingClientRect();
            const containerCenter = containerRect.left + containerRect.width / 2;

            const todayCenter = todayRect.left + todayRect.width / 2;
            const tomorrowCenter = tomorrowRect.left + tomorrowRect.width / 2;

            const todayDistance = Math.abs(containerCenter - todayCenter);
            const tomorrowDistance = Math.abs(containerCenter - tomorrowCenter);

            setTodayScale(Math.max(0.8, 1 - todayDistance / containerRect.width));

            setTomorrowScale(Math.max(0.8, 1 - tomorrowDistance / containerRect.width));

            const scrollThreshold = containerRect.width / 2;
            if (container.scrollLeft > scrollThreshold) {
                setCurrentSchedule("tomorrow");
            } else {
                setCurrentSchedule("today");
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll);
            container.scrollLeft = 0;
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
                <h2>{currentSchedule === "today" ? "今日のスケジュール" : "明日のスケジュール"}</h2>
            </div>

            <div className={styles.ScheduleContainer} ref={containerRef}>
                {currentSchedule === "today" && (
                    <MdOutlineArrowForwardIos className={clsx(styles.Arrow, styles.Forward)} />
                )}
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
