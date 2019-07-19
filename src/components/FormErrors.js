import React from 'react';

const FormErrors = ({ errors }) => (
  <div className="ui error message">
    <ul className="list">
      {
            Object.values(errors).map(value => (
              <li key={value}>
                {' '}
                {value}
                {' '}
              </li>
            ))
            }
    </ul>
  </div>
);

export default FormErrors;
