'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import LoadingSpinner from '@/app/components/Loading/loading'
import EditConfirmBtn from '@/app/components/EditConfirmBtn/editConfirmBtn'
import { UniversalType } from '@/app/services/universeTypes'

import style from "./page.module.css"

export default function Edit() {
 
  const params = useParams()
  const { id } = params
  const newId = Number(id)

  const [newName, setName] = useState<string>()
  const [oldName, setOldName] = useState<string>()
  const [newAge, setAge] = useState<number>(0)
  const [oldAge, setOldAge] = useState<number>(0)
  const [loading, setLoading ] = useState<boolean>(false)

const findOne = async () => {
  setLoading(false)
  const universe = await fetch("https://universe-app-iota.vercel.app/pages/api/universe")
  const uniJson = await universe.json()
  uniJson.map(({name, age, id}: UniversalType) => {
     if(id === newId) {
       setName(name)
       setOldName(name)
       setAge(age)
       setOldAge(age)
     }
    })
    setLoading(true)
  }

  useEffect(() => {
    findOne()
  }, [])

    return loading ? (
        <div className={style.fullBody}>
        <div className={style.divHeader}>
          <h1>Editar Universo:</h1>
        <div className={style.mainDiv}>
        <div className={style.mainDivText}>
          <div className={style.nameDiv}>
          <h1><span className={style.span}>Nome atual:</span> {oldName}</h1>
          <h1>
            <span className={style.span}>Novo nome:</span> 
             {newName ? newName : "Escolha o nome"}</h1>
          </div>
          <div className={style.ageDiv}>
          <h2><span className={style.span}>Idade atual:</span>  {oldAge}</h2>
          <h2><span className={style.span}>Nova idade:</span> {newAge | 0}</h2>
          </div>
        </div>
        <div className={style.mainDivBtn}>
        <EditConfirmBtn props={{href: "/pages/universe", name: String(newName), age: newAge, id: newId, url: 'https://universe-app-iota.vercel.app/pages/api/universe' }} />
        </div>
        </div>
        </div>
        <div className={style.inputDiv}>
        <div className={style.divInput}>
        <div className={style.editDiv}>
        <label htmlFor="nameEdit">
          Modificar nome:
        </label>
        <input className={style.editName} name="nameEdit" id="nameEdit" type="text" value={newName != null ? newName : ''} onChange={e => {
           setName(e.currentTarget.value === "" ? undefined : e.currentTarget.value)
            }
          } />
          </div>
          <div className={style.editDiv}>
            <label htmlFor="ageEdit">
              Modificar idade:
            </label>
            <input className={style.editName} name="ageEdit" id="ageEdit" type="number" max={2147483647} value={newAge != null ? newAge : 0} onChange={e => {
              if(Number(e.currentTarget.value) > 2147483647) {
                alert("o valor máximo é 2147483647")
              }
              setAge(Number(e.currentTarget.value) === 0 ? Number(undefined) : Number(e.currentTarget.value))
              }
             }/>
          </div>
          </div>
        </div>
    </div>
  ) : (
    <LoadingSpinner />
  )
    }
