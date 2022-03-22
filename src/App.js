import React, { useEffect } from 'react'
import { useState } from 'react'
import { nanoid } from 'nanoid'
import { db } from './firebase.js';
import { collection , doc, getDocs, deleteDoc,setDoc, query, orderBy , onSnapshot, addDoc,serverTimestamp} from 'firebase/firestore';
import './index.css'
const App = () => {

  // Estats del formulari
  
  const [dades, setDades] = useState({})  // substitueix a estats individuals
  const [tasca, setTasca] = useState("")
  const [tipu, setTipu] = useState("")
  const [venciment, setVenciment] = useState((new Date()).toISOString().substring(0,16))
  //const [created, setCreated] = useState((new Date()).toISOString().substring(0,16))
  // No cal un estat si la variable no es veu ni necessita provocar una renderització
  let created=""

  // new Date()).toISOString().substring(0,16)
  //  data actual -->  converteix a format datetime-local --> i elimina els milisegons i segons
   
  

  // Estat amb l'array de dades
  const [tipus, setTipus] = useState([])
  const [tasques, setTasques] = useState([])
  const [modeEdicio, setModeEdicio] = useState(false)
  const [id, setId] = useState("")
  const [error, setError] = useState(null)


  const tasqCollectionRef =collection(db,"Tasques")

  const q = query(tasqCollectionRef,orderBy('created','desc'));

  const getTasques = async () => {

    const dades = await getDocs(tasqCollectionRef)

    console.log(dades) 

    setTasques(dades.docs.map ((v) => {
      return {...v.data(),id:v.id}
    }) )

  }

  const getTipus = async () => {

    const dades = await getDocs(collection(db,"Tasques"))

    setTipus(dades.docs.map ((v) => {
      return {...v.data(),id:v.id}
    }) )
  }

  useEffect( ()=> {

    onSnapshot(q, (data)=> {

      setTasques(data.docs.map ((v) => {
        return {
          ...v.data(),
          id:v.id
        }
      }) )
      console.log(tasques)


    } )


    // no cal onsnapshot 
    getTipus()
    //getTasques()

  },[])
  
 
  const editar = (item) => {


    console.log(item)
    setModeEdicio(true)
    // Establim els estats per a poder editar
    setTasca(item.nomTasca)
    setVenciment(item.venciment)
    created=item.created  // No cal un estat. Aquest valor no es veu
    setId(item.id)

  }
  const editarTasca = (e) => {


    console.log("edito")
    e.preventDefault();

    if (!tasca.trim())
    {
      console.log("Element buit")
      setError("Introdueix algun valor")
      return
    }
    // const arrayEditat = tasques.map ( (v) => {

    //   return (v.id === id ? { id:id, nomTasca: tasca} : v)

    // })

    // console.log(arrayEditat)
    // setTasques(arrayEditat)

    setDoc(doc(db,"Tasques",id),{
      
      created: created,
      nomTasca: tasca, // a l'anterior es fa còpia de tots els camps
      venciment: venciment // però es modfiquen els que ens interessen
    
      
    })

    //getTasques()

    setId('')
    setTasca('')
    setModeEdicio(false)
    setError(null)


  }
  const esborrarTasca = (id) => {

    console.log(id)

    // const arrayFiltrat = tasques.filter ( (v) => {

    //     return ( v.id !== id )

    // }) 

    // setTasques(arrayFiltrat)

    deleteDoc(doc(db,'Tasques',id))
    //getTasques()


  }

  const afegirTasca = (e) => {

    e.preventDefault();

    if (!tasca.trim())
    {
      console.log("Element buit")
      setError("Introdueix algun valor")

      return
    }
    console.log(tasca)
    setTasca('')
    setError(null)
  
    // setTasques ([...tasques,{
    //   id: nanoid(),
    //   nomTasca: tasca
    // }])

    addDoc(tasqCollectionRef,{
        nomTasca:tasca,
        venciment: venciment, 
        created: new Date().toISOString().substring(0,16)  // passem a format iso
    })

    getTasques()

  }

  return (
   
  <div className="container mt-5">
    <h1 className="text-center">CRUD APP</h1>
    <hr/>
    <div className="row">

      <div className="col-8">
        <h4 className="text-center">Llista de Tasques</h4>
        
        <ul className="list-group">
          {
       
            tasques.length === 0 ? (
            
              <li className='list-group-item'>No hi ha tasques actives</li>

            ) :
            (
              tasques.map ( (v) => {
                return (
  
                  <li key = { v.id } className="list-group-item" >
              <span className="lead">
                <span className='overxxx'>{ v.nomTasca }</span> 
              </span>
              
              <button 
                className="btn btn-sm btn-danger float-right mx-2"
                onClick={ () => esborrarTasca(v.id) }
              >Esborrar</button>
              <button 
                className="btn btn-sm btn-warning float-right"
                onClick={ () => editar (v)}
              >Editar</button>
              <small className="mr-3 float-right">{ v.venciment.split("T")[1] } </small>
              <small className="float-right">{ v.venciment.split("T")[0] }/ </small>

            </li>
  
                )
              })

            
          

            )
              
            
          }
          
        </ul>
      </div>

      <div className="col-4">
        <h4 className="text-center">
          {
            modeEdicio ? "Editar Tasca"  : "Afegir Tasca"
          }
       
       </h4>
        <form onSubmit={ modeEdicio ? editarTasca : afegirTasca }>
          <span className='text-danger'>{ error } </span>

          <input 
            type="text" 
            className="form-control mb-2"
            placeholder="Afegeix Tasca"
            onChange={ e => setTasca(e.target.value)  }
            value = { tasca }
         />
         <input 
            type="datetime-local" 
            className="form-control mb-2"
            placeholder="Venciment de la Tasca"
            onChange={ e => setVenciment(e.target.value)  }
            value = { venciment }
         />


         {
            modeEdicio ? (

              <button 
              className="btn btn-warning btn-block" 
              type="submit"
              >Editar
              </button>

            )  :
            (
              <button 
              className="btn btn-dark btn-block" 
              type="submit"
             >Afegir
              </button>
            )


         }
        
        </form>
      </div>

    </div>
  </div>



  )
}

export default App