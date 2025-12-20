from datasets import load_dataset

ds = load_dataset("its-myrto/fitness-question-answers")
df = ds["train"].to_pandas()
df.to_csv("fitness_question_answers.csv", index=False)
