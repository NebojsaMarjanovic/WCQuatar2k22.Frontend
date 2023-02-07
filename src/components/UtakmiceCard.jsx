import { useEffect, useState } from 'react';
import axios from 'axios'

function UtakmcieCard(){
    const [utakmice, setUtakmice] = useState([]);


    const fetchUtakmice = async () => {
        try{
            const response = await axios.get('https://localhost:7274/Utakmica');
            console.log(response.data)
            setUtakmice(response.data);
        } catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchUtakmice();
    },[])

    return(
        <div className='utakmicaContainer'>
        <table className='grupaTabela'>
          <tbody>
        {utakmice.map(utakmica => (
                      <tr key={utakmica.utakmicaId}>
                            <td>
                                {utakmica.domacin.naziv}
                            </td>
                            <td>
                                {utakmica.domacinRezultat}
                            </td>
                            <td>
                                {utakmica.gostRezultat}
                            </td>
                            <td>
                                {utakmica.gost.naziv}
                            </td>
                      </tr>
        ))}
          </tbody>
        </table>
        </div>
    )
}

export default UtakmcieCard;