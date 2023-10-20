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
    const allCelestialBodies = await prisma.remainingCelestialBodies.findMany()
    return NextResponse.json(allCelestialBodies)
}

export async function POST(req: Request) {
  const {name, age, type, solarSystem_id } = await req.json()
  try {  
        await prisma.remainingCelestialBodies.create({
          data: {
            name,
            age,
            type,
            solarSystem_id
          }
        })
        return NextResponse.json({ message: "Item  adicionado"})
  } catch (error) {
    newError({message: getErrorMessage(error)})
  }

}

export async function DELETE(req: Request) {
  const {id, name, type, age, solarSystem_id} = await req.json().then(async({ id }) => {
      return await prisma.remainingCelestialBodies.findUnique({
          where: {
              id: Number(id),
            }
        })
    })    

try {
  await prisma.remainingCelestialBodies.delete({
    where: {
      id,
      name: name,
      type: type,
      age,
      solarSystem_id
    }
  })
  
  return NextResponse.json({ message: "Item deletado"})
} catch (error) {
  newError({message: getErrorMessage(error)})
}
}

export async function PUT(req: Request) {
  const { id, name, age, solarSystem_id, type } = await req.json()

try {
   await prisma.remainingCelestialBodies.update({
    where: {
      id,
    },
    data: {
      name,
      age,
      solarSystem_id,
      type
    }
  })

  return NextResponse.json({ message: "Item atualizado"})
} catch (error) {
  newError({message: getErrorMessage(error)})
}
}
  