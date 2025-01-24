"use client";

import { usePathname } from "next/navigation";
import styles from "@styles/componentStyles/Footer.module.scss";
import { GoHome, GoGear } from "react-icons/go";
import { PiPlusSquare } from "react-icons/pi";
import { IoBookOutline } from "react-icons/io5";
import { BsClockHistory } from "react-icons/bs";
import clsx from "clsx";
import Link from "next/link";
import { Dialog, DialogActions, Button, DialogTitle } from "@mui/material";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Footer() {
    const pathname = usePathname();
    // const today = new Date().toISOString().split("T")[0]; // 今日の日付を取得
    const today = new Date("2025-01-01").toISOString().split("T")[0];
    const [data, setData] = useState(null);
    const [open, setOpen] = useState(false);
    const [openNoneSchedule, setOpenNoneSchedule] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const scheduleRes = await supabase
                    .from("Schedule")
                    .select("*")
                    .eq("date", today)
                    .eq("state", "unfinished");

                if (scheduleRes.error) {
                    console.error("Error fetching schedule:", scheduleRes.error);
                } else {
                    setData(scheduleRes.data.length > 0 ? scheduleRes.data[0] : null);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [today]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenNoneSchedule = () => {
        setOpenNoneSchedule(true);
    };

    const handleCloseNoneSchedule = () => {
        setOpenNoneSchedule(false);
    };

    return (
        <>
            {pathname === "/study" ? (
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>既に勉強中です。</DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose}>閉じる</Button>
                    </DialogActions>
                </Dialog>
            ) : (
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>勉強を開始しますか？</DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose}>いいえ</Button>
                        <Button onClick={handleClose} href="/study">
                            はい
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
            <Dialog open={openNoneSchedule} onClose={handleCloseNoneSchedule}>
                <DialogTitle>今日のスケジュールが設定されていません。</DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseNoneSchedule}>閉じる</Button>
                </DialogActions>
            </Dialog>

            <footer className={styles.FooterWrap}>
                <Link href="/home" className={clsx(styles.NavBtn, styles.HomeBtn)}>
                    <GoHome color="white" size="24px" />
                    <p>ホーム</p>
                </Link>
                <Link href="/create" className={clsx(styles.NavBtn, styles.CreateBtn)}>
                    <PiPlusSquare color="white" size="24px" />
                    <p>作成</p>
                </Link>
                <Button
                    className={clsx(styles.StartBtn)}
                    onClick={data ? handleClickOpen : handleOpenNoneSchedule}
                >
                    <IoBookOutline color="#1976d2" size="30px" />
                    <p>{pathname === "/study" ? "勉強中" : "勉強開始"}</p>
                </Button>
                <Link href="/history" className={clsx(styles.NavBtn, styles.HistoryBtn)}>
                    <BsClockHistory color="white" size="24px" />
                    <p>履歴</p>
                </Link>
                <Link href="/option" className={clsx(styles.NavBtn, styles.SettingBtn)}>
                    <GoGear color="white" size="24px" />
                    <p>設定</p>
                </Link>
            </footer>
        </>
    );
}
