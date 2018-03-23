import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setHighlight, clearHighlight } from '../actions';

const highlightableCell = ({
  value, highlightValue, onMouseEnter, onMouseLeave,
}) => {
  const highlightClass = highlightValue && value === highlightValue ? 'highlight' : '';
  return (
    <td
      className={highlightClass}
      onMouseEnter={() => onMouseEnter(value)}
      onMouseLeave={onMouseLeave}
    >
      {value}
    </td>
  );
};

highlightableCell.propTypes = {
  value: PropTypes.string.isRequired,
  highlightValue: PropTypes.string.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  highlightValue: state.highlightValue,
});

const mapDispatchToProps = dispatch => ({
  onMouseEnter: (value) => {
    dispatch(setHighlight(value));
  },
  onMouseLeave: () => {
    dispatch(clearHighlight());
  },
});

const HighlightableCell = connect(
  mapStateToProps,
  mapDispatchToProps,
)(highlightableCell);

export default HighlightableCell;
