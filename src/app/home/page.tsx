import Objective from "@/components/Objective";
import Schedule from "@/components/Schedule";
import styles from "@styles/appStyles/home/Page.module.scss";

export default function ObjectivesPage() {
    return (
        <div className={styles.PageWrap}>
            <Objective Objective="grand" />
            <Objective Objective="week" />
            <Schedule />
        </div>
    );
}
