// Import dependencies
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FormCustomerDetail from './FormCustomerDetail';
import FormRepairDetail from './FormRepairDetail';
import FormCourtesyPhone from './FormCourtesyPhone';
import FormCost2 from './FormCost'; // Make sure this is the correct file
import FormButton from './FormButton'; // Ensure this file exists

function Home() {
    // -----------------------------
    // Shared States Between Children
    // -----------------------------

    // Courtesy Phone -> Cost
    const [sharedBond, setSharedBond] = useState(0);
    const updateSharedState = (value) => setSharedBond(value);

    // Repair Detail -> Cost (warranty)
    const [sharedWarranty, setSharedWarranty] = useState(false);
    const updateWarranty = (value) => setSharedWarranty(value);

    // Customer Type -> Cost
    const [sharedCustomerType, setSharedCustomerType] = useState(true);
    const updateCustomerType = (value) => setSharedCustomerType(value);

    // Customer Detail -> Home
    const [customerDetails, setCustomerDetails] = useState({
        title: "Mr",
        firstname: "",
        lastname: "",
    });

    // -----------------------------
    // Handle Form Submission
    // -----------------------------
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault(); // Prevent page reload

        try {
            const attachedData = {
                sharedBond,
                sharedCustomerType,
                customerDetails,
            };

            // Pass data to /invoice page
            navigate("/invoice", { state: { attachedData } });
        } catch (e) {
            alert('ERROR!!!');
            console.error(e);
        }
    };

    // -----------------------------
    // Component UI
    // -----------------------------
    return (
        <div className="container-fluid">
            <form className="row" style={{ minHeight: '60vh' }} onSubmit={onSubmit}>

                {/* Customer Details */}
                <div className="col-12 col-lg-4 p-4 m-0" style={{ minHeight: '30vh', backgroundColor: '#FCF3CF' }}>
                    <FormCustomerDetail
                        passDataToParent={updateCustomerType}
                        sendCustomerDetails={setCustomerDetails}
                    />
                </div>

                {/* Repair Details */}
                <div className="col-12 col-lg-4 p-4 m-0" style={{ minHeight: '30vh', backgroundColor: '#D5F5E3' }}>
                    <FormRepairDetail passDataToParent={updateWarranty} />
                </div>

                {/* Courtesy Phone & Cost */}
                <div className="col-12 col-lg-4 p-0 m-0">
                    {/* Courtesy Phone */}
                    <div className="p-4" style={{ minHeight: '30vh', backgroundColor: '#2874A6' }}>
                        <FormCourtesyPhone passDataToParent={updateSharedState} />
                    </div>

                    {/* Cost Summary */}
                    <div className="p-4" style={{ minHeight: '20vh', backgroundColor: '#EDBB99' }}>
                        <FormCost2
                            sharedPropBond={sharedBond}
                            sharedPropWarranty={sharedWarranty}
                            sharedPropCustomerType={sharedCustomerType}
                        />
                    </div>
                </div>

                {/* Button Area */}
                <div className="p-4 text-center" style={{ minHeight: '10vh', backgroundColor: '#EDBB99' }}>
                    <FormButton />
                </div>

            </form>
        </div>
    );
}

export default Home;
