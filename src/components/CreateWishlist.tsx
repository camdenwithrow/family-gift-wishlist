import React, { useState, ChangeEvent, FormEvent } from 'react'
import { supabase } from '../lib/supabase'
import giftboxLogo from '../assets/giftbox.svg'
import trashcan from '../assets/trashcan.svg'

interface WishlistItem {
    id: number;
    name: string;
    url?: string;
    price?: number;
    color?: string;
    size?: string;
}

export default function CreateWishList() {
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
    const [enabledInputs, setEnabledInputs] = useState<string[]>([])
    const [newItemName, setNewItemName] = useState('');
    const [newItemUrl, setNewItemUrl] = useState(undefined);
    const [newItemPrice, setNewItemPrice] = useState(undefined);
    const [newItemColor, setNewItemColor] = useState(undefined);
    const [newItemSize, setNewItemSize] = useState(undefined);

    const orderedOptionsalInputs = ['Url', 'Price', 'Color', 'Size']

    const opts: { [key: string]: any } = {
        "url": { get: newItemUrl, set: setNewItemUrl },
        "price": { get: newItemPrice, set: setNewItemPrice },
        "color": { get: newItemColor, set: setNewItemColor },
        "size": { get: newItemSize, set: setNewItemSize }
    }

    const sortInputs = (inputs: string[]) => {
        return orderedOptionsalInputs.filter((fruit) => inputs.includes(fruit));
    }

    const getDisabledInputs = () => {
        const disabledInputs = orderedOptionsalInputs.filter((el) => !enabledInputs.includes(el));
        return sortInputs(disabledInputs)
    }

    const handleAddInput = (e) => {
        const inputToAdd = e.target.textContent
        const newEnabled = sortInputs([...enabledInputs, inputToAdd])
        setEnabledInputs(newEnabled)
    }

    const handleRemoveInput = (input: string) => {
        setEnabledInputs(sortInputs(enabledInputs.filter((el) => el !== input)))
    }

    const handleNewItemOpts = (e: any, input: string) => {
        const setFunc = opts[input.toLowerCase()].set
        setFunc(e.target.value)
    }

    const handleAddItem = (e: FormEvent) => {
        e.preventDefault();
        if (newItemName.trim() !== '') {
            const newItem: WishlistItem = {
                id: Date.now(),
                name: newItemName,
                url: formatLink(newItemUrl),
                price: newItemPrice,
                color: newItemColor,
                size: newItemSize
            };
            setWishlistItems([...wishlistItems, newItem]);
            setNewItemName('');
            setNewItemUrl(undefined)
            setNewItemPrice(undefined)
            setNewItemColor(undefined)
            setNewItemSize(undefined)
            setEnabledInputs([])
        }
    };

    const handleRemoveItem = (id: number) => {
        const updatedWishlist = wishlistItems.filter((item) => item.id !== id);
        setWishlistItems(updatedWishlist);
    };

    function formatLink(inputLink: string | undefined) {
        if (!inputLink) return undefined

        inputLink = inputLink.trim();

        // Check if the link already starts with "http://" or "https://"
        if (!/^https?:\/\//i.test(inputLink)) {
            // If not, add "http://" to the beginning
            inputLink = 'http://' + inputLink;
        }

        return inputLink;
    }


    return (
        <div className="mt-24 flex justify-center items-center">
            <div className='w-72 sm:w-96'>
                <div className='w-full flex justify-center mb-12'>
                    <img src={giftboxLogo} className="w-16 h-15" alt="Gift Box logo" />
                </div>
                <h1 className="w-full mb-6 text-center text-xl">Add Wishlist Items</h1>
                <form onSubmit={handleAddItem}>
                    <p className="font-bold text-slate-400">Name</p>
                    <input
                        className='w-full mt-0.5 border-2 p-1 rounded-lg border-indigo-400'
                        type="text"
                        placeholder="Add an item to your wishlist"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                    />
                    {enabledInputs.map((input) => (
                        <div key={input} className='mt-2'>
                            <p className="font-bold text-slate-400">{input}</p>
                            <div className='flex items-center'>
                                {input.toLowerCase() === 'price' && <span className='pr-1.5 text-xl text-slate-600'>$</span>}
                                <input
                                    key={input}
                                    className='w-full mt-0.5 border-2 p-1 rounded-lg border-indigo-400'
                                    type="text"
                                    value={opts[input.toLowerCase()].get}
                                    onChange={(e) => handleNewItemOpts(e, input)}
                                />
                                <button onClick={() => handleRemoveInput(input)} className='flex justify-center items-center mx-2 p-1'>
                                    <img src={trashcan} className="w-6 h-6" alt="remove button" />
                                </button>
                            </div>

                        </div>
                    ))}
                    <div className='w-full mt-4 flex justify-between'>
                        {getDisabledInputs().map((input) => (
                            <button key={input} onClick={handleAddInput} className='mt-2 mx-0.5 px-1.5 py-1 w-full border-2 border-indigo-800 rounded-lg text-indigo-800 hover:bg-indigo-100 active:bg-indigo-800 active:text-slate-200'>{input}</button>
                        ))}
                    </div>
                    <button className="w-full mt-4 bg-indigo-800 text-slate-100 p-2 rounded-lg" type="submit">Add</button>
                </form>
                <ul className='mt-8 mb-16'>
                    {wishlistItems.map((item) => (
                        <li key={item.id} className='w-full mb-2 p-2 bg-indigo-100/50 rounded-lg'>
                            <div className='flex justify-between items-center '>
                                <div className='w-full flex justify-between items-center'>
                                    {item.url ?
                                        <a href={item.url} target="_blank" className='text-indigo-800 underline'>{item.name}</a>
                                        : <p>{item.name}</p>}
                                    {item.price && <p>${(Math.round(item.price * 100) / 100).toFixed(2)}</p>}
                                </div>
                                <button onClick={() => handleRemoveItem(item.id)} className='flex justify-center items-center mx-2 p-1'>
                                    <img src={trashcan} className="w-6 h-6" alt="remove button" />
                                </button>
                            </div>
                            <div className='flex'>
                                {item.size && <p className='text-xs text-slate-500 mr-4 font-bold capitalize'>size: {item.size}</p>}
                                {item.color && <p className='text-xs text-slate-500 font-bold capitalize'>color: {item.color}</p>}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div >
    )
}