import React from 'react'

const Tasca = ({elements,tasca}) => {


    const [setTasca,setTasques,setModeEdicio,setId,setError,tasques] = elements
    const editar = (item) => {


        console.log(item)
        setModeEdicio(true)
        setTasca(item.nomTasca)
        setId(item.id)
    
      }
    
      const esborrarTasca = (id) => {
    
        console.log(id)
    
        const arrayFiltrat = tasques.filter ( (v) => {
    
            return ( v.id !== id )
    
        }) 
    
        setTasques(arrayFiltrat)
    
    
      }
  return (
    <li  className="list-group-item" >
    <span className="lead">{ tasca.nomTasca }</span>
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