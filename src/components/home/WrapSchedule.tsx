"use client";

import styles from "@styles/componentStyles/home/Schedule.module.scss";
import Schedules from "@/components/home/Schedules";

export default function Schedule() {
    return (
        <div className={styles.ScheduleWrap}>
            <Schedules fetchDate="today" />
            <Schedules fetchDate="tomorrow" />
        </div>
    );
}
