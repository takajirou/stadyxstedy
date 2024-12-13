"use client";

import Objective from "@/components/Objective";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/Supabase";

interface GrandObjective {
    id: number;
    grandObject: string;
}

export default function Home() {
    const [GrandObjective, setGrandObjective] = useState<GrandObjective[]>([]);

    useEffect(() => {
        const fetchGrandObjective = async () => {
            const { data, error } = await supabase.from("grandObjective").select("*");
            if (error) {
                console.error(error);
            } else {
                console.log(data);
                setGrandObjective(data);
            }
        };

        fetchGrandObjective();
    }, []);

    console.log(GrandObjective);
    return (
        <>
            <footer></footer>
            <main>
                <Objective />
            </main>
        </>
    );
}
