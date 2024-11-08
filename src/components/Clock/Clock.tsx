import { useEffect, useRef, useState } from 'react';
import moment from 'moment';

import './Clock.css';

interface IClockProps {
  name: string,
  offset: number,
  onDelete: (e: React.MouseEvent<HTMLButtonElement>) => void,
}

export default function Clock(props: IClockProps) {
  const {name, offset, onDelete} = props;

  const [actualTime, setActualTime] = useState(moment().utcOffset(offset * 60));
  const [digitalTime, setDigitalTime] = useState(`${actualTime.hour()}:${actualTime.minute()}:${actualTime.seconds()}`);

  const hourRef = useRef<HTMLDivElement | null>(null);
  const minuteRef = useRef<HTMLDivElement | null>(null);
  const secondRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActualTime(moment().utcOffset(offset * 60));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [offset]);

  const updateDigitalClock = () => {
    const formattedTime = actualTime.format('HH:mm:ss');
    setDigitalTime(formattedTime);
  }

  const updateClockHands = () => {
    const hours = actualTime.hours();
    const minutes = actualTime.minutes();
    const seconds = actualTime.seconds();

    const hoursDegrees = ((hours % 12) + minutes / 60) * 30;
    const minutesDegrees = (minutes + seconds / 60) * 6;
    const secondsDegrees = seconds * 6;

    if (hourRef.current && minuteRef.current && secondRef.current) {
      hourRef.current.style.transform = `rotate(${hoursDegrees}deg)`;
      minuteRef.current.style.transform = `rotate(${minutesDegrees}deg)`;
      secondRef.current.style.transform = `rotate(${secondsDegrees}deg)`;
    }

    updateDigitalClock();
  };

  useEffect(() => {
    updateClockHands();
  }, [actualTime]);

  return (
    <div
      className='Clock'
      id={name}
    >
      <h3>{name}</h3>
      <div className="Clock__dial">
        <div
          className="Clock__hand hour-hand"
          ref={hourRef}
        />
        <div
          className="Clock__hand minute-hand"
          ref={minuteRef}
        />
        <div
          className="Clock__hand second-hand"
          ref={secondRef}
        />
      </div>
      <div className='Clock__digital'>{digitalTime}</div>
      <button
        className="Clock__delete-btn"
        onClick={onDelete}
      >
        X
      </button>
    </div>
  )
}

