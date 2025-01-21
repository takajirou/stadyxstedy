import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import styles from "@styles/componentStyles/Header.module.scss";

export default function Header() {
    return (
        <header className={styles.Header}>
            <button>
                <CgProfile size="30px" color="#333" />
            </button>
            <Image priority={true} src="/images/logo.svg" alt="logo" width={150} height={75} />
        </header>
    );
}
