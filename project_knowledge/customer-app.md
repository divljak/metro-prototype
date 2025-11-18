# CUSTOMER_APP_IA (SME BANKING)

APP: SME Customer Banking (Web + Mobile)

SECTION: COMMAND_CENTER
- cash_runway_days
- overdue_invoices_count
- upcoming_payroll_summary
- upcoming_tax_summary (VAT, corporation_tax)
- large_transactions_alerts
- tasks_list:
  - approve_payments
  - upload_invoices
  - categorize_transactions
- recommended_actions (ai_suggestions)
- quick_actions:
  - pay_supplier
  - send_invoice
  - add_team_member
  - approve_items

SECTION: MONEY_IN_OUT
- incoming_payments_overview
- outgoing_payments_overview
- overdue_invoices_summary
- upcoming_payroll_batches
- upcoming_tax_obligations
- cashflow_impact_summary
- accounting_sync_status (xero_quickbooks)

SECTION: INVOICES
- invoice_list (paid, unpaid, overdue)
- upload_invoice (ocr_autofill)
- link_invoice_to_payment
- invoice_status (draft, sent, due, overdue, paid)
- client_payment_behavior (late_payer_flag)
- reconciliation_status
- send_invoice_to_client
- invoice_finance_entrypoint

SECTION: SPEND_MANAGEMENT
- cards_list (physical, virtual)
- assign_card_to_user
- per_card_limits (amount, category, merchant)
- subscription_detection (saas_subscriptions)
- per_card_insights (month_to_date_spend, trend)
- card_request_approval_flow
- export_expenses_to_accounting

SECTION: TEAM_PERMISSIONS
- team_members_list
- roles:
  - owner
  - admin
  - accountant
  - bookkeeper
  - employee
- payment_rights:
  - can_initiate_payments
  - can_approve_payments
- card_rights:
  - can_issue_cards
  - can_manage_limits
- audit_log (who_did_what_when)
- security_logs (logins, devices)

SECTION: PAYMENTS
- primary_flows:
  - pay_invoice (invoice_first_flow)
  - pay_supplier
- recent_payees
- payment_templates
- batch_payments (payroll, suppliers)
- scheduled_payments_list
- payment_approval_chain
- payment_status_timeline (draft, pending_approval, approved, processing, sent, failed)
- limits:
  - daily_limits
  - per_user_limits
- open_banking_pull (from_external_accounts)

SECTION: ACCOUNTS
- account_types:
  - operating_account
  - payroll_pot
  - vat_pot
  - bills_pot
  - emergency_buffer
- per_account_quick_actions:
  - pay_from_account
  - request_payment
  - reconcile
- transactions_needing_category
- last_reconciled_timestamp
- unusual_activity_alerts
- accounting_connection_status

SECTION: LENDING
- existing_loans_summary
- pre_approved_amounts
- lending_products:
  - credit_line
  - invoice_finance
  - term_loan
- eligibility_view (why_eligible_or_not)
- cashflow_based_suggestions
- repayment_options (flexible_repayment_plans)
- hardship_options
- contextual_prompt:
  - example: "projected_cash_shortage_in_X_days → suggest_product"

SECTION: INSIGHTS
- cash_runway_forecast
- revenue_vs_expenses_trend
- spend_by_category:
  - contractors
  - software
  - advertising
  - suppliers
- late_paying_clients_list
- upcoming_liabilities (tax, payroll, major_invoices)
- business_health_score:
  - score_value
  - drivers_list
- suggested_actions (ai_insights)

SECTION: SOLUTIONS
- payroll_integrations
- accounting_integrations
- fx_tools
- insurance_products (business)
- expense_automation_tools
- partner_apps_for_sme
- recommended_solutions (based_on_behavior)

SECTION: SUPPORT
- support_entrypoints:
  - transaction_issue
  - payment_issue
  - upload_kyb_kyc_docs
- ticket_list (open, in_progress, resolved)
- ticket_details (sla, assigned_owner)
- relationship_manager_info
- secure_document_exchange
- quick_prompts:
  - "where_is_my_payment"
  - "explain_this_fee"
  - "update_company_docs"

SECTION: ADMIN_CENTER
- business_profile (company_details)
- directors_and_verification_docs
- user_management (same_as_team_permissions_ref)
- accountant_access_management
- integrations_config (xero, quickbooks, payroll)
- security_settings (mfa, devices)
- audit_and_login_logs
- data_sharing_and_consents