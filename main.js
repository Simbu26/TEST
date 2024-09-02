document.addEventListener('DOMContentLoaded', function () {
    const resumeForm = document.getElementById('resumeForm');
    const resumeModal = document.getElementById('resumeModal');
    const closeModal = document.querySelector('.close');
    const resumeOutput = document.getElementById('resumeOutput');
    const downloadPdf = document.getElementById('downloadPdf');

    // Add Education Fieldszz
    const addEducation = document.getElementById('addEducation');
    const educationFields = document.getElementById('educationFields');

    addEducation.addEventListener('click', function () {
        const educationField = document.createElement('div');
        educationField.className = 'educationField';
        educationField.innerHTML = `
            <label for="courseName">Course Name:</label>
            <input type="text" class="courseName" required>
            <label for="institutionName">Institution Name:</label>
            <input type="text" class="institutionName" required>
            <label for="Percentage">Percentage:</label>
            <input type="text" class="Percentage" required>
            <label for="graduationYear">Duration:</label>
            <input type="text" class="graduationYear" required>
        `;
        educationFields.appendChild(educationField);
    });

    // Add Experience Fields
    const addExperience = document.getElementById('addExperience');
    const experienceFields = document.getElementById('experienceFields');

    addExperience.addEventListener('click', function () {
        const experienceField = document.createElement('div');
        experienceField.className = 'experienceField';
        experienceField.innerHTML = `
            <label for="jobTitle">Job Title:</label>
            <input type="text" class="jobTitle" required>
            <label for="company">Company:</label>
            <input type="text" class="company" required>
            <label for="duration">Duration:</label>
            <input type="text" class="duration" required>
        `;
        experienceFields.appendChild(experienceField);
    });

    // Handle Form Submission
    resumeForm.addEventListener('submit', function (e) {
        e.preventDefault();
        generateResume();
    });

    // Close Modal
    closeModal.addEventListener('click', function () {
        resumeModal.style.display = 'none';
    });

    // Generate Resume
    function generateResume() {
        const formData = new FormData(resumeForm);
        let resumeHTML = '';

        // Profile Photo
        if (formData.get('profilePhoto').name) {
            const reader = new FileReader();
            reader.onload = function (e) {
                resumeHTML += `<div id="profilePhotoOutput"><img src="${e.target.result}" alt="Profile Photo"></div>`;
                buildResumeContent(formData, resumeHTML);
            };
            reader.readAsDataURL(formData.get('profilePhoto'));
        } else {
            buildResumeContent(formData, resumeHTML);
        }
    }

    // Build the rest of the resume content
    function buildResumeContent(formData, resumeHTML) {
        // Personal Information
        resumeHTML += `<h2>Personal Information</h2>`;
        resumeHTML += `<p><strong> <br><br><br><br><br><br><br><br><br><br><br>Full Name:</strong> ${formData.get('name')}</p>`;
        resumeHTML += `<p><strong>Gender:</strong> ${formData.get('gender')}</p>`;
        resumeHTML += `<p><strong>Date of Birth:</strong> ${formData.get('dob')}</p>`;
        resumeHTML += `<p><strong>Email Address:</strong> ${formData.get('email')}</p>`;
        resumeHTML += `<p><strong>Phone Number:</strong> ${formData.get('phone')}</p>`;
        resumeHTML += `<p><strong>Father's Name:</strong> ${formData.get('fathername')}</p>`;
        resumeHTML += `<p><strong>Address:</strong> ${formData.get('address')}</p>`;
        resumeHTML += `<p><strong>Career Objectives:</strong> ${formData.get('careerobjectives')}</p>`;
        resumeHTML += `<p><strong>Professional Summary:</strong> ${formData.get('professionalsummary')}</p>`;

        // Interview Details
        resumeHTML += `<h2>Interview Details</h2>`;
        resumeHTML += `<p><strong>Strengths:</strong> ${formData.get('strengths')}</p>`;
        resumeHTML += `<p><strong>Weaknesses:</strong> ${formData.get('weaknesses')}</p>`;
        resumeHTML += `<p><strong>Hobbies:</strong> ${formData.get('hobbies')}</p>`;

        // Education
        resumeHTML += `<h2>Education</h2><ul>`;
        document.querySelectorAll('.educationField').forEach(field => {
            resumeHTML += `<li><strong>Course Name:</strong> ${field.querySelector('.courseName').value}<br>`;
            resumeHTML += `<strong>Institution Name:</strong> ${field.querySelector('.institutionName').value}<br>`;
            resumeHTML += `<strong>Percentage:</strong> ${field.querySelector('.Percentage').value}<br>`;
            resumeHTML += `<strong>Duration:</strong> ${field.querySelector('.graduationYear').value}</li>`;
        });
        resumeHTML += `</ul>`;

        // Work Experience
        resumeHTML += `<h2>Work Experience</h2><ul>`;
        document.querySelectorAll('.experienceField').forEach(field => {
            resumeHTML += `<li><strong>Job Title:</strong> ${field.querySelector('.jobTitle').value}<br>`;
            resumeHTML += `<strong>Company:</strong> ${field.querySelector('.company').value}<br>`;
            resumeHTML += `<strong>Duration:</strong> ${field.querySelector('.duration').value}</li>`;
        });
        resumeHTML += `</ul>`;

        // Skills
        resumeHTML += `<h2>Skills</h2><p>${formData.get('skills')}</p>`;

        // Display Resume
        resumeOutput.innerHTML = resumeHTML;
        resumeModal.style.display = 'block';
    }

    // Download Resume as PDF
    downloadPdf.addEventListener('click', function () {
        const resumeElement = resumeOutput;
        const opt = {
            margin: 1,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().from(resumeElement).set(opt).save();
    });
});
