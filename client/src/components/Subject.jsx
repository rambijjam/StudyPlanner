import Slider from '@mui/material/Slider'
import Switch from '@mui/material/Switch';
import { Flame } from 'lucide-react'

export const Subject = ({subjects, index, setSubjects})=>{
    const subject = subjects[index];
    if(!subject) return null;

    const handleChangeUrgent= ()=>{
        const updated = subjects.map((sub,ind)=>{
            return (
                ind === index ?{...sub, isUrgent : !sub.isUrgent}:sub
            )
        });
        setSubjects(updated);
    }

    const handleChange = (field,value)=>{
        const updated = subjects.map((sub, ind)=>{
            return (ind === index ? {...sub, [field]:value} : sub)
        })
        setSubjects(updated)
    }

    return (
        <div className="space-y-6">
            <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                    type="text"
                    value={subject.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Enter subject name..."
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 
                            focus:outline-none focus:ring-2 focus:ring-blue-400 
                            dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">Difficulty</label>
                <Slider
                    size="small"
                    value={subject.difficulty}
                    valueLabelDisplay="auto"
                    min={1}
                    max={10}
                    onChange={(e, val) => handleChange('difficulty', val)}
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">Previous Score</label>
                <Slider
                    size="small"
                    value={subject.previous_score}
                    valueLabelDisplay="auto"
                    min={0}
                    max={100}
                    onChange={(e, val) => handleChange('previous_score', val)}
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">Days</label>
                <Slider
                    size="small"
                    value={subject.days}
                    valueLabelDisplay="auto"
                    min={1}
                    max={30}
                    onChange={(e, val) => handleChange('days', val)}
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">Topics</label>
                <Slider
                    size="small"
                    value={subject.topics}
                    valueLabelDisplay="auto"
                    min={1}
                    max={20}
                    onChange={(e, val) => handleChange('topics', val)}
                />
            </div>

            <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-3 rounded-xl">
                
                <div className="flex items-center gap-2">
                    <Flame className="text-red-500" size={18} />
                    <span className="font-medium">Urgent</span>
                </div>

                <Switch
                    checked={subject.isUrgent}
                    onChange={handleChangeUrgent}
                    sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                            color: '#ef4444',
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#ef4444',
                        },
                    }}
                />
            </div>

        </div>
    )
}