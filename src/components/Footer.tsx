"use client";

import styles from "@styles/componentStyles/Footer.module.scss";
import { GoHome, GoGear } from "react-icons/go";
import { PiPlusSquare } from "react-icons/pi";
import { IoBookOutline } from "react-icons/io5";
import { BsClockHistory } from "react-icons/bs";
import clsx from "clsx";
import Link from "next/link";
import { Dialog, DialogActions, Button, DialogTitle } from "@mui/material";
import { useState } from "react";

export default function Footer() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>勉強を開始しますか？</DialogTitle>
                <DialogActions onClick={handleClose}>
                    <Button onClick={handleClose}>いいえ</Button>
                    <Button onClick={handleClose} href="/study">
                        はい
                    </Button>
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
                <button className={clsx(styles.StartBtn)} onClick={handleClickOpen}>
                    <IoBookOutline color="#1976d2" size="30px" />
                    <p>勉強開始</p>
                </button>
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
