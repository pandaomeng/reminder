import '../img/icon.png';
import moment from 'moment';
import { Task } from './model/Task';

const json = localStorage.getItem('taskList') || '[]';
const taskList: Task[] = JSON.parse(json);

taskList.forEach(task => {
  const { time, message } = task;
  if (time) {
    const intervalTime = moment(time, 'YYYYMMDD HHmmSS').valueOf() - moment().valueOf();

    if (!Number.isNaN(intervalTime)) {
      setTimeout(() => {
        // eslint-disable-next-line no-new
        new Notification(message, {
          icon: 'icon.png',
        });
        const newTaskList: Task[] = taskList.map(each => ({
          ...each,
          time: '',
        }));
        localStorage.setItem('taskList', JSON.stringify(newTaskList));
      }, intervalTime);
    }
  }
});
