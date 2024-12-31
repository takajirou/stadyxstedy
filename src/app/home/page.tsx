import Objective from "@/components/Objective";
import styles from "@styles/appStyles/home/Page.module.scss";

export default function ObjectivesPage() {
    return (
        <div className={styles.PageWrap}>
            <Objective Objective="grand" />
            <Objective Objective="week" />
        </div>
    );
}
