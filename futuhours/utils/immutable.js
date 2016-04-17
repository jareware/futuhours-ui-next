import { Record as defineRecord, fromJS as plainFromJS, List, Iterable } from 'immutable';
import { mapValues } from 'lodash';
import modules from 'futuhours/app/';

const StoreRootState = defineRecord(mapValues(modules, () => null));
const StoreDatabaseState = defineRecord(modules.database.initialState);
const StoreProjectsState = defineRecord(modules.projects.initialState);
const StoreEntriesState = defineRecord(modules.entries.initialState);

const Project = defineRecord({
  _id: null,
  _rev: null,
  id: null,
  name: null,
  start: null,
  finish: null,
  tasks: null,
});

const Task = defineRecord({
  id: null,
  name: null,
});

export const Entry = defineRecord({
  _id: null,
  _rev: null,
  startDate: null,
  endDate: null,
  entryProjectId: null,
  entryTaskId: null,
});

// @see https://facebook.github.io/immutable-js/docs/#/fromJS
function createRecordReviver(...forRecordTypes) {
  const recordKeySets = new List(forRecordTypes)
    .toOrderedMap()
    .mapKeys((_, Type) => Type)
    .map(Type => new Type().keySeq().toSet());
  return any => (
    plainFromJS(any, (key, value) => {
      if (Iterable.isIndexed(value)) return value.toList(); // we're reviving an array -> it's a List
      const actualKeySet = value.keySeq().toSet();
      const MatchingType = recordKeySets.findKey(keySet => keySet.isSubset(actualKeySet));
      if (MatchingType) return new MatchingType(value);
      return value.toMap(); // no matching Record type found -> it's a Map
    })
  );
}

export const fromJS = createRecordReviver(
  StoreRootState,
  StoreDatabaseState,
  StoreProjectsState,
  StoreEntriesState,
  Project,
  Task,
  Entry
);

export const isA = {
  Project: x => x instanceof Project,
  Task: x => x instanceof Task,
  Entry: x => x instanceof Entry,
};
