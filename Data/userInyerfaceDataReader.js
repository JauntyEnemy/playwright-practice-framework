import fs from 'fs';

const dataFileUrl = new URL('./userInyerfaceData.json', import.meta.url);

function getRandomItems(items, itemCount) {
  const shuffledItems = [...items];

  for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffledItems[index], shuffledItems[randomIndex]] = [
      shuffledItems[randomIndex],
      shuffledItems[index],
    ];
  }

  return shuffledItems.slice(0, itemCount);
}

export function getUserInyerfaceData() {
  const rawData = fs.readFileSync(dataFileUrl, 'utf-8');
  const testData = JSON.parse(rawData);

  const randomValue = Date.now();

  const emailName = `${testData.loginCard.emailNamePrefix}${randomValue}`;
  const emailDomain = `${testData.loginCard.emailDomainPrefix}${randomValue}`;
  const password = `${testData.loginCard.passwordPrefix}${emailName}`;

  return {
    loginCard: {
      emailName,
      emailDomain,
      password,
      extension: testData.loginCard.emailExtension,
    },

    interestCard: {
      selectedInterests: getRandomItems(
        testData.interestCard.availableInterests,
        testData.interestCard.interestsToSelect
      ),
    },

    avatar: {
      fileName: testData.avatar.fileName,
      mimeType: testData.avatar.mimeType,
      buffer: Buffer.from(testData.avatar.base64Content, 'base64'),
    },
  };
}
