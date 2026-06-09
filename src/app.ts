import { connectDB, sequelize } from "./config/db";

async function main() {
	await connectDB();
	await sequelize.sync();
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});