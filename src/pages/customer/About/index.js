import { useState,useEffect } from "react";
import allContact from "../../../api/About/about";
function About() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            const data = await allContact();
            setContacts(data);
        };

        fetchContacts();
    }, []);
    return (
        <footer className="bottom-0 left-0 z-20 w-full flex p-4 border-t shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
            <span></span>
            <ul>
                {contacts &&
                    contacts.map((contact) => {
                        return(<li className="text-sm text-white sm:text-left pb-1 dark:text-gray-400" key={contact.contact_id}>
                            {contact.type}: {contact.content}
                        </li>)
                    })}
            </ul>
        </footer>
    );
}

export default About;