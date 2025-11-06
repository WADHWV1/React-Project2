import React from 'react';
import { useLocation } from "react-router-dom";

function Invoice() {
    const location = useLocation();

    // Get data from navigation state
    const receivedData = location.state?.attachedData;

    // Handle missing data
    if (!receivedData) {
        return <h2>ERROR! No data was passed to the Invoice page.</h2>;
    }

    // UI Rendering
    return (
        <div style={{ minHeight: '60vh' }}>
            {/* Header */}
            <div className='bg-secondary p-3 row text-white'>
                <h1 className='col-6'>Repair Booking</h1>
                <p className='col-6 text-end'>
                    Amount Due: <br />
                    <span style={{ fontSize: '23px' }}>XYZ</span>
                </p>
            </div>

            {/* Customer Details */}
            <div className='p-3 row'>
                <div className='col-6'>
                    <h4>Customer Details:</h4>
                    <p>Customer type: {receivedData.sharedCustomerType ? "Customer" : "Business"}</p>
                    <p>Title: {receivedData.customerDetails.title}</p>
                    <p>First Name: {receivedData.customerDetails.firstname}</p>
                    <p>Last Name: {receivedData.customerDetails.lastname}</p>
                </div>
                <div className='col-6'>
                    <h4>Repair Job:</h4>
                    <p>Job number: xxxx</p>
                    <p>Invoice Date: {new Date().toLocaleDateString()}</p>
                </div>
            </div>

            {/* Repair Details */}
            <hr />
            <div className='p-3'>
                <h4>Repair Details:</h4>
                {/* TODO: Add repair details if needed */}
            </div>

            {/* Courtesy Loan Device Details */}
            <div className='p-3'>
                <h4>Courtesy Loan Device Details:</h4>
                <div className="mt-2 ms-3 me-3 bg-white">
                    <table className="table table-bordered" style={{ width: '40%' }}>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* You would map actual courtesy items here */}
                            <tr>
                                <td>Courtesy Bond</td>
                                <td>${receivedData.sharedBond.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Totals */}
            <div className='p-3 row'>
                <div className='col-6'></div>
                <div className='col-6'>
                    <h4>TOTALS:</h4>
                    <p>Bond: ${receivedData.sharedBond.toFixed(2)}</p>
                </div>
            </div>

            {/* Footer */}
            <hr />
            <div className='p-3 row'>
                <div className='col-6'>
                    <p className='fs-5'><strong>PHONE FIX SERVICES</strong></p>
                    <p>
                        Address: 501 Gloucester Street <br />
                        Taradale, Napier 4112
                    </p>
                </div>
                <div className='col-6'>
                    <p className='fs-5'><strong>Contact Us:</strong></p>
                    <p>Phone: 06 974 8000</p>
                </div>
            </div>
        </div>
    );
}

export default Invoice;
