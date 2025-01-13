import styles from "@styles/appStyles/edit/Page.module.scss";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import EditFeld from "@/components/edit/EditFeld";
import Button from "@mui/material/Button";

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
            <Link className={styles.EditButton} href="/home">
                <Button variant="outlined">戻る</Button>
                <Button variant="contained">編集を終わる</Button>
            </Link>
        </div>
    );
}
