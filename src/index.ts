import app from "./app.js";
import { config } from "./config/env.js";
import logger from "./utils/logger.js";

const PORT = config.PORT ?? 3000;

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
