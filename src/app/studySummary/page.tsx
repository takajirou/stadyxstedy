import Header from "@/components/Header";
import SummaryField from "@/components/studySummary/SummaryField";
import Button from "@mui/material/Button";

export default function StudySummary() {
    return (
        <>
            <Header />
            <div>
                <SummaryField />
                <Button variant="outlined">ホームに戻る</Button>
                <Button variant="contained">明日のスケジュールを作成する</Button>
            </div>
        </>
    );
}
