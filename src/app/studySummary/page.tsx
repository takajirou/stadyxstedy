import Header from "@/components/Header";
import SummaryField from "@/components/studySummary/SummaryField";
import styles from "@styles/appStyles/studySummary/Page.module.scss";

export default function StudySummary() {
    return (
        <>
            <Header />
            <div className={styles.SummaryWrap}>
                <SummaryField />
            </div>
        </>
    );
}
