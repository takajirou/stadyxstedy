import styles from "@styles/appStyles/study/Page.module.scss";
import Header from "@/components/Header";
import { Timer } from "@/components/study/Timer";

export default function Study() {
    return (
        <>
            <Header />
            <div className={styles.Page}>
                <div className={styles.TimerWrap}>
                    <Timer />
                </div>
            </div>
        </>
    );
}
