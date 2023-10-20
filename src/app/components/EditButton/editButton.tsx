import Link from "next/link"

interface PropsTypes {
    props: string
}

export default function EditButton({ props }: PropsTypes) {
    return (
        <Link href={props}>
        <button>Editar</button>
        </Link>
    )
}