import algoliasearch from 'algoliasearch';
import { selectSchoolData } from '../selectors';
import {
  STORE_USER_DATA, SET_SCHOOL_INPUT_VALUE,
  SET_SCHOOL_SUGGESTIONS, getSchoolData, setSchoolSuggestions,
  updateAuthenticatedUserProfile,
} from '../actions';

const schools = store => next => action => {
  const result = next(action);

  const fillSchoolIfNull = (id) => {
    if (! selectSchoolData(id, store.getState())) {
      store.dispatch(getSchoolData(id));
    }
  }

  switch (action.type) {
    case STORE_USER_DATA: {
      if (action.user && action.user.school) {
        fillSchoolIfNull(action.user.school);
      }

      break;
    }

    case SET_SCHOOL_INPUT_VALUE: {
      if (! action.value) {
        store.dispatch(setSchoolSuggestions(null));
        store.dispatch(updateAuthenticatedUserProfile({ school: null }));

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
