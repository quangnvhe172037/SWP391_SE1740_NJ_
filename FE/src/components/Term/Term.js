import React from 'react';
import { Link } from 'react-router-dom';
import BASE_URL from '../../api/baseapi';

const Term = () => {
    return (
        <div className="container">
            <h2 style={{fontWeight:"bold"}}>Terms and Conditions</h2>

            <p>Welcome to Our Website!</p>

            <p>These terms and conditions outline the rules and regulations for the use of Our Company's Website, located at www.example.com.</p>

            <p>By accessing this website, we assume you accept these terms and conditions. Do not continue to use Our Website if you do not agree to take all of the terms and conditions stated on this page.</p>

            <p>The following terminology applies to these Terms and Conditions, Privacy Statement, and Disclaimer Notice and all Agreements: "Client", "You", and "Your" refers to you, the person log on this website and compliant to the Company's terms and conditions. "The Company", "Ourselves", "We", "Our", and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance, and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of the provision of the Company's stated services, in accordance with and subject to, prevailing law of Netherlands.</p>

            <h3 style={{fontWeight:"bold"}}>Cookies</h3>

            <p>We employ the use of cookies. By accessing Our Website, you agreed to use cookies in agreement with the Company Name's Privacy Policy.</p>

            <p>Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.</p>

            <h3 style={{fontWeight:"bold"}}>License</h3>

            <p>Unless otherwise stated, Company Name and/or its licensors own the intellectual property rights for all material on Our Website. All intellectual property rights are reserved. You may access this from Our Website for your use subjected to restrictions set in these terms and conditions.</p>

            <p style={{fontWeight:"bold"}}>You must not:</p>
            <ul>
                <li>+) Republish material from Our Website</li>
                <li>+) Sell, rent, or sub-license material from Our Website</li>
                <li>+) Reproduce, duplicate or copy material from Our Website</li>
                <li>+) Redistribute content from Our Website</li>
            </ul>

            <p>This Agreement shall begin on the date hereof.</p>

            <p>Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Company Name does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Company Name, its agents, and/or affiliates. Comments reflect the views and opinions of the person who posts their views and opinions. To the extent permitted by applicable laws, Company Name shall not be liable for the Comments or for any liability, damages, or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.</p>
            <Link to="/" className="btn" style={{border: "1px solid black", margin:"5px"}}>Back to Home</Link>
        </div>
    );
};

export default Term;
