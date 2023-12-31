'use client'

import { useParams } from 'next/navigation'
import { ReactElement, useEffect, useState } from 'react'
import style from "./page.module.css"
import LoadingSpinner from '@/app/components/Loading/loading'
import EditConfirmBtn from '@/app/components/EditConfirmBtn/editConfirmBtn'
import { SortType, UniversalName, SolarType } from '@/app/services/universeTypes'

export default function Edit() {
  const params = useParams()
  const { id } = params
  const newId = Number(id)

  const [newName, setName] = useState<string>()
  const [oldName, setOldName] = useState<string>()
  const [newAge, setAge] = useState<number>(0)
  const [oldAge, setOldAge] = useState<number>(0)
  const [uniName, setUniName] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [optionUni, setOption] = useState<ReactElement[]>([])

  const uniArr: ReactElement[] = []

  const findUniverse = async () => {
    const galaxy = await fetch(`${process.env.BASE_URL}/pages/api/galaxy`)
    const galaxyJson = await galaxy.json()
    galaxyJson.sort((a:SortType, b: SortType) => {
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
    await findUniverse()
    const blackHole = await fetch(`${process.env.BASE_URL}/pages/api/blackHole`)
    const uniJson = await blackHole.json()
    const gal = await fetch(`${process.env.BASE_URL}/pages/api/galaxy`)
    const galJson = await gal.json()
    uniJson.map(({ age, galaxy_id, name, id }: SolarType) => {
      galJson.map((u: UniversalName) => {
        if(id === newId) {
          if(u.id === galaxy_id ) {
            setUniName(u.name)
          }
          setName(name)
          setOldName(name)
          setAge(age)
          setOldAge(age)
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
        <h1>Editar Sistema Solar:</h1>
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
                  Galáxia: 
                </span>
                {uniName}
              </h3>
              <h3>
                <span className={style.span}>
                  Nova Galáxia:
                </span>
                <select name="uniId" id="uniId">
                  {optionUni}
                </select>
              </h3>
            </div>
          </div>
          <div className={style.mainDivBtn}>
            <EditConfirmBtn props={{ 'href': '/pages/blackHole', 'name': String(newName), 'id': newId, 'age': newAge, 'url': `${process.env.BASE_URL}/pages/api/blackHole` }} />
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
            }/>
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
