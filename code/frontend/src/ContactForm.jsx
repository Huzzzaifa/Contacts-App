import { useState } from "react";
import './ContactForm.css';

const ContactForm = ({ existingContact = {}, updateCallback }) => {

    const [firstName, setFirstName] = useState(existingContact.firstName || "");
    const [lastName, setLastName] = useState(existingContact.lastName || "");
    const [email, setEmail] = useState(existingContact.email || "");

    const updating = Object.entries(existingContact).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault()
        
        const data = {
            firstName,
            lastName,
            email
        }
        const url = "http://127.0.0.1:5000/" + (updating ? `update_contact/${existingContact.id}` : "create_contact");
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            updateCallback()
        }
    }

    return (
        <div>

                <form onSubmit={onSubmit} className="form">
                    <div className="first-name">
                        <label htmlFor="firstName"><strong>First Name:</strong></label>
                        <input 
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => 
                                setFirstName(e.target.value)}>
                        </input>
                    </div>

                    <div className="last-name">
                        <label htmlFor="lastName"><strong>Last Name:</strong></label>
                        <input 
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => 
                                setLastName(e.target.value)}>
                        </input>
                    </div>

                    <div className="email">
                        <label htmlFor="email"><strong>Email:</strong></label>
                        <input 
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => 
                                setEmail(e.target.value)}>
                        </input>
                    </div>
                    <button type="submit" className="submit-btn">{updating ? "Update Contact" : "Create Contact"}</button>
                </form>
        </div>
    )
}

export default ContactForm;