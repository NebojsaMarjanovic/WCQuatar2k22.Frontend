import { useEffect, useState } from 'react';
import axios from 'axios';

function StadionCard(){

    const [stadioni, setStadioni] = useState([]);

    const fetchStadioni = async () => {
      try {
          const response = await axios.get('https://localhost:7274/Stadion');
          console.log(response.data);
          setStadioni(response.data);
      } catch (error) {
          console.log(error);
      }
  }
  
  useEffect(() => {
    fetchStadioni();
      }, []);
     
    return(
        <div className='stadioni'>
            {stadioni.map(stadion=>(
                <div key={stadion.stadionId} className='stadion'>
                    <img src={stadion.slika} className='stadionSlika'/>
                    <h2 className='stadionNaziv'>{stadion.nazivStadiona}</h2>
                    <span>
                    <h4> <i>Lokacija:</i> <b>{stadion.lokacija}</b></h4>
                    <h4> <i>Kapacitet:</i> {stadion.kapacitet} gledalaca</h4>
                    </span>
                </div>
            ))}
         </div>

    )
}

export default StadionCard;