import baseStyles from "../../../UI/Forms/BaseForm/BaseForm.styles";

const styles = {
  ...baseStyles,
  card: {
    ...baseStyles.card,
    marginBottom: -50,
    width: "40%"
  },
  form: {
    ...baseStyles.form,
    width: "100%"
  },
  textField: {
    ...baseStyles.textField,
    width: "80%"
  },
  imageField: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  cardTitle: {
    ...baseStyles.cardTitle,
    textAlign: "center"
  },
  headline: {
    width: "73%",
    marginLeft: "auto",
    marginTop: 10
  }
};

export default styles;
