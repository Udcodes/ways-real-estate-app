import React from 'react';
import Loader from '../Loader';
import './style.scss';

const AutocompleteComponent = (props) => {
  const {
    label,
    value,
    fetchSuggestions,
    placeholder,
    loading,
    suggestion,
    onItemSelected,
    onKeyDown,
    className,
    showSuggestions,
    activeSuggestion,
    ...inputProps
  } = props;

  let renderSuggestions;
  if (showSuggestions && value) {
    suggestion?.length
      ? (renderSuggestions = (
          <ul className="suggestion list">
            {suggestion.map((item, index) => (
              <li
                key={item}
                role="presentation"
                onClick={onItemSelected}
                className={index === activeSuggestion ? 'suggestion-active' : ''}
              >
                {item}
              </li>
            ))}
          </ul>
        ))
      : (renderSuggestions = (
          <div className="suggestion no-suggestions">
            <p>"{value}" not found, please try another keyword.</p>
          </div>
        ));
  }

  return (
    <React.Fragment>
      <div className="suggest-wrapper">
        {label && <span className="text-label">{label}</span>}
        <input
          className="input-field "
          autocomplete="off"
          value={value}
          type="text"
          onChange={fetchSuggestions}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          {...inputProps}
        />
        {loading ? (
          <div className="icon">
            <Loader small />
          </div>
        ) : (
          renderSuggestions
        )}
      </div>
    </React.Fragment>
  );
};

export default AutocompleteComponent;
