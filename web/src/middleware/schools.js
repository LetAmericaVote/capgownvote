import algoliasearch from 'algoliasearch';
import { selectSchoolData } from '../selectors';
import {
  SET_SELECTED_SCHOOL_ID, SET_SCHOOL_INPUT_VALUE,
  SET_SCHOOL_SUGGESTIONS, getSchoolData, setSchoolSuggestions,
} from '../actions';

const schools = store => next => action => {
  const result = next(action);

  const fillSchoolIfNull = (id) => {
    if (! selectSchoolData(id, store.getState())) {
      store.dispatch(getSchoolData(id));
    }
  }

  switch (action.type) {
    case SET_SELECTED_SCHOOL_ID: {
      if (action.schoolId) {
        fillSchoolIfNull(action.schoolId);
      } else {
        store.dispatch(setSchoolSuggestions(null));
      }

      break;
    }

    case SET_SCHOOL_INPUT_VALUE: {
      if (! action.value) {
        break;
      }

      const client = algoliasearch(
        process.env.REACT_APP_ALGOLIA_CLIENT_ID,
        process.env.REACT_APP_ALGOLIA_SEARCH_KEY
      );

      const index = client.initIndex('schools');
      index.search({ query: action.value }, (err, content) => {
        // TODO: Handle error

        if (content && content.hits) {
          const suggestions = content.hits.map(hit => ({
            id: hit.objectID,
            name: hit.name,
          }));

          store.dispatch(setSchoolSuggestions(suggestions));
        }
      })

      break;
    }

    case SET_SCHOOL_SUGGESTIONS: {
      if (action.suggestions) {
        action.suggestions.forEach(suggestion => {
          fillSchoolIfNull(suggestion.id);
        });
      }

      break;
    }

    default: break;
  }

  return result;
}

export default schools;
