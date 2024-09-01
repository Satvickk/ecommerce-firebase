const functions = require("firebase-functions");
const stripe = require("stripe")(functions.config().stripe.secret_key);

// Function to create a Checkout Session
exports.createCheckoutSession = functions.https.onCall(
    async (data, context) => {
      try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: data.selectedProducts.map((item) => ({
            price: item.priceId, // Assuming `priceId` is passed for each produc
            quantity: item.quantity,
          })),
          mode: "payment",
          success_url: `${data.successUrl}?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: data.cancelUrl,
        });
        return {id: session.id};
      } catch (error) {
        console.error("Error creating Checkout Session:", error);
        throw new functions.https.HttpsError(
            "internal",
            "Unable to create Checkout Session",
        );
      }
    });

// Existing functions for product management
exports.createProduct = functions.https.onCall(async (data, context) => {
  try {
    const product = await stripe.products.create({
      name: data.name,
      description: data.description,
      images: data.images,
    });

    const resp = await stripe.prices.create({
      product: product.id,
      unit_amount: data.price * 100, // Stripe expects amount in cents
      currency: "inr",
    });
    return resp;
  } catch (error) {
    console.error("Error creating product:", error);
    throw new functions.https.HttpsError(
        "internal",
        "Unable to create product",
    );
  }
});

exports.updateProduct = functions.https.onCall(async (data, context) => {
  const {stripeProductId} = data;
  try {
    const resp = await stripe.products.update(stripeProductId, {
      name: data.name,
      description: data.description,
      images: data.featuredImage,
      price: data.price,
    });
    return resp;
  } catch (error) {
    console.error("Error updating product:", error);
    throw new functions.https.HttpsError(
        "internal",
        "Unable to update product",
    );
  }
});

// exports.deleteProduct = functions.https.onCall(async (data, context) => {
//   const {id} = data; // Destructure id from the data
//   try {
//     await stripe.products.del(`{{${id}}}`);
//     return {success: true};
//   } catch (error) {
//     console.error("Error deleting product:", error);
//     throw new functions.https.HttpsError(
//         "internal",
//         "Unable to delete product. Please try again later.",
//     );
//   }
// });


exports.deleteProduct = functions.https.onCall(async (data, context) => {
  const {id} = data; // Destructure id from the data
  try {
    await stripe.products.update(id, {
      active: false,
    });
    return {success: true};
  } catch (error) {
    console.error("Error Archiving product:", error);
    throw new functions.https.HttpsError(
        "internal",
        "Unable to archive product. Please try again later.",
    );
  }
});

