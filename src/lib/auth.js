const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN;
const DOMAIN = '@tech-stack.io';

export function isValidEmail(email) {
  return email?.endsWith(DOMAIN);
}

export function isAdminEmail(email) {
  return email === ADMIN_EMAIL;
}

export function loginUser(email) {
  localStorage.setItem('userEmail', email);
}

export function loginAdmin() {
  sessionStorage.setItem('isAdmin', 'true');
}

export function logout() {
  localStorage.removeItem('userEmail');
  sessionStorage.removeItem('isAdmin');
}

export function getEmail() {
  return localStorage.getItem('userEmail');
}

export function isLoggedIn() {
  const email = getEmail();
  return !!email && isValidEmail(email);
}

export function isAdmin() {
  return isLoggedIn() && isAdminEmail(getEmail()) && sessionStorage.getItem('isAdmin') === 'true';
}

export function checkPin(pin) {
  return pin === ADMIN_PIN;
}
