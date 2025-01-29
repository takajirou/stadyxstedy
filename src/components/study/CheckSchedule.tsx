"use client";

import { SwipeableDrawer, List, ListItem, ListItemText, Divider, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import styles from "@styles/componentStyles/study/CheckSchedule.module.scss";
import { supabase } from "@lib/supabaseClient";

interface Schedule {
    id: number;
    object: string;
    studyTime: number;
    breakTime: number;
    breakCount: number;
    studyContent: string;
    date: string;
    state: string;
}

interface Objective {
    id: number;
    Objective: string;
    Size: string;
}
const CheckSchedule = () => {
    const [open, setOpen] = useState(false);
    const [filteredSchedules, setFilteredSchedules] = useState<Schedule>();
    const [weekObjective, setWeekObjective] = useState<Objective>();
    const [grandObjective, setGrandObjective] = useState<Objective>();
    const [studyHours, setStudyHours] = useState<number>();
    const [studyMinutes, setStudyMinutes] = useState<number>();

    useEffect(() => {
        const fetchWeekObjective = async () => {
            const { data, error } = await supabase
                .from("Objectives")
                .select("*")
                .eq("Size", "week")
                .single();

            if (error) {
                throw new Error(error.message);
            }
            setWeekObjective(data);
        };
        const fetctGrandObjective = async () => {
            const { data, error } = await supabase
                .from("Objectives")
                .select("*")
                .eq("Size", "grand")
                .single();

            if (error) {
                throw new Error(error.message);
            } else {
                setGrandObjective(data);
            }
        };
        const fetchSchedules = async () => {
            const today = new Date();

            const targetDateString = today.toISOString().split("T")[0];

            const { data, error } = await supabase
                .from("Schedule")
                .select("*")
                .eq("date", targetDateString)
                .eq("state", "unfinished")
                .single();

            if (error) {
                throw new Error(error.message);
            } else {
                setFilteredSchedules(data);
            }
        };

        fetchSchedules();
        fetchWeekObjective();
        fetctGrandObjective();
    }, []);

    const toggleDrawer = (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === "keydown" &&
            "key" in event &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setOpen(isOpen);
    };

    useEffect(() => {
        if (filteredSchedules) {
            setStudyMinutes(filteredSchedules.studyTime % 60);
            setStudyHours(Math.floor(filteredSchedules.studyTime / 60));
        }
    }, [filteredSchedules]);

    return (
        <>
            <Button
                variant="outlined"
                sx={{
                    width: "110px",
                    height: "40px",
                    fontSize: "1.4rem",
                    color: "#7194e1",
                }}
                onClick={toggleDrawer(true)}
            >
                予定の確認
            </Button>
            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <div
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <List>
                        <ListItem>
                            <ListItemText
                                primary="大目標"
                                secondary={grandObjective ? grandObjective.Objective : ""}
                                classes={{
                                    primary: styles.primaryText,
                                    secondary: styles.secondaryText,
                                }}
                            />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText
                                primary="週目標"
                                secondary={weekObjective ? weekObjective.Objective : ""}
                                classes={{
                                    primary: styles.primaryText,
                                    secondary: styles.secondaryText,
                                }}
                            />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText
                                primary="今日の目標"
                                secondary={filteredSchedules ? filteredSchedules.object : ""}
                                classes={{
                                    primary: styles.primaryText,
                                    secondary: styles.secondaryText,
                                }}
                            />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText
                                primary="勉強時間"
                                secondary={
                                    filteredSchedules
                                        ? `${studyHours}時間 ${
                                              studyMinutes === 0 ? "" : ` ${studyMinutes}分`
                                          }`
                                        : ""
                                }
                                classes={{
                                    primary: styles.primaryText,
                                    secondary: styles.secondaryText,
                                }}
                            />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText
                                primary="休憩時間"
                                secondary={
                                    filteredSchedules
                                        ? `${filteredSchedules.breakTime}分 x ${filteredSchedules.breakCount}回`
                                        : ""
                                }
                                classes={{
                                    primary: styles.primaryText,
                                    secondary: styles.secondaryText,
                                }}
                            />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText
                                primary="勉強の内容"
                                secondary={filteredSchedules ? filteredSchedules.studyContent : ""}
                                classes={{
                                    primary: styles.primaryText,
                                    secondary: styles.secondaryText,
                                }}
                            />
                        </ListItem>
                    </List>
                </div>
            </SwipeableDrawer>
        </>
    );
};

export default CheckSchedule;
