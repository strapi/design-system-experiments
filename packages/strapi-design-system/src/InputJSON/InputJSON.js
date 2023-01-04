import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { jsonParseLinter } from '@codemirror/lang-json';

import { Field, FieldLabel, FieldError, FieldHint } from '../Field';
import { Box } from '../Box';
import { Stack } from '../Stack';
import { addMarks, filterMarks, lineHighlightMark } from './utils/decorationExtension';
import { JsonComponent } from './JsonComponent';

const StyledBox = styled(Box)`
  outline: 1px solid ${({ theme, error }) => (error ? theme.colors.danger600 : 'transparent')};
`;

export const InputJSON = ({ id, label, value, error, hint, required, theme, onChange, disabled, labelAction }) => {
  const editorState = useRef(null);
  const editorView = useRef(null);

  const getContentAtLine = (line) => {
    return editorState.current?.doc?.line(line);
  };

  /**
   * @description
   * Determines the line to highlight when validateJSON finds an error via jsonParseLinter()
   * @param {number} lineNumber Code editor line number
   */
  const highglightErrorAtLine = (lineNumber) => {
    const { text, to: lineEnd } = getContentAtLine(lineNumber);
    const lineStart = lineEnd - text.trimStart().length;

    if (lineEnd > lineStart) {
      editorView.current?.dispatch({
        effects: addMarks.of([lineHighlightMark.range(lineStart, lineEnd)]),
      });
    }
  };

  const clearErrorHighlight = () => {
    const docEnd = editorState.current?.doc?.length || 0;
    editorView.current?.dispatch({
      effects: filterMarks.of((from, to) => to <= 0 || from >= docEnd),
    });
  };

  /**
   * @description
   * Checks code editor for valid json input and then handles any errors
   * @param {object} viewUpdate
   * @property {object} viewUpdate.view Code editor view https://codemirror.net/docs/ref/#view.EditorView
   * @property {object} viewUpdate.state Code editor state https://codemirror.net/docs/ref/#state.EditorState
   * @returns {boolean} true if valid json, false if invalid json
   */
  const validateJSON = (viewUpdate) => {
    const { view, state } = viewUpdate;
    editorView.current = view;
    editorState.current = state;

    const lintJson = jsonParseLinter();
    const lintErrors = lintJson(view);

    if (lintErrors.length) {
      highglightErrorAtLine(state.doc.lineAt(lintErrors[0].from).number);

      return false;
    }

    clearErrorHighlight();

    return true;
  };

  const handleChange = (currentValue, viewUpdate) => {
    const isValidJSON = validateJSON(viewUpdate);

    if (isValidJSON) {
      // Callback to update JSON in the parent component
      onChange(JSON.parse(currentValue));
    }
  };

  const onCreateEditor = (view, state) => {
    validateJSON({ view, state });
    editorView.current = view;
    editorState.current = state;
  };

  return (
    <Field error={error} hint={hint} required={required}>
      <Stack spacing={1}>
        {label && <FieldLabel action={labelAction}>{label}</FieldLabel>}
        <StyledBox hasRadius error={error}>
          <JsonComponent
            id={id}
            value={value}
            theme={theme}
            editable={!disabled}
            onChange={handleChange}
            onCreateEditor={onCreateEditor}
          />
        </StyledBox>
        <FieldError />
        <FieldHint />
      </Stack>
    </Field>
  );
};

InputJSON.defaultProps = {
  id: undefined,
  label: undefined,
  labelAction: undefined,
  value: '',
  error: undefined,
  hint: undefined,
  required: false,
  theme: 'dark',
  disabled: false,
  onChange() {},
};

InputJSON.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  labelAction: PropTypes.element,
  value: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  hint: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  required: PropTypes.bool,
  theme: PropTypes.oneOf(['dark', 'light']),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};
