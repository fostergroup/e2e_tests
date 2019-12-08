var Messages = function () {
	//field is blank
	var empty_field_msg = 'cannot be blank';
	this.empty_field_msg = empty_field_msg;

	//select language
	var empty_lang = 'You should select language';
	this.empty_lang = empty_lang;

	//select language level
	var empty_lang_level = 'You should select level';
	this.empty_lang_level = empty_lang_level;

	//short password message
	var short_pwsd_msg = 'Password must be at least 8 characters long';
	this.short_pwsd_msg = short_pwsd_msg;

	//non valid email
	var non_valid_email_msg = 'This value is not a valid email address';
	this.non_valid_email_msg = non_valid_email_msg;

	//non valid email
	var should_be_valid_email_msg = 'Value must be a valid email address';
	this.should_be_valid_email_msg = should_be_valid_email_msg;

	//non existing email
	var non_exist_email_msg = 'Unfortunately we cannot find an account registered with the email provided';
	this.non_exist_email_msg = non_exist_email_msg;

	//reset pswd
	var reset_pswd_msg = 'Your password request was successfuly sent. Check out your incoming emails and follow the instructions written inside the message.';
	this.reset_pswd_msg = reset_pswd_msg;

	//passwords do not match message
	var pwd_not_march_msg = 'Passwords do not match';
	this.pwd_not_march_msg = pwd_not_march_msg;

	//msg bad credenatils
	var bad_cr_msg = 'Bad credentials';
	this.bad_cr_msg = bad_cr_msg;

	//msg email registered
	var email_reg_msg = 'This email has been already registered';
	this.email_reg_msg = email_reg_msg;

	//msg invoices uploaded
	var invoice_upload = 'Invoices uploaded.';
	this.invoice_upload = invoice_upload;

	//msg with thanks
	var thanks_msg = 'Thank you for working with Transformify';
	this.thanks_msg = thanks_msg;

	//msg with error
	var pend_paym = 'We are sorry but we were not able to receive payment for this project. Please check your credit card balance and try again.';
	this.pend_paym = pend_paym;

	var thank_shedul_int = 'Thank you for scheduling an interview with a Member of Transformify';
	this.thank_shedul_int = thank_shedul_int;

	var wrong_pswd = 'Wrong password';
	this.wrong_pswd = wrong_pswd;

	var succ_pswd_update = 'Your password was updated successfuly';
	this.succ_pswd_update = succ_pswd_update;

	var non_valid_value = 'not valid';
	this.non_valid_value = non_valid_value;

	var dates_diff = 'To date must be before From date';
	this.dates_diff = dates_diff;

	var empty_skill = 'Please select at least one skill from the list';
	this.empty_skill = empty_skill;

	var non_selected_focusgroups = 'At least one group on focus must be selected';
	this.non_selected_focusgroups = non_selected_focusgroups;

	var too_long_desc = 'The description should be up to 500 characters';
	this.too_long_desc = too_long_desc;

	var impossible_act = 'Action is not possible.';
	this.impossible_act = impossible_act;

	var impos_apply = "We are sorry, but you can't apply to this project";
	this.impos_apply = impos_apply;

	var suc_applic_proj = 'Thank you for applying to a project with a Partner of Transformify';
	this.suc_applic_proj = suc_applic_proj;

	var too_large_file = 'The file is too large. Allowed maximum size is 2 MiB.';
	this.too_large_file = too_large_file;

	var invalid_url = 'Invalid URL';
	this.invalid_url = invalid_url;

	var agree_msg = 'You have to agree with Terms and Conditions';
	this.agree_msg = agree_msg;

	var no_proj_apply = 'There are no available projects to apply for';
	this.no_proj_apply = no_proj_apply;

	var credit_card_added = 'A Credit card was successfully added';
	this.credit_card_added = credit_card_added;

	var error_credit_card = 'There was an error while adding a new credit card';
	this.error_credit_card = error_credit_card;

	var payouts_succ = 'All payouts successfully paid';
	this.payouts_succ = payouts_succ;

	var invoice_succ_updated = 'Invoice data successfully updated';
	this.invoice_succ_updated = invoice_succ_updated;

	var invoice_co_warn = "You can't change country. Please, contact the administrator";
	this.invoice_co_warn = invoice_co_warn;

	var invoice_type_warn = "You can't change vat registration. Please, contact the administrator";
	this.invoice_type_warn = invoice_type_warn;

	var provide_comp_name = 'You should provide a company that you have worked for';
	this.provide_comp_name = provide_comp_name;

	var provide_comp_pos = 'You should provide position at this company';
	this.provide_comp_pos = provide_comp_pos;

	var blank_work_desc = 'Tell us something about your work in that company';
	this.blank_work_desc = blank_work_desc;

	var not_appr_payment = 'We are sorry, but the previous payment as per this project has not been approved yet';
	this.not_appr_payment = not_appr_payment;

	var start_time_after_end_time = 'Start time must be before end time';
	this.start_time_after_end_time = start_time_after_end_time;

	var timeslot_included = 'Selected time range matches another record';
	this.timeslot_included = timeslot_included;

	var not_set = 'not set';
	this.not_set = not_set;

	var bank_transfer_msg = 'Bank Transfer is subject to Admin approval';
	this.bank_transfer_msg = bank_transfer_msg;

	var have_invited = 'invited';
	this.have_invited = have_invited;

	var proj_term = 'Project has been successfully terminated';
	this.proj_term = proj_term;

	var int_accepted = 'Interview has been accepted successfully';
	this.int_accepted = int_accepted;

	var int_declined = 'Interview has been declined successfully';
	this.int_declined = int_declined;

	var memb_not_found = 'Member is not found';
	this.memb_not_found = memb_not_found;

	var subj_missing = 'Subject is missing';
	this.subj_missing = subj_missing;

	var msg_required = 'Message is required';
	this.msg_required = msg_required;

	var msg_succ_sent = 'Message is sent successfully';
	this.msg_succ_sent = msg_succ_sent;

	var int_resched = 'Interview has been requested for reschedule successfully';
	this.int_resched = int_resched;

	var msg_part_not_cont = 'This partner has never contacted you';
	this.msg_part_not_cont = msg_part_not_cont;

	var succ_saved_sett = 'Options successfully set';
	this.succ_saved_sett = succ_saved_sett;

	var should_not_blank = 'This value should not be blank';
	this.should_not_blank = should_not_blank;

	var aff_success_reg = 'Your registration for affiliate is successfull';
	this.aff_success_reg = aff_success_reg;

	var succ_update = 'successfully updated';
	this.succ_update = succ_update;

	var succ_approved = 'has been successfully approved';
	this.succ_approved = succ_approved;

	var update_inv_succ = 'Status of invoices has been successfully updated';
	this.update_inv_succ = update_inv_succ;

	var lang_saved = 'Language saved successfully';
	this.lang_saved = lang_saved;

	var lang_del = 'Language deleted successfully';
	this.lang_del = lang_del;

	var no_file = 'No file';
	this.no_file = no_file;

	var close_proj = 'Project has been successfully closed';
	this.close_proj = close_proj;

	var profile_is_not_filled = 'Action is not possible';
	this.profile_is_not_filled = profile_is_not_filled;

	var invoice_is_not_filled = 'Please, go to Invoice Details screen and fill in invoice data before you can proceed.';
	this.invoice_is_not_filled = invoice_is_not_filled;

	var wrong_seq_question = 'Selected security question is not the one you picked up';
	this.wrong_seq_question = wrong_seq_question;

	var wrong_seq_answer = 'Answer of security question is wrong';
	this.wrong_seq_answer = wrong_seq_answer;
};
module.exports = Messages;