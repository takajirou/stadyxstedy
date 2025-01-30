"use client";

import { useState } from "react";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function EndButton({
    remainingStudyTime,
    totalStudyMinutes,
}: {
    remainingStudyTime: number;
    totalStudyMinutes: number;
}) {
    const router = useRouter();
    const today = new Date();
    const [open, setOpen] = useState(false);

    const TotalTimeUpdate = async () => {
        const { error } = await supabase
            .from("Schedule")
            .update({ studyMinutes: totalStudyMinutes, state: "finished" })

            .eq("date", today.toISOString().split("T")[0]);

        if (error) {
            console.error("Error fetching objectives", error);
        }

        router.push("/studySummary");
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
                    <Button onClick={CloseAndUpdate}>はい</Button>
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
            >
                勉強終了
            </Button>
        </>
    );
}
