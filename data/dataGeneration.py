import numpy as np
import pandas as pd
import random

data = []
num_students = 2000

for student_id in range(num_students):
    num_subjects = random.randint(2,10)
    available_hours_total = random.randint(3,8)
    ability = random.uniform(0.4, 1.0)
    subjects = []
    for s in range(num_subjects):

        difficulty = random.randint(1,5)
        days_until_exam = random.randint(5,60)

        previous_score = int(random.gauss(60+ability*25, 10))
        previous_score = max(35, min(previous_score, 95))

        topics_remaining = int(random.gauss(10-ability*5,2))
        topics_remaining = max(2, min(topics_remaining, 15))

        weight = (
            difficulty*0.4+
            topics_remaining*0.3+
            (100-previous_score)*0.02+
            10*(1/days_until_exam)
        )

        subjects.append({
            "difficulty" : difficulty,
            "previous_score" : previous_score,
            "topics_remaining" : topics_remaining,
            "days_until_exam" : days_until_exam,
            "weight" : weight
        })
        

    total_weight = sum(s["weight"] for s in subjects)

    for i, subject in enumerate(subjects):
        recommended_hours =(
            subject["weight"]/total_weight
        )*available_hours_total

        noise = random.uniform(0.95, 1.05)
        recommended_hours = recommended_hours*noise

        recommended_hours = round(recommended_hours,2)

        data.append([
            student_id,
            i,
            subject["difficulty"],
            subject["previous_score"],
            subject["days_until_exam"],
            subject["topics_remaining"],
            available_hours_total,
            round(subject["weight"], 4),
            recommended_hours
        ])


columns = [
    "student_id",
    "subject_id",
    "difficulty",
    "previous_score",
    "days_until_exam",
    "topics_remaining",
    "available_hours_total",
    "priority_weight",
    "recommended_hours"
]

df = pd.DataFrame(data, columns = columns)
df.to_csv("./raw/student_study_dataset.csv", index = False)
     