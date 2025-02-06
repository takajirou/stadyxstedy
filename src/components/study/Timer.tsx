"use client";

import styles from "@styles/componentStyles/study/Timer.module.scss";
import React, { useState, useEffect } from "react";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { orbitron } from "@/app/fonts";
import { Button, Typography } from "@mui/material";
import EndButton from "@/components/study/EndButton";
import CheckSchedule from "@/components/study/CheckSchedule";
import { supabase } from "@/lib/supabaseClient";
import Loading from "@/components/Loading";
import clsx from "clsx";
import { useRef } from "react";

export default function Timer() {
    const [totalStudyHours, setTotalStudyHours] = useState<number | null>(null);
    const [breakMinutes, setBreakMinutes] = useState<number | null>(null);
    const [breakCount, setBreakCount] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [time, setTime] = useState<number>(0);
    const [remainingStudyTime, setRemainingStudyTime] = useState<number>(0);
    const [currentCycle, setCurrentCycle] = useState<number>(1);
    const [isPaused, setIsPaused] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [remainingBreakCount, setRemainingBreakCount] = useState<number>(0);
    const [totalStudyMinutes, setTotalStudyMinutes] = useState<number>(0);
    const studyStartTime = useRef<number | null>(null);

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        const fetchScheduleData = async () => {
            try {
                const { data, error } = await supabase
                    .from("Schedule")
                    .select("studyTime, breakTime, breakCount")
                    .eq("date", today)
                    .single();

                if (error) throw new Error(error.message);

                setTotalStudyHours(data.studyTime);
                setBreakMinutes(data.breakTime);
                setBreakCount(data.breakCount);
                setRemainingBreakCount(data.breakCount);

                const totalStudyMinutes = data.studyTime;
                setTotalStudyMinutes(totalStudyMinutes);

                const totalStudySeconds = totalStudyMinutes * 60;
                const studyTimePerCycle = totalStudySeconds / (data.breakCount! + 1);
                setTime(studyTimePerCycle);
                setRemainingStudyTime(totalStudySeconds);
            } catch (err) {
                setError(err instanceof Error ? err.message : "データの取得に失敗しました");
            }
        };

        fetchScheduleData();
    }, []);

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
            if (!isBreak && currentCycle <= breakCount!) {
                setIsBreak(true);
                setTime(breakMinutes! * 60);
            } else if (isBreak) {
                setIsBreak(false);
                if (currentCycle - 1 < breakCount!) {
                    setRemainingBreakCount((prev) => prev - 1);
                    const studyTimePerCycle = (totalStudyMinutes * 60) / (breakCount! + 1);
                    setTime(studyTimePerCycle);
                    setCurrentCycle((prev) => prev + 1);
                }
            }
        }
    }, [
        time,
        isPaused,
        isBreak,
        currentCycle,
        breakCount,
        remainingStudyTime,
        breakMinutes,
        totalStudyMinutes,
        remainingBreakCount,
    ]);

    useEffect(() => {
        if (!isPaused && !isBreak) {
            if (studyStartTime.current === null) {
                studyStartTime.current = Date.now();
            }

            const interval = setInterval(() => {
                if (studyStartTime.current !== null) {
                    const elapsedMinutes = Math.floor(
                        (Date.now() - studyStartTime.current) / 60000
                    );
                    setTotalStudyMinutes(elapsedMinutes);
                }
            }, 1000);

            return () => clearInterval(interval);
        } else if (isPaused || isBreak) {
            studyStartTime.current = null;
        }
    }, [isPaused, isBreak]);

    const formatTime = (time: number) => {
        const h = Math.floor(time / 3600);
        const m = Math.floor((time % 3600) / 60);
        const s = time % 60;
        return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s
            .toString()
            .padStart(2, "0")}`;
    };

    const togglePause = () => {
        setIsPaused((prev) => !prev);
    };

    if (error) {
        return <div className={styles.Error}>エラー: {error}</div>;
    }

    if (totalStudyHours === null || breakMinutes === null || breakCount === null) {
        return <Loading />;
    }

    return (
        <div className={styles.studyWrap}>
            <div className={styles.TimerWrap}>
                <p className={styles.StudyState}>
                    {isBreak ? "休憩中" : remainingStudyTime === 0 ? "勉強終了" : "勉強中"}
                </p>
                <Typography
                    variant="h1"
                    className={clsx(orbitron.className, isBreak && styles.Break)}
                >
                    {formatTime(remainingStudyTime)}
                </Typography>
                <p>
                    {isBreak
                        ? `休憩時間残り： ${formatTime(time)}`
                        : remainingBreakCount === 0
                        ? "次の休憩：なし"
                        : `次の休憩まで： ${formatTime(time)}`}
                </p>
                <Button onClick={togglePause} className={styles.PauseBtn}>
                    {isPaused ? (
                        <PlayCircleOutlineIcon sx={{ fontSize: 30 }} />
                    ) : (
                        <PauseCircleFilledIcon sx={{ fontSize: 30 }} />
                    )}
                </Button>
            </div>
            <div className={styles.EndBtn}>
                <CheckSchedule />
                <EndButton
                    remainingStudyTime={remainingStudyTime}
                    totalStudyMinutes={totalStudyMinutes}
                />
            </div>
        </div>
    );
}
