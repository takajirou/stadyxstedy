import styles from "@styles/appStyles/edit/Page.module.scss";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

export default function ObjectiveEdit() {
    return (
        <>
            <header className={styles.ObjectiveEditHeader}>
                <Link href="/home">
                    <IoIosArrowBack size="30px" color="#fff" />
                </Link>
                <h1>目標編集</h1>
            </header>
            <div className={styles.EditGrandObjective}>
                <h2>大目標</h2>
            </div>
            <div className={styles.EditWeekObjective}>
                <h2>週目標</h2>
            </div>
        </>
    );
}
