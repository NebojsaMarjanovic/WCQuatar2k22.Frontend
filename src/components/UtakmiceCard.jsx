import { useEffect, useState } from 'react';
import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {format } from 'date-fns'


function UtakmcieCard(){
    const [utakmice, setUtakmice] = useState([]);
    const [showF, setShowF] = useState(false);
    const [showInputRezultat, setShowInputRezultat] = useState(false);
    const [showInputPredaja, setShowInputPredaja] = useState(false);
    const [utakmica ,setUtakmica]=useState(null);
    const [isCheckedDomacin, setIsCheckedDomacin] = useState(false);
    const [isCheckedGost, setIsCheckedGost] = useState(false);
    const [rezultatDomacin, setRezultatDomacin] = useState('');
    const [rezultatGost, setRezultatGost] = useState('');
    const [reload, setReload] = useState(false);

    const submit = (vremeOdrzavanja) => {
        console.log(vremeOdrzavanja)
        if(new Date()<vremeOdrzavanja){
        confirmAlert({
          title: 'Potvrda predaje meča',
          message: 'Izabrana utakmica se još uvek nije odigrala. Da biste uneli rezultat potrebno je da potvrdite predaju meča. Da li je predat meč?',
          buttons: [
            {
              label: 'Da',
              onClick: () => {
                setShowF(true);
                setShowInputRezultat(false);
                setShowInputPredaja(true);
              }
            },
            {
              label: 'Ne',
              onClick: () => alert('Nije moguće uneti rezultat za utakmicu koja se još uvek nije odigrala!')
            }
          ]
        });
    }
    else{
        setShowF(true);
        setShowInputPredaja(false);
        setShowInputRezultat(true);
    }
    };

    const handleChangeDomacin= () =>{
        setIsCheckedDomacin(true);
        setIsCheckedGost(false);
        setRezultatGost(2);
        setRezultatDomacin(0);
    }

    const handleChangeGost= () =>{
        setIsCheckedDomacin(false);
        setIsCheckedGost(true);
        setRezultatGost(0);
        setRezultatDomacin(2);
    }

    const fetchUtakmice = async () => {
        try{
            const response = await axios.get('https://localhost:7274/Utakmica');
            console.log(response.data)
            setUtakmice(response.data);
        } catch(error){
            console.log(error);
        }
    }

    const unesiRezultat = async() =>{
        await axios.put(`https://localhost:7274/Utakmica/${utakmica.utakmicaId}-${rezultatDomacin}-${rezultatGost}`,{
            utakmicaId:utakmica.utakmicaId,
            domacinRezultat:rezultatDomacin,
            gostRezultat:rezultatGost
        }).then(
            window.alert(`Uspesno ste uneli rezultat za utakmicu ${utakmica.domacin.naziv} - ${utakmica.gost.naziv}!`));
          setShowF(false);
          setReload(true);
    }

    useEffect(()=>{
        fetchUtakmice();
    },[reload])

    return(
        <div className='utakmicaContainer'>
             {showF ? <div className='dodajGrupu'>
        <form className='forma'>
            <h2>Rezultat utakmice</h2>
            {showInputRezultat? 
           <div className='rezultatContainer'>Unesite rezultat
           <div className='rezultatInput'> 
           <input type="text" placeholder={utakmica.domacin.naziv} onChange={(e)=>setRezultatDomacin(e.target.value)}/>
           <input type="text" placeholder={utakmica.gost.naziv} onChange={(e)=>setRezultatGost(e.target.value)}/>
           </div>
           </div>:null}
            {showInputPredaja? <div>
                <p>Izaberite državu koja je predala meč.</p>
                    <p style={{marginBottom:10}}><i>Predaja meča evidentira se službenim rezultatom 2:0 u korist države koja nije predala meč..</i></p>
                    <div className='checkbox-container'> <div className="checkbox-wrapper">
                     <input id='checkedDomacin' type="checkbox"  className={isCheckedDomacin ? "checked" : ""}  checked={isCheckedDomacin} onChange={handleChangeDomacin}/>
                        <label htmlFor='checkedDomacin'>{utakmica.domacin.naziv}</label>
                        </div>
                        <div className="checkbox-wrapper">
                     <input id='checkedGost' type="checkbox"  className={isCheckedGost ? "checked" : ""}  checked={isCheckedGost} onChange={handleChangeGost}/>
                        <label htmlFor='checkedGost'>{utakmica.gost.naziv}</label>
                        </div>
                        </div>
                      </div>:null}
              </form>
            <div className='btnContainer'>
              <button className='dodajGrupuBtn' onClick={()=>unesiRezultat()}>Potvrdi</button>
              <button className='odustaniBtn' onClick={()=>{setShowF(false)}}>Odustani</button>
              </div>
              </div>:null}
        <table className='utakmiceTabela'>
        <thead>
            <tr>
            <th>Domaćin</th>
            <th>Rezultat</th>
            <th>Gost</th>
            <th>Vreme utakmice</th>
            <th>Stadion</th>
            </tr>
          </thead>
          <tbody>
        {utakmice.map(utakmicaItem => (
                      <tr key={utakmicaItem.utakmicaId}>
                            <td className='tdDomacin'>
                                {utakmicaItem.domacin.naziv}
                            </td>
                            <td>
                                {utakmicaItem.domacinRezultat!=null?
                               <div>{utakmicaItem.domacinRezultat} - {utakmicaItem.gostRezultat}</div>
                            : <button className='dodajGrupuBtn' onClick={()=>{setUtakmica(utakmicaItem); submit(new Date(utakmicaItem.vremeOdrzavanja))}}>Unesi rezultat</button>}
                            </td>
                            <td className='tdGost'>
                                {utakmicaItem.gost.naziv}
                            </td>
                            <td>
                                {format(new Date(utakmicaItem.vremeOdrzavanja),"dd.MM.yyyy. HH:mm")}
                            </td>
                            <td >
                                {utakmicaItem.stadion.nazivStadiona}
                            </td>
                      </tr>
        ))}
          </tbody>
        </table>
        </div>
    )
        } 
        

export default UtakmcieCard;