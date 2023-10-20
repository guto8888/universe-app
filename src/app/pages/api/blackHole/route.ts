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
    const allBlackHole = await prisma.blackHole.findMany()
    return NextResponse.json(allBlackHole)
}

export async function POST(req: Request) {
  const {name, age, galaxy_id } = await req.json()

  try {  
        await prisma.blackHole.create({
          data: {
            name,
            age,
            galaxy_id
          }
        })
        return NextResponse.json({ message: "Item adicionado"})
  }  catch (error) {
    newError({message: getErrorMessage(error)})
  }

}

export async function DELETE(req: Request) {
  const { id, name, age } = await req.json().then(async({ id }) => {
    return await prisma.blackHole.findUnique({
     where: {
       id: Number(id),
     },
   })
  })

try {
  await prisma.blackHole.delete({
    where: {
      id,
      name,
      age
    }
  })
  
  return NextResponse.json({ message: "Item deletado"})
}  catch (error) {
  newError({message: getErrorMessage(error)})
}
}

export async function PUT(req: Request) {
  const { id, name, galaxy_id, age } = await req.json()

try {
   await prisma.blackHole.update({
    where: {
      id,
    },
    data: {
      name,
      age,
      galaxy_id
    }
  })
  return NextResponse.json({ message: "Item atualizado"})
} catch (error) {
  newError({message: getErrorMessage(error)})
}

}
  