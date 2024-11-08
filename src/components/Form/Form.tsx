import { useEffect, useState } from 'react';

import setToLocalStorage from '../../utils/setToLocalStorage';
import getFromLocalStorage from '../../utils/getFromLocalStorage';
import Clock from '../Clock';

import './Form.css';

export default function Form() {
  const [formState, setFormState] = useState({
    name: '',
    offset: 0,
  });

  const [clocksState, setClocksState] = useState<typeof formState[] | []>([]);

  useEffect(() => {
      const clocks = getFromLocalStorage();
      setClocksState(() => clocks);
  }, []);

  useEffect(() => {
    if (clocksState.length > 0) {
      setToLocalStorage(clocksState);
    }
  }, [clocksState]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setClocksState(prevState => {
      return [
        ...prevState,
        {
          name: formState.name,
          offset: formState.offset,
        }
      ];
    });
    document.forms[0].reset();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const {name, value} = e.target;

    setFormState(prevState => {
      return {
        ...prevState,
        [name]: name === 'offset' ? Number(value) : value,
      }
    });
  };

  const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const clockName =(e.target as HTMLElement).closest('.Clock')?.id;

    const filteredClockState = clocksState.filter(item => item.name !== clockName);

    setClocksState(() => filteredClockState);

    setToLocalStorage(filteredClockState);
  };

  return (
    <div className='Form'>
      <form onSubmit={onSubmit}>
        <label>
          <span>Название</span>
          <input
            type="text"
            name='name'
            onChange={onChange} 
            required
          />
        </label>
        <label>
          <span>Временная зона</span>
          <input
            type="number" 
            name='offset'
            onChange={onChange} 
            required
            max='14'
            min='-12'
          />
        </label>
        <button>Добавить</button>
      </form>
      {clocksState.length > 0 && (
        <div className="ClockContainer">
          {clocksState.map((clockItem, index) => (
            <Clock
              key={index}
              name={clockItem.name}
              offset={clockItem.offset}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
