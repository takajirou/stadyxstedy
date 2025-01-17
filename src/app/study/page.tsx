"use client";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import styles from "@styles/appStyles/study/Page.module.scss";

export default function Study() {
    const router = useRouter();

    const handleBack = () => {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.push("/home");
        }
    };
    return (
        <>
            <header className={styles.ObjectiveEditHeader}>
                <button onClick={handleBack}>
                    <IoIosArrowBack size="30px" color="#fff" />
                </button>
                <h1>勉強</h1>
            </header>
        </>
    );
}
