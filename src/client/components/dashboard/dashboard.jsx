import React from 'react';

import PropTypes from 'prop-types';

import styles from './style.scss';



class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      banana: 'sneakers',
    };
  }

  render() {
    return (
      <p>{this.props.userId}</p>
    );
  }
}

// Dashboard.propTypes = {
//   message: PropTypes.string.isRequired,
// };

export default Dashboard;