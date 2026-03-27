import {PieChart} from "@mui/x-charts/PieChart"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography";

const COLORS = ["#fa938e", "#98bf45", "#51cbcf", "#d397ff", "#facc15", "#60a5fa", "#0088FE", '#FFBB28', '#FF8042'] ;

export const Analysis = ({subjects, optimisedSubjects})=>{
    if(!optimisedSubjects || optimisedSubjects.length === 0){
        return <p> No data available </p>
    }

    const totalHours = optimisedSubjects.reduce(
        (sum, s)=>sum+s.recommended_hours,
        0
    )

    const chartData = optimisedSubjects.map((sub, index)=>({
        id : index, 
        label : subjects[index]?.name || `Subject ${index+1}`,
        value : sub.recommended_hours, 
        percentage : (sub.recommended_hours/totalHours)*100,
        color : COLORS[index %COLORS.length],
    }))

    return (
        <Box sx = {{width : "100%", textAlign : "center"}}>
            <Typography variant="h5" gutterBottom>
                Study Plan Distribution
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", height: 400 }}>
        
                <PieChart
                series={[
                    {
                    data: chartData.map(({id, value, label, color})=>({
                        id, 
                        value,
                        label, 
                        color,
                    })),

                    innerRadius: 70,
                    outerRadius: 140,

                    arcLabel: (item) =>`${item.label} (${((item.value / totalHours) *100).toFixed(0)}%)`,

                    valueFormatter: ({ value }) =>
                        `${value} hrs (${((value / totalHours) * 100).toFixed(1)}%)`,

                    highlightScope: { fade: "global", highlight: "item" },
                    highlighted: { additionalRadius: 5 },
                    cornerRadius: 4,
                    },
                ]}
                height={400}
                slotProps={{
                    legend : {hidden :true}
                }}
                />
            </Box>
                
            <Box
                sx = {{
                mt :3, 
                display:"flex",
                flexWrap:"wrap",
                justifyContent:"center",
                gap:2,
              }} 
            >
              {chartData.map((item) => (
                    <Box
                        key={item.id}
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                        <Box
                        sx={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            backgroundColor: item.color,
                        }}
                        />

                        <Typography variant="body2">
                        {item.label} ({item.percentage.toFixed(0)}%)
                        </Typography>
                    </Box>
                ))}  
            </Box>

            <Typography variant="body1" sx={{ mt: 2 }}>
                Total Study Time: <strong>{totalHours.toFixed(2)} hrs</strong>
            </Typography>
        </Box>
    )
}
