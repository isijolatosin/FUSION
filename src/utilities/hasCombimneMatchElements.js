function hasCombimneMatchElements(array1, array2, numberOfcomparisons) {
  let commonElements;
  let isOnlyGym = true;

  if (array1?.gymGoals?.length > 0 && array2?.gymGoals?.length > 0) {
    commonElements = array1?.gymGoals?.filter((element) =>
      [...array2?.interestsArray, ...array2?.gymGoals]?.includes(element)
    );
  } else {
    commonElements = array1?.interestsArray?.filter((element) =>
      array2?.interestsArray?.includes(element)
    );
    isOnlyGym = false;
  }

  if (!isOnlyGym) {
    return { isSimilarInterest: commonElements?.length >= 3 };
  } else {
    return { isSimilarGymGoal: commonElements?.length >= numberOfcomparisons };
  }
}
export default hasCombimneMatchElements;
