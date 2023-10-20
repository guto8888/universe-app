import { NextResponse } from "next/server"
import { PropsInterface } from "@/app/services/universeTypes"

export default function DeleteBtn(props : PropsInterface) {
    const { uniData, findDatabase, url } = props.props

    const deleteDb = async (id: string) => {
        const res = await fetch(url, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'DELETE',
          body: JSON.stringify({id})
        })
        findDatabase()
        return NextResponse.json(res)
      }
    return (
        <button onClick={() => deleteDb(uniData)
        }>
          Deletar
        </button>
    )
}