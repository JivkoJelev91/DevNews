import React from 'react';
import { connect } from 'react-redux';
import Notifications from 'react-notification-system-redux';

const Notification = ({ notifications }) => {

  // Optional styling
  const style = {
    NotificationItem: { // Override the notification item
      DefaultStyle: { // Applied to every notification, regardless of the notification level
        // padding: '20px',
        // marginRight: '-40px',
      },
    }
  };

  return (
    <Notifications
      notifications={notifications}
      style={style}
    />
  );
}

export default connect(
  state => ({ notifications: state.notifications })
)(Notification);