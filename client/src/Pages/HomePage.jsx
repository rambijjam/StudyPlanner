import { useEffect, useState } from "react"
import { predictStudyPlan } from "../services/api";
import { Subject } from "../components/Subject";
import { Analysis } from "../components/Analysis";
import Slider from "@mui/material/Slider";
import { BookPlus } from "lucide-react";

const emptySubject = {
    name : '',
    difficulty : 5,
    previous_score : 75, 
    days : 7,
    topics : 5,
    isUrgent : false
}

const getSubject = ({name, isUrgent, ...rest})=>({
    ...rest,
    is_urgent : isUrgent
});

export const HomePage = ()=>{

    const [subjects, setSubjects] = useState([]);
    const [totalHours, setTotalHours] = useState(0);
    const [optimisedSubjects, setOptimisedSubjects] = useState([]);
    const [displayIndex, setDisplayIndex] = useState(0);

    useEffect(()=>{
        const timer = setTimeout(()=>{
            const fetchData = async()=>{
                const newSubjects = subjects.map(sub=>getSubject(sub));
                const res = await predictStudyPlan({total_hours : parseFloat(totalHours), subjects : newSubjects});
                setOptimisedSubjects(res);
            }
            if(subjects.length>0 && totalHours >0) fetchData();
        }, 800);

        return ()=>clearTimeout(timer);
        
    }, [subjects, totalHours])

    const addSubject = ()=>{
        setSubjects(prev => {
            const updated = [...prev, {...emptySubject, name : `Subject ${prev.length+1}`}];
            setDisplayIndex(updated.length-1);
            return updated;
        });
    }


    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-6">

            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">Study Smarter, Not Harder</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Precision-engineered study plans for you
                </p>
            </div>

            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 space-y-6">


                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">

                    <button
                        onClick={addSubject}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                        <BookPlus size={25} strokeWidth={2}/>
                        Add Subject
                    </button>

                    <div className="flex items-center gap-3">
                        <label className="font-medium">Subject:</label>

                        {subjects.length > 0 ? (
                            <select
                            value={displayIndex}
                            onChange={(e) => setDisplayIndex(Number(e.target.value))}
                            className="px-3 py-2 rounded-lg border dark:bg-gray-700"
                            >
                            {subjects.map((subject, index) => (
                                <option key={index} value={index}>
                                {subject.name}
                                </option>
                            ))}
                            </select>
                        ) : (
                            <div className="text-sm text-gray-500 italic">
                            No subjects yet
                            </div>
                        )}
                    </div>
                </div>

                <label className="block mb-1 font-medium">
                    Total Study Hours
                </label>

                <Slider
                    value={totalHours}
                    min={1}
                    max={24}
                    step={0.5}
                    valueLabelDisplay="auto"
                    onChange={(e, val) => setTotalHours(val)}
                />

                {subjects.length > 0 && (
                    <div className="border-t pt-4">
                        <Subject
                            subjects={subjects}
                            index={displayIndex}
                            setSubjects={setSubjects}
                        />
                    </div>
                )}

            </div>


            {optimisedSubjects.length > 0 && (
                <div className="max-w-4xl mx-auto mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
                    <Analysis
                        subjects={subjects}
                        optimisedSubjects={optimisedSubjects}
                    />
                </div>
            )}

        </div>
    )
}