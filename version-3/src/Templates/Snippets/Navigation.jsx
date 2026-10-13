import { useState } from "react";

function Navigation() {
    // 1. State koji prati da li je dropdown otvoren (false = zatvoren, true = otvoren)
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-800 w-full z-20 top-0 start-0 border-default text-white">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-7" alt="Flowbite Logo" />
                    <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">Flowbite</span>
                </a>
                
                <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-neutral-primary">
                        <li>
                            <a href="#" className="block py-2 px-3 text-white bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0" aria-current="page">Home</a>
                        </li>
                        <li className="relative">
                            {/* 2. Na klik menjamo stanje (otvori/zatvori) */}
                            <button 
                                onClick={() => setIsOpen(!isOpen)} 
                                id="dropdownNavbarButton" 
                                className="flex items-center justify-between w-full py-2 px-3 rounded font-medium text-heading md:w-auto hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 cursor-pointer"
                            >
                                Dropdown
                                <svg className="w-4 h-4 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" /></svg>
                            </button>

                            {/* 3. Dinamički dodajemo ili sklanjamo klasu "hidden" na osnovu "isOpen" state-a */}
                            <div className={`absolute left-0 mt-2 z-10 bg-white border border-default-medium rounded-base shadow-lg w-44 ${isOpen ? "" : "hidden"}`}>
                                <ul className="p-2 text-sm text-body font-medium" aria-labelledby="dropdownNavbarButton">
                                    <li>
                                        <a href="#" className="inline-flex items-center w-full p-2 hover:bg-gray-100 rounded">Dashboard</a>
                                    </li>
                                    <li>
                                        <a href="#" className="inline-flex items-center w-full p-2 hover:bg-gray-100 rounded">Settings</a>
                                    </li>
                                    <li>
                                        <a href="#" className="inline-flex items-center w-full p-2 hover:bg-gray-100 rounded">Earnings</a>
                                    </li>
                                    <li>
                                        <a href="#" className="inline-flex items-center w-full p-2 hover:bg-gray-100 rounded">Sign out</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0">Services</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0">Pricing</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navigation