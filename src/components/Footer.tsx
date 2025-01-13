import styles from "@styles/componentStyles/Footer.module.scss";
import { GoHome } from "react-icons/go";
import { PiPlusSquare } from "react-icons/pi";
import { IoBookOutline } from "react-icons/io5";
import { BsClockHistory } from "react-icons/bs";
import { GoGear } from "react-icons/go";
import clsx from "clsx";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className={styles.FooterWrap}>
            <Link href="/home" className={clsx(styles.NavBtn, styles.HomeBtn)}>
                <GoHome color="white" size="24px" />
                <p>ホーム</p>
            </Link>
            <Link href="/create" className={clsx(styles.NavBtn, styles.CreateBtn)}>
                <PiPlusSquare color="white" size="24px" />
                <p>作成</p>
            </Link>
            <Link href="/study" className={clsx(styles.StartBtn)}>
                <IoBookOutline color="#1976d2" size="30px" />
                <p>勉強開始</p>
            </Link>
            <Link href="/history" className={clsx(styles.NavBtn, styles.HistoryBtn)}>
                <BsClockHistory color="white" size="24px" />
                <p>履歴</p>
            </Link>
            <Link href="/option" className={clsx(styles.NavBtn, styles.SettingBtn)}>
                <GoGear color="white" size="24px" />
                <p>設定</p>
            </Link>
        </footer>
    );
}
