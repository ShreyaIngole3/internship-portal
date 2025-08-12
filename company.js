const form = document.getElementById('companyForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => data[key] = value);

  const response = await fetch('/company', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(data)
  });

  if(response.ok) {
    alert('Company data submitted successfully!');
    window.location.href = 'internships.html';
  } else {
    alert('Error submitting data.');
  }
});
