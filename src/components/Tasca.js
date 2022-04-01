import React, { memo } from 'react'

const Tasca = ({ editar, esborrarTasca, v}) => {

  console.log ("Em renderitzo")

  return (

        <li  className="list-group-item" >
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
}

export default Tasca