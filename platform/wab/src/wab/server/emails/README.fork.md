# Fork email provider

SendGrid-specific code paths were removed in FORK-603; the fork routes all
outbound mail through the internal SMTP relay configured via `SMTP_HOST`.
