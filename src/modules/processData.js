export function quizData(data, type) {
  const selectedCategory = data.quizzes.filter(
    (category) => category.title === type
  );
  
  return selectedCategory[0];
}


