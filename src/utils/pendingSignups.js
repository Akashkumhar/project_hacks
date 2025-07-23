const pendingSignups = {};

export const addPendingSignup = (data) => {
  pendingSignups[data.email] = data;
};

export const getPendingSignup = (email) => {
  return pendingSignups[email];
};

export const removePendingSignup = (email) => {
  delete pendingSignups[email];
}; 