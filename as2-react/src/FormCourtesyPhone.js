// Import all dependencies
import { useState } from 'react';

// Function Component
function FormCourtesyPhone({ passDataToParent }) {
    // Courtesy items list
    const courtesyList = [
        { id: 0, type: 'none', name: 'none', bond: 0 },
        { id: 1, type: 'phone', name: 'iPhone', bond: 275 },
        { id: 2, type: 'phone', name: 'Samsung Galaxy', bond: 100 },
        { id: 3, type: 'phone', name: 'Nokia', bond: 100 },
        { id: 4, type: 'charger', name: 'iPhone Charger', bond: 30 },
        { id: 5, type: 'charger', name: 'Samsung Charger', bond: 30 },
        { id: 6, type: 'charger', name: 'Nokia Charger', bond: 30 },
    ];

    // State
    const [phoneBorrow, setPhoneBorrow] = useState(0);
    const [chargerBorrow, setChargerBorrow] = useState(0);

    // Get bond by item id
    const getBond = (id) => courtesyList.find(item => item.id === id)?.bond || 0;

    // Get item name by id
    const getItemName = (id) => courtesyList.find(item => item.id === id)?.name || '';

    // Handle phone change
    const addPhone = (selectedValue) => {
        const phoneId = selectedValue === 'none' ? 0 : Number(selectedValue);
        setPhoneBorrow(phoneId);

        const totalBond = getBond(phoneId) + getBond(chargerBorrow);
        passDataToParent(totalBond);
    };

    // Handle charger change
    const addCharger = (selectedValue) => {
        const chargerId = selectedValue === 'none' ? 0 : Number(selectedValue);
        setChargerBorrow(chargerId);

        const totalBond = getBond(phoneBorrow) + getBond(chargerId);
        passDataToParent(totalBond);
    };

    // Component rendering
    return (
        <>
            <h2>Courtesy Phone</h2>

            {/* Phone Selection */}
            <h4>Choose a phone:</h4>
            <div className="row mt-2 ms-3">
                <label className="col-12 col-md-12 col-lg-4">Item Type</label>
                <select
                    className="col-12 col-md-12 col-lg-7"
                    value={phoneBorrow}
                    onChange={(e) => addPhone(e.target.value)}
                >
                    <option value="none">None</option>
                    <option value="1">iPhone</option>
                    <option value="2">Samsung Galaxy</option>
                    <option value="3">Nokia</option>
                </select>
            </div>

            {/* Charger Selection */}
            <h4>Choose a charger:</h4>
            <div className="row mt-2 ms-3">
                <label className="col-12 col-md-12 col-lg-4">Item Type</label>
                <select
                    className="col-12 col-md-12 col-lg-7"
                    value={chargerBorrow}
                    onChange={(e) => addCharger(e.target.value)}
                >
                    <option value="none">None</option>
                    <option value="4">iPhone Charger</option>
                    <option value="5">Samsung Charger</option>
                    <option value="6">Nokia Charger</option>
                </select>
            </div>

            {/* Display selected items */}
            <div className="row mt-2 ms-3 me-3 bg-white">
                <table className="table table-bordered" id="borrowItems">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {phoneBorrow !== 0 && (
                            <tr>
                                <td>{getItemName(phoneBorrow)}</td>
                                <td>{getBond(phoneBorrow)}</td>
                            </tr>
                        )}
                        {chargerBorrow !== 0 && (
                            <tr>
                                <td>{getItemName(chargerBorrow)}</td>
                                <td>{getBond(chargerBorrow)}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default FormCourtesyPhone;
