window.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('internshipList');

  const response = await fetch('/internships');
  if(response.ok) {
    const internships = await response.json();

    if(internships.length === 0) {
      container.innerHTML = '<p>No internships available now.</p>';
      return;
    }

    internships.forEach(internship => {
      const div = document.createElement('div');
      div.classList.add('internship');

      div.innerHTML = `
        <h3>${internship.role}</h3>
        <p><strong>Company:</strong> ${internship.companyName}</p>
        <p><strong>Duration:</strong> ${internship.duration}</p>
        <p><strong>Stipend:</strong> ${internship.stipend}</p>
        <p><strong>Deadline:</strong> ${internship.deadline}</p>
        <a href="apply.html?role=${encodeURIComponent(internship.role)}" class="btn">Apply</a>
      `;

      container.appendChild(div);
    });
  } else {
    container.innerHTML = '<p>Failed to load internships.</p>';
  }
});
