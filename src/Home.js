import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { nanoid } from 'nanoid'
import { db } from './firebase.js';
import { collection , where, doc, getDocs, deleteDoc,setDoc, query, orderBy , onSnapshot, addDoc,serverTimestamp} from 'firebase/firestore';
import { toBeRequired } from '@testing-library/jest-dom/dist/matchers';

const Home = ({ estat }) => {


  const [ usuari, setUsuari] = estat

  const comptador = useRef(0)
  const inputTasca = useRef()
  const estaMuntat = useRef(true)


  const [tasca, setTasca] = useState("")
  const [descripcio, setDescripcio] = useState("")
  const [email, setEmail] = useState("")

  const [taska,setTaska] = useState({
    // Cal establir un valor inicial o llarga un warning a la consola
    tasca: "",
    descripcio: "",
    email: ""
  })
  


  const [tasques, setTasques] = useState([])
  const [modeEdicio, setModeEdicio] = useState(false)
  const [id, setId] = useState("")
  const [error, setError] = useState(null)



  const tasqCollectionRef =collection(db,"Tasques")

  // const q = query(tasqCollectionRef,orderBy('time','desc'));
  const q = query(tasqCollectionRef,where ('username','==' , usuari));

  const handleInputChange = ({target}) => {

          setTaska({
              ...taska,
              [target.name]:target.value
           })
 
  }
  const getTasques = async () => {

    const dades = await getDocs(tasqCollectionRef)

    console.log(dades) 


    setTasques(dades.docs.map ((v) => {
      return {...v.data(),id:v.id}
    }) )

  }



  useEffect( ()=> {

    

    const unsubscribe = onSnapshot(q, (data)=> {
       
          comptador.current++;


          // setTimeout( ()=> {

            if (estaMuntat.current == true) 
            {
              setTasques(data.docs.map ((v) => {
                return {...v.data(),id:v.id}
              }) )
            }
            else  console.log("Ehh paio, que ja no existeixo")
         
          // },4000)
         
         
      console.log("He canviat coses")

    } )

    return () => {

      unsubscribe()

      estaMuntat.current = false

      console.log("Adeu me piro")
   
    }


    //  const unsubscribe = 
    //getTasques()

    // return ( ()=> { 

    //   // Això s'executa cada cop que es desmunta el component
    //   console.log("Se salio")
    //   unsubscribe()
  
    // })

  },[])
  
 
  const editar = (item) => {


    console.log(item)
    setModeEdicio(true)
    setTasca(item.nomTasca)
    setId(item.id)

  }
  const editarTasca = (e) => {


    console.log("edito")
    e.preventDefault();

    if (!taska.tasca.trim())
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
      nomTasca: taska.tasca,
      time: serverTimestamp()
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

    if (!taska.tasca.trim())
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
        nomTasca:taska.tasca,
        username: usuari,
        time:serverTimestamp()
    })

    
    setTaska({
      // Cal establir un valor inicial o llarga un warning a la consola
      tasca: "",
      descripcio: "",
      email: ""
    })
    inputTasca.current.focus()

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
              <span className="lead">{ v.nomTasca }</span>
              <button 
                className="btn btn-sm btn-danger float-right mx-2"
                onClick={ () => esborrarTasca(v.id) }
              >Esborrar</button>
              <button 
                className="btn btn-sm btn-warning float-right"
                onClick={ () => editar (v)}
              >Editar</button>
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
          <span className='text-danger'>{ error } { comptador.current } </span>

          <input 
            type="text" 
            name="tasca"
            ref = { inputTasca }
            className="form-control mb-2"
            placeholder="Afegeix Tasca"
            onChange={ handleInputChange }
            value = { taska.tasca }
         />
         <input 
            type="text"
            name="descripcio" 
            className="form-control mb-2"
            placeholder="Afegeix Descripció"
            onChange={ handleInputChange  }
            value = { taska.descripcio }
         />
         <input 
            type="text" 
            name="email"
            className="form-control mb-2"
            placeholder="Afegeix e-mail"
            onChange={ handleInputChange  }
            value = { taska.email }
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

export default Home