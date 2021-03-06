/*
 * This function implements a Stripe webhook handler to handle
 * fulfillment for our successful payments.
 *
 * @see https://stripe.com/docs/payments/checkout/fulfillment#webhooks
 */
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-03-02',
    maxNetworkRetries: 2,
});

exports.handler = async ({ body, headers }) => {
    try {
        // check the webhook to make sure it’s valid
        const stripeEvent = stripe.webhooks.constructEvent(
            body,
            headers['stripe-signature'],
            process.env.STRIPE_WEBHOOK_SECRET
        );

        // only continue if this is a successful Stripe Checkout purchase
        if (stripeEvent.type === 'checkout.session.completed') {
            const eventObject = stripeEvent.data.object;
            // const items = eventObject.display_items;
            console.log(eventObject);

            // TODO: update Auth0
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ received: true }),
        };
    } catch (err) {
        console.log(`Stripe webhook failed with ${err}`);

        return {
            statusCode: 400,
            body: `Webhook Error: ${err.message}`,
        };
    }
};
