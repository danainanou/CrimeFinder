import type { RefObject } from 'react'

interface searchProps {
    inputValue: RefObject<HTMLInputElement | null>
    onSubmit: (value: string) => void
}


export function SearchComponent({inputValue, onSubmit}: searchProps) {
    
    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const value = inputValue.current?.value.trim() ?? ''
        onSubmit(value)
    }
    
    
    return (
        <div className="search-form">
            <form onSubmit={handleSubmit} className="form-input">
                <input
                    type="search"
                    placeholder="Search for one or multiple comma separated postcodes"
                    ref={inputValue}
                />
                <button type="submit">Search</button>
            </form>
        </div>
    )
}