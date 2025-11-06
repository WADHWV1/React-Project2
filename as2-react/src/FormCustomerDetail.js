// Import dependencies
import { useState, useEffect } from 'react';

// Component
function FormCustomerDetail({ passDataToParent, sendCustomerDetails }) {
  // Customer type state
  const [type, setType] = useState({ customer: "checked", business: "" });

  // Update customer type and inform parent
  const updateCustomerType = (event) => {
    if (event.target.value === "customer") {
      passDataToParent(true); // Notify parent
      setType({ customer: "checked", business: "" });
    } else {
      passDataToParent(false);
      setType({ customer: "", business: "checked" });
    }
  };

  // Customer detail state
  const [customerDetails, setCustomerDetails] = useState({
    title: "Mr",
    firstname: "",
    lastname: "",
  });

  // Handle text input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCustomerDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // useEffect: pass customerDetails to parent when it changes
  useEffect(() => {
    sendCustomerDetails(customerDetails);
  }, [customerDetails]);

  // Component UI
  return (
    <>
      <h2>Customer Details</h2>

      {/* Customer type */}
      <div className="row">
        <fieldset className="border border-primary col-12 col-lg-11 ms-2 me-4">
          <legend className="col-11 float-none w-auto">Customer type *</legend>

          <div>
            <label className="col-12 col-md-12 col-lg-4">Customer</label>
            <input
              type="radio"
              name="customer-type"
              value="customer"
              checked={type.customer === "checked"}
              onChange={updateCustomerType}
            />
          </div>

          <div>
            <label className="col-12 col-md-12 col-lg-4">Business</label>
            <input
              type="radio"
              name="customer-type"
              value="business"
              checked={type.business === "checked"}
              onChange={updateCustomerType}
            />
          </div>
        </fieldset>
      </div>

      {/* Customer name/title */}
      <div className="row mt-2">
        <label className="col-12 col-md-12 col-lg-4">Title *</label>
        <select
          className="col-12 col-md-12 col-lg-7"
          name="title"
          value={customerDetails.title}
          onChange={handleChange}
          required
        >
          <option value="Mr">Mr</option>
          <option value="Mrs">Mrs</option>
          <option value="Ms">Ms</option>
          <option value="Miss">Miss</option>
          <option value="Dr">Dr</option>
        </select>
      </div>

      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">First Name *</label>
        <input
          className="col-12 col-md-12 col-lg-7"
          type="text"
          name="firstname"
          value={customerDetails.firstname}
          onChange={handleChange}
          required
        />
      </div>

      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">Last Name *</label>
        <input
          className="col-12 col-md-12 col-lg-7"
          type="text"
          name="lastname"
          value={customerDetails.lastname}
          onChange={handleChange}
          required
        />
      </div>

      {/* Other fields – not passed up */}
      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">Street *</label>
        <input className="col-12 col-md-12 col-lg-7" type="text" name="street" required />
      </div>

      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">Suburb</label>
        <input className="col-12 col-md-12 col-lg-7" type="text" name="suburb" />
      </div>

      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">City *</label>
        <input className="col-12 col-md-12 col-lg-7" type="text" name="city" required />
      </div>

      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">Post Code</label>
        <input className="col-12 col-md-12 col-lg-7" type="text" name="postcode" />
      </div>

      <div className="row mt-1">
        <label className="col-12 col-md-12 col-lg-4">Email *</label>
        <input className="col-12 col-md-12 col-lg-7" type="email" name="email" required />
      </div>
    </>
  );
}

export default FormCustomerDetail;
