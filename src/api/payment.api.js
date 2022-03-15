import request from "./request";

export const create = () => {
  const params = {
    to: 'foobar',
    amount: 100
  }

  return request.post("/payments", params);
}

export const getProgress = (paymentId) => {
  return request.get(`/payments/${paymentId}`)
}
