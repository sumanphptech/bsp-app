import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function RegistrationForm({ onDataSubmit }) {

    const [activeTab, setActiveTab] = useState('tab1');
    const [errors, setErrors] = useState({});

    const nextTab = () => {
        if (activeTab === 'tab1') {
            setActiveTab('tab2');
        } else if (activeTab === 'tab2') {
            setActiveTab('tab3');
        } else if (activeTab === 'tab3') {
            setActiveTab('tab4');
        }
    };

    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        nationality: '',
        contactNo: '',
        email: '',
        aadharNo: '',
        residentialAddress: '',
        stateName: '',
        city: '',
        pin: '',
        highestQualification: '',
        yearCompletion: '',
        schoolName: '',
        schoolCity: '',
        schoolBoard: '',
        employmentStatus: '',
        employeeOrganization: '',
        employeeRole: '',
        parentName: '',
        parentRelation: '',
        parentContactNo: '',
        parentEmail: '',
        program: '',
        specialization: '',
        studyMode: '',
        tenthCertificate: '',
        twelthCertificate: '',        
        twelthTc: '',
        bonafideCertificate: '',
        migrationCertificate: '',
        degreeProvisional: '',
        degreeConsolidated: '',
        degreeMigration: '',
        degreeTc: '',
        casteCertificate: '',
        aadharCopy: '',
        photoCopy: '',
        referral: '',
        referralName: '',
        referralContactNo: '',
        referralProgram: '',
        referralBatch: '',
    });

    const isOnlineDisabled = formData.program === '3' && formData.specialization === '2';
    
    useEffect(() => {
        if (isOnlineDisabled && formData.studyMode !== '2') {
            setFormData({
                ...formData,
                studyMode: '2',
            });
        }
    }, [isOnlineDisabled, formData.studyMode]);


    const handleChange = (e) => {
        const { name, value } = e.target;
    
        // Update formData for regular text inputs, selects, etc.
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    
        // Validate regular fields
        validateField(name, value);
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
    
        // Update formData with the selected file
        setFormData(prevData => ({
            ...prevData,
            [name]: files[0]  // Storing only the first selected file
        }));
    
    };
    
    
    // Form field validation logic
    const validateField = (name, value) => {
        let formErrors = { ...errors };
        switch (name) {
            case 'name':
                if (!value) {
                    formErrors.name = 'Name is required';
                } else {
                    delete formErrors.name;
                }
                break;
            case 'dob':
                if (!value) {
                    formErrors.dob = 'Date of Birth is required';
                } else {
                    delete formErrors.dob;
                }
                break;
            case 'nationality':
                if (!value) {
                    formErrors.nationality = 'Nationality is required';
                } else {
                    delete formErrors.nationality;
                }
                break;
            case 'contactNo':
                if (!value) {
                    formErrors.contactNo = 'Contact No. is required';
                } else if (!/^\d{10}$/.test(value)) {
                    formErrors.contactNo = 'Contact No. should be 10 digits';
                } else {
                    delete formErrors.contactNo;
                }
                break;
            case 'email':
                if (!value) {
                    formErrors.email = 'Email ID is required';
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    formErrors.email = 'Email ID is invalid';
                } else {
                    delete formErrors.email;
                }
                break;
            case 'aadharNo':
                if (!value) {
                    formErrors.aadharNo = 'Aadhar No. is required';
                } else if (!/^\d{12}$/.test(value)) {
                    formErrors.aadharNo = 'Aadhar No. should be 12 digits';
                } else {
                    delete formErrors.aadharNo;
                }
                break;
            case 'residentialAddress':
                if (!value) {
                    formErrors.residentialAddress = 'Address is required';
                } else {
                    delete formErrors.residentialAddress;
                }
                break;
            case 'stateName':
                if (!value) {
                    formErrors.stateName = 'State is required';
                } else {
                    delete formErrors.stateName;
                }
                break;
            case 'city':
                if (!value) {
                    formErrors.city = 'City is required';
                } else {
                    delete formErrors.city;
                }
                break;
            case 'pin':
                if (!value) {
                    formErrors.pin = 'PIN is required';
                } else if (!/^\d{6}$/.test(value)) {
                    formErrors.pin = 'PIN should be 6 digits';
                } else {
                    delete formErrors.pin;
                }
                break;

            case 'program':
                if (!value || value === '0') {
                    formErrors.program = 'Please select a program';
                } else {
                    delete formErrors.program;
                }
                break;
            case 'specialization':
                if (!value || value === '0') {
                    formErrors.specialization = 'Please select a specialization';
                } else {
                    delete formErrors.specialization;
                }
                break;
            case 'referral':
                if (!value) {
                    formErrors.referral = 'Referral is required';
                } else {
                    delete formErrors.referral;
                }
                break;           
            default:
                break;
        }

        setErrors(formErrors);
    };


     const validateForm = () => {

        let formErrors = {};
        let isValid = true;

        const requiredFields = ['name', 'dob', 'nationality', 'contactNo', 'email', 'aadharNo', 'residentialAddress', 'stateName', 'city', 'pin', 'program', 'specialization', 'referral'];


        requiredFields.forEach((key) => {
            if (!formData[key]) {
                formErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
                isValid = false;
            }
        });
        
       

        setErrors(formErrors);
        return isValid;
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();

            // Debugging form data and errors before validation
    console.log('Form Data on Submit:', formData);
    console.log('Current Errors:', errors);

    
        // Validate the full form on submission
        if (!validateForm()) {
            toast.error('Please fill in all required fields correctly.', {
                position: 'top-right',
                autoClose: 5000,
            });
            return;
        }
    
        const apiUrl = 'http://127.0.0.1:8000/api/saveStudent';
    
    
  
        try {
            const response = await axios.post(apiUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                },
            });
    
            const message = response.data.message || 'Form submitted successfully!';
    
            // Notify user with the message from the API
            toast.success(message, {
                position: 'top-right',
                autoClose: 5000,
            });

            // Reset form data after submission
            setFormData({
                name: '',
                dob: '',
                nationality: '',
                contactNo: '',
                email: '',
                aadharNo: '',
                residentialAddress: '',
                stateName: '',
                city: '',
                pin: '',
                highestQualification: '',
                yearCompletion: '',
                schoolName: '',
                schoolCity: '',
                schoolBoard: '',
                employmentStatus: '',
                employeeOrganization: '',
                employeeRole: '',
                parentName: '',
                parentRelation: '',
                parentContactNo: '',
                parentEmail: '',
                program: '',
                specialization: '',
                studyMode: '',
                tenthCertificate: '',
                twelthCertificate: '',        
                twelthTc: '',
                bonafideCertificate: '',
                migrationCertificate: '',
                degreeProvisional: '',
                degreeConsolidated: '',
                degreeMigration: '',
                degreeTc: '',
                casteCertificate: '',
                aadharCopy: '',
                photoCopy: '',                
                referral: '',
                referralName: '',
                referralContactNo: '',
                referralProgram: '',
                referralBatch: '',
            });
    
    
           
            onDataSubmit(); 
    
        } catch (error) {
            console.error('Error:', error);
    
            // Notify user about the error
            toast.error('Data not saved!', {
                position: 'top-right',
                autoClose: 5000,
            });
        }
    };
    

    return (
        <div className="container">
            <h6 className="text-start mb-3 mt-3">Registration Form 12</h6>
            <div className="row">
                <div className="col-sm-8">
                    <form onSubmit={handleSubmit}>

                        <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} id="form-tabs">
                            <Tab eventKey="tab1" title="Tab 1">


                                <div className="form-group row mb-3 mt-3">
                                    <label htmlFor="name" className="col-sm-2 col-form-label text-start">Name</label>
                                    <div className="col-sm-10">
                                        <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} id="name" name="name" value={formData.name}
                                            onChange={handleChange} />
                                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                    </div>
                                </div>
                                <div className="form-group row mb-3">
                                    <label htmlFor="dob" className="col-sm-2 col-form-label text-start">Date of Birth</label>
                                    <div className="col-sm-10">
                                        <input type="date" className={`form-control ${errors.dob ? 'is-invalid' : ''}`} id="dob" name="dob" value={formData.dob}
                                            onChange={handleChange} />
                                        {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}

                                    </div>
                                </div>

                                <div className="form-group row mb-3">
                                    <label htmlFor="nationality" className="col-sm-2 col-form-label text-start">Nationality</label>
                                    <div className="col-sm-10">
                                        <input type="text" className={`form-control ${errors.dob ? 'is-invalid' : ''}`} id="nationality" name="nationality" value={formData.nationality}
                                            onChange={handleChange} />
                                        {errors.nationality && <div className="invalid-feedback">{errors.nationality}</div>}
                                    </div>
                                </div>

                                <div className="form-group row mb-3">
                                    <label htmlFor="contactNo" className="col-sm-2 col-form-label text-start">Contact No.</label>
                                    <div className="col-sm-10">
                                        <input type="text" className={`form-control ${errors.contactNo ? 'is-invalid' : ''}`} id="contactNo" name="contactNo" value={formData.contactNo}
                                            onChange={handleChange} />
                                        {errors.contactNo && <div className="invalid-feedback">{errors.contactNo}</div>}
                                    </div>
                                </div>

                                <div className="form-group row mb-3">
                                    <label htmlFor="email" className="col-sm-2 col-form-label text-start">Email ID</label>
                                    <div className="col-sm-10">
                                        <input type="text" className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="email" name="email" value={formData.email} onChange={handleChange} />
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>
                                </div>

                                <div className="form-group row mb-3">
                                    <label htmlFor="aadharNo" className="col-sm-2 col-form-label text-start">Aadhar No. / SSID</label>
                                    <div className="col-sm-10">
                                        <input type="text" className={`form-control ${errors.aadharNo ? 'is-invalid' : ''}`} id="aadharNo" name="aadharNo" value={formData.aadharNo}
                                            onChange={handleChange} />
                                        {errors.aadharNo && <div className="invalid-feedback">{errors.aadharNo}</div>}
                                    </div>
                                </div>

                                <div className="form-group row mb-3">
                                    <label htmlFor="residentialAddress" className="col-sm-2 col-form-label text-start">Residential Address</label>
                                    <div className="col-sm-10">
                                        <input type="text" className={`form-control ${errors.residentialAddress ? 'is-invalid' : ''}`} id="residentialAddress" name="residentialAddress" value={formData.residentialAddress} onChange={handleChange} />
                                        {errors.residentialAddress && <div className="invalid-feedback">{errors.residentialAddress}</div>}
                                    </div>
                                </div>


                                <div className="form-group row mb-3">

                                    <label htmlFor="stateName" className="col-sm-2 col-form-label text-start">State</label>
                                    <div className="col-sm-10">
                                        <input type="text" className={`form-control ${errors.stateName ? 'is-invalid' : ''}`} id="stateName" name="stateName" value={formData.stateName} onChange={handleChange} />
                                        {errors.stateName && <div className="invalid-feedback">{errors.stateName}</div>}
                                    </div>

                                </div>

                                <div className="form-group row mb-3">

                                    <label htmlFor="city" className="col-sm-2 col-form-label text-start">City</label>
                                    <div className="col-sm-10">
                                        <input type="text" className={`form-control ${errors.city ? 'is-invalid' : ''}`} id="city" name="city" value={formData.city} onChange={handleChange} />
                                        {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                                    </div>

                                </div>

                                <div className="form-group row mb-3">

                                    <label htmlFor="pin" className="col-sm-2 col-form-label text-start">PIN</label>
                                    <div className="col-sm-10">
                                        <input type="text" className={`form-control ${errors.pin ? 'is-invalid' : ''}`} id="pin" name="pin" value={formData.pin} onChange={handleChange} />
                                        {errors.pin && <div className="invalid-feedback">{errors.pin}</div>}
                                    </div>

                                </div>


                                <h6 className='text-start'>Educational/Occupational Background</h6>

                                <div className="form-group row mb-3">
                                    <label htmlFor="highestQualification" name="highestQualification" className="col-sm-2 col-form-label text-start">
                                        Your Highest Qualification:</label>
                                    <div className="col-sm-10">
                                        <select className="form-control" id="highestQualification" name="highestQualification"
                                            value={formData.highestQualification} onChange={handleChange}>
                                            <option value="1">10th Pass</option>
                                            <option value="2">12th Pass</option>
                                            <option value="3">Under Graduate</option>
                                            <option value="4">Post Graduate</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group row mb-3">

                                    <label htmlFor="yearCompletion" className="col-sm-2 col-form-label text-start">Year of Completion</label>
                                    <div className="col-sm-10">
                                        <input type="number" min="1900" max="2024" className="form-control" id="yearCompletion" name="yearCompletion" value={formData.yearCompletion} onChange={handleChange} />

                                    </div>

                                </div>


                                <div className="form-group row mb-3">

                                    <label htmlFor="schoolName" className="col-sm-2 col-form-label text-start">Name of School/College</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="schoolName" name="schoolName" value={formData.schoolName} onChange={handleChange} />
                                    </div>

                                </div>

                                <div className="form-group row mb-3">

                                    <label htmlFor="schoolCity" className="col-sm-2 col-form-label text-start">City</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="schoolCity" name="schoolCity" value={formData.schoolCity} onChange={handleChange} />
                                    </div>

                                </div>


                                <div className="form-group row mb-3">

                                    <label htmlFor="schoolBoard" className="col-sm-2 col-form-label text-start">Board</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="schoolBoard" name="schoolBoard" value={formData.schoolBoard} onChange={handleChange} />
                                    </div>

                                </div>

                                <div className="form-group row mb-3">
                                    <label htmlFor="employmentStatus" className="col-sm-2 col-form-label text-start">
                                        Employment Status:</label>
                                    <div className="col-sm-10">
                                        <select className="form-control" id="employmentStatus" name="employmentStatus"
                                            value={formData.employmentStatus} onChange={handleChange}>
                                            <option value="1">Unemployed</option>
                                            <option value="2">Employed</option>
                                        </select>
                                    </div>
                                </div>

                                {formData.employmentStatus === "2" && (
                                    <>



                                        <div className="form-group row mb-3">

                                            <label htmlFor="employeeOrganization" className="col-sm-2 col-form-label text-start">Name of Organization</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" id="employeeOrganization" name="employeeOrganization" value={formData.employeeOrganization} onChange={handleChange} />
                                            </div>

                                        </div>


                                        <div className="form-group row mb-3">

                                            <label htmlFor="employeeRole" className="col-sm-2 col-form-label text-start">Designation/Role</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" id="employeeRole" name="employeeRole" value={formData.employeeRole} onChange={handleChange} />
                                            </div>

                                        </div>
                                    </>
                                )}




                                <Button variant="primary" onClick={nextTab}>Next</Button>





                            </Tab>

                            <Tab eventKey="tab2" title="Tab 2">

                                <h6 className='text-start mt-3'>Parent's/Gaurdian's Details</h6>

                                <div className="form-group row mb-3">

                                    <label htmlFor="parentName" className="col-sm-2 col-form-label text-start">Name</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="parentName" name="parentName" value={formData.parentName} onChange={handleChange} />
                                    </div>

                                </div>


                                <div className="form-group row mb-3">

                                    <label htmlFor="parentRelation" className="col-sm-2 col-form-label text-start">Relation to the student</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="parentRelation" name="parentRelation" value={formData.parentRelation} onChange={handleChange} />
                                    </div>

                                </div>


                                <div className="form-group row mb-3">

                                    <label htmlFor="parentContactNo" className="col-sm-2 col-form-label text-start">Contact No.</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="parentContactNo" name="parentContactNo" value={formData.parentContactNo} onChange={handleChange} />
                                    </div>

                                </div>


                                <div className="form-group row mb-3">

                                    <label htmlFor="parentEmail" className="col-sm-2 col-form-label text-start">Email ID</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="parentEmail" name="parentEmail" value={formData.parentEmail} onChange={handleChange} />
                                    </div>

                                </div>




                                <Button variant="primary" onClick={nextTab}>Next</Button>


                            </Tab>

                            <Tab eventKey="tab3" title="Tab 3">


                                <h6 className='text-start mt-3'>Program Details</h6>


                                <div className="form-group row mb-3">
                                    <label htmlFor="program" className="col-sm-2 col-form-label text-start">
                                        Choose your Program:</label>
                                    <div className="col-sm-10">
                                        <select className={`form-control ${errors.program ? 'is-invalid' : ''}`} id="program" name='program' value={formData.program} onChange={handleChange}>
                                            <option value="0">Select a program</option>
                                            <option value="1">Bachelor's (4 yrs)</option>
                                            <option value="2">Masters</option>
                                            <option value="3">Advanced Diploma</option>
                                        </select>
                                        {errors.program && <div className="invalid-feedback">{errors.program}</div>}
                                    </div>
                                </div>

                                <div className="form-group row mb-3">
                                    <label htmlFor="specialization" className="col-sm-2 col-form-label text-start">
                                        Choose your Specialization:</label>
                                    <div className="col-sm-10">
                                        <select className={`form-control ${errors.specialization ? 'is-invalid' : ''}`} id="specialization" name='specialization' value={formData.specialization} onChange={handleChange} >
                                            <option value="0">Select a specialization</option>
                                            <option value="1">Game Development with Unity</option>
                                            <option value="2">Traditional and Digital Concept Art</option>
                                            <option value="3">Specialization 1</option>
                                            <option value="4">Specialization 2</option>
                                            <option value="5">Specialization 3</option>
                                        </select>
                                        {errors.specialization && <div className="invalid-feedback">{errors.specialization}</div>}
                                    </div>
                                </div>


                                <div className="form-group row mb-3">

                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label text-start">Mode of study</label>

                                    <div className='col-sm-10 text-start'>

                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="studyMode" id="studyMode1" value="1" onChange={handleChange} checked={formData.studyMode === '1'}

                                                disabled={isOnlineDisabled} // Disable if condition is met

                                            />
                                            <label className="form-check-label" htmlFor="studyMode1">
                                                Online
                                            </label>
                                        </div>

                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="studyMode" id="studyMode2" value="2" onChange={handleChange} checked={formData.studyMode === '2'}
                                            />
                                            <label className="form-check-label" htmlFor="studyMode2">
                                                Offline
                                            </label>
                                        </div>
                                    </div>


                                </div>


                                <h6 className='text-start'>Upload documents (optional)</h6>
                                <div className="form-group row mb-3">
                                    <label htmlFor="tenthCertificate" className="col-sm-6 col-form-label text-start">
                                        10th Class marks sheet:
                                    </label>
                                    <div className="col-sm-6">
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="tenthCertificate"
                                            name="tenthCertificate"
                                            onChange={handleFileChange}
                                        />
                                       
                                    </div>
                                </div>

                                <div className="form-group row mb-3">
                                    <label htmlFor="twelthCertificate" className="col-sm-6 col-form-label text-start">
                                        12th Class or equivalent marks sheet:
                                    </label>
                                    <div className="col-sm-6">
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="twelthCertificate"
                                            name="twelthCertificate"
                                            onChange={handleFileChange}
                                        />
                                       
                                    </div>
                                </div>

                                {(formData.program === '1') && (<>
                                    <div className="form-group row mb-3">
                                        <label htmlFor="twelthTc" className="col-sm-6 col-form-label text-start">
                                            12th Class transfer or college leaving certificate:
                                        </label>
                                        <div className="col-sm-6">
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="twelthTc"
                                                name="twelehTc"
                                                onChange={handleFileChange}
                                            />
                                          
                                        </div>
                                    </div>
                                </>)}


                                <div className="form-group row mb-3">
                                    <label htmlFor="bonafideCertificate" className="col-sm-6 col-form-label text-start">
                                        Study or bonafied certificate:
                                    </label>
                                    <div className="col-sm-6">
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="bonafideCertificate"
                                            name="bonafideCertificate"
                                            onChange={handleFileChange}
                                        />
                                       
                                    </div>
                                </div>

                                {(formData.program === '1') && (<>

                                    <div className="form-group row mb-3">
                                        <label htmlFor="migrationCertificate" className="col-sm-6 col-form-label text-start">
                                            Migration certificate for other state candidates:
                                        </label>
                                        <div className="col-sm-6">
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="migrationCertificate"
                                                name="migrationCertificate"
                                                onChange={handleFileChange}
                                            />
                                           
                                        </div>
                                    </div>
                                </>)}

                                {(formData.program === '2' || formData.program === '3') && (<>

                                    <div className="form-group row mb-3">
                                        <label htmlFor="degreeProvisional" className="col-sm-6 col-form-label text-start">
                                            Deggree provisional certificate:
                                        </label>
                                        <div className="col-sm-6">
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="degreeProvisional"
                                                name="degreeProvisional"
                                                onChange={handleFileChange}
                                            />
                                          
                                        </div>
                                    </div>

                                    <div className="form-group row mb-3">
                                        <label htmlFor="degreeConsolidated" className="col-sm-6 col-form-label text-start">
                                            Deggree consolidated marks memo:
                                        </label>
                                        <div className="col-sm-6">
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="degreeConsolidated"
                                                name="degreeConsolidated"
                                                onChange={handleFileChange}
                                            />
                                           
                                        </div>
                                    </div>
                                </>
                                )}

                                {(formData.program === '2') && (<>

                                    <div className="form-group row mb-3">
                                        <label htmlFor="degreeMigration" className="col-sm-6 col-form-label text-start">
                                            Deggree migration certificate:
                                        </label>
                                        <div className="col-sm-6">
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="degreeMigration"
                                                name="degreeMigration"
                                                onChange={handleFileChange}
                                            />
                                           
                                        </div>
                                    </div>

                                    <div className="form-group row mb-3">
                                        <label htmlFor="degreeTc" className="col-sm-6 col-form-label text-start">
                                            Deggree transfer or college leaving certificate:
                                        </label>
                                        <div className="col-sm-6">
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="degreeTc"
                                                name="degreeTc"
                                                onChange={handleFileChange}
                                            />
                                           
                                        </div>
                                    </div>
                                </>)}

                                {(formData.program === '1' || formData.program === '2') && (<>

                                    <div className="form-group row mb-3">
                                        <label htmlFor="casteCertificate" className="col-sm-6 col-form-label text-start">
                                            Caste certificate in case of SC/ST/BC candidates:
                                        </label>
                                        <div className="col-sm-6">
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="casteCertificate"
                                                name="casteCertificate"
                                                onChange={handleFileChange}
                                            />
                                          
                                        </div>
                                    </div>
                                </>)}

                                <div className="form-group row mb-3">
                                    <label htmlFor="aadharCopy" className="col-sm-6 col-form-label text-start">
                                        Aadhar card:
                                    </label>
                                    <div className="col-sm-6">
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="aadharCopy"
                                            name="aadharCopy"
                                            onChange={handleFileChange}
                                        />
                                        
                                    </div>
                                </div>


                                <div className="form-group row mb-3">
                                    <label htmlFor="photoCopy" className="col-sm-6 col-form-label text-start">
                                        Recent passport size photocopy:
                                    </label>
                                    <div className="col-sm-6">
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="photoCopy"
                                            name="photoCopy"
                                            onChange={handleFileChange}
                                        />
                                        
                                    </div>
                                </div>





                                <Button variant="primary" onClick={nextTab}>Next</Button>

                            </Tab>

                            <Tab eventKey="tab4" title="Tab 4" className='text-start'>

                                <p className='mt-3'>Before submitting the form, let us know how you found out about us:</p>


                                <div className="form-group mb-3">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="referral" id="referral1" value="1" onChange={handleChange} checked={formData.referral === '1'} />
                                        <label className="form-check-label" htmlFor="referral1">
                                            Facebook/Instagram Ad
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="referral" id="referral2" value="2" onChange={handleChange} checked={formData.referral === '2'} />
                                        <label className="form-check-label" htmlFor="referral2">
                                            Twitter
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="referral" id="referral3" value="3" onChange={handleChange} checked={formData.referral === '3'} />
                                        <label className="form-check-label" htmlFor="referral3">
                                            YouTube
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="referral" id="referral4" value="4" onChange={handleChange} checked={formData.referral === '4'} />
                                        <label className="form-check-label" htmlFor="referral4">
                                            Through family
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="referral" id="referral5" value="5" onChange={handleChange} checked={formData.referral === '5'} />
                                        <label className="form-check-label" htmlFor="referral5">
                                            I am a referral
                                        </label>
                                    </div>

                                    {errors.referral && (
                                        <div className="invalid-feedback d-block">
                                            {errors.referral}
                                        </div>
                                    )}


                                </div>

                                {formData.referral === '5' && (
                                    <>


                                        <div className="form-group row mb-3">

                                            <label htmlFor="referralName" className="col-sm-2 col-form-label text-start">Refferal Name</label>
                                            <div className="col-sm-10">
                                                <input type="text" className={`form-control ${errors.referralName ? 'is-invalid' : ''}`} id="referralName" name="referralName" value={formData.referralName} onChange={handleChange} />
                                                {errors.referralName && <div className="invalid-feedback">{errors.referralName}</div>}

                                            </div>

                                        </div>


                                        <div className="form-group row mb-3">

                                            <label htmlFor="referralContactNo" className="col-sm-2 col-form-label text-start">Contact No.</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" id="referralContactNo" name="referralContactNo" value={formData.referralContactNo} onChange={handleChange} />
                                            </div>

                                        </div>


                                        <div className="form-group row mb-3">

                                            <label htmlFor="referralProgram" className="col-sm-2 col-form-label text-start">Program</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" id="referralProgram" name="referralProgram" value={formData.referralProgram} onChange={handleChange} />
                                            </div>

                                        </div>


                                        <div className="form-group row mb-3">

                                            <label htmlFor="referralBatch" className="col-sm-2 col-form-label text-start">Batch Year</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" id="referralBatch" name="referralBatch" value={formData.referralBatch} onChange={handleChange} />
                                            </div>

                                        </div>

                                    </>
                                )}



                                <Button variant="primary" onClick={handleSubmit}>
                                    Submit
                                </Button>
                            </Tab>
                        </Tabs>
                    </form>
                </div>
            </div>


            <ToastContainer />
        </div>
    );
}

export default RegistrationForm;
