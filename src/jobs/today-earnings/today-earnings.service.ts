import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TodayEarningsService {
  private readonly logger = new Logger(TodayEarningsService.name);

  @Cron(CronExpression.EVERY_30_SECONDS)
  getTodayEarnings() {
    this.logger.debug("Job -> calculating today's earning, when the second is 30");
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  getHello() {
    this.logger.debug('Hello world');
  }
}
