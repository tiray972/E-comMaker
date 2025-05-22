const paymentIntent = await stripe.paymentIntents.create({
  amount: "",
  currency: 'eur',
  application_fee_amount: "..." , // ta commission
  transfer_data: {
    destination: 'acct_xxx', // ID Stripe du vendeur
  },
});