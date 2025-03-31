export const validateForm = (formData) => {
    const errors = {};
  
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    } else if (formData.firstName.length < 2) {
      errors.firstName = 'First name must be at least 2 characters long';
    }
  
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    } else if (formData.lastName.length < 2) {
      errors.lastName = 'Last name must be at least 2 characters long';
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
  
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    } else if (!passwordRegex.test(formData.password)) {
      errors.password = 'Password must include:' +
        '\n- At least one capital letter' +
        '\n- At least one number' +
        '\n- At least one special character';
    }
  
    if (formData.birthdate) {
      const selectedDate = new Date(formData.birthdate);
      const currentDate = new Date();
      const minAge = 8; 
      
      const ageDiffMs = currentDate - selectedDate;
      const ageDate = new Date(ageDiffMs);
      const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
  
      if (calculatedAge < minAge) {
        errors.birthdate = `You must be at least ${minAge} years old`;
      }
    }
  
    if (formData.bio && formData.bio.length > 500) {
      errors.bio = 'Bio cannot exceed 500 characters';
    }
  
    if (formData.birthplace && formData.birthplace.length > 100) {
      errors.birthplace = 'Birthplace cannot exceed 100 characters';
    }
  
    return errors;
  };