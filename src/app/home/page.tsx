import Objective from "@/components/home/Objective";
import WrapSchedule from "@/components/home/WrapSchedule";
import styles from "@styles/appStyles/home/Page.module.scss";
// import DayCounter from "@/components/home/DayCounter";
import Header from "@/components/Header";

export default function Home() {
    return (
        <>
            <Header />
            <div className={styles.PageWrap}>
                <Objective Objective="grand" />
                <Objective Objective="week" />
                {/* <WrapSchedule /> */}
                {/* <DayCounter /> */}
            </div>
        </>
    );
}
