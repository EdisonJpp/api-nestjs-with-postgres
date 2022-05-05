import { Module } from '@nestjs/common';
import { TodayEarningsService } from './today-earnings.service';

@Module({
  providers: [TodayEarningsService],
})
export class TodayEarningsModule {}
