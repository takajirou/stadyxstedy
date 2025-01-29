import styles from "@styles/componentStyles/Loading.module.scss";

export default function Loading() {
    return (
        <div className={styles.loadingWrap}>
            <video autoPlay loop muted playsInline>
                <source src="/videos/01.webm" type="video/webm" />
            </video>
            <p>loading...</p>
        </div>
    );
}
