import { Global, Module } from "@nestjs/common";
import { DatabaseService } from "./db.service";

// add global so all modules can access this module 
// without the need of an import
@Global()
@Module({
    providers: [DatabaseService],
    exports: [DatabaseService],
})
export class DatabaseModule {}