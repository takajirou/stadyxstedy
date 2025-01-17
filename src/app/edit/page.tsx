import styles from "@styles/appStyles/edit/Page.module.scss";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import EditFeld from "@/components/edit/EditFeld";

export default function ObjectiveEdit() {
    return (
        <div>
            <header className={styles.ObjectiveEditHeader}>
                <Link href="/home">
                    <IoIosArrowBack size="30px" color="#fff" />
                </Link>
                <h1>目標の編集</h1>
            </header>

            <EditFeld />
        </div>
    );
}
