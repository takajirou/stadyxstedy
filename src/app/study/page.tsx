import styles from "@styles/appStyles/study/Page.module.scss";
import Header from "@/components/Header";
import Timer from "@/components/study/Timer";
import Button from "@mui/material/Button";

export default function Study() {
    return (
        <>
            <Header />
            <div className={styles.TimeWrap}>
                <div className={styles.Timer}>
                    <Timer totalStudyHours={0.01} breakMinutes={0.1} breakCount={4} />
                </div>
                <Button className={styles.EndBtn} variant="contained">
                    勉強終了
                </Button>
            </div>
        </>
    );
}
