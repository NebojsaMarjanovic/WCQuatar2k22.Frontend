import { useEffect, useState } from 'react';
import axios from 'axios';


function GrupnaFazaCard(){
    const [grupe, setGrupe] = useState([]);

    const fetchGrupe = async () => {
      try {
          const response = await axios.get('https://localhost:7274/Grupa');
          console.log(response.data);
          setGrupe(response.data);
      } catch (error) {
          console.log(error);
      }
  }
  
  useEffect(() => {
    fetchGrupe();
      },[]);
  


    return (
      <div className="grupnaFazaContainer" >
      {grupe.map(grupa => (
        <div className="grupnaFaza" >
        <table className='grupnaFazaTabela'>
          <thead  >
            <tr  >
            <th className='grupaNaziv' colSpan={2}>
              Grupa {grupa.nazivGrupe}
            </th>
            <th>Odigrani mečevi</th>
            <th>Pobede</th>
            <th>Nerešeno</th>
            <th>Porazi</th>
            <th>Postignuti golovi</th>
            <th>Primljeni golovi</th>
            <th>Bodovi</th>
            </tr>
          </thead>
          <tbody>
        {grupa.drzave.map(drzava => (
                      <tr key={drzava.drzavaId}>
                          <td className='group-name' colSpan={2}>
                            {drzava.naziv} <img src={drzava.zastava} 
                          className='zastavaDrzave'/>
                          </td>
                          <td>{drzava.brojOdigranihMeceva}</td>
                          <td>{drzava.brojPobeda}</td>
                          <td>{drzava.brojNeresenih}</td>
                          <td>{drzava.brojIzgubljenih}</td>
                          <td>{drzava.brojPrimljenihGolova}</td>
                          <td>{drzava.brojDatihGolova}</td>
                          <td><b>{drzava.osvojeniPoeni}</b></td>
                       
                      </tr>
        ))}
          </tbody>
        </table>
      </div>
      ))}
     </div> 
    );

  }


export default GrupnaFazaCard;