import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Login from './components/Login'
import SelectFamily from './components/SelectFamily'
import CreateWishList from './components/CreateWishlist'
import Main from './components/Main'
import { Session } from '@supabase/supabase-js'

function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div>
      <div className='mt-6 ml-6 mb-0'>
        <h1 className='font-bold text-xl'>Family Gift List</h1>
        <span className='text-xs text-slate-400'>created by kimmy</span>
      </div>
      {!session ? <CreateWishList /> : <Main key={session.user.id} session={session} />}
    </div>
  )
}

export default App