import 'dotenv/config';
import { app } from './app';
import { startDatabase } from './database/database';

const PORT: number = Number(process.env.PORT) || 3000

app.listen(PORT, async (): Promise<void> => {
    await startDatabase()
    console.log(`Server is running on port ${PORT}.`);
});
