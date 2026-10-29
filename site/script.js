const button = document.querySelector('#untangle');
const workbench = document.querySelector('#workbench');

if (button && workbench) {
  button.hidden = false;
  button.addEventListener('click', () => {
    const tidy = workbench.dataset.tidy !== 'true';
    workbench.dataset.tidy = String(tidy);
    button.replaceChildren(document.createTextNode(tidy ? 'Show the tangle again ↶' : 'Untangle it ↝'));
    document.querySelector('#bench-status').textContent = tidy
      ? 'A clearer route. Same moving parts.'
      : 'There’s usually a simpler route.';
    document.querySelector('#workflow-title').textContent = tidy
      ? 'A workflow with three clear paths to a useful result'
      : 'A workflow, with a knot in the middle';
  });
}
