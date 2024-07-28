const fs = require('fs');
const path = require('path');

const isPremiumUser = (userId) => {
    const premiumPath = path.resolve(__dirname, '../data/premium.json');
    const premiumUsers = JSON.parse(fs.readFileSync(premiumPath, 'utf-8'));
    return premiumUsers.includes(userId);
};

module.exports = { isPremiumUser };