const cleanPhoneNumber = (phoneNumber: string) => {
  const cleanedNumber = phoneNumber.replace(/\D/g, "");
  return cleanedNumber;
};

export default cleanPhoneNumber;
