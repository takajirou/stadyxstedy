"use client";

import styles from "@styles/componentStyles/study/Timer.module.scss";
import React, { useState, useEffect } from "react";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

const Timer: React.FC<{ totalStudyHours: number; breakMinutes: number; breakCount: number }> = ({
    totalStudyHours,
    breakMinutes,
    breakCount,
}) => {
    const totalStudySeconds = totalStudyHours * 3600;
    const breakSeconds = breakMinutes * 60;
    const studyPerCycleSeconds = totalStudySeconds / breakCount;

    const [time, setTime] = useState(studyPerCycleSeconds);
    const [remainingStudyTime, setRemainingStudyTime] = useState(totalStudySeconds);
    const [currentCycle, setCurrentCycle] = useState(1);
    const [isPaused, setIsPaused] = useState(false);
    const [isBreak, setIsBreak] = useState(false);

    useEffect(() => {
        if (time > 0 && !isPaused) {
            const timer = setInterval(() => {
                setTime((prevTime) => prevTime - 1);

                if (!isBreak) {
                    setRemainingStudyTime((prev) => prev - 1);
                }
            }, 1000);

            return () => clearInterval(timer);
        } else if (time === 0) {
            if (!isBreak) {
                if (currentCycle < breakCount) {
                    setIsBreak(true);
                    setTime(breakSeconds);
                }
            } else {
                setIsBreak(false);
                if (currentCycle < breakCount) {
                    setTime(studyPerCycleSeconds);
                    setCurrentCycle((prev) => prev + 1);
                }
            }
        }
    }, [time, isPaused, isBreak, currentCycle, breakCount, studyPerCycleSeconds, breakSeconds]);

    const formatTime = (time: number, isMinutesOnly: boolean = false) => {
        if (isMinutesOnly) {
            const m = Math.floor(time / 60);
            const s = time % 60;
            return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
        } else {
            const h = Math.floor(time / 3600);
            const m = Math.floor((time % 3600) / 60);
            const s = time % 60;
            return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s
                .toString()
                .padStart(2, "0")}`;
        }
    };

    const togglePause = () => {
        setIsPaused((prev) => !prev);
    };

    return (
        <div className={styles.TimerWrap}>
            <p>{isBreak ? "休憩中" : remainingStudyTime === 0 ? "勉強終了" : "勉強中"}</p>
            <h1>{formatTime(remainingStudyTime)}</h1>
            <p>
                {isBreak
                    ? `休憩時間残り： ${formatTime(time, true)}`
                    : breakCount - currentCycle === 0
                    ? `勉強終了まで： ${formatTime(time, true)}`
                    : `休憩まで： ${formatTime(time, true)}`}
            </p>
            <button onClick={togglePause} className={styles.PauseBtn}>
                {isPaused ? (
                    <PlayCircleOutlineIcon
                        sx={{
                            fontSize: 40,
                        }}
                    />
                ) : (
                    <PauseCircleFilledIcon
                        sx={{
                            fontSize: 40,
                        }}
                    />
                )}
            </button>
        </div>
    );
};

export default Timer;
