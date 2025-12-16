const ORDER_KEYWORDS = ['order', 'track', 'status', 'shipment'];
const RETURN_KEYWORDS = ['return', 'refund', 'exchange'];
const PRODUCT_KEYWORDS = ['product', 'spec', 'detail', 'price', 'availability'];
const FAQ_KEYWORDS = ['policy', 'shipping', 'payment', 'warranty'];
const SMALLTALK_KEYWORDS = ['hello', 'hi', 'thanks', 'thank you', 'who are you'];

const detectIntent = (text = '') => {
  const lower = text.toLowerCase();

  if (ORDER_KEYWORDS.some((kw) => lower.includes(kw))) {
    return 'order_status';
  }
  if (RETURN_KEYWORDS.some((kw) => lower.includes(kw))) {
    return 'returns';
  }
  if (PRODUCT_KEYWORDS.some((kw) => lower.includes(kw))) {
    return 'product_info';
  }
  if (FAQ_KEYWORDS.some((kw) => lower.includes(kw))) {
    return 'faq';
  }
  if (SMALLTALK_KEYWORDS.some((kw) => lower.includes(kw))) {
    return 'smalltalk';
  }
  return 'unknown';
};

module.exports = {
  detectIntent
};
