import { useState } from "react";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@mui/material";

export default function EndButton({
    remainingStudyTime,
    totalStudyMinutes,
}: {
    remainingStudyTime: number;
    totalStudyMinutes: number;
}) {
    const today = new Date("2025-01-01");
    const [open, setOpen] = useState(false);

    const TotalTimeUpdate = async () => {
        const { error } = await supabase
            .from("Schedule")
            .update({ studyMinutes: totalStudyMinutes })
            .eq("date", today.toISOString().split("T")[0]);

        if (error) {
            console.error("Error fetching objectives", error);
        }
    };

    const CloseAndUpdate = () => {
        TotalTimeUpdate();
        handleClose();
    };

    const EndStudyCheck = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>勉強がまだ途中ですが終了しますか？</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>いいえ</Button>
                    <Button onClick={CloseAndUpdate} href="/studySummary">
                        はい
                    </Button>
                </DialogActions>
            </Dialog>

            <Button
                variant="contained"
                sx={{
                    width: "110px",
                    height: "40px",
                    fontSize: "1.4rem",
                }}
                onClick={remainingStudyTime === 0 ? TotalTimeUpdate : EndStudyCheck}
                href={remainingStudyTime === 0 ? "/studySummary" : undefined}
            >
                勉強終了
            </Button>
        </>
    );
}
