'use client'

import { useParams } from 'next/navigation'
import { ReactElement, useEffect, useState } from 'react'
import EditConfirmBtn from '@/app/components/EditConfirmBtn/editConfirmBtn'
import LoadingSpinner from '@/app/components/Loading/loading'
import { SortType, UniversalName, StarType } from '@/app/services/universeTypes'

import style from "./page.module.css"

export default function Edit() {
  const params = useParams()
  const { id } = params
  const newId = Number(id)
  
  const [newName, setName] = useState<string>()
  const [oldName, setOldName] = useState<string>()
  const [newAge, setAge] = useState<number>(0)
  const [newType, setType] = useState<string>()
  const [oldAge, setOldAge] = useState<number>(0)
  const [oldType, setOldType] = useState<string>('')
  const [uniName, setUniName] = useState<string>('')
  const [optionUni, setOption] = useState<ReactElement[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const uniArr: ReactElement[] = []

  const findSolarSystem = async () => {
    const solarSystem = await fetch("https://universe-app-iota.vercel.app/pages/api/solarSystem")
    const solarSystemJson = await solarSystem.json()
    solarSystemJson.sort((a:SortType, b: SortType) => {
      return Number(a.name.slice(9, 20)) - Number(b.name.slice(9, 20)) 
    }).map(({ id, name }: UniversalName) => {
    uniArr.push(
      <option key={id} value={id}>{name}</option>
    )
    })
    setOption(uniArr)
  }

const findOne = async () => {
  setLoading(false)
  await findSolarSystem()
  const restBodies = await fetch("https://universe-app-iota.vercel.app/pages/api/restCelestialBodies")
  const uniJson = await restBodies.json()
  const solarSystem = await fetch("https://universe-app-iota.vercel.app/pages/api/solarSystem")
  const solarSystemJson = await solarSystem.json()
  uniJson.map(({ id, name, solarSystem_id, age, type }: StarType) => {
    solarSystemJson.map((u: {name: string, id: number}) => {
      if(id === newId) {
        if(u.id === solarSystem_id ) {
          setUniName(u.name)
        }
        setName(name)
        setOldName(name)
        setAge(age)
        setOldAge(age)
        setType(type)
        setOldType(type)
      }
    })
    })
    setLoading(true)
  }

  useEffect(() => {
    findOne()
  }, [])

  return loading ? (
    <div className={style.fullBody}>
      <div className={style.divHeader}>
        <h1>Editar Corpo Celeste:</h1>
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
            <div className={style.uniDiv}>
              <h3>
                <span className={style.span}>
                  Sistema Solar: 
                </span>
                {uniName}
              </h3>
              <h3>
                <span className={style.span}>
                  Novo Sistema Solar:
                </span>
                <select name="uniId" id="uniId">
                  {optionUni}
                </select>
              </h3>
            </div>
            <div className={style.typeDiv}>
              <h2><span className={style.span}>Tipo atual:</span>  {oldType}</h2>
              <h2><span className={style.span}>Novo tipo:</span> {newType  ? newType : "Escolha o tipo"}</h2>
            </div>
          </div>
          <div className={style.mainDivBtn}>
            <EditConfirmBtn props={{'type': newType, 'href': "/pages/restCelestialBodies", 'name': String(newName), 'id': newId, 'age': newAge, 'url': 'https://universe-app-iota.vercel.app/pages/api/restCelestialBodies'}} />
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
              setName(e.currentTarget.value === "" ?undefined : e.currentTarget.value)
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
          <div className={style.editDiv}>
            <label htmlFor="typeEdit">
              Modificar tipo:
            </label>
            <input className={style.editName} name="typeEdit" id="typeEdit" type="text" value={newType != null ? newType : ''} onChange={e => {
              setType(e.currentTarget.value === '' ? undefined : e.currentTarget.value)
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
