export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toDateString().slice(4, 15);
}

export function removeTimeFromDate(dateString) {
  const date = new Date(dateString);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function sortByDate(array, dateKey) {
  return array.sort((a, b) => new Date(a[dateKey]) - new Date(b[dateKey]));
}

export function filterByResourceType(resources, resourceType) {
  return resources.filter(
    (resource) => resource.resource_type === resourceType
  );
}

export function generateMaterials(resources) {
  const materials = filterByResourceType(resources, "material");

  return materials;
}

export function generateAssignments(resources) {
  const assignments = filterByResourceType(resources, "assignment");

  return sortByDate(assignments, "due_date");
}

export function filterScheduledExams(exams) {
  const currentDate = removeTimeFromDate(Date.now());
  return exams.filter((exam) => {
    const examDate = removeTimeFromDate(exam.date);
    return examDate >= currentDate;
  });
}

export function filterFinishedExams(exams) {
  const currentDate = removeTimeFromDate(Date.now());
  return exams.filter((exam) => {
    const examDate = removeTimeFromDate(exam.date);
    return examDate < currentDate;
  });
}
