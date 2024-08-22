import dogsled from '../assets/img/dogsled.png';
import rib from '../assets/img/rib.png';
import orca from '../assets/img/whale.png';
import { Link } from 'react-router-dom';
import { excursionID } from './ExcursionOverview';
import { useState, useEffect } from 'react';

const ButtonDayStyling = {
  backgroundColor: '#091E3B',
  color: 'white',
  border: 'solid',
  padding: '0px 0px',
  margin: '0px',
  font: 'Roboto',
  cursor: 'pointer',
  borderRadius: '5px',
  fontSize: '18px',
  width: '108px',
  height: '48px'
};

const ButtonStyling = {
  backgroundColor: '#FFB46D',
  color: 'black',
  border: 'solid',
  padding: '10px 20px',
  margin: '5px',
  cursor: 'pointer',
  borderRadius: '5px',
  fontSize: '16px',
  width: '175px'
};

const SingleButtonStyling = {
  backgroundColor: '#FFB46D',
  color: 'black',
  border: 'solid',
  padding: '10px 20px',
  margin: '5px',
  cursor: 'pointer',
  borderRadius: '5px',
  fontSize: '16px',
  width: '370px'
};

const DivDayStyling = {
  display: 'flex',
  flexDirection: 'row' as 'row',
  justifyContent: 'space-evenly'
};

const DivDoubleStyling = {
  display: 'flex',
  flexDirection: 'row' as 'row',
  justifyContent: 'space-evenly'
};

const DivSingleStyling = {
  display: 'flex',
  flexDirection: 'row' as 'row',
  justifyContent: 'space-evenly'
};

const WhaleSafari = () => {
  let image = orca;
  if (excursionID == 0) {
    image = orca;
  } else if (excursionID == 1) {
    image = dogsled;
  } else if (excursionID == 2) {
    image = rib;
  }

  interface Excursion {
    Name: string;
    Description: string;
  }

  const [data, setData] = useState<Excursion[] | null>(null);
  useEffect(() => {
    const fetchDataForPosts = async () => {
      try {
        const response = await fetch(`http://localhost:7072/api/excursions`);
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let postsData = await response.json();
        setData(postsData);
      } catch (err) {
        setData(null);
      }
    };
    fetchDataForPosts();
  }, []);
  if (!data) {
    return <div>Loading...</div>;
  }

  const title = data[excursionID].Name;
  const description = data[excursionID].Description;

  return (
    <div style={{ backgroundColor: '#091E3B', height: '932px' }}>
      <img src={image} />
      <h1
        style={{
          textAlign: 'center',
          color: '#FFB46D',
          fontSize: '36px',
          font: 'Roboto Mono'
        }}
      >
        {title}
      </h1>
      <p style={{ textAlign: 'center', color: 'white', fontSize: '18px' }}>
        <i>{description}</i>
        <br />
        <br />
      </p>
      <p style={{ textAlign: 'center', color: 'white', fontSize: '18px' }}>
        <b>Choose your preferred day for a {title.toLowerCase()} Excursion: </b>
      </p>

      <div style={DivDayStyling}>
        <button style={ButtonDayStyling}>Monday</button>
        <button style={ButtonDayStyling}>Tuesday</button>
        <button style={ButtonDayStyling}>Wednesday</button>
      </div>
      <div style={DivDayStyling}>
        <button style={ButtonDayStyling}>Thursday</button>
        <button style={ButtonDayStyling}>Friday</button>
        <button style={ButtonDayStyling}>Saturday</button>
      </div>
      <div style={DivDoubleStyling}>
        <button style={ButtonStyling}>Info</button>
        <button style={ButtonStyling}>Package list</button>
      </div>
      <div style={DivSingleStyling}>
        <button style={SingleButtonStyling}>
          <Link to="/">Back to Front Page</Link>
        </button>
      </div>
    </div>
  );
};

export default WhaleSafari;
