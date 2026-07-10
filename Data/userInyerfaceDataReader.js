import fs from 'fs';
import path from 'path';

const dataFilePath = path.resolve('Data/userInyerfaceData.json');

export function getUserInyerfaceData() {
  const rawData = fs.readFileSync(dataFilePath, 'utf-8');
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
      interestsToSelect: testData.interestCard.interestsToSelect,
      availableInterests: testData.interestCard.availableInterests,
    },

    avatar: {
      fileName: testData.avatar.fileName,
      mimeType: testData.avatar.mimeType,
      buffer: Buffer.from(testData.avatar.base64Content, 'base64'),
    },
  };
}