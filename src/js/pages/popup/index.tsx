import React, { useState } from 'react';
import './style.scss';

interface Props {}

const Popup: React.FC<Props> = () => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const handleClick = () => {
    const n = new Notification('Remind me', {
      icon: 'icon.png',
    });
    setNotification(n);
  };

  const handleClose = () => {
    // eslint-disable-next-line no-unused-expressions
    notification?.close();
  };

  return (
    <div className="container">
      <button type="button" onClick={handleClick}>
        show notification
      </button>
      <button type="button" onClick={handleClose}>
        close notification
      </button>
    </div>
  );
};

export default Popup;
