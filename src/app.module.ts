import { Modules } from './modules';
import { jobsModules } from './jobs';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { SubscribersModule } from './subscribers';
import { DBSqlModule } from './config/db/db.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    DBSqlModule,
    ...Modules,
    ...jobsModules,
    ...SubscribersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
