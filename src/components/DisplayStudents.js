import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


function DisplayStudents({ refreshData }) {

    // State to store student data
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [prevPageUrl, setPrevPageUrl] = useState(null);
    const [perPage, setPerPage] = useState(8);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-GB');
        return formattedDate.replace(/\//g, '-');

    };

    // Fetch students data on component mount
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/getStudents?page=${currentPage}&per_page=${perPage}`)
            .then(response => {

                if (Array.isArray(response.data.data.data)) {

                    setStudents(response.data.data.data);

                    setCurrentPage(response.data.data.current_page);
                    setTotalPages(Math.ceil(response.data.data.total / response.data.data.per_page));
                    setNextPageUrl(response.data.data.next_page_url);
                    setPrevPageUrl(response.data.data.prev_page_url);
                    setPerPage(response.data.data.per_page);



                } else {

                    console.log('Invalid data format:', response.data.data.data);
                    setError("Invalid data format received from the API");
                }
                setLoading(false);  // Stop loading
            })
            .catch(err => {

                console.log('Noooo');

                setError(err.message);  // Set error if API call fails
                setLoading(false);  // Stop loading
            });
    }, [currentPage, refreshData]);


    // Handle page change
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page); // Change page
        }
    };


    // Render loading, error, or the student table
    if (loading) {
        return <div className="text-center"><p>Loading...</p></div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;

    }


    const handleShowDetails = (student) => {
        // Clean up the document path
        const cleanedDocumentPaths = student.documents.map(doc => ({
            ...doc,
            path: doc.path.replace(/\\\//g, '/'), // Clean up the path
        }));

        // Update the selectedStudent with the cleaned paths
        setSelectedStudent({
            ...student,
            documents: cleanedDocumentPaths, // Add cleaned document paths
        });
    };


    // Handle closing the modal
    const handleCloseModal = () => {
        setSelectedStudent(null);
    };


    return (
        <div className="container">
            <h6 className="text-start mb-3 mt-3">Students List</h6>

            <div className="table-responsive" style={{ minHeight: '300px' }}>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Date of Birth</th>
                            <th>Nationality</th>
                            <th>Mobile</th>
                            <th>Email ID</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? (
                            students.map((student, index) => (
                                <tr key={student.id}>
                                    <td>{(currentPage - 1) * perPage + index + 1}</td>
                                    <td>{student.student_name}</td>
                                    <td>{student.dob}</td>
                                    <td>{student.nationality}</td>
                                    <td>{student.mobile}</td>
                                    <td>{student.email}</td>
                                    <td>{formatDate(student.created_at)}</td>
                                    <td>
                                        <button
                                            className="btn btn-info btn-sm"
                                            onClick={() => handleShowDetails(student)}
                                        >
                                            view
                                        </button>


                                    </td>



                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No students available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>





            {/* Modal for showing all details */}
            {selectedStudent && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="studentDetailsModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="studentDetailsModalLabel">Student Details</h5>

                            </div>
                            <div className="modal-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <th>Student Name</th>
                                            <td>{selectedStudent.student_name}</td>
                                        </tr>
                                        <tr>
                                            <th>Date of Birth</th>
                                            <td>{selectedStudent.dob}</td>
                                        </tr>
                                        <tr>
                                            <th>Nationality</th>
                                            <td>{selectedStudent.nationality}</td>
                                        </tr>
                                        <tr>
                                            <th>Mobile</th>
                                            <td>{selectedStudent.mobile}</td>
                                        </tr>
                                        <tr>
                                            <th>Email</th>
                                            <td>{selectedStudent.email}</td>
                                        </tr>
                                        <tr>
                                            <th>Aadhar No</th>
                                            <td>{selectedStudent.aadhar_no}</td>
                                        </tr>
                                        <tr>
                                            <th>Address</th>
                                            <td>{selectedStudent.address}</td>
                                        </tr>
                                        <tr>
                                            <th>State</th>
                                            <td>{selectedStudent.state}</td>
                                        </tr>
                                        <tr>
                                            <th>City</th>
                                            <td>{selectedStudent.city}</td>
                                        </tr>
                                        <tr>
                                            <th>PIN</th>
                                            <td>{selectedStudent.pin}</td>
                                        </tr>
                                        <tr>
                                            <th>Highest Qualification </th>
                                            <td>
                                                {selectedStudent.qualification === '1' ? "10th Pass" :
                                                    selectedStudent.qualification === '2' ? "12th Pass" :
                                                        selectedStudent.qualification === '3' ? "Under Graduate" :
                                                            selectedStudent.qualification === '4' ? "Post Graduate" : null



                                                }</td>
                                        </tr>
                                        <tr>
                                            <th>Year of Completion</th>
                                            <td>{selectedStudent.year_completion}</td>
                                        </tr>

                                        <tr>
                                            <th>School/College</th>
                                            <td>{selectedStudent.college}</td>
                                        </tr>
                                        <tr>
                                            <th>City</th>
                                            <td>{selectedStudent.college_city}</td>
                                        </tr>
                                        <tr>
                                            <th>Board</th>
                                            <td>{selectedStudent.college_board}</td>
                                        </tr>
                                        <tr>
                                            <th>Employment</th>
                                            <td>{selectedStudent.city}</td>
                                        </tr>
                                        <tr>
                                            <th>Organization</th>
                                            <td>{selectedStudent.organization}</td>
                                        </tr>
                                        <tr>
                                            <th>Designation</th>
                                            <td>{selectedStudent.role}</td>
                                        </tr>
                                        <tr>
                                            <th>Parent Name</th>
                                            <td>{selectedStudent.parent_name}</td>
                                        </tr>
                                        <tr>
                                            <th>Relation</th>
                                            <td>{selectedStudent.relation}</td>
                                        </tr>
                                        <tr>
                                            <th>Program</th>
                                            <td>{
                                                selectedStudent.program === 1 ? "Bachelor's (4 yrs)" :
                                                    selectedStudent.program === 2 ? "Masters" :
                                                        selectedStudent.program === 3 ? "Advanced Diploma" : null
                                            }</td>
                                        </tr>
                                        <tr>
                                            <th>Specialization</th>
                                            <td>{
                                                selectedStudent.specialization === 1 ? "Game Development with Unity" :
                                                    selectedStudent.specialization === 2 ? "Traditional and Digital Concept Art" :
                                                        selectedStudent.specialization === 3 ? "Specialization 1" :
                                                            selectedStudent.specialization === 4 ? "Specialization 2" :
                                                                selectedStudent.specialization === 5 ? "Specialization 3" : null


                                            }</td>
                                        </tr>
                                        <tr>
                                            <th>Mode</th>
                                            <td>{
                                                selectedStudent.study_mode === 1 ? "Online" :
                                                    selectedStudent.study_mode === 2 ? "Offline" : null


                                            }
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Referral</th>
                                            <td>{
                                                selectedStudent.referral_channel === 1 ? "Facebook/Instagram Ad" :
                                                    selectedStudent.referral_channel === 2 ? "Twitter" :
                                                        selectedStudent.referral_channel === 3 ? "YouTube" :
                                                            selectedStudent.referral_channel === 4 ? "Through family" :
                                                                selectedStudent.referral_channel === 5 ? "I am a referral" : null


                                            }</td>
                                        </tr>
                                        <tr>
                                            <th>Name</th>
                                            <td>{selectedStudent.referral_name}</td>
                                        </tr>
                                        <tr>
                                            <th>Mobile</th>
                                            <td>{selectedStudent.referral_mobile}</td>
                                        </tr>
                                        <tr>
                                            <th>Program</th>
                                            <td>{selectedStudent.referral_program}</td>
                                        </tr>
                                        <tr>
                                            <th>Batch Year</th>
                                            <td>{selectedStudent.referral_batch}</td>
                                        </tr>


                                        {/* Display Document Links */}
                                        <tr>
                                            <th>Documents</th>
                                            <td>
                                                {selectedStudent.documents && selectedStudent.documents.length > 0 ? (
                                                    <ul>
                                                        {selectedStudent.documents.map((doc, index) => (
                                                            <li key={index}>
                                                                <a href={doc.path} target="_blank" rel="noopener noreferrer">
                                                                    {doc.tittle}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p>No documents available</p>
                                                )}
                                            </td>
                                        </tr>



                                    </tbody>
                                </table>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" onClick={handleCloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {/* Pagination controls */}

            <div className="d-flex justify-content-center mt-3">

                <div className="pagination">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}>
                        &laquo; Previous
                    </button>

                    {/* Page number buttons */}
                    {[...Array(totalPages)].map((_, index) => {
                        const page = index + 1;
                        return (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                disabled={currentPage === page}
                                style={{ fontWeight: currentPage === page ? 'bold' : 'normal' }}>
                                {page}
                            </button>
                        );
                    })}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}>
                        Next &raquo;
                    </button>
                </div>

            </div>
        </div>



    );
}

export default DisplayStudents;
