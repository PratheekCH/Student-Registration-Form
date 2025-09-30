(function(){
  function onReady(fn){
    if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  // INDEX PAGE (login)
  if (document.body.classList.contains('page-index')) {
    window.val = function() {
      var gmail = document.getElementById('Gmail').value;
      var pass = document.getElementById('Password').value;
      var reg = /\S+@\S+\.\S+/;

      document.getElementById('gmailError').innerText = '';
      document.getElementById('passwordError').innerText = '';

      let hasError = false;

      if (!reg.test(gmail)) {
        document.getElementById('gmailError').innerText = '❌ Please enter a valid Gmail address';
        hasError = true;
      }
      if (pass.length < 6) {
        document.getElementById('passwordError').innerText = '❌ Password must be at least 6 characters';
        hasError = true;
      }

      if (hasError) return;
      localStorage.setItem('gmail', gmail);
      localStorage.setItem('password', pass);
      window.location.href = '2nd page.html';
    };

    onReady(function(){
      const savedGmail = localStorage.getItem('gmail');
      const savedPassword = localStorage.getItem('password');
      if (savedGmail) document.getElementById('Gmail').value = savedGmail;
      if (savedPassword) document.getElementById('Password').value = savedPassword;
    });
  }

  // PERSONAL DETAILS PAGE (2nd page)
  if (document.body.classList.contains('page-personal')) {
    onReady(function(){
      const savedName = localStorage.getItem('name');
      const savedAge = localStorage.getItem('age');
      const savedGender = localStorage.getItem('gender');
      const savedMobile = localStorage.getItem('mobile');

      if (savedName) document.getElementById('Name').value = savedName;
      if (savedAge) document.getElementById('Age').value = savedAge;
      if (savedMobile) document.getElementById('Mobile').value = savedMobile;
      if (savedGender) {
        if (savedGender === 'male') document.getElementById('male').checked = true;
        else if (savedGender === 'female') document.getElementById('female').checked = true;
      }
    });

    window.saveAndContinue = function(){
      const name = document.getElementById('Name').value.trim();
      const age = document.getElementById('Age').value.trim();
      const mobile = document.getElementById('Mobile').value.trim();
      const genderEls = document.getElementsByName('gender');
      let gender = null;
      for (const el of genderEls) { if (el.checked) { gender = el.value; break; } }

      document.getElementById('nameError').textContent = '';
      document.getElementById('ageError').textContent = '';
      document.getElementById('genderError').textContent = '';
      document.getElementById('mobileError').textContent = '';

      let hasError = false;
      if (!name) { document.getElementById('nameError').textContent = '❌ Please enter your name.'; hasError = true; }
      if (!age || isNaN(age) || age <= 0) { document.getElementById('ageError').textContent = '❌ Please enter a valid age.'; hasError = true; }
      if (!gender) { document.getElementById('genderError').textContent = '❌ Please select your gender.'; hasError = true; }
      if (!mobile || !/^\d{10}$/.test(mobile)) { document.getElementById('mobileError').textContent = '❌ Please enter a valid 10-digit mobile number.'; hasError = true; }

      if (hasError) return;
      localStorage.setItem('name', name);
      localStorage.setItem('age', age);
      localStorage.setItem('gender', gender);
      localStorage.setItem('mobile', mobile);
      window.location.href = '3rd page.html';
    };
  }

  // EDUCATION PAGE (3rd page)
  if (document.body.classList.contains('page-education')) {
    onReady(function(){
      const savedSSC = localStorage.getItem('ssc');
      const savedIDD = localStorage.getItem('idd');
      const savedUGD = localStorage.getItem('ugd');
      if (savedSSC) document.getElementById('sscDetails').value = savedSSC;
      if (savedIDD) document.getElementById('interDiplomaDetails').value = savedIDD;
      if (savedUGD) document.getElementById('ugDetails').value = savedUGD;

      const btn = document.getElementById('continueBtn');
      if (btn) {
        btn.addEventListener('click', function(e){
          e.preventDefault();
          let ssc = document.getElementById('sscDetails').value.trim();
          let interDiploma = document.getElementById('interDiplomaDetails').value.trim();
          let ug = document.getElementById('ugDetails').value.trim();

          document.getElementById('sscDetailsError').textContent = '';
          document.getElementById('interDiplomaDetailsError').textContent = '';
          document.getElementById('ugDetailsError').textContent = '';

          let hasError = false;
          if (!ssc) { document.getElementById('sscDetailsError').textContent = 'SSC Details (School Name) is required'; hasError = true; }
          else if (ssc.length < 5) { document.getElementById('sscDetailsError').textContent = 'Please enter a valid School Name (at least 5 characters)'; hasError = true; }
          if (!interDiploma) { document.getElementById('interDiplomaDetailsError').textContent = 'Inter/Diploma Details (Institution Name) is required'; hasError = true; }
          else if (interDiploma.length < 5) { document.getElementById('interDiplomaDetailsError').textContent = 'Please enter a valid Institution Name (at least 5 characters)'; hasError = true; }
          if (!ug) { document.getElementById('ugDetailsError').textContent = 'Under Graduation Details (Institution Name) is required'; hasError = true; }
          else if (ug.length < 5) { document.getElementById('ugDetailsError').textContent = 'Please enter a valid Institution Name (at least 5 characters)'; hasError = true; }

          if (!hasError) {
            localStorage.setItem('ssc', ssc);
            localStorage.setItem('idd', interDiploma);
            localStorage.setItem('ugd', ug);
            window.location.href = '4th page.html';
          }
        });
      }
    });
  }

  // ADDRESS PAGE (4th page)
  if (document.body.classList.contains('page-address')) {
    onReady(function(){
      const savedStreet = localStorage.getItem('streetname');
      const savedCity = localStorage.getItem('cityname');
      const savedState = localStorage.getItem('statename');
      const savedPincode = localStorage.getItem('pincode');
      if (savedStreet) document.getElementById('streetname').value = savedStreet;
      if (savedCity) document.getElementById('cityname').value = savedCity;
      if (savedState) document.getElementById('statename').value = savedState;
      if (savedPincode) document.getElementById('pincodeno').value = savedPincode;

      const submitBtn = document.getElementById('submitBtn');
      if (submitBtn) {
        submitBtn.addEventListener('click', function(e){
          e.preventDefault();
          let street = document.getElementById('streetname').value.trim();
          let city = document.getElementById('cityname').value.trim();
          let state = document.getElementById('statename').value.trim();
          let pincode = document.getElementById('pincodeno').value.trim();

          document.getElementById('streetError').textContent = '';
          document.getElementById('citynameError').textContent = '';
          document.getElementById('statenameError').textContent = '';
          document.getElementById('pincodeError').textContent = '';

          let hasError = false;
          if (!street) { document.getElementById('streetError').textContent = 'Street name is required'; hasError = true; }
          if (!city) { document.getElementById('citynameError').textContent = 'City name is required'; hasError = true; }
          if (!state) { document.getElementById('statenameError').textContent = 'State name is required'; hasError = true; }
          if (!pincode || isNaN(pincode)) { document.getElementById('pincodeError').textContent = 'Valid pincode is required'; hasError = true; }

          if (!hasError) {
            localStorage.setItem('streetname', street);
            localStorage.setItem('cityname', city);
            localStorage.setItem('statename', state);
            localStorage.setItem('pincode', pincode);
            window.location.href = 'confirm.html';
          }
        });
      }
    });
  }

  // CONFIRM PAGE
  if (document.body.classList.contains('page-confirm')) {
    function loadDetails() {
      document.getElementById('nameInput').value = localStorage.getItem('name') || '';
      document.getElementById('gmailInput').value = localStorage.getItem('gmail') || '';
      document.getElementById('passwordInput').value = localStorage.getItem('password') || '';
      document.getElementById('ageInput').value = localStorage.getItem('age') || '';
      document.getElementById('mobileInput').value = localStorage.getItem('mobile') || '';
      document.getElementById('sscInput').value = localStorage.getItem('ssc') || '';
      document.getElementById('iddInput').value = localStorage.getItem('idd') || '';
      document.getElementById('ugdInput').value = localStorage.getItem('ugd') || '';
      document.getElementById('streetInput').value = localStorage.getItem('streetname') || '';
      document.getElementById('cityInput').value = localStorage.getItem('cityname') || '';
      document.getElementById('stateInput').value = localStorage.getItem('statename') || '';
      document.getElementById('pincodeInput').value = localStorage.getItem('pincode') || '';
    }

    onReady(function(){
      loadDetails();
      const backBtn = document.getElementById('backBtn');
      if (backBtn) backBtn.addEventListener('click', () => { window.location.href = 'index.html.html'; });

      const submitBtn = document.getElementById('submitBtn');
      if (submitBtn) submitBtn.addEventListener('click', () => {
        // Clear saved data
        localStorage.clear();

        // Build success screen UI
        const success = document.createElement('div');
        success.className = 'success-wrapper';
        success.innerHTML = `
          <h1 class="success-title">Success!</h1>
          <p class="success-subtitle">Your account has been created</p>
          <div class="success-icon" aria-hidden="true">
            <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
              <circle cx="60" cy="60" r="50" fill="none" stroke="#1abc9c" stroke-width="6" />
              <path d="M38 62 L54 76 L82 46" fill="none" stroke="#1abc9c" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <button class="button-oval" id="successHomeBtn">Back to Home</button>
        `;

        // Replace page content with success UI but keep body class for styling
        const bodyEl = document.body;
        bodyEl.innerHTML = '';
        bodyEl.appendChild(success);

        const homeBtn = document.getElementById('successHomeBtn');
        if (homeBtn) homeBtn.addEventListener('click', () => { window.location.href = 'index.html.html'; });
      });
    });
  }
})();
