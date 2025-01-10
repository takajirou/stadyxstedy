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
        </>
    );
}
