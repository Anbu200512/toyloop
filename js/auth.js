/* ToyLoop - Auth (Login / Signup) */

function initLoginForm() {
  const form = document.getElementById('login-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('[name="email"]').value.trim();
    const password = form.querySelector('[name="password"]').value.trim();
    const emailErr = document.getElementById('email-error');
    const passErr = document.getElementById('password-error');
    let valid = true;

    emailErr.textContent = '';
    passErr.textContent = '';

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailErr.textContent = 'Please enter a valid email address';
      valid = false;
    }
    if (!password || password.length < 4) {
      passErr.textContent = 'Password must be at least 4 characters';
      valid = false;
    }

    if (!valid) return;

    const reg = TL.get('toyloop_registration');
    if (reg && reg.email === email && reg.password === password) {
      const user = { name: reg.name, email: reg.email, phone: reg.phone, childName: reg.childName, childDob: reg.childDob, ageGroup: reg.ageGroup };
      TL.set('toyloop_user', user);
      TL.set('toyloop_profile', { ...user, address: '123 Green Park, Mumbai 400001' });
      TL.toast('Login successful! Redirecting...', 'success');
      setTimeout(() => { window.location.href = 'dashboard.html'; }, 1000);
    } else if (email === 'priya@example.com' && password === 'demo123') {
      const user = { name: 'Priya Sharma', email: 'priya@example.com', phone: '9876543210', childName: 'Aarav', childDob: '2020-05-15', ageGroup: '3-4 Years' };
      TL.set('toyloop_user', user);
      TL.toast('Login successful! Redirecting...', 'success');
      setTimeout(() => { window.location.href = 'dashboard.html'; }, 1000);
    } else {
      TL.toast('Invalid email or password. Try demo: priya@example.com / demo123', 'error', 5000);
    }
  });
}

function initSignupForm() {
  const form = document.getElementById('signup-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
      name: form.querySelector('[name="name"]').value.trim(),
      email: form.querySelector('[name="email"]').value.trim(),
      phone: form.querySelector('[name="phone"]').value.trim(),
      password: form.querySelector('[name="password"]').value,
      confirmPassword: form.querySelector('[name="confirmPassword"]').value,
      childName: form.querySelector('[name="childName"]').value.trim(),
      childDob: form.querySelector('[name="childDob"]').value,
      ageGroup: form.querySelector('[name="ageGroup"]').value
    };

    document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
    let valid = true;

    if (!data.name || data.name.length < 2) { document.getElementById('err-name').textContent = 'Name is required'; valid = false; }
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) { document.getElementById('err-email').textContent = 'Valid email is required'; valid = false; }
    if (!data.phone || !/^[6-9]\d{9}$/.test(data.phone)) { document.getElementById('err-phone').textContent = 'Valid 10-digit phone number required'; valid = false; }
    if (!data.password || data.password.length < 6) { document.getElementById('err-password').textContent = 'Password must be at least 6 characters'; valid = false; }
    if (data.password !== data.confirmPassword) { document.getElementById('err-confirm').textContent = 'Passwords do not match'; valid = false; }
    if (!data.childName) { document.getElementById('err-child').textContent = 'Child name is required'; valid = false; }
    if (!data.childDob) { document.getElementById('err-dob').textContent = 'Date of birth is required'; valid = false; }
    if (!data.ageGroup) { document.getElementById('err-age').textContent = 'Please select an age group'; valid = false; }

    if (!valid) return;

    delete data.confirmPassword;
    TL.set('toyloop_registration', data);
    TL.toast('Account created! Redirecting to login...', 'success');
    setTimeout(() => { window.location.href = 'login.html'; }, 1500);
  });
}

function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const isPassword = input.type === 'password';
  input.type = isPassword ? 'text' : 'password';
  const icon = btn.querySelector('i');
  if (icon) {
    icon.setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
    if (typeof lucide !== 'undefined') lucide.createIcons({ nodes: [btn] });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initLoginForm();
  initSignupForm();
});
