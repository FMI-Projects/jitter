const compareShallow = (oldVal, newVal, key) => {
  return oldVal.equals(newVal) ? oldVal : newVal;
};

export default compareShallow;
