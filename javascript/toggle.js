document.addEventListener('DOMContentLoaded', function () {
    const moonIcon = document.querySelector('.moon-icon');
    const sunIcon = document.querySelector('.sun-icon');
    const body = document.body;
    
    // Check if dark mode is already enabled
    if (body.classList.contains('dark-mode')) {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    } else {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    }
  
    moonIcon.addEventListener('click', function () {
      body.classList.add('dark-mode');
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    });
  
    sunIcon.addEventListener('click', function () {
      body.classList.remove('dark-mode');
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    });
  });