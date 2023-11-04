import { useState } from 'react'
import { supabase } from '../lib/supabase'

import giftboxLogo from '../assets/giftbox.svg'

export default function Login() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setLoading(true)
        const { error } = await supabase.auth.signInWithOtp({ email })

        if (error) {
            alert(error.message)
        } else {
            alert('Check your email for the login link!')
        }
        setLoading(false)
    }

    return (
        <div className="mt-32 flex justify-center items-center">
            <div>
                <div className='w-full flex justify-center mb-12'>
                    <img src={giftboxLogo} className="w-16 h-15" alt="Gift Box logo" />
                </div>
                <h1 className="w-full mb-6 text-center text-xl">Login</h1>
                <p className="font-bold text-slate-400">Email</p>
                <form className="form" onSubmit={handleLogin}>
                    <div>
                        <input
                            className="w-full mt-0.5 border-2 p-1 rounded-lg border-indigo-400"
                            type="email"
                            value={email}
                            required={true}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className="w-full mt-4 bg-indigo-800 text-slate-100 p-2 rounded-lg" disabled={loading}>
                            {loading ? <span>Loading</span> : <span>Send magic link</span>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}