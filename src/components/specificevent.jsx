import React, { useEffect, useState } from 'react';
import s from './specificevent.module.scss';
import { Link } from 'react-router-dom'
import { isContentEditable } from '@testing-library/user-event/dist/utils';




const apiUrl = process.env.REACT_APP_API_URL_SPECIFIC;
var registrations = [];
export function Eventspecific({id}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [event, setEvent] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null)

      let json;

      try {
        const result = await fetch(apiUrl+id);

        if (!result.ok) {
          throw new Error('result not ok');
        }

        json = await result.json();
      } catch (e) {
        console.warn('unable to fetch event', e);
        setError('Gat ekki sótt event.');
        return;
      } finally {
        setLoading(false);
      }
      registrations = json.registrations;
      setEvent(json);
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
      <p className="events-coming">Name: {event.name}</p>
      <div className={s.description}>Description: {event.description}</div>
      <ul>
      {registrations.map((item, i) => {

        return (
         <li>
          <div className={s.events__item}>
          <p>{item.name}</p>
             {item.comment}
          </div>
             </li>
        )
        })}
        </ul>
        <p>
        please log in to sign up for event</p>
        <Link to="/" className={s.link}> go back </Link>
    </section>
    </div>
  );
}