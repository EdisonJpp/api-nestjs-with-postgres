import { ChatModule } from './chat/chat.module';
import { NotificationModule } from './notification/notification.module';

export const SubscribersModule = [NotificationModule, ChatModule];
