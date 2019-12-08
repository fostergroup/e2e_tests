var Statuses = function() {
	var await_pay = 'Awaiting payment';
	this.await_pay = await_pay;

    var pay_ordered = 'Payment Ordered';
    this.pay_ordered = pay_ordered;

    var assigned = 'Assigned';
    this.assigned = assigned;

	var applied = 'Applied';
	this.applied = applied;

    var completed = 'Completed';
    this.completed = completed;

	var open = 'Open';
	this.open = open;

	var paid = 'Paid';
	this.paid = paid;

	var accepted = 'Accepted';
	this.accepted = accepted;

	var closed = 'Closed';
	this.closed = closed;

	var declined = 'Declined';
	this.declined = declined;

	var not_avail = 'Not available';
	this.not_avail = not_avail;

	var pending = 'Pending';
	this.pending = pending;

	var term = 'Terminated';
	this.term = term;

	var resolved = 'Resolved';
	this.resolved = resolved;

	var invited = 'Invited';
	this.invited = invited;

	var pend_paym = 'Pending payment';
	this.pend_paym = pend_paym;
};
module.exports = Statuses;