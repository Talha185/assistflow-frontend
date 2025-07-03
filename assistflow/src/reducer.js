// Reducer for managing categories, questions, and options
export const initialState = {
  categories: []
};

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export function reducer(state, action) {
  switch (action.type) {
    case 'ADD_CATEGORY': {
      return {
        ...state,
        categories: [
          ...state.categories,
          {
            id: generateId(),
            name: action.name,
            rootQuestion: null
          }
        ]
      };
    }
    case 'DELETE_CATEGORY': {
      return {
        ...state,
        categories: state.categories.filter(cat => cat.id !== action.id)
      };
    }
    case 'SET_ROOT_QUESTION': {
      return {
        ...state,
        categories: state.categories.map(cat =>
          cat.id === action.categoryId
            ? { ...cat, rootQuestion: action.question }
            : cat
        )
      };
    }
    case 'UPDATE_CATEGORY': {
      return {
        ...state,
        categories: state.categories.map(cat =>
          cat.id === action.category.id ? action.category : cat
        )
      };
    }
    default:
      return state;
  }
} 