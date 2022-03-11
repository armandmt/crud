import React from 'react'
import { doc, deleteDoc } from "firebase/firestore";
import {db} from './firebase.js';


const Tasca = ({elements,tasca}) => {


    const [setTasca,setTasques,setModeEdicio,setId,setError,tasques] = elements
    const editar = (item) => {


        console.log(item)
        setModeEdicio(true)
        setTasca(item.item.todo)
        setId(item.id)
    
      }
    
      const esborrarTasca = (id) => {
    
        console.log(id)
        deleteDoc(doc(db,'todos',id))
    
        // const arrayFiltrat = tasques.filter ( (v) => {
    
        //     return ( v.id !== id )
    
        // }) 
    
        // setTasques(arrayFiltrat)
    
    
      }
  return (
    <li  className="list-group-item" >
    <span className="lead">{ tasca.item.todo }</span>
    <button 
      className="btn btn-sm btn-danger float-right mx-2"
      onClick={ () => esborrarTasca(tasca.id) }
    >Esborrar</button>
    <button 
      className="btn btn-sm btn-warning float-right"
      onClick={ () => editar (tasca)}
    >Editar</button>
  </li>
  )
}

export default Tasca