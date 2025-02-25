import {AdvancedMarker, APIProvider, Map} from '@vis.gl/react-google-maps';
import styles from "../../page.module.scss";
import { useState } from "react"; 

function GoogleMap() {
  const position = { lat: 25.7636109, lng: -80.1891193 };
  const [isError, setIsError] = useState(false);
  return (
    <div className={styles.map}>
      {isError ? (
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3471.565321785667!2d-80.19169422474567!3d25.76361087735071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b6823c500001%3A0x2bd84c24afb42572!2zMTAwMSBCcmlja2VsbCBCYXkgRHIgU3VpdGUgMjczMSwgTWlhbWksIEZMIDMzMTMxLCDQodC_0L7Qu9GD0YfQtdC90ZYg0KjRgtCw0YLQuCDQkNC80LXRgNC40LrQuA!5e1!3m2!1suk!2sfi!4v1738107625473!5m2!1suk!2sfi" width="600" height="450" loading="lazy"></iframe>
      ) : (
        <APIProvider onError={() => setIsError(true)} apiKey={"AIzaSyCHMVL313-QvjxF-7otg-_d7VZbvNWxpU0"}>
          <Map defaultCenter={position} defaultZoom={10}>
            <AdvancedMarker position={position} />
          </Map>
        </APIProvider>
      )}
    </div>
  );
}

export default GoogleMap