import prisma from "../base"
import { NextResponse } from 'next/server';

function getErrorMessage(error: unknown) {
  if(error instanceof Error) return error.message
  return String(error)
}

const newError = ({ message }: {message: string}) => {
  return NextResponse.json({error: message}) 
}

export async function GET() {
    const allSatellities = await prisma.satellite.findMany()
    return NextResponse.json(allSatellities)
}

export async function POST(req: Request) {
  const {name, age, planet_id } = await req.json()

  try {  
        await prisma.satellite.create({
          data: {
            name,
            age,
            planet_id
          }
        })
        return NextResponse.json({ message: "Item adicionado"})
  } catch (error) {
    newError({message: getErrorMessage(error)})
  }

}

export async function DELETE(req: Request) {
  const { id, name, age } = await req.json().then(async({ id }) => {
    return await prisma.satellite.findUnique({
     where: {
       id: Number(id),
     },
   })
  })


try {
  await prisma.satellite.delete({
    where: {
      id,
      name,
      age
    }
  })
  
  return NextResponse.json({ message: "Item deletado"})
} catch (error) {
  newError({message: getErrorMessage(error)})
}
}

export async function PUT(req: Request) {
  const { id, name, age, planet_id } = await req.json()

try {
   await prisma.satellite.update({
    where: {
      id,
    },
    data: {
      name,
      age,
      planet_id
    }
  })

  return NextResponse.json({ message: "Item atualizado"})
} catch (error) {
  newError({message: getErrorMessage(error)})
}
}
  