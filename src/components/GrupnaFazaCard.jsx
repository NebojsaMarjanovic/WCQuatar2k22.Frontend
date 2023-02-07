import { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

function GrupnaFazaCard(){
    const [grupe, setGrupe] = useState([]);
    const [drzave, setDrzave] = useState([]);
    const [selectedValueSesir1, setSelectedValueSesir1] = useState('');
    const [selectedValueSesir2, setSelectedValueSesir2] = useState('');
    const [selectedValueSesir3, setSelectedValueSesir3] = useState('');
    const [selectedValueSesir4, setSelectedValueSesir4] = useState('');
    const [showF, setShowF] = useState(false)
    const [showBtn, setShowBtn] = useState(true);
    const [nazivGrupe, setNazivGrupe] = useState('');
    const [reload, setReload] = useState(false);
    const grupa = {
      nazivGrupe:nazivGrupe,
      drzave:[
        {drzavaId: selectedValueSesir1, grupaId:0},
        {drzavaId: selectedValueSesir2, grupaId:0},
        {drzavaId: selectedValueSesir3, grupaId:0},
        {drzavaId: selectedValueSesir4, grupaId:0}]
    };



    const fetchGrupe = async () => {
      try {
          const response = await axios.get('https://localhost:7274/Grupa');
          console.log(response.data);
          setGrupe(response.data);
      } catch (error) {
          console.log(error);
      }
  }

  const fetchDrzave = async () => {
    try {
        const response = await axios.get('https://localhost:7274/Drzava');
        console.log(response.data);
        setDrzave(response.data.filter((value)=>value.grupaId==null));
    } catch (error) {
        console.log(error);
    }
}

  const showForm = () => {
    setShowF(true);
    setShowBtn(false);
    // window.scrollTo({
		// 	top: 1860,
		// 	left: 0,
		// 	behavior: 'smooth'
		// });
  }

  const handleInput = (e) =>{
    setNazivGrupe(e.target.value);
    // console.log(e.target.value);
  }

  const  dodajGrupu = async () =>{
    console.log(grupa);
    if(selectedValueSesir1=='' || selectedValueSesir2=='' || selectedValueSesir3==''||selectedValueSesir4==''){
      window.alert("Niste popunili sva polja!");
    }
    await axios.post("https://localhost:7274/Grupa",grupa)
    .then((response) => {
      console.log(response);
      window.alert(`Uspesno ste kreirali grupu ${grupa.nazivGrupe}!`)});
      setReload(!reload);
      setShowF(false);
      setShowBtn(true);
      setSelectedValueSesir1('');
      setSelectedValueSesir2('');
      setSelectedValueSesir3('');
      setSelectedValueSesir4('');
      setNazivGrupe('');
  }

  // const handleChangeSesir1 = event => setSelectedValueSesir1(event.target.value);
  // const handleChangeSesir2 = event => setSelectedValueSesir2(event.target.value);
  // const handleChangeSesir3 = event => setSelectedValueSesir3(event.target.value);
  // const handleChangeSesir4 = event => setSelectedValueSesir4(event.target.value);

  const handleChangeSesir1 = (selectedOption1)=>{
    setSelectedValueSesir1(selectedOption1.value);
  }
  const handleChangeSesir2 = (selectedOption2)=>setSelectedValueSesir2(selectedOption2.value);
  const handleChangeSesir3 = (selectedOption3)=>setSelectedValueSesir3(selectedOption3.value);
  const handleChangeSesir4 = (selectedOption4)=>setSelectedValueSesir4(selectedOption4.value);
  
  useEffect(() => {
    fetchGrupe();
    fetchDrzave();
      },[reload]);
  
      return (
        <div>
            {showF ? <div className='dodajGrupu'>
        <form className='forma'>
            <h2>Dodaj grupu</h2>
            <div className='selectDrzava'>
              <label htmlFor="">Naziv grupe:</label>
              <input type="text" required style={{paddingTop:5, paddingBottom:5}} onInput={handleInput}/>
            </div>
            <div className='sesir'>
              <label>Šešir 1: </label>
              <Select className='selectDrzava' onChange={handleChangeSesir1} placeholder="Izaberite državu" options={drzave.filter((value)=>value.sesir==1).map(drzava=>({label:<div><img src={drzava.zastava} className="selectZastava"/> {drzava.naziv}</div>, value:drzava.drzavaId}))}></Select>
{/* 
            <select value={selectedValueSesir1} onChange={handleChangeSesir1} className="selectDrzava">
                 {drzave.filter((value)=>value.sesir==1).map(drzava => {
                    return <option key={drzava.drzavaId} value={drzava.naziv} >
                        {drzava.naziv}
                    </option>
                })}
            </select> */}
            </div>
            <div className='sesir'>
              <label>Šešir 2: </label>
              <Select className='selectDrzava'onChange={handleChangeSesir2} placeholder="Izaberite državu" options={drzave.filter((value)=>value.sesir==2).map(drzava=>({label:<div><img src={drzava.zastava} className="selectZastava"/> {drzava.naziv}</div>, value:drzava.drzavaId}))}></Select>
            {/* <select value={selectedValueSesir2} onChange={handleChangeSesir2} className="selectDrzava">
            {drzave.filter((value)=>value.sesir==2).map(drzava => {

                    return <option key={drzava.drzavaId} value={drzava.naziv} >
                        {drzava.naziv}
                    </option>
                })}
                </select> */}
            </div>
            <div className='sesir'>
              <label>Šešir 3: </label>
            {/* <select value={selectedValueSesir3} onChange={handleChangeSesir3} className="selectDrzava">
            {drzave.filter((value)=>value.sesir==3).map(drzava => {
                   return <option key={drzava.drzavaId} value={drzava.naziv} >
                   {drzava.naziv}
               </option>
                  })}
            </select> */}
                    <Select className='selectDrzava' onChange={handleChangeSesir3} placeholder="Izaberite državu" options={drzave.filter((value)=>value.sesir==3).map(drzava=>({label:<div><img src={drzava.zastava} className="selectZastava"/> {drzava.naziv}</div>, value:drzava.drzavaId}))}></Select>

            </div>
            <div className='sesir'>
              <label>Šešir 4: </label>
                    <Select className='selectDrzava' onChange={handleChangeSesir4} placeholder="Izaberite državu" options={drzave.filter((value)=>value.sesir==4).map(drzava=>({label:<div><img src={drzava.zastava} className="selectZastava" /> {drzava.naziv}</div>, value:drzava.drzavaId}))}></Select>
              {/* <select value={selectedValueSesir4} onChange={handleChangeSesir4} className="selectDrzava">
            {drzave.filter((value)=>value.sesir==4).map(drzava => {
                    return <option key={drzava.drzavaId} value={drzava.naziv} >
                      {drzava.naziv} 
                    </option>
                  })}
            </select> */}
            </div>
        </form>
        <div className='btnContainer'>
        <button className='dodajGrupuBtn' onClick={()=>dodajGrupu()}>Dodaj grupu</button>
        <button className='odustaniBtn' onClick={()=>{setShowF(false); setShowBtn(true);}}>Odustani</button>
        </div>
        </div> : null}
      
      <div className='grupnaFazaContainer'>
			{showBtn ?	<button className='dodajGrupuBtn' onClick={() => showForm()}>Dodaj grupu</button> : null}
      <div className="grupaContainer" >
      {grupe.map(grupa => (
        <div className="grupa" >
        <table className='grupaTabela'>
          <thead  >
            <tr  >
            <th className='grupaNaziv' colSpan={2}>
              Grupa {grupa.nazivGrupe}
            </th>
            </tr>
          </thead>
          <tbody>
        {grupa.drzave.map(drzava => (
                      <tr key={drzava.drzavaId}>
                          <td className='group-name' colSpan={2}>
                            {drzava.naziv} <img src={drzava.zastava} 
                          className='zastavaDrzave'/>
                          </td>
                      </tr>
        ))}
          </tbody>
        </table>
      </div>
      ))}
      </div>
        </div> 
   </div>
    );
  }


export default GrupnaFazaCard;