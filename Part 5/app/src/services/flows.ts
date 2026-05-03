/**
 * flows — wrapper around Power Automate flows registered with this app.
 *
 * Each exported function maps to one flow and accepts a typed input object.
 * Components never call the generated service classes directly.
 *
 * sendNotification  — calls the CSA Notification flow via the built-in flow connector.
 * invokeTicketEmail — calls the same flow via the CSA Notification Caller custom connector,
 *                     passing a typed ticketId in the request body.
 */

import { CSANotificationService } from '../generated/services/CSANotificationService';
import { CSANotificationCallerService } from '../generated/services/CSANotificationCallerService';

const CONNECTOR_API_VERSION = '1';

export interface NotificationInput {
  text: string;
}

export interface NotificationResult {
  message: string;
}

export async function sendNotification(input: NotificationInput): Promise<NotificationResult> {
  const result = await CSANotificationService.Run({ text: input.text });

  if (!result.success) {
    throw new Error(result.error?.message ?? 'CSA Notification flow failed');
  }

  return { message: result.data?.message ?? '' };
}

export async function invokeTicketEmail(ticketId: string): Promise<NotificationResult> {
  const result = await CSANotificationCallerService.InvokeFlow(
    CONNECTOR_API_VERSION,
    { ticketId },
  );

  if (!result.success) {
    throw new Error(result.error?.message ?? 'CSA Notification Caller failed');
  }

  const message = typeof result.data?.message === 'string' ? result.data.message : '';
  return { message };
}
