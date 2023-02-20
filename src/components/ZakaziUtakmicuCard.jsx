import { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {format } from 'date-fns'

function ZakaziUtakmicuCard(){
    const [raspoloziveDrzave, setRaspoloziveDrzave] = useState([]);
    const [raspoloziveDrzaveDomacini, setRaspoloziveDrzaveDomacini] = useState([]);
    const [raspoloziveDrzaveGosti, setRaspoloziveDrzaveGosti] = useState([]);
    const [raspoloziviStadioni, setRaspoloziviStadioni] = useState([]);
    const [grupe,setGrupe] = useState([]);
    const [showDrzave, setShowDrzave] = useState(false);
    const [showStadioniGrupe, setShowStadioniGrupe] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [stadionId, setStadionId] = useState(0);
    const [domacin, setDomacin] = useState('');
    const [gost, setGost] = useState('');
   

    const fetchGrupe = async () => {
        try {
            const response = await axios.get('https://localhost:7274/zakljucaneGrupe');
            console.log(response.data);
            setGrupe(response.data);
        } catch (error) {
            console.log(error);
        }    
    }

    const fetchRaspoloziviStadioni = async(startDate) => {
        console.log(startDate);
        try {
            const response = await axios.get('https://localhost:7274/Stadion/'+format(startDate,"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
            );
            console.log(response.data);
            setRaspoloziviStadioni(response.data);
        } catch (error) {
            console.log(error);
        }    
    }

    const fetchRaspoloziveDrzave = async(grupa, startDate) =>{
        console.log(grupa);
        console.log(startDate);
        try {
            const response = await axios.get('https://localhost:7274/Drzava/'+grupa+'/'+format(startDate,"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"));
            console.log(response.data);
            setRaspoloziveDrzave(response.data);
            setRaspoloziveDrzaveDomacini(response.data);
            setRaspoloziveDrzaveGosti(response.data);
        } catch (error) {
            console.log(error);
        }   
    }


    const handleChangeGrupa = (selectedGrupa)=>{
        fetchRaspoloziveDrzave(selectedGrupa.value,startDate);
        setShowDrzave(true);
    }

    const handleChangeDate = (date) => {
        setStartDate(date);
        fetchRaspoloziviStadioni(date);
        setShowStadioniGrupe(true)
    }

    const handleChangeDrzavaDomacin = (selectedDomacin)=>{
        setDomacin(selectedDomacin.value);
        setRaspoloziveDrzaveGosti(raspoloziveDrzave.filter((drzava)=>drzava.drzavaId!=selectedDomacin.value));
    }

    const handleChangeDrzavaGost = (selectedGost)=>{
        setGost(selectedGost.value);
        setRaspoloziveDrzaveDomacini(raspoloziveDrzave.filter((drzava)=>drzava.drzavaId!=selectedGost.value))
    }

    const handleClickStadion = (e, stadionId)=>{
        e.preventDefault();
        setStadionId(stadionId);
        window.scrollTo({
			top: 1860,
			left: 0,
			behavior: 'smooth'
		});    
    }
    
   

    const zakaziUtakmicu = async () => {
       await axios.post("https://localhost:7274/Utakmica",
        {
            domacinId:domacin,
            gostId:gost,
            domacinRezultat:null,
            gostRezultat:null,
            vremeOdrzavanja:format(startDate,"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"),
            stadionId:stadionId,
        }).then((response)=>{
          console.log(response);
          window.alert(response.data.message);
            setShowDrzave(false);
            setShowStadioniGrupe(false);
            fetchRaspoloziveDrzave();
            fetchRaspoloziviStadioni();
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
          })
          .catch(function(error){
            window.alert(error.response.data.message);
          })
         
    }

    useEffect(() => {
        fetchGrupe();
    },[]);

    return(
        <div className='zakaziUtakmicuContainer'>
            <div className='vremeUtakmiceContainer'>
            <label>Vreme utakmice</label>
                <DatePicker selected={startDate} onChange={handleChangeDate} className='datePicker'
                showTimeSelect/>
           </div>
                {showStadioniGrupe? <div className='stadioniGrupe'> <label> Izaberite stadion</label> <div className='izborSviStadioni'>
                    {raspoloziviStadioni.map(stadion=>(
                       <div key={stadion.stadionId} className='izborStadion'  onClick={(e)=>handleClickStadion(e, stadion.stadionId)}
                       style={{ backgroundColor: stadionId === stadion.stadionId ? 'rgb(239, 173, 50)' : 'rgb(210, 179, 179)' }} >
                        <img   
                           src={stadion.slika} className='izborStadionSlika'/>
                           <h2 className='stadionNaziv'>{stadion.nazivStadiona}</h2>
                       </div>
                    ))}
                    </div>
                <Select className='izaberiDrzavu' onChange={handleChangeGrupa} placeholder="Izaberite grupu" options={grupe.map(grupa=>({label:grupa.nazivGrupe, value:grupa.grupaId}))}></Select>
               </div> 
               : <div><img src='./img/cover.png'/></div>}
                {showDrzave? 
                <div className='izborDrzava'>
                <Select onChange={handleChangeDrzavaDomacin} className='selectDrzava' placeholder="Izaberite prvu državu" 
                        options={raspoloziveDrzaveDomacini.map(drzava=>({label:<div><img src={drzava.zastava} className="selectZastava"/> {drzava.naziv}</div>, value:drzava.drzavaId}))}></Select>
                <Select onChange={handleChangeDrzavaGost} className='selectDrzava' placeholder="Izaberite drugu državu" 
                        options={raspoloziveDrzaveGosti.map(drzava=>({label:<div><img src={drzava.zastava} className="selectZastava"/> {drzava.naziv}</div>, value:drzava.drzavaId}))}></Select> 
                <button className='dodajGrupuBtn' onClick={()=>zakaziUtakmicu()}>Zakazi utakmicu!</button>
                 </div>:null}
        </div>
       
    );
}
   
export default ZakaziUtakmicuCard;