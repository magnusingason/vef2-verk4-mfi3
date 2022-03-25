
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import { NotFound } from '../notFound';

const apiUrl = process.env.REACT_APP_API_URL;

Events.propTypes = {
  id: PropTypes.string.isRequired,
  alleventUrl: PropTypes.string,
  limit: PropTypes.number,
}

export function Events({ id, onDelete, allEventsUrl, limit = -1 }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [eventItem, seteventItem] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      setNotFound(false);

      let json;

      const url = new URL(id, apiUrl);

      try {
        const result = await fetch(url);

        if (result.status === 404) {
          setNotFound(true);
          return;
        }

        if (!result.ok) {
          throw new Error('result not ok');
        }

        json = await result.json();
      } catch (e) {
        console.warn('unable to fetch events', e);
        setError('Gat ekki sótt events.');
        return;
      } finally {
        setLoading(false);
      }

      seteventItem(json);
    }
    fetchData();
  }, [id]);

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

  if (notFound) {
    return (
      <NotFound />
    );
  }

  let items = [];

  if (eventItem && eventItem.items) {
    if (limit > 0) {
      items = eventItem.items.slice(0, limit)
    } else {
      items = eventItem.items;
    }
  }

  return (
    <section >
      <h2 >{eventItem && eventItem.title}</h2>
      {items.length === 0 && (
        <p>Engar events</p>
      )}
      <ul >
        {items.length > 0 && items.map((item, i) => {
          return (
            <li key={i}>
              <a href={item.link}>{item.name}</a>
            </li>
          )
        })}
      </ul>
      
    </section>
  );
}
