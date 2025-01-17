import Objective from "@/components/home/Objective";
import Schedule from "@/components/home/Schedule";
import styles from "@styles/appStyles/home/Page.module.scss";
import DayCounter from "@/components/home/DayCounter";
import { CgProfile } from "react-icons/cg";

export default function Home() {
    return (
        <>
            <div className={styles.PageWrap}>
                <header className={styles.Header}>
                    <CgProfile size="30px" color="#333" />
                </header>
                <Objective Objective="grand" />
                <Objective Objective="week" />
                <Schedule />
                <DayCounter />
            </div>
        </>
    );
}
