"use client";

import { TextField } from "@mui/material";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import { useState } from "react";

// const hours = Array.from({ length: 24 }, (_, i) => i);

export default function CreateField() {
    const [selectedHour, setSelectedHour] = useState(0);
    const handleScrollUp = () => {
        setSelectedHour((prevHour: number) => (prevHour === 23 ? 0 : prevHour + 1));
    };

    const handleScrollDown = () => {
        setSelectedHour((prevHour: number) => (prevHour === 0 ? 23 : prevHour - 1));
    };

    return (
        <div>
            <TextField
                fullWidth
                label="勉強目標"
                variant="outlined"
                placeholder="例）英語のリスニングを1時間勉強する"
                helperText="最大20文字"
                InputLabelProps={{ shrink: true }}
                inputProps={{
                    maxLength: 20,
                    style: { fontSize: "1.5rem" },
                }}
                sx={{
                    "& label": {
                        fontSize: "1.5rem",
                    },
                    "& .MuiFormHelperText-root": {
                        fontSize: "1.2rem",
                    },
                }}
            />
            <ReactScrollWheelHandler
                upHandler={handleScrollUp}
                downHandler={handleScrollDown}
                style={{ height: "100px", overflow: "hidden" }}
            >
                <div style={{ fontSize: "20px", fontWeight: "bold", color: "#007bff" }}>
                    {selectedHour} 時間
                </div>
            </ReactScrollWheelHandler>
        </div>
    );
}
