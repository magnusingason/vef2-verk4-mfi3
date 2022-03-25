import React, { useEffect, useState } from 'react';
import s from './eventList.module.scss';
import { Link } from 'react-router-dom'
import { isContentEditable } from '@testing-library/user-event/dist/utils';




const apiUrl = process.env.REACT_APP_API_URL;
var list = [];
export function EventsList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null)

      let json;

      try {
        const result = await fetch(apiUrl);

        if (!result.ok) {
          throw new Error('result not ok');
        }

        json = await result.json();
      } catch (e) {
        console.warn('unable to fetch eventslist', e);
        setError('Gat ekki sótt events.');
        return;
      } finally {
        setLoading(false);
      }
      list = json.items;
      console.log(list);
      setEvents(json);
    }
    fetchData();
  }, []);

  if (error) {
    return (
      <p>Villa kom upp: {error}</p>
    );
  }

  if (loading) {
    return (
      <p>Sæki gögn...</p>
    );
  }
  
  return (
    <div className={s.wrapper}>
    <section className={s.events}>
      <p className="events-coming">Events coming up!</p>
      <div className={s.events__list}> 
        <ul>
        {list.map((item, i) => {

          return (
            <li>
              <div className={s.events__item}>
              <p><Link to={"/events/"+item.id}> {item.name} </Link></p>
              {item.description}
              </div>
            </li>
          )
        })}
        </ul>
      </div>
    </section>
    </div>
  );
}