import React, {useState, useEffect} from "react";
import Card from './Card';
import { orderA_Z, orderZ_A, filterByTemp, filterByBreed , orderAscWeight, orderDescWeight , getDogsLocally, getByName} from '../actions';
import {useSelector, useDispatch} from 'react-redux'
// import { ORDER_AZ } from "../actions/constants";
import pawR from './pawR.png';
import pawL from './pawL.png';
// import { getDogs } from "../actions";

const Cards = function(){


    var dispatch = useDispatch();

    // useEffect(()=>{

    // dispatch(getDogs());
    // },[])
    // dispatch(getDogs());

    
    var dogs = useSelector((state)=>state.selectedDogs);

    useEffect(() => {
        setFiltered(dogs.slice(actualPage,actualPage+9));
        
        setFiltered(filteredDogs());

        // console.log('document.referrer:', document.referrer, window.history.previous)
    }, [])

    const [actualPage, setActualPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [filtered, setFiltered] = useState(dogs.slice(actualPage, actualPage+9));
    const [temperamento, setTemperamento] = useState('');
    const [temperamentSubmit, setTemperamentSubmit] = useState('');
    const [search, setSearch] = useState('');
    const [searchSubmit, setSearchSubmit] = useState('');
    const [order , setOrder] = useState('');

    


    const styles = {
        div : {
            display: 'flex',
            justifyContent : 'center',
            alignItems : 'center',
            flexWrap : 'wrap',
            backgroundColor : 'red',
        },
        buttons : {
            display: 'flex',
            justifyContent : 'space-around',
            alignItems: 'center',
            margin : '40px',
            backgroundColor : 'pink',
            minWidth : '98vw',
        }
    }

    var handleOrderAZ = function(e){
        e.preventDefault();
        dispatch(orderA_Z());
        setFiltered(filteredDogs());
    }

    function handleOrderZA(e){
        e.preventDefault();
        dispatch(orderZ_A());
        setFiltered(filteredDogs());
    }

    function handleTemperamentChange(e){
        setTemperamento(e.target.value);
    }

    function handleTemperamentFilter(e){
        e.preventDefault();

        // console.log('envia a filterbytemp :', temperamento)

        dispatch(filterByTemp(temperamento))

        setCurrentPage(0);
        setActualPage(1);
        setTemperamentSubmit(temperamento);
    }


    function filteredDogs(){
        if (searchSubmit.length === 0) {
            return (dogs.length) && dogs.slice(currentPage, currentPage + 9)
          }
        else{
          setSearchSubmit("");
          return (dogs.length) && dogs.slice(currentPage, currentPage + 9)
        }
    }

    useEffect(()=>{
        setFiltered(filteredDogs());
    },[ actualPage, currentPage, temperamentSubmit, order])

    function nextPage(e){
        e.preventDefault();
        setActualPage(actualPage+1);
        setCurrentPage(currentPage+9)
        // setFiltered(filteredDogs());
        // setFiltered(dogs.slice(actualPage,actualPage+9));
    }

    function prevPage(e){
        e.preventDefault();
        if(currentPage>0){
            setActualPage(actualPage-1);
           setCurrentPage(currentPage-9)
        }
        
        // setFiltered(filteredDogs());
            // setFiltered(dogs.slice(actualPage,actualPage+9));
    }

    function handleFilterBreed(e){
        e.preventDefault();
        dispatch(filterByBreed());
        setCurrentPage(0);
        setActualPage(1);
        setTimeout(()=>{
            setOrder('random db');
        },50)
    }

    function handleOrderDWeight(e){
        e.preventDefault();
        dispatch(orderDescWeight());

        setOrder('descendent');
        setCurrentPage(0);
        setActualPage(1);
    }

    function handleOrderAWeight(e){
        e.preventDefault();
        dispatch(orderAscWeight());

        setOrder('ascendent');
        setCurrentPage(0);
        setActualPage(1);
    }

     function handleGetDogs(e){
        e.preventDefault();
        dispatch(getDogsLocally());
        setFiltered(filteredDogs());


        setCurrentPage(0);
        setActualPage(1);
        
        setTimeout(()=>{
            setOrder('random api');
        },50)
        setTemperamento('')
    }

    // function handleBreedScroll(e){
    //     e.preventDefault();

    //     console.log('temperamento:', e.target.value)
    // }

    function handleSearchChange(e){
        setSearch(e.target.value);
        console.log('cambia search a :', search);
    }

    function handleSearchSubmit(e){
        e.preventDefault();
        setSearchSubmit(search);
        dispatch(getByName(search));

        console.log('dentro de handle submit search??', search);
        setSearch('');
        setTimeout(()=>{
            setOrder('random ')
        },100);
        setCurrentPage(0);
        setActualPage(1);

        setTimeout(()=>{
            setOrder('random')
        },1100);
        setSearchSubmit('');


    }

    return(
        <div style={styles.div}>
            
            <div style= {styles.buttons}>
            
            <div style={{margin: '10px', display: 'flex', flexFlow: 'nowrap'}}>
            <input type='button' value='order A-Z' onClick={(e)=>handleOrderAZ(e)}/>
            {/* </div> */}
            {/* <div style={{margin: '10px'}}> */}
            <input type='button' value='order Z-A' onClick={(e)=>handleOrderZA(e)}/>
            {/* </div> */}

            {/* <div style={{margin: '10px'}}> */}
            <input type='button' value='get db' onClick={(e)=>handleFilterBreed(e)}/>
            {/* </div> */}

            {/* <div style={{margin: '10px'}}> */}
            <input type='button' value='get all dogs' onClick={(e)=>handleGetDogs(e)}/>
            {/* </div> */}

            {/* <div style={{margin: '10px'}}> */}
            <input type='button' value='Ordenar mayor peso' onClick={(e)=>handleOrderDWeight(e)}/>
            {/* </div> */}
            {/* <div style={{margin: '10px'}}> */}
            <input type='button' value='Ordenar menor peso' onClick={(e)=>handleOrderAWeight(e)}/>
            </div>

            <form onSubmit={(e)=>handleSearchSubmit(e)}>
                <input type='text' name='name' value={search} onChange={(e)=>handleSearchChange(e)}/>

                <input type='submit' value='Buscar perro'/>
            </form>

            <div style={{margin: '10px'}}>
            <form onSubmit={(e)=>handleTemperamentFilter(e)}>
            <input type='text' id='temperamentFilter' value={temperamento} onChange={(e)=>handleTemperamentChange(e)}/>
            <label id='temperamentFilter'>Filtrar por temperamento</label>
            </form>
            </div>

            {/* <form>
	<input list="Country" name="Country"/>
	<datalist id="Country">
		<option value=" Afghanistan"/>
		<option value=" Albania"/>
		<option value=" Algeria"/>
		<option value=" American Samoa"/>
		<option value=" Andorra"/>
		<option value=" Angola"/>
		<option value=" Anguilla"/>
		<option value=" Antigua and Barbuda"/>
		<option value=" Argentina"/>
		<option value=" Armenia"/>
		<option value=" Aruba"/>
	</datalist>
	<input type="submit" value='submiR???' onClick={(e)=>handleBreedScroll(e)} onSubmit={(e)=>handleBreedScroll(e)}/>
        </form>  */}

</div>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center',minHeight:'13vh', minWidth:'98.3vw', backgroundColor:'pink'}}>
            {actualPage >1 ?<img src={pawL} onClick={(e)=> prevPage(e)} style={{maxWidth:'4vw', margin:'5px'}}/>: null}
            {dogs.length > 9 ? actualPage : null}
            {currentPage < dogs.length -9 ?  <img src={pawR} alt='' onClick={(e)=> nextPage(e)} style={{maxWidth:'4vw', margin:'5px'}}/> : null}
            </div>
            
            <div style={{display:'flex', flexFlow:'wrap', justifyContent: 'space-evenly', alignItems:'center'}}>

            {filtered ? filtered.map((i,idx)=> <Card key={idx}  uuid ={i.uuid} id={i.id} name={i.name} weight={i.weight} temperament={i.temperament}  temperaments={i.temperaments} reference_image_id={i.reference_image_id}/>):  <h2 style={{display:'flex', justifyContent:'center', minWidth:'95vw', alignItems:'center', minHeight:'30vh'}}>No se encontraron perros</h2>}

            
            </div>

            <div style={{display:'flex', justifyContent:'center', alignItems:'center', minWidth:'98.3vw',minHeight:'13vh', backgroundColor:'pink'}}>
            {actualPage >1 ?<img src={pawL} onClick={(e)=> prevPage(e)} style={{maxWidth:'4vw', margin:'5px'}}/>: null}
            {dogs.length > 9 ? actualPage : null}
            {currentPage < dogs.length -9 ?  <img src={pawR} alt='' onClick={(e)=> nextPage(e)} style={{maxWidth:'4vw', margin:'5px'}}/> : null}
            </div>

        </div>
    )
}

export default Cards;