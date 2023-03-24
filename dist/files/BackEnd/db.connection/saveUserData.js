import { db } from './dbConnection.js'
import { tableInint } from './userModel.js'

export const saveUserData = async (userName, email, massage) => {
	await db.sync();

	const textAfterSaving = `User ${userName} message was saved`
	const textAfterUdpate = `User ${userName} was update`

	const foundUser = await tableInint.findOne({ where: { email } });

	if (!foundUser) {
		await tableInint.create({ userName, email, massage });
		return textAfterSaving;
	}

	if (foundUser.name != userName) {
		await tableInint.update(userName), { where: { email } };
		return textAfterUdpate;
	}
}