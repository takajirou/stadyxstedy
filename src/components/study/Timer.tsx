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

export default function Timer() {
    const today = new Date().toISOString().split("T")[0];
    const [totalStudyHours, setTotalStudyHours] = useState<number | null>(null);
    const [breakMinutes, setBreakMinutes] = useState<number | null>(null);
    const [breakCount, setBreakCount] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [time, setTime] = useState<number>(0);
    const [remainingStudyTime, setRemainingStudyTime] = useState<number>(0);
    const [currentCycle, setCurrentCycle] = useState<number>(1);
    const [isPaused, setIsPaused] = useState(false);
    const [isBreak, setIsBreak] = useState(false);

    const [totalStudyMinutes, setTotalStudyMinutes] = useState<number>(0);

    useEffect(() => {
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

                const totalStudyMinutes = data.studyTime;
                setTotalStudyMinutes(totalStudyMinutes);

                const totalStudySeconds = totalStudyMinutes * 60;
                const studyPerCycleSeconds = totalStudySeconds / data.breakCount;

                setTime(studyPerCycleSeconds);
                setRemainingStudyTime(totalStudySeconds);
            } catch (err) {
                setError(err instanceof Error ? err.message : "データの取得に失敗しました");
            }
        };

        fetchScheduleData();
    }, [today]);

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
            if (!isBreak && currentCycle < breakCount!) {
                setIsBreak(true);
                setTime(breakMinutes! * 60);
            } else if (isBreak) {
                setIsBreak(false);
                if (currentCycle < breakCount!) {
                    setTime(remainingStudyTime / (breakCount! - currentCycle));
                    setCurrentCycle((prev) => prev + 1);
                }
            }
        }
    }, [time, isPaused, isBreak, currentCycle, breakCount, remainingStudyTime, breakMinutes]);

    useEffect(() => {
        if (!isPaused && !isBreak) {
            const interval = setInterval(() => {
                setTotalStudyMinutes((prevMinutes) => prevMinutes + 1);
            }, 60000);

            return () => clearInterval(interval);
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
                <Typography variant="h1" className={orbitron.className}>
                    {formatTime(remainingStudyTime)}
                </Typography>
                <p>
                    {isBreak
                        ? `休憩時間残り： ${formatTime(time)}`
                        : `休憩まで： ${formatTime(time)}`}
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
