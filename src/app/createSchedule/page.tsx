import styles from "@styles/appStyles/createSchedule/Page.module.scss";
import Header from "@/components/Header";
import CreateField from "@/components/createSchedule/CreateField";

export default function Page() {
    return (
        <>
            <Header />
            <div className={styles.CreateScheduleWrap}>
                <h1>勉強スケジュール作成</h1>
                <CreateField />
            </div>
        </>
    );
}
