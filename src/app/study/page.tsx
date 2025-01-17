// import styles from "@styles/appStyles/study/Page.module.scss";
import Header from "@/components/Header";
import Timer from "@/components/study/Timer";

export default function Study() {
    return (
        <>
            <Header />
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <Timer totalStudyHours={0.01} breakMinutes={0.1} breakCount={4} />
            </div>
        </>
    );
}
