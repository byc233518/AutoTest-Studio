export function createRunFilters(scenarioId = '') {
  return { keyword: '', status: '', scenarioId, dateRange: [] };
}

function localDateKey(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function filterRuns(runs = [], scenarios = [], filters = createRunFilters()) {
  const scenarioNames = new Map(scenarios.map((item) => [item.id, item.name]));
  const keyword = String(filters.keyword || '').trim().toLocaleLowerCase();
  const [startDate, endDate] = filters.dateRange || [];

  return runs.filter((run) => {
    const searchable = `${run.runId || ''} ${scenarioNames.get(run.scenarioId) || ''}`.toLocaleLowerCase();
    const runDate = localDateKey(run.startedAt);
    return (!keyword || searchable.includes(keyword))
      && (!filters.status || run.status === filters.status)
      && (!filters.scenarioId || run.scenarioId === filters.scenarioId)
      && (!startDate || runDate >= startDate)
      && (!endDate || runDate <= endDate);
  });
}
