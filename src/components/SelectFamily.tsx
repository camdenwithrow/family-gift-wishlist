import { useState } from 'react'
import { supabase } from '../lib/supabase'

import giftboxLogo from '../assets/giftbox.svg'

export default function SelectFamily() {
    const [loading, setLoading] = useState(false)
    const [dropdownOpen, setDropDownOpen] = useState(false)
    const [family, setFamily] = useState("")
    const [familyOptions, setFamilyOptions] = useState(["withrows"])

    const toggleMenu = () => {
        setDropDownOpen(!dropdownOpen)
    }

    const handleSelectFamily = async (event: React.FormEvent<HTMLFormElement>) => {
        return
    }

    return (
        <div className="mt-32 flex justify-center items-center">
            <div className='w-48'>
                <div className='w-full flex justify-center mb-12'>
                    <img src={giftboxLogo} className="w-16 h-15" alt="Gift Box logo" />
                </div>
                <h1 className="w-full mb-6 text-center text-xl">Select Family</h1>
                <form className="form" onSubmit={handleSelectFamily}>
                    <div className='w-full'>
                        <div className="w-full relative inline-block text-left">
                            <div className='w-full'>
                                <button
                                    onClick={toggleMenu}
                                    type="button"
                                    className="relative w-full inline-flex justify-center w-full px-4 py-2 font-bold text-slate-400 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                                    id="options-menu"
                                    aria-haspopup="listbox"
                                >
                                    {family ? family : "Options"}
                                    <svg
                                        className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.293 8.293a1 1 0 011.414 0L10 10.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"
                                        />
                                    </svg>
                                    {dropdownOpen && (
                                        <div className="origin-top-left absolute left-0 right-0 top-full mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div
                                                className="py-1"
                                                role="menu"
                                                aria-orientation="vertical"
                                                aria-labelledby="options-menu"
                                            >
                                                {familyOptions.map((familyOpt) => (
                                                    <div key={familyOpt}>
                                                        <button
                                                            onClick={() => setFamily(familyOpt)}
                                                            className="w-full h-full text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                            role="menuitem"
                                                        >
                                                            {familyOpt}
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </button>
                            </div>
                        </div>

                    </div>
                    <div>
                        <button className="w-full mt-4 bg-indigo-800 text-slate-100 p-2 rounded-lg" disabled={loading}>
                            {loading ? <span>Loading</span> : <span>Select</span>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}