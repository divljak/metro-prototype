# BROKER_PORTAL_IA

APP: Broker Portal (External Web)

SECTION: DASHBOARD
- deals_submitted_summary
- deals_in_progress
- deals_needing_documents
- eligibility_flags_overview
- cashflow_risk_signals (from_client_data)
- broker_performance_metrics:
  - conversion_rate
  - avg_time_to_fund
  - revenue_generated

SECTION: DEAL_SUBMISSION
- select_client (linked_or_manual)
- auto_fill_business_data (from_bank_data_if_available)
- facility_types:
  - term_loan
  - credit_line
  - invoice_finance
  - asset_finance (if_in_scope)
- upload_documents (ocr_enabled)
- optional_invoice_finance_from_invoice_data
- multi_director_signing_paths
- suggested_products (based_on_cashflow_and_risk)
- submission_review_and_submit

SECTION: DEAL_TRACKING
- deal_list_with_filters
- per_deal_timeline:
  - submitted
  - under_review
  - awaiting_docs
  - awaiting_signatures
  - approved
  - funded
  - declined
- dependencies:
  - missing_docs
  - pending_director_approval
  - pending_risk_assessment
- broker_fee_view (expected, paid)

SECTION: BROKER_MANAGEMENT
- broker_profile
- panel_status (approved, pending, rejected)
- compliance_docs_status
- kyc_kyb_for_broker
- sub_brokers_list
- permissions_per_sub_broker

SECTION: CLIENT_DOCUMENT_PORTAL
- client_upload_entrypoint
- allowed_doc_types (invoices, statements, KYB)
- upload_status_per_client
- document_review_status (accepted, rejected, needs_more_info)
- secure_messages_between_client_and_bank

SECTION: REPORTING
- summary_metrics:
  - total_deals
  - active_deals
  - funded_deals
  - conversion_rate
- breakdown_by_product_type
- breakdown_by_sector
- time_to_approval
- time_to_funding
- invoice_finance_specific_metrics

SECTION: OPPORTUNITY_ENGINE
- opportunities_from_cashflow_signals:
  - projected_cash_shortage
  - high_overdue_invoices
  - seasonal_revenue_patterns
- recommended_facilities:
  - invoice_finance
  - revolving_credit
  - short_term_loan
- priority_ranked_opportunities_for_broker