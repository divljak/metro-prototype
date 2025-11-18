# RM_WORKBENCH_IA (COLLEAGUE PLATFORM)

APP: RM Workbench (Internal Web)

SECTION: PORTFOLIO_OVERVIEW
- client_list_with_filters
- key_kpis:
  - deposits
  - lending_balance
  - non_interest_income
- risk_signals:
  - low_cash_runway_flag
  - high_overdue_invoices_flag
  - upcoming_large_payroll_flag
  - tax_liability_flag
- ai_next_best_actions
- kyc_renewal_reminders

SECTION: CUSTOMER_360_VIEW
- business_profile (company, sector, size)
- directors_and_kyb_status
- accounting_connections (xero_quickbooks_status)
- team_structure:
  - roles
  - permissions
- approval_flows:
  - payment_approvals_history
  - active_approval_rules
- pots_overview:
  - operating
  - vat
  - payroll
  - bills
  - buffer
- invoices_overview:
  - open_invoices
  - overdue_invoices
  - paid_invoices
- cashflow_view:
  - forecast
  - dips_and_spikes
- lending_exposure_and_limits
- transaction_patterns (anomalies, category_spend)

SECTION: TASKS_WORKFLOWS
- my_tasks_queue
- task_types:
  - approvals_escalations
  - stuck_payments
  - missing_docs
  - kyc_updates
  - mandate_changes
  - fraud_investigations
- workflow_status:
  - new
  - in_progress
  - waiting_on_customer
  - resolved
- sla_tracking_and_breaches

SECTION: DEALS_OPPORTUNITIES
- pipeline_view
- opportunity_sources:
  - proactive_cashflow_signals
  - manual_rm_created
  - broker_referrals
  - marketing_campaigns
- product_opportunities:
  - credit_line
  - invoice_finance
  - overdraft_extension
  - term_loans
- sector_insights
- projected_revenue_from_opportunities

SECTION: SERVICE_REQUESTS
- unified_case_view (from_customer_app_and_internal)
- create_new_case
- assign_or_escalate_case
- case_types:
  - payment_issue
  - account_change
  - card_issue
  - invoice_dispute
- crm_sync_status
- attached_documents

SECTION: COMMUNICATIONS
- customer_conversation_history:
  - calls
  - emails
  - chat
  - meetings
- schedule_meeting (calendar_integration)
- add_interaction_note
- follow_up_reminders

SECTION: ANALYTICS_INSIGHTS
- portfolio_cash_runway_distribution
- segment_risk_heatmap
- sector_benchmarks
- client_dependency_on_late_payers
- high_risk_spend_patterns
- portfolio_level_NBA (next_best_action)