// "use client";

// import Objective from "@/components/Objective";
// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/Supabase";

// interface GrandObjective {
//     id: number;
//     grandObject: string;
// }

// console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
// console.log("Supabase Key:", process.env.NEXT_PUBLIC_SUPABASE_KEY);

// export default function Home() {
//     const [grandObjectives, setGrandObjectives] = useState<GrandObjective[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchGrandObjective = async () => {
//             setLoading(true);
//             const { data, error } = await supabase.from("grandObjective").select("*").eq("id", 1);

//             console.log("Data:", data);
//             console.log("Error:", error);

//             if (error) {
//                 console.error("Error fetching grand objectives:", error.message);
//             } else {
//                 setGrandObjectives(data || []);
//             }

//             setLoading(false);
//         };

//         fetchGrandObjective();
//     }, []);

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     return (
//         <>
//             <footer></footer>
//             <main>
//                 <Objective />
//                 {grandObjectives.length > 0 ? (
//                     grandObjectives.map((objective) => (
//                         <div key={objective.id}>{objective.grandObject}</div>
//                     ))
//                 ) : (
//                     <p>No objectives found.</p>
//                 )}
//             </main>
//         </>
//     );
// }

"use client";

import Objective from "@/components/Objective";
import { useEffect, useState } from "react";
interface GrandObjective {
    id: number;
    grandObject: string;
}

interface weekObjective {
    id: number;
    weekObject: string;
}

export default function ObjectivesPage() {
    const [grandObjectives, setGrandObjectives] = useState<GrandObjective[]>([]);
    const [weekObjectives, setWeekObjectives] = useState<WeekObjective[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchObjectives = async () => {
            try {
                const [grandResponse, weekResponse] = await Promise.all([
                    fetch("/grandObjective.json"),
                    fetch("/weekObjective.json"),
                ]);

                if (!grandResponse.ok) {
                    throw new Error(`Error fetching grandObjective.json: ${grandResponse.status}`);
                }
                if (!weekResponse.ok) {
                    throw new Error(`Error fetching weekObjective.json: ${weekResponse.status}`);
                }

                const [grandData, weekData]: [GrandObjective[], WeekObjective[]] =
                    await Promise.all([grandResponse.json(), weekResponse.json()]);

                setGrandObjectives(grandData);
                setWeekObjectives(weekData);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An unexpected error occurred");
            }
        };

        fetchObjectives();
    }, []);

    return (
        <>
            <footer></footer>
            <main>
                {error ? (
                    <p>Error: {error}</p>
                ) : (
                    <>
                        <h2>大目標</h2>
                        {grandObjectives.length > 0 ? (
                            grandObjectives.map((objective) => (
                                <div key={objective.id}>{objective.grandObject}</div>
                            ))
                        ) : (
                            <p>大目標は設定されていません</p>
                        )}

                        <h2>週目標</h2>
                        {weekObjectives.length > 0 ? (
                            weekObjectives.map((objective) => (
                                <div key={objective.id}>{objective.weekObject}</div>
                            ))
                        ) : (
                            <p>週目標は設定されていません</p>
                        )}
                    </>
                )}
            </main>
        </>
    );
}
