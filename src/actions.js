export const SET_HIGHLIGHT = 'SET_HIGHLIGHT';
export const CLEAR_HIGHLIGHT = 'CLEAR_HIGHLIGHT';

export function setHighlight(value) {
  return { type: SET_HIGHLIGHT, value };
}

export function clearHighlight() {
  return { type: CLEAR_HIGHLIGHT };
}
