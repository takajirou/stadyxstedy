import styles from "@styles/appStyles/study/Page.module.scss";
import Header from "@/components/Header";
import Timer from "@/components/study/Timer";
import Button from "@mui/material/Button";

export default function Study() {
    return (
        <>
            <Header />
            <div className={styles.Page}>
                <div className={styles.TimerWrap}>
                    <div className={styles.Timer}>
                        <Timer />
                    </div>
                    <div className={styles.EndBtn}>
                        <Button
                            variant="outlined"
                            sx={{
                                width: "110px",
                                height: "40px",
                                fontSize: "1.4rem",
                                color: "#7194e1",
                            }}
                        >
                            予定の確認
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                width: "110px",
                                height: "40px",
                                fontSize: "1.4rem",
                            }}
                        >
                            勉強終了
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
