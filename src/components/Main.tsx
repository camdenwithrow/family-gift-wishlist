import { Session } from "@supabase/supabase-js"

interface MainProps {
    key: string
    session: Session
}

export default function Main(props: MainProps) {
    const { key, session } = props

    return (
        <div>
            <p>{key}</p>
            <p>{session.user.email}</p>
        </div>
    )
}