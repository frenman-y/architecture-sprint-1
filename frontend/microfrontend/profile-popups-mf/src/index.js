function component() {
  const element = document.createElement('div');
  
  // Lodash, now imported by this script
  element.innerHTML = "test";
  element.classList.add('hello');

  return element;
}
  
document.body.appendChild(component());