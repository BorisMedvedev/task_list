export const navigations = async (page) => {
  const main = document.querySelector('.main');


  switch (page) {
    case 'mom':
      const modulePage1 = await import('../pages/momPage.js');
      const mom = modulePage1.momPage();
      main.append(mom);
      break;

    case 'dad':
      const modulePage2 = await import('../pages/dadPage.js');
      const dad = modulePage2.dadPage();
      main.append(dad);
      break;

    default:
      const modulePage3 = await import('../pages/myPage.js');
      const my = modulePage3.myPage();
      main.append(my);
  }
};
