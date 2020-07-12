import React, { useState, useEffect } from 'react';
import './style.scss';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../../model/Task';

interface Props {}

const Popup: React.FC<Props> = () => {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [taskList, setTaskList] = useState<Task[]>([]);

  useEffect(() => {
    const taskListJson = localStorage.getItem('taskList') || '[]';
    const taskListStored: Task[] = JSON.parse(taskListJson);
    console.log('taskLIstJson :>> ', taskListJson);
    setTaskList(taskListStored);
  }, []);

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

  const addTask = () => {
    const newTask: Task = {
      id: uuidv4(),
      message,
      time,
    };
    const newTaskList = [...taskList, newTask];
    setTaskList(newTaskList);
    localStorage.setItem('taskList', JSON.stringify(newTaskList));
  };

  return (
    <div className="container">
      <div>
        <input
          placeholder="添加代办事项"
          value={message}
          onChange={e => setMessage(e.currentTarget.value)}
        />
        <input placeholder="输入时间" value={time} onChange={e => setTime(e.currentTarget.value)} />
        <button type="button" onClick={addTask}>
          添加
        </button>
      </div>

      {taskList.map(task => (
        <div key={task.id}>
          <div>{task.message}</div>
          <div>{task.time}</div>
        </div>
      ))}
      <br />
      <button type="button" onClick={handleClick}>
        show notification
      </button>
      <button type="button" onClick={handleClose}>
        close notification
      </button>

      <div className="add-clock-button" />
    </div>
  );
};

export default Popup;
