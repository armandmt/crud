import React, { useEffect } from 'react'
import { useState } from 'react'
import { nanoid } from 'nanoid'
import Tasca from './Tasca'
import { db } from './firebase.js';
import { collection , doc, setDoc, query, orderBy , onSnapshot, addDoc,serverTimestamp} from 'firebase/firestore';

const q=query(collection(db,'todos'),orderBy('timestamp','desc'));
console.log(q)
const App = () => {

  const [tasca, setTasca] = useState("")
  const [tasques, setTasques] = useState([])
  const [modeEdicio, setModeEdicio] = useState(false)
  const [id, setId] = useState("")
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log("prova")
    onSnapshot(q,(snapshot)=>{
      setTasques(snapshot.docs.map(doc=>(
              {
              id: doc.id,
              item: doc.data()
              }
      )))
  })},[]);

  const elements = [
    setTasca,
    setTasques,
    setModeEdicio,
    setId,
    setError,
    tasques
  ]
  
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

    setDoc(doc(db, "todos", id), {
      todo: tasca,
      timestamp: serverTimestamp()
    });

    setId('')
    setTasca('')
    setModeEdicio(false)
    setError(null)


  }

  const afegirTasca = (e) => {

    e.preventDefault();

    if (!tasca.trim())
    {
      console.log("Element buit")
      setError("Introdueix algun valor")

      return
    }
    addDoc(collection(db,'todos'),{
      todo:tasca,
      timestamp: serverTimestamp()
  })
    console.log(tasca)
    setTasca('')
    setError(null)
  
    // setTasques ([...tasques,{
    //   id: nanoid(),
    //   nomTasca: tasca
    // }])



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
  

                  <Tasca elements={elements} tasca={v} key= { v.id }/>
                 
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