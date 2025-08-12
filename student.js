document.getElementById('studentForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Collect form data
  const formData = {
    name: this.name.value,
    email: this.email.value,
    phone: this.phone.value,
    college: this.college.value,
    degree: this.degree.value,
    experience: this.experience.value,
  };

  console.log('Student Registration Data:', formData);

  // Show success message (replace with actual backend call)
  document.getElementById('responseMessage').textContent = 'Thank you for registering!';

  // Reset form
  this.reset();const form = document.getElementById('studentForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => data[key] = value);

  const response = await fetch('/student', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(data)
  });

  if(response.ok) {
    alert('Student data submitted successfully!');
    window.location.href = 'internships.html';
  } else {
    alert('Error submitting data.');
  }
});

});
