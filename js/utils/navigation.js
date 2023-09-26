export const navigations = async (page) => {
  const main = document.querySelector('.main');

  const modulePage1 = await import('../pages/momPage.js');
  const mom = modulePage1.momPage();
  const modulePage2 = await import('../pages/dadPage.js');
  const dad = modulePage2.dadPage();
  const modulePage3 = await import('../pages/myPage.js');
  const my = modulePage3.myPage();

  switch (page) {
    case 'mom':
      main.append(mom);
      break;

    case 'dad':
      main.append(dad);
      break;

    default:
      main.append(my);
  }
};
