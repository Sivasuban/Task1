function validateForm() {
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const password = document.getElementById('password').value;
    const cpassword = document.getElementById('cpassword').value;
    const mobile = document.getElementById('mobile').value;
    const email = document.getElementById('email').value;
    const errorMessage = document.getElementById('error-message');

    const mobilePattern = /^[6-9]\d{9}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let errors = [];

    if (fname.length > 18) {
        errors.push('First name should not exceed 18 characters.');
    }

    if (lname.length > 18) {
        errors.push('Last name should not exceed 18 characters.');
    }

    if (password !== cpassword) {
        errors.push('Passwords do not match.');
    }

    if (!mobilePattern.test(mobile)) {
        errors.push('Please enter a valid mobile number.');
    }

    if (!emailPattern.test(email)) {
        errors.push('Please enter a valid email address.');
    }

    if (errors.length > 0) {
        errorMessage.textContent = errors.join(' ');
        return false;
    } else {
        errorMessage.textContent = '';
        saveFormData();
        alert("Form successfully registered");
        return true;
    }
}

function saveFormData() {
    const formData = {
        fname: document.getElementById('fname').value,
        lname: document.getElementById('lname').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        cpassword: document.getElementById('cpassword').value,
        gender: document.querySelector('input[name="gender"]:checked').value,
        dob: document.getElementById('dob').value,
        mobile: document.getElementById('mobile').value,
        resume: document.getElementById('resume').files[0] ? document.getElementById('resume').files[0].name : '',
        country: document.getElementById('country').value,
        city: document.getElementById('city').value,
        address: document.getElementById('address').value
    };

    localStorage.setItem('formData', JSON.stringify(formData));
}

function loadFormData() {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
        const formData = JSON.parse(savedData);

        document.getElementById('fname').value = formData.fname;
        document.getElementById('lname').value = formData.lname;
        document.getElementById('email').value = formData.email;
        document.getElementById('password').value = formData.password;
        document.getElementById('cpassword').value = formData.cpassword;
        document.querySelector(`input[name="gender"][value="${formData.gender}"]`).checked = true;
        document.getElementById('dob').value = formData.dob;
        document.getElementById('mobile').value = formData.mobile;
        document.getElementById('resume').value = formData.resume ? formData.resume : '';
        document.getElementById('country').value = formData.country;
        document.getElementById('city').value = formData.city;
        document.getElementById('address').value = formData.address;
    }
}

function resetForm() {
    localStorage.removeItem('formData');
}
document.getElementById('mobile').addEventListener('input', function() {
    const mobilePattern = /^[6-9]\d{0,9}$/;
    const mobile = this.value;
    const errorMessage = document.getElementById('error-message');
    
    if (!mobilePattern.test(mobile)) {
        this.value = mobile.slice(0,-1); 
        errorMessage.textContent = 'Mobile number must start with 6-9 and contain up to 10 digits.';
    } else {
        errorMessage.textContent = '';
    }
    
});
preventDefault();

window.onload = loadFormData;
