"use client";
import { useEffect } from "react";
import { supabase } from "@lib/supabaseClient";

export default function useResetCondition() {
    useEffect(() => {
        const upDateCondition = async () => {
            const { error } = await supabase
                .from("StudyCondition")
                .update({ Condition: false })
                .eq("Condition", true);

            if (error) {
                console.error("Error fetching objectives", error);
            }
        };
        upDateCondition();
    }, []);
}
