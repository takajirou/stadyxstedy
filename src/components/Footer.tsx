import styles from "@styles/componentStyles/Footer.module.scss";
import { GoHome } from "react-icons/go";
import { PiPlusSquareBold } from "react-icons/pi";
import { BsClockHistory } from "react-icons/bs";
import { Button } from "@mui/material";

export default function Footer() {
    return (
        <footer className={styles.FooterWrap}>
            <div className={styles.NavBtn}>
                <GoHome color="white" size="24px" />
                <p>ホーム</p>
            </div>
            <div className={styles.NavBtn}>
                <PiPlusSquareBold color="white" size="24px" />
                <p>作成</p>
            </div>
            <Button variant="contained" className={styles.StartButton} sx={{ padding: 0 }}>
                <p>勉強開始</p>
            </Button>
            <div className={styles.NavBtn}>
                <BsClockHistory color="white" size="24px" />
                <p>履歴</p>
            </div>
            <div className={styles.NavBtn}>
                <BsClockHistory color="white" size="24px" />
                <p>設定</p>
            </div>
        </footer>
    );
}
