import React, { useState } from "react";

function FormRepairDetail({ passDataToParent }) {
    const [warrantyDisabled, setWarrantyDisabled] = useState(false);
    const [purchaseDate, setPurchaseDate] = useState("");
    const [repairDate, setRepairDate] = useState("");

    const handlePurchaseDateChange = (e) => {
        const value = e.target.value;
        setPurchaseDate(value);

        // Date logic
        const purchase = new Date(value);
        const today = new Date();
        const diffMonths =
            (today.getFullYear() - purchase.getFullYear()) * 12 +
            (today.getMonth() - purchase.getMonth());

        // Disable warranty if > 24 months
        if (diffMonths > 24) {
            setWarrantyDisabled(true);
            passDataToParent(false);
        } else {
            setWarrantyDisabled(false);
        }

        // Prevent future date
        if (purchase > today) {
            alert("Purchase date cannot be in the future.");
            e.target.value = "";
            setPurchaseDate("");
        }
    };

    const handleRepairDateChange = (e) => {
        const value = e.target.value;
        setRepairDate(value);

        if (purchaseDate) {
            const purchase = new Date(purchaseDate);
            const repair = new Date(value);

            if (repair <= purchase) {
                alert("Repair date must be after purchase date.");
                e.target.value = "";
                setRepairDate("");
            }
        }
    };

    const handleWarrantyChange = (e) => {
        passDataToParent(e.target.checked);
    };

    const validateIMEI = (e) => {
        const value = e.target.value;
        if (value.length !== 15) {
            alert("IMEI must be exactly 15 digits.");
            e.target.value = "";
        }
    };

    return (
        <>
            <h2>Repair Details</h2>

            {/* Purchase Date */}
            <div className="row mt-1">
                <label className="col-12 col-lg-4">Purchase Date *</label>
                <input
                    className="col-12 col-lg-7"
                    type="date"
                    id="purchaseDate"
                    required
                    max={new Date().toISOString().split("T")[0]}
                    onChange={handlePurchaseDateChange}
                />
            </div>

            {/* Repair Date */}
            <div className="row mt-1">
                <label className="col-12 col-lg-4">Repair Date *</label>
                <input
                    className="col-12 col-lg-7"
                    type="date"
                    id="repairDate"
                    required
                    onChange={handleRepairDateChange}
                />
            </div>

            {/* Warranty */}
            <div className="row">
                <fieldset className="border border-primary col-12 col-lg-11 ms-1 me-4 mb-3">
                    <legend className="col-11 float-none w-auto">Under Warranty</legend>
                    <div>
                        <label className="col-12 col-lg-4">Warranty</label>
                        <input
                            type="checkbox"
                            id="warranty"
                            disabled={warrantyDisabled}
                            onChange={handleWarrantyChange}
                        />
                    </div>
                </fieldset>
            </div>

            {/* IMEI */}
            <div className="row mt-1">
                <label className="col-12 col-lg-4">IMEI *</label>
                <input
                    className="col-12 col-lg-7"
                    type="number"
                    id="imei"
                    required
                    onBlur={validateIMEI}
                    inputMode="numeric"
                />
            </div>

            {/* Make */}
            <div className="row mt-2">
                <label className="col-12 col-lg-4">Make *</label>
                <select className="col-12 col-lg-7" required>
                    <option value="">Select Make</option>
                    <option value="apple">Apple</option>
                    <option value="lg">LG</option>
                    <option value="motorola">Motorola</option>
                    <option value="nokia">Nokia</option>
                    <option value="samsung">Samsung</option>
                    <option value="sony">Sony</option>
                    <option value="other">Other</option>
                </select>
            </div>

            {/* Model Number */}
            <div className="row mt-1">
                <label className="col-12 col-lg-4">Model Number *</label>
                <input
                    className="col-12 col-lg-7"
                    type="text"
                    id="modelNumber"
                    required
                />
            </div>

            {/* Fault Category */}
            <div className="row mt-2">
                <label className="col-12 col-lg-4">Fault Category *</label>
                <select className="col-12 col-lg-7" required>
                    <option value="battery">Battery</option>
                    <option value="charging">Charging</option>
                    <option value="screen">Screen</option>
                    <option value="sd-storage">SD Storage</option>
                    <option value="software">Software</option>
                    <option value="other">Other</option>
                </select>
            </div>

            {/* Description */}
            <div className="row mt-1">
                <label className="col-12 col-lg-4">Description *</label>
                <textarea
                    className="col-12 col-lg-7"
                    id="description"
                    name="description"
                    rows="7"
                    required
                ></textarea>
            </div>
        </>
    );
}

// 

export default FormRepairDetail;
