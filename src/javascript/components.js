import '../css/components.css';

export const saludar = (name = 'no name') => {
  console.log('creating tag h1');
  const h1 = document.createElement('h1');
  h1.innerText = `Hey ${name}, \n There is your initial "webpack" application.`;
  document.body.append(h1);
};
