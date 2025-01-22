import { useState } from "react";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@mui/material";

export default function EndButton({ remainingStudyTime }: { remainingStudyTime: number }) {
    const [open, setOpen] = useState(false);
    const upDateCondition = async () => {
        const { error } = await supabase
            .from("StudyCondition")
            .update({ Condition: false })
            .eq("Condition", true);

        if (error) {
            console.error("Error fetching objectives", error);
        }
    };

    const CloseAndUpdate = () => {
        upDateCondition();
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
                    <Button onClick={CloseAndUpdate} href="/home">
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
                onClick={remainingStudyTime === 0 ? upDateCondition : EndStudyCheck}
                href={remainingStudyTime === 0 ? "/home" : undefined}
            >
                勉強終了
            </Button>
        </>
    );
}
