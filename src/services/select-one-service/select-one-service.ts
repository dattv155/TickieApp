import React from 'react';
import {NumberFilter} from 'react3l-advanced-filters';
import {IdFilter} from 'react3l-advanced-filters';

export function useIdFilter(
  initIdFilter: IdFilter,
): [IdFilter, (index?: number | null) => void] {
  const [idFilter, setIdFilter] = React.useState<IdFilter>(initIdFilter);

  const handleChange = React.useCallback((index?: number | null) => {
    setIdFilter({
      ...new IdFilter(),
      equal: index,
    });
  }, []);

  return [idFilter, handleChange];
}

export function useNumberFilter(
  initNumberFilter: NumberFilter,
): [NumberFilter, (index?: number | null) => void] {
  const [idFilter, setIdFilter] = React.useState<NumberFilter>(
    initNumberFilter,
  );

  const handleChange = React.useCallback((index?: number | null) => {
    setIdFilter({
      ...new NumberFilter(),
      equal: index,
    });
  }, []);

  return [idFilter, handleChange];
}
